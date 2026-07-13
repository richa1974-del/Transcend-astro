'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function checkUser() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session && pathname !== '/admin/login') {
          router.push('/admin/login');
        } else {
          setUser(session?.user || null);
          setLoading(false);
        }
      } catch (err) {
        console.error('Session verification error:', err);
        if (pathname !== '/admin/login') {
          router.push('/admin/login');
        }
      }
    }

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setUser(session?.user || null);
      if (!session && pathname !== '/admin/login') {
        router.push('/admin/login');
      } else if (session && pathname === '/admin/login') {
        router.push('/admin');
      }
    });

    return () => subscription.unsubscribe();
  }, [pathname, router]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/admin/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Skip rendering the frame if we are on the login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="flex h-screen bg-slate-900 items-center justify-center text-slate-400 text-sm font-medium">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-c-accent border-t-transparent rounded-full animate-spin"></div>
          <span>Verifying secure workspace session...</span>
        </div>
      </div>
    );
  }

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
            <Link href="/admin" className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${pathname === '/admin' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-700 hover:bg-slate-50'}`}>
              <span>📊</span> Dashboard
            </Link>
            <Link href="/admin/crm" className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${pathname === '/admin/crm' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-700 hover:bg-slate-50'}`}>
              <span>📋</span> CRM Leads
            </Link>
            <Link href="/admin/gallery" className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${pathname === '/admin/gallery' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-700 hover:bg-slate-50'}`}>
              <span>🖼️</span> Gallery CMS
            </Link>
            <Link href="/admin/testimonials" className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${pathname === '/admin/testimonials' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-700 hover:bg-slate-50'}`}>
              <span>★</span> Testimonials
            </Link>
            <Link href="/admin/settings" className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${pathname === '/admin/settings' ? 'bg-slate-100 text-slate-900 font-semibold' : 'text-slate-700 hover:bg-slate-50'}`}>
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
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold border text-slate-600 uppercase" title={user?.email || 'Admin'}>
              {user?.email?.[0] || 'A'}
            </div>
            <button 
              onClick={handleLogout}
              className="text-xs font-semibold px-3 py-1.5 border border-slate-200 text-slate-500 hover:text-red-600 hover:border-red-100 hover:bg-red-55 rounded-lg transition-all"
            >
              Logout
            </button>
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
