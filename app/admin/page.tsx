import React from 'react';
import { createServerClient } from '@/lib/supabase/server';
import Link from 'next/link';

export const revalidate = 0; // Fresh metrics on load

export default async function AdminDashboard() {
  const supabase = createServerClient();

  // Asynchronously fetch counts and lists from Supabase
  let totalLeads = 0;
  let newLeads = 0;
  let wonLeads = 0;
  let recentLeads: any[] = [];

  try {
    const { count: dbTotal } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true });
    totalLeads = dbTotal || 0;

    const { count: dbNew } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'new');
    newLeads = dbNew || 0;

    const { count: dbWon } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'won');
    wonLeads = dbWon || 0;

    const { data: dbRecent } = await supabase
      .from('leads')
      .select('id, name, email, city, status, created_at')
      .order('created_at', { ascending: false })
      .limit(5);
    recentLeads = dbRecent || [];
  } catch (error) {
    console.error('Failed to load metrics from Supabase.', error);
  }

  const conversionRate = totalLeads > 0 ? ((wonLeads / totalLeads) * 100).toFixed(1) : '0.0';

  return (
    <div className="space-y-8">
      {/* Overview header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-heading">System Overview</h2>
        <p className="text-sm text-slate-500">Real-time conversions, pipeline status, and recent activity logs.</p>
      </div>

      {/* Stats cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase">Total Leads</span>
          <div className="text-3xl font-bold text-slate-950 mt-1">{totalLeads}</div>
        </div>
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase">New Enquiries</span>
          <div className="text-3xl font-bold text-blue-600 mt-1">{newLeads}</div>
        </div>
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase">Won Deals</span>
          <div className="text-3xl font-bold text-emerald-600 mt-1">{wonLeads}</div>
        </div>
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <span className="text-xs font-semibold text-slate-400 uppercase">Conversion Rate</span>
          <div className="text-3xl font-bold text-slate-950 mt-1">{conversionRate}%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Recent leads block */}
        <div className="bg-white border rounded-xl shadow-sm col-span-2 overflow-hidden flex flex-col justify-between">
          <div className="p-6 border-b">
            <h3 className="font-semibold text-base text-slate-900">Recent Lead Enquiries</h3>
          </div>
          
          <div className="divide-y overflow-x-auto">
            {recentLeads.length > 0 ? (
              recentLeads.map((lead) => (
                <div key={lead.id} className="p-6 flex items-center justify-between text-sm">
                  <div>
                    <div className="font-semibold text-slate-950">{lead.name}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{lead.email} — {lead.city || 'No City'}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs px-2 py-0.5 rounded font-medium border text-slate-600 capitalize bg-slate-50">
                      {lead.status}
                    </span>
                    <Link href="/admin/crm" className="text-xs text-c-accent font-semibold hover:underline">
                      Manage
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-slate-400 text-sm">
                No recent leads captured.
              </div>
            )}
          </div>
          
          <div className="p-4 border-t bg-slate-50 text-center text-xs">
            <Link href="/admin/crm" className="text-slate-500 font-semibold hover:text-slate-900">
              View CRM Pipeline
            </Link>
          </div>
        </div>

        {/* Quick configuration templates */}
        <div className="bg-white border rounded-xl shadow-sm p-6 space-y-6">
          <h3 className="font-semibold text-base text-slate-900">Automation Workflows</h3>
          
          <div className="space-y-4 text-sm">
            <div className="p-4 bg-slate-50 border rounded-lg flex items-center justify-between">
              <div>
                <div className="font-semibold">Welcome Emails</div>
                <div className="text-xs text-slate-400 mt-0.5">Send thank you on lead submission</div>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded">Enabled</span>
            </div>
            <div className="p-4 bg-slate-50 border rounded-lg flex items-center justify-between">
              <div>
                <div className="font-semibold">Astro Report Compiler</div>
                <div className="text-xs text-slate-400 mt-0.5">Auto-generate natal remedy blueprint</div>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded">Enabled</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
