'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Phone, MessageSquare, FileText, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ExpandableFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Auto-hide during scroll down, show on scroll up
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 200 && currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const actions = [
    {
      icon: <Calendar className="w-5 h-5" />,
      label: 'Book Consultation',
      href: '#contact',
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      label: 'WhatsApp',
      href: 'https://wa.me/917838048195?text=Hello%20AstroInterior%2C%20I%20would%20like%20to%20book%20an%20Astro%20Interior%20Consultation.',
      color: '#25D366',
      target: '_blank'
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: 'Call Now',
      href: 'tel:+917838048195',
    },
    {
      icon: <FileText className="w-5 h-5" />,
      label: 'Sample Report',
      href: '/assets/Transcend_Astro_Sample_Report.pdf',
      download: 'AstroInterior Sample Report.pdf'
    }
  ];

  if (!isVisible && !isOpen) return null;

  return (
    <div className="fixed bottom-24 right-5 z-[9990] flex flex-col items-center gap-3 md:hidden">
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col gap-2.5 items-end mb-1">
            {actions.map((act, idx) => (
              <motion.a
                key={idx}
                href={act.href}
                target={act.target}
                download={act.download}
                initial={{ opacity: 0, y: 15, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.9 }}
                transition={{ duration: 0.2, delay: idx * 0.04 }}
                className="flex items-center gap-3 justify-end text-decoration-none group"
                onClick={() => setIsOpen(false)}
              >
                <span className="bg-white border border-c-accent-border px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm text-c-text-primary">
                  {act.label}
                </span>
                <div 
                  className="w-12 h-12 rounded-full bg-white border border-c-accent-border flex items-center justify-center shadow-md text-c-text-primary"
                  style={{ color: act.color || 'var(--c-text-primary)' }}
                >
                  {act.icon}
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Quick Actions"
        className="w-14 h-14 rounded-full bg-c-accent text-white flex items-center justify-center shadow-lg shadow-c-accent/30 focus:outline-none z-10"
      >
        <motion.div
          animate={{ rotate: isOpen ? 135 : 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <Plus className="w-6 h-6" />
        </motion.div>
      </button>
    </div>
  );
}
