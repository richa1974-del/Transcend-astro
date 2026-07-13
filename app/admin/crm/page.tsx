import React from 'react';
import { createServerClient } from '@/lib/supabase/server';
import KanbanBoard from '@/components/admin/KanbanBoard';

export const revalidate = 0; // Fresh metrics on CRM load

export default async function AdminCRM() {
  const supabase = createServerClient();

  // Asynchronously load leads
  let leads: any[] = [];
  try {
    const { data: dbLeads } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });
    leads = dbLeads || [];
  } catch (error) {
    console.error('Failed to load leads from Supabase database.', error);
  }

  return (
    <div className="space-y-6 h-full">
      {/* Overview header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-heading">CRM Leads Pipeline</h2>
        <p className="text-sm text-slate-500">Drag and drop leads between columns to update status instantly.</p>
      </div>

      {/* Interactive board */}
      <div className="flex-1 h-full">
        <KanbanBoard initialLeads={leads} />
      </div>
    </div>
  );
}
