'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { calculateAstroSpatialCalibration } from '@/lib/astro-spatial/engine';
import { Search, Plus, MapPin, Calendar, Clock, Sparkles } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  birth_details: any;
  property_type: string;
  budget: number;
  service_interested: string;
  status: string;
  notes: string;
  created_at: string;
}

interface KanbanProps {
  initialLeads: Lead[];
}

const COLUMNS = [
  { id: 'new', title: 'New Enquiries', color: '#3B82F6' },
  { id: 'contacted', title: 'Contacted', color: '#F59E0B' },
  { id: 'scheduled', title: 'Scheduled', color: '#8B5CF6' },
  { id: 'report_sent', title: 'Report Sent', color: '#EC4899' },
  { id: 'negotiation', title: 'Negotiation', color: '#F97316' },
  { id: 'won', title: 'Won (Client)', color: '#10B981' }
];

export default function KanbanBoard({ initialLeads }: KanbanProps) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [search, setSearch] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [report, setReport] = useState<any | null>(null);

  // Filter leads by search query
  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(search.toLowerCase()) || 
    (l.email && l.email.toLowerCase().includes(search.toLowerCase())) ||
    (l.city && l.city.toLowerCase().includes(search.toLowerCase()))
  );

  // HTML5 Drag and Drop logic
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDrop = async (e: React.DragEvent, targetStatus: string) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    const dragLead = leads.find(l => l.id === id);
    if (!dragLead || dragLead.status === targetStatus) return;

    // Optimistic UI Update
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status: targetStatus } : l));

    // Update DB background write
    try {
      const { error } = await supabase
        .from('leads')
        .update({ status: targetStatus })
        .eq('id', id);

      if (error) {
        // Rollback state on error
        setLeads(initialLeads);
        alert('Database sync failed. Rolled back changes.');
      }
    } catch (err) {
      console.error(err);
      setLeads(initialLeads);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Compile Vastu layout report
  const triggerAstroCalibration = (lead: Lead) => {
    if (!lead.birth_details || !lead.birth_details.date) {
      alert('Please fill birth date details first.');
      return;
    }
    const calReport = calculateAstroSpatialCalibration(lead.name, {
      date: lead.birth_details.date,
      time: lead.birth_details.time || '12:00',
      place: lead.birth_details.place || 'Unknown'
    });
    setReport(calReport);
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      
      {/* Search Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search name, email, or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm bg-white outline-none focus:border-c-accent"
          />
        </div>
        <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-slate-850">
          <Plus className="w-4 h-4" /> Add Lead
        </button>
      </div>

      {/* Kanban Grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-6 gap-6 overflow-x-auto pb-4">
        {COLUMNS.map(col => {
          const colLeads = filteredLeads.filter(l => l.status === col.id);
          
          return (
            <div
              key={col.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, col.id)}
              className="bg-slate-50 border rounded-xl p-4 flex flex-col min-w-[250px] max-h-[70vh] overflow-y-auto"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: col.color }} />
                  <h3 className="font-semibold text-xs text-slate-700 uppercase tracking-wider">{col.title}</h3>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 bg-white border rounded text-slate-400">
                  {colLeads.length}
                </span>
              </div>

              {/* Cards List */}
              <div className="flex-1 space-y-3">
                {colLeads.map(lead => (
                  <div
                    key={lead.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, lead.id)}
                    onClick={() => { setSelectedLead(lead); setReport(null); }}
                    className="bg-white border rounded-lg p-4 shadow-sm hover:border-slate-300 transition-all cursor-grab active:cursor-grabbing text-xs space-y-3"
                  >
                    <div className="font-semibold text-slate-900 text-sm">{lead.name}</div>
                    
                    <div className="space-y-1 text-slate-500">
                      {lead.city && (
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{lead.city}</span>
                        </div>
                      )}
                      {lead.service_interested && (
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                          <span className="capitalize">{lead.service_interested}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide-out detail drawer Panel */}
      {selectedLead && (
        <div className="fixed inset-y-0 right-0 w-full max-w-lg bg-white shadow-2xl border-l z-[10000] p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{selectedLead.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">Enquiry Detail Profile</p>
              </div>
              <button 
                onClick={() => setSelectedLead(null)}
                className="text-slate-400 hover:text-slate-900 text-lg font-bold"
              >
                &times;
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 border rounded-lg">
                <span className="text-slate-400 block uppercase font-semibold">Email</span>
                <span className="font-medium text-slate-900">{selectedLead.email || 'None'}</span>
              </div>
              <div className="p-3 bg-slate-50 border rounded-lg">
                <span className="text-slate-400 block uppercase font-semibold">Phone</span>
                <span className="font-medium text-slate-900">{selectedLead.phone || 'None'}</span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-sm text-slate-900">Astrological Details</h4>
              <div className="p-4 border rounded-lg space-y-2 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold mr-2">Birth Coordinates:</span>
                  <span className="text-slate-900">
                    {selectedLead.birth_details?.date ? `${selectedLead.birth_details.date} at ${selectedLead.birth_details.time}` : 'Not provided'}
                  </span>
                </div>
                {selectedLead.birth_details?.date && (
                  <button
                    onClick={() => triggerAstroCalibration(selectedLead)}
                    className="flex items-center gap-1.5 text-c-accent font-semibold hover:underline"
                  >
                    <Sparkles className="w-4 h-4" /> Calculate Astro-Spatial Report
                  </button>
                )}
              </div>
            </div>

            {/* Generated calibration report */}
            {report && (
              <div className="space-y-4 border border-c-accent/20 bg-c-accent-glow p-6 rounded-xl">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading text-lg font-semibold text-c-accent">Vastu remedies blueprint</h4>
                  <span className="text-[10px] bg-white border border-c-accent-border px-2 py-0.5 rounded text-c-text-secondary font-mono">
                    {report.chartSignature}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400">Primary Element:</span>
                    <strong className="block text-slate-900 mt-0.5">{report.primaryElement}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Dominant Planet:</span>
                    <strong className="block text-slate-900 mt-0.5">{report.dominantPlanet}</strong>
                  </div>
                </div>
                <div className="border-t border-c-accent-border pt-4 space-y-3">
                  {report.vastuGridding.map((grid: any, idx: number) => (
                    <div key={idx} className="text-xs space-y-1">
                      <strong className="text-slate-900">{grid.quadrant} — {grid.element.toUpperCase()}</strong>
                      <p className="text-slate-500">{grid.remedyAction}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="border-t pt-4 mt-6">
            <button className="w-full py-3 bg-slate-900 text-white rounded-lg text-sm font-semibold">
              Save Lead Profile
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
