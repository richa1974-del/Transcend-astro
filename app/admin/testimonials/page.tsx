'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Star, Check, X, Trash, Sparkles } from 'lucide-react';

interface Testimonial {
  id: string;
  client_name: string;
  text_content: string;
  rating: number;
  status: 'pending' | 'approved' | 'rejected';
  featured: boolean;
  created_at: string;
}

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  // Load testimonials from DB on mount
  useEffect(() => {
    async function load() {
      try {
        const { data } = await supabase
          .from('testimonials')
          .select('*')
          .order('created_at', { ascending: false });
        setTestimonials(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Update status (Approve / Reject)
  const handleStatusChange = async (id: string, nextStatus: 'approved' | 'rejected') => {
    // Optimistic UI update
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, status: nextStatus } : t));

    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ status: nextStatus })
        .eq('id', id);

      if (error) throw error;
    } catch (err) {
      console.error(err);
      alert('Action failed. Rolled back state.');
      // Refetch
      const { data } = await supabase.from('testimonials').select('*');
      setTestimonials(data || []);
    }
  };

  // Toggle Featured status
  const handleToggleFeatured = async (id: string, featured: boolean) => {
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, featured } : t));

    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ featured })
        .eq('id', id);

      if (error) throw error;
    } catch (err) {
      console.error(err);
      alert('Failed to update featured flag.');
    }
  };

  // Delete review
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setTestimonials(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error(err);
      alert('Delete failed.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-heading">Testimonials Approval Desk</h2>
        <p className="text-sm text-slate-500">Moderate and approve client feedback before it is dynamically published to the website.</p>
      </div>

      {loading ? (
        <div className="p-8 text-center text-slate-400 text-sm">Loading reviews...</div>
      ) : (
        <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b text-slate-400 uppercase font-semibold">
                <th className="p-6">Client Name</th>
                <th className="p-6">Review Content</th>
                <th className="p-6">Rating</th>
                <th className="p-6">Status</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {testimonials.length > 0 ? (
                testimonials.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50">
                    <td className="p-6 font-semibold text-slate-900">{t.client_name}</td>
                    <td className="p-6 text-slate-500 max-w-sm leading-relaxed">"{t.text_content}"</td>
                    <td className="p-6">
                      <div className="flex items-center gap-0.5 text-yellow-500">
                        {Array.from({ length: t.rating || 5 }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </td>
                    <td className="p-6">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded font-medium border capitalize ${t.status === 'approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : t.status === 'rejected' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="p-6 text-right space-x-2">
                      {t.status !== 'approved' && (
                        <button
                          onClick={() => handleStatusChange(t.id, 'approved')}
                          className="p-1.5 bg-emerald-50 text-emerald-600 rounded border hover:bg-emerald-100"
                          title="Approve"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      {t.status !== 'rejected' && (
                        <button
                          onClick={() => handleStatusChange(t.id, 'rejected')}
                          className="p-1.5 bg-rose-50 text-rose-600 rounded border hover:bg-rose-100"
                          title="Reject"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleToggleFeatured(t.id, !t.featured)}
                        className={`p-1.5 rounded border ${t.featured ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                        title="Toggle Featured"
                      >
                        <Sparkles className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(t.id)}
                        className="p-1.5 bg-slate-50 text-slate-400 border rounded hover:bg-slate-100 hover:text-slate-900"
                        title="Delete"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-slate-400">
                    No testimonials waiting for moderation.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
