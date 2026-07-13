'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { ShieldAlert, ArrowRight } from 'lucide-react';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
      } else if (data.session) {
        router.push('/admin');
      }
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred during sign-in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F1117] px-4 font-body select-none">
      <div className="relative w-full max-w-[420px] bg-[#1A1D27] border border-[#2A2D37] rounded-2xl p-10 shadow-2xl space-y-8 overflow-hidden">
        
        {/* Gold Highlight Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C8A15A] via-[#dfb975] to-[#C8A15A]" />
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <img src="/assets/logo.png" alt="AstroInterior Logo" className="w-14 h-14 object-contain rounded-full border-2 border-[#C8A15A]/25" />
          </div>
          <div>
            <h1 className="text-xl font-heading font-light tracking-[0.2em] text-[#C8A15A] uppercase">TRANSCEND</h1>
            <p className="text-[10px] text-slate-400 tracking-[0.15em] uppercase font-light mt-0.5">Admin Business System</p>
          </div>
        </div>

        {/* Error Callout */}
        {error && (
          <div className="flex items-start gap-2.5 p-3.5 bg-red-950/20 border border-red-900/35 rounded-lg text-red-400 text-[11px] leading-relaxed">
            <ShieldAlert className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
              Security Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@astrointerior.in"
              className="w-full px-4 py-3 bg-[#0F1117] border border-[#2A2D37] rounded-lg text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-[#C8A15A] focus:ring-1 focus:ring-[#C8A15A]/25 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
              Passphrase
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-[#0F1117] border border-[#2A2D37] rounded-lg text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-[#C8A15A] focus:ring-1 focus:ring-[#C8A15A]/25 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#C8A15A] text-white font-medium rounded-lg hover:bg-[#dfb975] focus:outline-none transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest shadow-lg shadow-[#C8A15A]/15 active:translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Help Info Footer */}
        <div className="text-center pt-2">
          <p className="text-[10px] text-slate-500 leading-relaxed font-light">
            Authorized administrative access credentials required.<br />
            Register new users in your Supabase Auth Console.
          </p>
        </div>
        
      </div>
    </div>
  );
}
