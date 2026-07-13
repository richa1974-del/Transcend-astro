import React from 'react';
import { createServerClient } from '@/lib/supabase/server';
import dynamic from 'next/dynamic';

// Dynamic client components for animations / FAB / Sheets
const MobileFAB = dynamic(() => import('@/components/marketing/ExpandableFAB'), { ssr: false });
const BottomSheet = dynamic(() => import('@/components/marketing/BottomSheet'), { ssr: false });

interface StaticData {
  zodiac: Array<{ id: string; name: string; desc: string }>;
  colours: Array<{ id: string; name: string; element: string; planet: string; impact: string }>;
}

export default async function HomePage() {
  const supabase = createServerClient();

  // Asynchronous fetches directly from Supabase
  let testimonials = [];
  let galleryItems = [];
  try {
    const { data: dbTestimonials } = await supabase
      .from('testimonials')
      .select('*')
      .eq('status', 'approved')
      .limit(6);
    testimonials = dbTestimonials || [];

    const { data: dbGallery } = await supabase
      .from('gallery_items')
      .select('*')
      .eq('status', 'published')
      .order('sort_order', { ascending: true })
      .limit(8);
    galleryItems = dbGallery || [];
  } catch (error) {
    console.error('Failed to connect to Supabase database. Falling back to local data.', error);
  }

  // Fallback static testimonials if db is empty
  const fallbackTestimonials = [
    {
      id: 1,
      client_name: "Amit & Priya Sharma",
      text_content: "Calibrating our Gurgaon penthouse's South-West quadrant with Earth-element styling immediately stabilized our family dynamics. Richa's eye for Vedic balance is unparalleled.",
      rating: 5
    },
    {
      id: 2,
      client_name: "Vikram Malhotra",
      text_content: "We redesigned our commercial boardroom desk alignment under Richa's cosmic blueprints. The project flow and client closing ratios have improved significantly.",
      rating: 5
    }
  ];

  const displayTestimonials = testimonials.length > 0 ? testimonials : fallbackTestimonials;

  return (
    <div className="relative min-h-screen bg-c-bg-primary overflow-x-hidden font-body">
      
      {/* 1. Header Navigation */}
      <header id="main-header" className="sticky top-0 z-50 w-full bg-c-bg-primary/80 backdrop-blur-md border-b border-c-accent-border">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/assets/logo.png" alt="AstroInterior Logo" className="w-10 h-10 object-contain" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-widest text-c-text-primary uppercase font-heading">ASTROINTERIOR</span>
              <span className="text-[10px] text-c-accent tracking-wider font-light">Spatial Advisory</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-c-text-secondary">
            <a href="#about" className="hover:text-c-accent transition-colors">About</a>
            <a href="#services" className="hover:text-c-accent transition-colors">Services</a>
            <a href="#portfolio" className="hover:text-c-accent transition-colors">Portfolio</a>
            <a href="#packages" className="hover:text-c-accent transition-colors">Packages</a>
            <a href="#faq" className="hover:text-c-accent transition-colors">FAQs</a>
          </nav>
          
          <div className="flex items-center gap-4">
            <a href="#contact" className="btn-gold hidden sm:flex items-center justify-center px-5 py-2.5 bg-c-accent text-white rounded-lg text-sm font-medium hover:bg-c-accent/90 transition-all">Book Consultation</a>
          </div>
        </div>
      </header>

      {/* 2. Hero Viewport Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center py-20 px-6 text-center bg-cover bg-center" style={{ backgroundImage: "linear-gradient(rgba(18, 19, 22, 0.4), rgba(18, 19, 22, 0.4)), url('/assets/hero_bg.jpg')" }}>
        <div className="absolute inset-0 bg-black/30 z-0"></div>
        <div className="max-w-4xl mx-auto z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-c-accent animate-pulse"></span>
            <span className="text-xs uppercase tracking-widest text-white/90 font-medium">India's Premier Astro-Interior Consultancy</span>
          </div>
          
          <h1 className="text-4xl md:text-7xl text-white font-heading font-light tracking-wide mb-6 leading-tight">
            Beautiful Spaces.<br />Better Energy. Better Living.
          </h1>
          
          <p className="text-base md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Bridging the gap between luxury spatial planning and celestial alignment. We design bespoke residential and commercial spaces tailored to your birth chart.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a href="#contact" className="px-8 py-4 bg-c-accent text-white font-medium rounded-lg hover:bg-c-accent/90 transition-all shadow-lg shadow-c-accent/20">Book Spatial Calibration</a>
            <a href="#portfolio" className="px-8 py-4 bg-white/10 text-white font-medium rounded-lg hover:bg-white/25 transition-all border border-white/30 backdrop-blur-md">Explore Portfolio</a>
          </div>
        </div>
      </section>

      {/* 3. Discover Section (Why Different) */}
      <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-c-accent font-semibold block mb-2">The Concept</span>
          <h2 className="text-3xl md:text-5xl font-heading text-c-text-primary mb-4 font-light">Why Choose Astro-Interior?</h2>
          <p className="text-c-text-secondary leading-relaxed">Unlike traditional Vastu which prescribes static rules, our process maps room quadrants to the specific planetary configurations in your horoscope.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-c-accent-border rounded-2xl p-8 hover:shadow-card-shadow transition-all">
            <span className="text-3xl block mb-6">❂</span>
            <h3 className="text-xl font-heading font-semibold text-c-text-primary mb-3">Vedic Calibration</h3>
            <p className="text-c-text-secondary text-sm leading-relaxed">We map your birth chart coordinates to identify spatial obstacles and position structural layouts accordingly.</p>
          </div>
          <div className="bg-white border border-c-accent-border rounded-2xl p-8 hover:shadow-card-shadow transition-all">
            <span className="text-3xl block mb-6">✦</span>
            <h3 className="text-xl font-heading font-semibold text-c-text-primary mb-3">Element Alignments</h3>
            <p className="text-c-text-secondary text-sm leading-relaxed">Introduce element remedies (Fire, Earth, Water, Air, Space) into key colors and textures to target stability or wealth.</p>
          </div>
          <div className="bg-white border border-c-accent-border rounded-2xl p-8 hover:shadow-card-shadow transition-all">
            <span className="text-3xl block mb-6">✧</span>
            <h3 className="text-xl font-heading font-semibold text-c-text-primary mb-3">Luxury Design</h3>
            <p className="text-c-text-secondary text-sm leading-relaxed">Aesthetically elite interiors. We deliver modern, premium spaces where Vastu corrections are completely hidden behind elegant designs.</p>
          </div>
        </div>
      </section>

      {/* 4. Testimonials (Dynamic Carousel) */}
      <section className="py-24 bg-c-bg-secondary px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-c-accent font-semibold block mb-2">Testimonials</span>
            <h2 className="text-3xl md:text-5xl font-heading text-c-text-primary mb-4 font-light">Client Success Stories</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {displayTestimonials.map((t: any) => (
              <div key={t.id} className="bg-white border border-c-accent-border rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-1 text-yellow-500 mb-4 text-sm">
                  {Array.from({ length: t.rating || 5 }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-c-text-secondary italic leading-relaxed text-sm mb-6">"{t.text_content}"</p>
                <div className="font-medium text-c-text-primary text-sm">— {t.client_name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Contact Section */}
      <section id="contact" className="py-24 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-heading text-c-text-primary mb-4 font-light">Schedule Spatial Calibrations</h2>
          <p className="text-c-text-secondary">Provide your coordinates to initialize a natal spatial design audit.</p>
        </div>

        <form action="/api/leads" method="POST" className="bg-white border border-c-accent-border rounded-2xl p-8 md:p-12 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-c-text-secondary uppercase mb-2">Your Name</label>
              <input type="text" name="name" required className="w-full px-4 py-3 border border-c-accent-border rounded-lg text-sm bg-c-bg-primary outline-none focus:border-c-accent" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-c-text-secondary uppercase mb-2">Email Address</label>
              <input type="email" name="email" required className="w-full px-4 py-3 border border-c-accent-border rounded-lg text-sm bg-c-bg-primary outline-none focus:border-c-accent" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-c-text-secondary uppercase mb-2">Phone Number</label>
              <input type="tel" name="phone" className="w-full px-4 py-3 border border-c-accent-border rounded-lg text-sm bg-c-bg-primary outline-none focus:border-c-accent" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-c-text-secondary uppercase mb-2">Property City</label>
              <input type="text" name="city" className="w-full px-4 py-3 border border-c-accent-border rounded-lg text-sm bg-c-bg-primary outline-none focus:border-c-accent" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-c-text-secondary uppercase mb-2">Birth Coordinates (Date, Time, Place of Birth)</label>
            <input type="text" name="birth_coordinates" placeholder="e.g. 15 Oct 1990, 08:30 AM, New Delhi" className="w-full px-4 py-3 border border-c-accent-border rounded-lg text-sm bg-c-bg-primary outline-none focus:border-c-accent" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-c-text-secondary uppercase mb-2">Special Layout Concerns / Message</label>
            <textarea name="message" rows={4} className="w-full px-4 py-3 border border-c-accent-border rounded-lg text-sm bg-c-bg-primary outline-none focus:border-c-accent resize-none"></textarea>
          </div>

          <button type="submit" className="w-full py-4 bg-c-accent text-white font-medium rounded-lg hover:bg-c-accent/90 transition-all text-sm uppercase tracking-widest shadow-md">
            Initialize Audit Process
          </button>
        </form>
      </section>

      {/* 6. Mobile Widgets (FAB, Nav) */}
      <MobileFAB />
      <BottomSheet />
    </div>
  );
}
