'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

interface Collection {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'hospitality' | 'astro';
  cover: string;
  images: string[];
}

interface GalleryClientProps {
  initialCollections: Collection[];
}

export default function GalleryClient({ initialCollections }: GalleryClientProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'residential' | 'commercial' | 'hospitality' | 'astro'>('all');
  const [activeCollection, setActiveCollection] = useState<Collection | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Group filter labels
  const filterTabs = [
    { value: 'all', label: 'All Projects' },
    { value: 'residential', label: 'Residences' },
    { value: 'hospitality', label: 'Hospitality & Wellness' },
    { value: 'commercial', label: 'Corporate Offices' },
    { value: 'astro', label: 'Astro Remedies' },
  ] as const;

  const filteredCollections = activeFilter === 'all'
    ? initialCollections
    : initialCollections.filter(c => c.category === activeFilter);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeCollection) return;
      if (e.key === 'Escape') handleCloseLightbox();
      if (e.key === 'ArrowRight') handleNextImage();
      if (e.key === 'ArrowLeft') handlePrevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCollection, activeImageIndex]);

  const handleOpenLightbox = (collection: Collection) => {
    setActiveCollection(collection);
    setActiveImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseLightbox = () => {
    setActiveCollection(null);
    document.body.style.overflow = '';
  };

  const handleNextImage = () => {
    if (!activeCollection) return;
    setActiveImageIndex((prev) => (prev + 1) % activeCollection.images.length);
  };

  const handlePrevImage = () => {
    if (!activeCollection) return;
    setActiveImageIndex((prev) => (prev - 1 + activeCollection.images.length) % activeCollection.images.length);
  };

  const getDisplayCategory = (cat: string) => {
    switch (cat) {
      case 'residential': return 'Residence';
      case 'hospitality': return 'Hospitality & Wellness';
      case 'commercial': return 'Corporate Office';
      case 'astro': return 'Astro Remedies';
      default: return cat;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] font-body text-[#333333] flex flex-col justify-between">
      
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/85 backdrop-blur-md border-b border-[#C8A15A]/15 z-40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/assets/logo.png" alt="AstroInterior Logo" className="w-10 h-10 object-contain rounded-full border border-[#C8A15A]/25" />
            <div className="flex flex-col">
              <span className="text-sm font-heading font-semibold tracking-[0.2em] text-[#1E1E1E]">ASTROINTERIOR</span>
              <span className="text-[9px] text-[#C8A15A] tracking-[0.1em] font-light">BY RICHA AGARWAL</span>
            </div>
          </Link>
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xs font-semibold uppercase tracking-widest text-[#1E1E1E] hover:text-[#C8A15A] transition-colors">
              ← Return Home
            </Link>
            <Link href="/admin" className="text-xs font-semibold uppercase tracking-widest text-white bg-[#1E1E1E] hover:bg-[#C8A15A] px-4 py-2 rounded-md transition-colors shadow-sm">
              Console
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="pt-32 pb-20 bg-gradient-to-b from-[#1E1E1E] to-[#2A2A2A] text-white text-center relative overflow-hidden px-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,161,90,0.1),transparent_70%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto space-y-4 relative z-10">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#C8A15A] font-semibold">Transformations Gallery</span>
          <h1 className="text-4xl md:text-5xl font-heading font-light tracking-wide text-white leading-tight">
            Our Architectural Masterpieces
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
            Merging Vedic spatial geometry & astronomical chart alignment with bespoke luxury interior styling to curate healthy, balanced, and prosperous environments.
          </p>
        </div>
      </header>

      {/* Category Filter Bar */}
      <div className="relative z-25 flex justify-center -mt-7 px-4">
        <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-white border border-[#C8A15A]/15 rounded-full shadow-lg max-w-4xl">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value)}
              className={`px-5 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
                activeFilter === tab.value
                  ? 'bg-[#1E1E1E] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-[#FAF8F4]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Collections Grid */}
      <main className="max-w-7xl mx-auto px-6 py-20 flex-grow w-full">
        {filteredCollections.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCollections.map((col) => (
              <article
                key={col.id}
                onClick={() => handleOpenLightbox(col)}
                className="group bg-white border border-[#C8A15A]/15 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-[#C8A15A]/35 transition-all duration-500 cursor-pointer flex flex-col h-full"
              >
                {/* Cover Image Wrapper */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={col.cover}
                    alt={col.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300">
                      <Eye className="w-4 h-4 text-[#1E1E1E]" />
                      <span className="text-xs font-semibold text-[#1E1E1E] uppercase tracking-wider">Explore Collection</span>
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1.5 rounded-md tracking-wider">
                    {col.images.length} IMAGES
                  </div>
                </div>

                {/* Content Card Body */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] text-[#C8A15A] uppercase tracking-widest font-semibold block">
                      {getDisplayCategory(col.category)}
                    </span>
                    <h2 className="text-lg font-heading font-medium text-[#1E1E1E] leading-snug group-hover:text-[#C8A15A] transition-colors line-clamp-2">
                      {col.title}
                    </h2>
                  </div>
                  <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs font-medium text-slate-400 group-hover:text-[#C8A15A] transition-colors">
                    <span className="uppercase tracking-widest text-[10px]">View Projects</span>
                    <span>→</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 space-y-4">
            <span className="text-4xl block">✨</span>
            <h3 className="text-lg font-medium text-[#1E1E1E]">No projects found in this section</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Please check back later or update the display status of your media assets from the admin CMS portal.
            </p>
          </div>
        )}
      </main>

      {/* Lightbox Overlay */}
      {activeCollection && (
        <div className="fixed inset-0 bg-black/95 z-50 flex flex-col justify-between animate-fade-in select-none">
          
          {/* Lightbox Header */}
          <div className="h-16 px-6 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between text-white flex-shrink-0">
            <div className="flex flex-col">
              <h3 className="text-sm font-heading font-medium tracking-wide text-[#C8A15A]">
                {activeCollection.title}
              </h3>
              <span className="text-[9px] uppercase tracking-widest text-slate-400 font-light">
                {getDisplayCategory(activeCollection.category)}
              </span>
            </div>
            <button
              onClick={handleCloseLightbox}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center outline-none"
              aria-label="Close gallery"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Lightbox Main Container */}
          <div className="flex-1 flex items-center justify-between relative px-4 md:px-12">
            
            {/* Prev Trigger */}
            <button
              onClick={handlePrevImage}
              className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-all flex items-center justify-center outline-none border border-white/5 active:scale-95"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main Image Frame */}
            <div className="flex-1 flex items-center justify-center max-h-[70vh] px-4">
              <img
                src={activeCollection.images[activeImageIndex]}
                alt={`${activeCollection.title} - ${activeImageIndex + 1}`}
                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl transition-all duration-300"
              />
            </div>

            {/* Next Trigger */}
            <button
              onClick={handleNextImage}
              className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-all flex items-center justify-center outline-none border border-white/5 active:scale-95"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Bottom Info & Thumbnails */}
          <div className="bg-gradient-to-t from-black/80 to-transparent p-6 space-y-4 flex-shrink-0 flex flex-col items-center">
            
            {/* Slide Index Status */}
            <span className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">
              Image {activeImageIndex + 1} of {activeCollection.images.length}
            </span>

            {/* Thumbnails strip */}
            {activeCollection.images.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto max-w-full py-2 px-4 scrollbar-thin scrollbar-thumb-white/20">
                {activeCollection.images.map((imgSrc, idx) => (
                  <img
                    key={idx}
                    src={imgSrc}
                    alt={`Thumbnail ${idx + 1}`}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-14 h-10 object-cover rounded-md cursor-pointer border-2 transition-all ${
                      activeImageIndex === idx ? 'border-[#C8A15A] scale-105' : 'border-transparent opacity-40 hover:opacity-80'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer Branding */}
      <footer className="bg-[#1E1E1E] text-white py-12 px-6 border-t border-[#C8A15A]/15 flex-shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <img src="/assets/logo.png" alt="AstroInterior Logo" className="w-8 h-8 opacity-65" />
            <span>© 2026 AstroInterior. All Rights Reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <span>Corporate Office: New Delhi</span>
            <span>Founder: Richa Agarwal</span>
          </div>
        </div>
      </footer>
      
    </div>
  );
}
