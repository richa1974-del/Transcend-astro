'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BottomSheet() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('Service Details');
  const [bodyHtml, setBodyHtml] = useState('');

  useEffect(() => {
    // Expose helpers globally to keep compatibility with legacy subpages and dynamic HTML blocks
    (window as any).openBottomSheet = (sheetId: string) => {
      // In the new system we handle content directly
      if (sheetId === 'founder-bottom-sheet') {
        setTitle('Meet the Founder');
        setBodyHtml(`
          <div style="text-align: center; margin-bottom: 1.5rem;">
            <img src="/assets/founder_richa.png" alt="Richa Agarwal" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 3px solid var(--c-accent-border); margin: 0 auto;">
          </div>
          <h4 style="font-family: var(--font-heading); font-size: 1.3rem; text-align: center; margin-bottom: 0.25rem; font-weight: 500;">Richa Agarwal</h4>
          <p style="text-align: center; font-size: 0.82rem; color: var(--c-accent); margin-bottom: 1.5rem;">Pioneer of Astro-Interior Advisory</p>
          <p style="font-size: 0.9rem; line-height: 1.7; color: var(--c-text-secondary); margin-bottom: 1rem;">With over 24 years of experience delivering award-winning interiors, Richa founded AstroInterior to bridge architectural layout and cosmic energy.</p>
          <p style="font-size: 0.9rem; line-height: 1.7; color: var(--c-text-secondary); margin-bottom: 1.5rem;">By integrating modern architecture, environmental psychology, and Vedic astrological calculations, she provides a sophisticated design approach that supports your life trajectory.</p>
          <div style="display: flex; gap: 1.5rem; justify-content: center; margin-bottom: 1.5rem;">
            <div style="text-align: center;"><strong style="font-size: 1.2rem; color: var(--c-text-primary);">24+</strong><br><span style="font-size: 0.78rem; color: var(--c-text-secondary);">Years</span></div>
            <div style="text-align: center;"><strong style="font-size: 1.2rem; color: var(--c-text-primary);">500+</strong><br><span style="font-size: 0.78rem; color: var(--c-text-secondary);">Spaces Aligned</span></div>
          </div>
          <a href="#contact" class="btn-gold" style="width: 100%; text-align: center; display: block; padding: 0.9rem; font-size: 0.88rem; border-radius: 8px;" onclick="window.closeBottomSheet()">Book Consultation</a>
        `);
      }
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
    };

    (window as any).closeBottomSheet = () => {
      setIsOpen(false);
      document.body.style.overflow = '';
    };

    return () => {
      delete (window as any).openBottomSheet;
      delete (window as any).closeBottomSheet;
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Frosted Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998] md:hidden"
          />

          {/* Slide-up sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed bottom-0 left-0 right-0 max-h-[85vh] bg-c-bg-primary rounded-t-2xl z-[9999] shadow-2xl flex flex-col overflow-hidden border-t border-c-accent-border md:hidden"
          >
            {/* Drag Handle */}
            <div className="flex justify-center py-3 flex-shrink-0 cursor-pointer" onClick={handleClose}>
              <div className="w-10 h-1 bg-c-accent-border rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 pb-4 border-b border-c-accent-border flex-shrink-0">
              <h3 className="font-heading font-medium text-lg text-c-text-primary">{title}</h3>
              <button 
                onClick={handleClose}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-c-bg-secondary text-c-text-secondary"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 text-sm text-c-text-secondary leading-relaxed">
              <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
