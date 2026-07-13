'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Image as ImageIcon, Plus, Trash, Eye, Settings, Upload } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: 'residential' | 'commercial' | 'hospitality' | 'astro';
  image_url: string;
  status: 'draft' | 'published' | 'archived';
  sort_order: number;
  tags?: string;
}

interface MediaLibraryProps {
  initialItems: GalleryItem[];
}

export default function MediaLibrary({ initialItems }: MediaLibraryProps) {
  const [items, setItems] = useState<GalleryItem[]>(initialItems);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [uploading, setUploading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'residential' | 'commercial' | 'hospitality' | 'astro'>('all');

  const filteredItems = activeFilter === 'all'
    ? items
    : items.filter(item => item.category === activeFilter);

  // File Upload Helper
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const files = e.target.files;
      if (!files || files.length === 0) return;

      const file = files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `gallery/${fileName}`;

      // Upload file to Supabase Storage Bucket
      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      const publicUrl = data.publicUrl;

      // Save new gallery item in Supabase Database
      const newItem = {
        title: 'New Spatial Project',
        description: 'Vastu color remedies blueprint',
        category: 'residential' as const,
        image_url: publicUrl,
        status: 'draft' as const,
        sort_order: items.length + 1
      };

      const { data: insertedItem, error: dbError } = await supabase
        .from('gallery_items')
        .insert([newItem])
        .select()
        .single();

      if (dbError) throw dbError;

      setItems(prev => [...prev, insertedItem]);
      setSelectedItem(insertedItem);
      alert('Upload completed successfully!');
    } catch (err) {
      console.error(err);
      alert('Error during file upload.');
    } finally {
      setUploading(false);
    }
  };

  // Delete item from DB and update state
  const handleDelete = async (item: GalleryItem) => {
    if (!confirm('Are you sure you want to delete this gallery item?')) return;

    try {
      const { error } = await supabase
        .from('gallery_items')
        .delete()
        .eq('id', item.id);

      if (error) throw error;

      setItems(prev => prev.filter(i => i.id !== item.id));
      setSelectedItem(null);
    } catch (err) {
      console.error(err);
      alert('Failed to delete item.');
    }
  };

  // Update item details in state and database
  const handleUpdate = async (updated: GalleryItem) => {
    try {
      const { error } = await supabase
        .from('gallery_items')
        .update({
          title: updated.title,
          description: updated.description,
          category: updated.category,
          status: updated.status,
          sort_order: updated.sort_order,
          tags: updated.tags
        })
        .eq('id', updated.id);

      if (error) throw error;

      setItems(prev => prev.map(i => i.id === updated.id ? updated : i));
      setSelectedItem(updated);
      alert('Item details updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Sync failed.');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* Upload & Workspace grid */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Upload Area */}
        <label className="border border-dashed border-slate-300 rounded-xl p-8 bg-white flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-c-accent transition-colors">
          <Upload className="w-8 h-8 text-slate-400" />
          <span className="font-semibold text-sm text-slate-900">
            {uploading ? 'Uploading media asset...' : 'Upload spatial layout images'}
          </span>
          <span className="text-xs text-slate-400">Supports PNG, JPG, or WEBP up to 5MB</span>
          <input type="file" onChange={handleUpload} disabled={uploading} className="hidden" accept="image/*" />
        </label>

        {/* Category Tabs Filter */}
        <div className="flex gap-2 border-b border-slate-100 pb-3 flex-wrap">
          {(['all', 'residential', 'commercial', 'hospitality', 'astro'] as const).map(tab => {
            const label = tab === 'all' ? 'All Assets' :
                          tab === 'residential' ? 'Residences' :
                          tab === 'commercial' ? 'Offices' :
                          tab === 'hospitality' ? 'Hospitality' : 'Astro Remedies';
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveFilter(tab)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                  activeFilter === tab
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50 border border-slate-100'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Workspace grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className={`group border rounded-xl overflow-hidden cursor-pointer transition-all bg-white relative ${selectedItem?.id === item.id ? 'ring-2 ring-c-accent border-transparent' : 'hover:shadow-md'}`}
            >
              <img src={item.image_url} alt={item.title} className="w-full h-40 object-cover" />
              <div className="p-3 text-xs flex items-center justify-between">
                <span className="font-semibold truncate max-w-[80%] text-slate-900">{item.title}</span>
                <span className={`w-2 h-2 rounded-full ${item.status === 'published' ? 'bg-emerald-500' : 'bg-amber-450'}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editor slide details panel */}
      <div className="bg-white border rounded-xl p-6 h-fit space-y-6">
        <h3 className="font-semibold text-sm border-b pb-3 uppercase text-slate-400">Content Metadata</h3>
        
        {selectedItem ? (
          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold uppercase mb-1">Title</label>
              <input
                type="text"
                value={selectedItem.title}
                onChange={(e) => handleUpdate({ ...selectedItem, title: e.target.value })}
                className="w-full p-2.5 border rounded-lg outline-none focus:border-c-accent text-slate-900 bg-slate-50"
              />
            </div>
            
            <div>
              <label className="block text-slate-400 font-semibold uppercase mb-1">Category</label>
              <select
                value={selectedItem.category}
                onChange={(e: any) => handleUpdate({ ...selectedItem, category: e.target.value })}
                className="w-full p-2.5 border rounded-lg outline-none focus:border-c-accent text-slate-900 bg-slate-50"
              >
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="hospitality">Hospitality</option>
                <option value="astro">Astro Remedies</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold uppercase mb-1">Status</label>
              <select
                value={selectedItem.status}
                onChange={(e: any) => handleUpdate({ ...selectedItem, status: e.target.value })}
                className="w-full p-2.5 border rounded-lg outline-none focus:border-c-accent text-slate-900 bg-slate-50"
              >
                <option value="draft">Draft (Hidden)</option>
                <option value="published">Published (Live)</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold uppercase mb-1">Description</label>
              <textarea
                value={selectedItem.description}
                rows={3}
                onChange={(e) => handleUpdate({ ...selectedItem, description: e.target.value })}
                className="w-full p-2.5 border rounded-lg outline-none focus:border-c-accent text-slate-900 bg-slate-50 resize-none"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={() => handleDelete(selectedItem)}
                className="flex-1 py-2.5 bg-rose-50 text-rose-600 rounded-lg font-semibold hover:bg-rose-100 flex items-center justify-center gap-1.5"
              >
                <Trash className="w-4 h-4" /> Delete Asset
              </button>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-slate-400 text-xs">
            Select an image to calibrate publishing settings.
          </div>
        )}
      </div>

    </div>
  );
}
