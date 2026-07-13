import React from 'react';
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-slate-50 font-body text-slate-800 antialiased overflow-hidden">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-slate-200 bg-white flex flex-col justify-between flex-shrink-0">
        <div>
          {/* Brand header */}
          <div className="h-16 px-6 border-b border-slate-100 flex items-center gap-3">
            <img src="/assets/logo.png" alt="AstroInterior" className="w-8 h-8" />
            <div className="flex flex-col">
              <span className="text-xs font-semibold tracking-wider uppercase text-slate-900 font-heading">ASTROINTERIOR</span>
              <span className="text-[9px] text-slate-400 font-light">Business Operating System</span>
            </div>
          </div>

          {/* Links list */}
          <nav className="p-4 space-y-1.5">
            <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-700 hover:bg-slate-50 transition-colors">
              <span>📊</span> Dashboard
            </Link>
            <Link href="/admin/crm" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-700 hover:bg-slate-50 transition-colors">
              <span>📋</span> CRM Leads
            </Link>
            <Link href="/admin/gallery" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-700 hover:bg-slate-50 transition-colors">
              <span>🖼️</span> Gallery CMS
            </Link>
            <Link href="/admin/testimonials" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-700 hover:bg-slate-50 transition-colors">
              <span>★</span> Testimonials
            </Link>
            <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-700 hover:bg-slate-50 transition-colors">
              <span>⚙️</span> Settings & SEO
            </Link>
          </nav>
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span>v3.0.0</span>
          <span>Richa Agarwal</span>
        </div>
      </aside>

      {/* Main workspace panels */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header toolbar */}
        <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 flex-shrink-0">
          <div className="flex items-center gap-4">
            <h1 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Workspace</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-2 py-1 bg-emerald-50 text-emerald-600 rounded">Supabase Connected</span>
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm font-bold border">A</div>
          </div>
        </header>

        {/* Workspace body */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>

    </div>
  );
}
