'use client';

import React, { useState } from 'react';
import { Save, RefreshCw, Globe, Shield, Sparkles } from 'lucide-react';

export default function AdminSettings() {
  const [headline, setHeadline] = useState('Beautiful Spaces. Better Energy. Better Living.');
  const [subheadline, setSubheadline] = useState('Bridging the gap between luxury spatial planning and celestial alignment. We design bespoke residential and commercial spaces tailored to your birth chart.');
  const [metaTitle, setMetaTitle] = useState("AstroInterior — India's Premier Astro-Interior Consultancy");
  const [metaDesc, setMetaDesc] = useState("Vedic Vastu & Architectural Astrology gridding for luxury homes and workspaces by Richa Agarwal.");
  const [robots, setRobots] = useState('index, follow');

  const handleSave = () => {
    alert('Block layout settings and global SEO tags saved successfully!');
  };

  const handleRevalidate = () => {
    alert('Vercel Incremental Static Regeneration (ISR) revalidation triggered for target path: "/"');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Overview header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 font-heading">Settings & SEO Control</h2>
        <p className="text-sm text-slate-500">Configure global block layout schemas, titles, descriptions, and cache headers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Editor panel */}
        <div className="bg-white border rounded-xl p-6 shadow-sm col-span-2 space-y-6 text-xs">
          
          <div className="flex items-center gap-2 border-b pb-3 text-sm font-semibold text-slate-900">
            <Globe className="w-5 h-5 text-c-accent" />
            <span>Homepage Hero Settings</span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-slate-400 font-semibold uppercase mb-1">Headline</label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full p-2.5 border rounded-lg outline-none focus:border-c-accent text-slate-900 bg-slate-50"
              />
            </div>
            
            <div>
              <label className="block text-slate-400 font-semibold uppercase mb-1">Subheadline</label>
              <textarea
                value={subheadline}
                rows={3}
                onChange={(e) => setSubheadline(e.target.value)}
                className="w-full p-2.5 border rounded-lg outline-none focus:border-c-accent text-slate-900 bg-slate-50 resize-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 border-b pb-3 pt-4 text-sm font-semibold text-slate-900">
            <Sparkles className="w-5 h-5 text-c-accent" />
            <span>Global SEO Configs</span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-slate-400 font-semibold uppercase mb-1">Meta Title</label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="w-full p-2.5 border rounded-lg outline-none focus:border-c-accent text-slate-900 bg-slate-50"
              />
            </div>
            
            <div>
              <label className="block text-slate-400 font-semibold uppercase mb-1">Meta Description</label>
              <textarea
                value={metaDesc}
                rows={3}
                onChange={(e) => setMetaDesc(e.target.value)}
                className="w-full p-2.5 border rounded-lg outline-none focus:border-c-accent text-slate-900 bg-slate-50 resize-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold uppercase mb-1">Robots Directive</label>
              <input
                type="text"
                value={robots}
                onChange={(e) => setRobots(e.target.value)}
                className="w-full p-2.5 border rounded-lg outline-none focus:border-c-accent text-slate-900 bg-slate-50"
              />
            </div>
          </div>

          <div className="pt-4 border-t flex justify-end">
            <button
              onClick={handleSave}
              className="px-6 py-2.5 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-850 flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" /> Save Configuration
            </button>
          </div>

        </div>

        {/* Sidebar panels */}
        <div className="space-y-6">
          
          {/* Cache panel */}
          <div className="bg-white border rounded-xl p-6 shadow-sm space-y-4 text-xs">
            <div className="flex items-center gap-2 border-b pb-3 text-sm font-semibold text-slate-900">
              <Shield className="w-5 h-5 text-c-accent" />
              <span>Edge Cache Controls</span>
            </div>
            <p className="text-slate-500 leading-relaxed">
              Updates to hero blocks and SEO tags are cached globally. Click below to invalidate the static cache on Vercel instantly.
            </p>
            <button
              onClick={handleRevalidate}
              className="w-full py-2.5 bg-slate-50 border text-slate-700 rounded-lg font-semibold hover:bg-slate-100 flex items-center justify-center gap-1.5"
            >
              <RefreshCw className="w-4 h-4" /> Revalidate Site Cache
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
