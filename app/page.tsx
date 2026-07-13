'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Script from 'next/script';

export default function HomePage() {
  useEffect(() => {
    // Clear any persistent overflow locks from lightboxes or modals
    document.body.style.overflow = '';
  }, []);

  return (
    <>
      

  {/* Scroll Progress Bar */}
  <div className="scroll-progress-bar" id="scroll-progress-bar" aria-hidden="true"></div>

  {/* Premium Luxury Pre-loader */}
  <div className="luxury-preloader" id="preloader">
    <div className="preloader-content">
      <div className="preloader-monogram">✦</div>
      <div className="preloader-title">ASTROINTERIOR</div>
      <div className="preloader-subtitle">Spatial Alignment Advisory</div>
      <div className="preloader-bar">
        <div className="preloader-progress" id="preloader-progress"></div>
      </div>
    </div>
  </div>

  {/* Header & Navigation */}
  <header id="main-header" role="banner">
    <div className="nav-container">
      <a href="#hero" className="logo-wrap" id="brand-logo" aria-label="AstroInterior — India's Premier Astro Interior Design Consultancy">
        <img src="assets/logo.png" alt="AstroInterior Logo — Astro Interior Design Consultancy" className="logo-img" width="40" height="40" />
        <div className="logo-text-group">
          <span className="logo-title" style={{ letterSpacing: '0.15em' }}>ASTROINTERIOR</span>
          <span className="logo-sub">Spatial Advisory</span>
        </div>
      </a>
      
      {/* Hamburger Menu for Mobile */}
      <button className="mobile-menu-toggle" id="menu-toggle" aria-expanded="false" aria-label="Toggle navigation menu">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      <nav id="navbar-links" role="navigation" aria-label="Main navigation">
        <ul>
          <li><a href="#hero" className="nav-link active-link" id="nav-item-home">Home</a></li>
          <li><a href="#about" className="nav-link" id="nav-item-about">About</a></li>
          <li><a href="#services" className="nav-link" id="nav-item-services">Services</a></li>
          <li><a href="#portfolio" className="nav-link" id="nav-item-portfolio">Portfolio</a></li>
          <li><a href="#packages" className="nav-link" id="nav-item-packages">Packages</a></li>
          <li><a href="#contact" className="nav-link" id="nav-item-contact">Contact</a></li>
        </ul>
        <a href="#contact" className="nav-overlay-cta" id="nav-overlay-cta">Book Consultation →</a>
      </nav>

      <div className="nav-actions">
        <a href="#contact" className="btn-gold" id="header-cta">Book Consultation</a>
      </div>
    </div>
  </header>

  {/* Main Website Content */}
  <main role="main">

    {/* 1. MAIN HOMEPAGE VIEW */}
    <div id="page-home" className="page-view active-route fade-in-route">
      
      {/* Homepage Hero Section */}
      <section id="hero" className="hero-wrapper">
        {/* Ken Burns Slideshow Background */}
        <div className="hero-slideshow-container">
          <div className="hero-slide hero-slide-active" style={{ backgroundImage: 'url("assets/hero_slide_1.jpg")' }} role="img" aria-label="Luxury astro-aligned living room interior designed by AstroInterior"></div>
          <div className="hero-slide" style={{ backgroundImage: 'url("assets/hero_slide_2.jpg")' }}></div>
          <div className="hero-slide" style={{ backgroundImage: 'url("assets/hero_slide_3.jpg")' }}></div>
          <div className="hero-slide" style={{ backgroundImage: 'url("assets/hero_slide_4.jpg")' }}></div>
          <div className="hero-slide" style={{ backgroundImage: 'url("assets/hero_slide_5.jpg")' }}></div>
          <div className="hero-bg-overlay"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-badge hero-anim">
            <span className="hero-badge-dot"></span>
            <span className="hero-badge-text">India's Premier Astro-Interior Consultancy</span>
          </div>
          <h1 className="hero-title hero-anim">
            Beautiful Spaces.<br />Better Energy. Better Living.
          </h1>
          <p className="hero-subheadline hero-anim">
            Bridging the gap between luxury spatial planning and celestial alignment. We design bespoke residential and commercial interiors guided by 24+ years of professional design expertise and personalized astrological intelligence.
          </p>
          
          <div className="hero-ctas hero-anim">
            <a href="#contact" className="btn-gold btn-gold-hero" id="hero-assess-btn">
              <span className="btn-shine"></span>
              Book Consultation
            </a>
            <a href="#sample-report" className="btn-outline btn-outline-hero" id="hero-book-btn">View Sample Report</a>
          </div>

          {/* Scroll Indicator (mobile only) */}
          <div className="hero-scroll-indicator">
            <span>Scroll</span>
            <svg className="scroll-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
        </div>
      </section>

      {/* Trust Section (hidden on mobile — stats absorbed into hero badge) */}
      <section id="trust-section" className="trust-section mobile-hidden">
        <div className="trust-container">
          <div className="trust-stat-card">
            <h3 className="stat-number" data-target="24">0</h3>
            <p className="stat-label">Years of Practice</p>
            <span className="stat-sub">Delivering award-winning residential and commercial interior architecture.</span>
          </div>
          <div className="trust-stat-divider"></div>
          <div className="trust-stat-card">
            <h3 className="stat-number" data-target="500">0</h3>
            <p className="stat-label">Luxury Spaces</p>
            <span className="stat-sub">Designing premium villas, corporate boardrooms, and hospitality destinations.</span>
          </div>
          <div className="trust-stat-divider"></div>
          <div className="trust-stat-card">
            <h3 className="stat-title-icon">✦</h3>
            <p className="stat-label">Personalized Reports</p>
            <span className="stat-sub">Detailed room-by-room blueprints calculated to your precise birth chart.</span>
          </div>
          <div className="trust-stat-divider"></div>
          <div className="trust-stat-card">
            <h3 className="stat-title-icon">⚙</h3>
            <p className="stat-label">Consultative Approach</p>
            <span className="stat-sub">Scientific, non-destructive spatial remedies integrated seamlessly into upscale styling.</span>
          </div>
        </div>
      </section>

      {/* Why Astro-Interiors Section */}
      <section id="discover" className="discover-section scroll-reveal">
        {/* Desktop layout (hidden on mobile via CSS) */}
        <div className="discover-container">
          <div className="discover-content">
            <span className="section-subtitle">The Missing Element in Spatial Wellness</span>
            <h2 className="discover-title" style={{ fontSize: '2.2rem', lineHeight: '1.3', marginBottom: '2rem' }}>Why Beautiful Interiors Are Not Always Aligned Interiors.</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <div>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--c-accent)', marginBottom: '0.4rem' }}>The Restless Sanctuary</h4>
                <p className="discover-desc" style={{ margin: '0', fontSize: '0.92rem', lineHeight: '1.6' }}>Why do some professionally designed master suites, styled with the finest materials, still foster restlessness, sleep disruption, or domestic friction?</p>
              </div>
              
              <div>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--c-accent)', marginBottom: '0.4rem' }}>The Stagnant Workspace</h4>
                <p className="discover-desc" style={{ margin: '0', fontSize: '0.92rem', lineHeight: '1.6' }}>Why do corporate offices with premium layouts, cutting-edge ergonomics, and optimal lighting still suffer from high turnover, low productivity, or blocked revenue streams?</p>
              </div>

              <div>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--c-accent)', marginBottom: '0.4rem' }}>The Limitation of Static Rules</h4>
                <p className="discover-desc" style={{ margin: '0', fontSize: '0.92rem', lineHeight: '1.6' }}>Traditional interior design focuses strictly on visual aesthetics and generic workflows. Standard Vastu guidelines apply a flat, one-size-fits-all formula to every structure, ignoring the individual energies of the inhabitants.</p>
              </div>

              <div>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', color: 'var(--c-accent)', marginBottom: '0.4rem' }}>The Aligned Solution</h4>
                <p className="discover-desc" style={{ margin: '0', fontSize: '0.92rem', lineHeight: '1.6' }}>Astro-Interior Design treats your space as a dynamic, living extension of your personal birth chart. By analyzing the astrological coordinates of the primary occupants, we calibrate materials, color spectrums, directional axes, and elemental placements to sync your physical environment with your cosmic blueprint.</p>
              </div>
            </div>
            
            <div className="discover-cta-wrap">
              <a href="#contact" className="btn-gold">Align Your Space</a>
            </div>
          </div>
          <div className="discover-visual">
            <div className="discover-img-container">
              <img src="assets/hero_luxury.png" alt="Luxurious astrologically aligned Vastu lounge" className="discover-img" />
              <div className="discover-img-overlay"></div>
            </div>
          </div>
        </div>

        {/* Mobile-only: Why Different Swipe Cards */}
        <div className="mobile-why-section">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '1.5rem', padding: '0 1.5rem' }}>
            <span className="section-subtitle">Why Astro Interior</span>
            <h2 className="section-title">Design That Aligns With You</h2>
          </div>
          <div className="mobile-swipe-rail" id="why-swipe-rail">
            <div className="why-card">
              <div className="why-card-icon">🏠</div>
              <h4>Beyond Beautiful</h4>
              <p>Luxury interiors can still cause restless sleep, stalled careers, or domestic friction. We fix the invisible layer — your space's energy alignment.</p>
              <a href="#contact" className="why-card-cta">Learn more →</a>
            </div>
            <div className="why-card">
              <div className="why-card-icon">✦</div>
              <h4>Birth Chart Intelligence</h4>
              <p>Unlike generic Vastu, we overlay your personal natal chart onto your floorplan. Every color, material, and furniture position is calibrated to your cosmic blueprint.</p>
              <a href="#contact" className="why-card-cta">Learn more →</a>
            </div>
            <div className="why-card">
              <div className="why-card-icon">⚡</div>
              <h4>Non-Destructive Remedies</h4>
              <p>No demolition. No construction. We transform your space through strategic color shifts, furniture repositioning, and material upgrades that integrate seamlessly.</p>
              <a href="#contact" className="why-card-cta">Learn more →</a>
            </div>
          </div>
          <div className="swipe-dots" id="why-swipe-dots">
            <button className="swipe-dot active" aria-label="Card 1"></button>
            <button className="swipe-dot" aria-label="Card 2"></button>
            <button className="swipe-dot" aria-label="Card 3"></button>
          </div>
        </div>
      </section>

      {/* Interactive Calibration Studio (hidden on mobile) */}
      <section id="calibration-studio" className="calibration-studio-section mobile-hidden" style={{ padding: '8rem 2rem', backgroundColor: 'var(--c-bg-secondary)', borderTop: '1px solid var(--c-accent-border)', borderBottom: '1px solid var(--c-accent-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="section-icon-wrap" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" stroke-width="1">
                <circle cx="12" cy="12" r="10" stroke-dasharray="1 3"/>
                <path d="M12 2v20M2 12h20"/>
                <circle cx="12" cy="12" r="4" fill="var(--c-accent)"/>
              </svg>
            </div>
            <span className="section-subtitle" style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--c-accent)', fontWeight: '600', letterSpacing: '0.15em', marginBottom: '1rem' }}>Interactive Studio</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.6rem', color: 'var(--c-text-primary)', marginBottom: '1rem' }}>Astro-Spatial Calibration Studio</h2>
            <p style={{ color: 'var(--c-text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '0.95rem', lineHeight: '1.6' }}>Test the alignment frequencies of your home. Select your zodiac sign or explore astrological color spectrums.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start' }}>
            
            {/* Left: Zodiac Room Selector */}
            <div style={{ background: '#FFF', border: '1px solid var(--c-accent-border)', borderRadius: '16px', padding: '2.5rem', boxShadow: 'var(--card-shadow)' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', marginBottom: '1.5rem', color: 'var(--c-text-primary)' }}>1. Zodiac Spatial Calculator</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--c-text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6' }}>Select your sun sign to discover your primary elemental node and recommended spatial configurations.</p>
              
              <div style={{ marginBottom: '2rem' }}>
                <label htmlFor="zodiac-select" style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--c-text-secondary)', marginBottom: '0.5rem', fontWeight: '600' }}>Your Zodiac Sign</label>
                <select id="zodiac-select" style={{ width: '100%', padding: '0.8rem 1rem', border: '1px solid var(--c-accent-border)', borderRadius: '8px', fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--c-text-primary)', backgroundColor: 'var(--c-bg-primary)', outline: 'none' }}>
                  <option value="" disabled selected>Choose your sign...</option>
                  <option value="aries">Aries (Mesha)</option>
                  <option value="taurus">Taurus (Vrishabha)</option>
                  <option value="gemini">Gemini (Mithuna)</option>
                  <option value="cancer">Cancer (Karka)</option>
                  <option value="leo">Leo (Simha)</option>
                  <option value="virgo">Virgo (Kanya)</option>
                  <option value="libra">Libra (Tula)</option>
                  <option value="scorpio">Scorpio (Vrishchika)</option>
                  <option value="sagittarius">Sagittarius (Dhanu)</option>
                  <option value="capricorn">Capricorn (Makara)</option>
                  <option value="aquarius">Aquarius (Kumbha)</option>
                  <option value="pisces">Pisces (Meena)</option>
                </select>
              </div>

              {/* Result Card (Initially Hidden) */}
              <div id="zodiac-result" style={{ display: 'none', paddingTop: '1.5rem', borderTop: '1px solid var(--c-accent-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span id="zodiac-res-name" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--c-text-primary)', fontWeight: '600' }}>Aries</span>
                  <span id="zodiac-res-elem" style={{ fontSize: '0.7rem', textTransform: 'uppercase', padding: '0.3rem 0.8rem', borderRadius: '20px', fontWeight: '600', letterSpacing: '0.05em', backgroundColor: 'var(--c-bg-premium)', color: 'var(--c-accent)' }}>Fire Element</span>
                </div>
                <p id="zodiac-res-desc" style={{ fontSize: '0.88rem', lineHeight: '1.6', color: 'var(--c-text-secondary)', marginBottom: '1.2rem' }}>Bold, active, and pioneering. Requires spatial active coordinates to channel leadership energy.</p>
                <div style={{ fontSize: '0.85rem', color: 'var(--c-text-primary)', marginBottom: '1.5rem', lineHeight: '1.8' }}>
                  <div><strong>Ruling Planet:</strong> <span id="zodiac-res-planet">Mars</span></div>
                  <div><strong>Best Room Focus:</strong> <span id="zodiac-res-room">Living Room or Home Office</span></div>
                </div>
                <a id="zodiac-res-link" href="#" className="btn-gold" style={{ width: '100%', textAlign: 'center', display: 'block', fontSize: '0.85rem', padding: '0.8rem' }}>Explore Full Aries Blueprint</a>
              </div>
            </div>

            {/* Right: Color Recommendation Tool */}
            <div style={{ background: '#FFF', border: '1px solid var(--c-accent-border)', borderRadius: '16px', padding: '2.5rem', boxShadow: 'var(--card-shadow)' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', marginBottom: '1.5rem', color: 'var(--c-text-primary)' }}>2. Color Spectrum Diagnostic</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--c-text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6' }}>Explore how luxury color spectrums emit custom electromagnetic resonances matching specific planetary forces.</p>
              
              <div style={{ marginBottom: '2rem' }}>
                <span style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--c-text-secondary)', marginBottom: '0.8rem', fontWeight: '600' }}>Choose a Luxury Hue</span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.8rem' }}>
                  <button className="color-swatch-btn" data-color="blue" style={{ width: '100%', aspectRatio: '1', borderRadius: '50%', border: '2px solid transparent', cursor: 'pointer', outline: 'none', backgroundColor: '#3b5998' }} aria-label="Blue Palette"></button>
                  <button className="color-swatch-btn" data-color="white" style={{ width: '100%', aspectRatio: '1', borderRadius: '50%', border: '2px solid #E8E3DB', cursor: 'pointer', outline: 'none', backgroundColor: '#FAF8F4' }} aria-label="White Palette"></button>
                  <button className="color-swatch-btn" data-color="green" style={{ width: '100%', aspectRatio: '1', borderRadius: '50%', border: '2px solid transparent', cursor: 'pointer', outline: 'none', backgroundColor: '#507040' }} aria-label="Green Palette"></button>
                  <button className="color-swatch-btn" data-color="yellow" style={{ width: '100%', aspectRatio: '1', borderRadius: '50%', border: '2px solid transparent', cursor: 'pointer', outline: 'none', backgroundColor: '#dfb975' }} aria-label="Yellow Palette"></button>
                  <button className="color-swatch-btn" data-color="grey" style={{ width: '100%', aspectRatio: '1', borderRadius: '50%', border: '2px solid transparent', cursor: 'pointer', outline: 'none', backgroundColor: '#708090' }} aria-label="Grey Palette"></button>
                  <button className="color-swatch-btn" data-color="gold" style={{ width: '100%', aspectRatio: '1', borderRadius: '50%', border: '2px solid transparent', cursor: 'pointer', outline: 'none', background: 'linear-gradient(135deg, #dfb975 0%, #C8A15A 100%)' }} aria-label="Gold Palette"></button>
                </div>
              </div>

              {/* Color Result Card */}
              <div id="color-result" style={{ display: 'none', paddingTop: '1.5rem', borderTop: '1px solid var(--c-accent-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span id="color-res-name" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--c-text-primary)', fontWeight: '600' }}>Blue Strategy</span>
                  <span id="color-res-planet" style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--c-accent)', fontWeight: '600' }}>Saturn / Rahu</span>
                </div>
                <p id="color-res-desc" style={{ fontSize: '0.88rem', lineHeight: '1.6', color: 'var(--c-text-secondary)', marginBottom: '1.5rem' }}>Promotes deep relaxation, introspection, and sleep quality.</p>
                <a id="color-res-link" href="#" className="btn-gold" style={{ width: '100%', textAlign: 'center', display: 'block', fontSize: '0.85rem', padding: '0.8rem' }}>View Blue Alignment Rules</a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* About AstroInterior (Benefits cards — hidden on mobile, absorbed into Why Different) */}
      <section id="about" className="benefits-section mobile-hidden">
        <div className="section-header">
          <div className="section-icon-wrap" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" stroke-width="1">
              <circle cx="12" cy="12" r="10" stroke-dasharray="1 3"/>
              <circle cx="12" cy="12" r="7"/>
              <path d="M12 2v20M2 12h20"/>
              <circle cx="12" cy="12" r="3" fill="var(--c-accent)"/>
            </svg>
          </div>
          <h2 className="section-title">Holistic Alignment</h2>
          <p className="section-desc" style={{ maxWidth: '700px', margin: '0 auto 1.5rem', fontSize: '1.15rem', fontFamily: 'var(--font-heading)', color: 'var(--c-text-primary)' }}>
            We carefully structure planetary energies throughout your living space to support balance, harmony, wellbeing and your unique lifestyle.
          </p>
          <p className="section-desc" style={{ maxWidth: '650px', margin: '0 auto', color: 'var(--c-text-secondary)', fontSize: '0.95rem' }}>
            Our recommendations are based on your personal birth chart—not one-size-fits-all principles.
          </p>
        </div>
        
        <div className="benefits-grid">
          {/* Card 1 */}
          <div className="benefit-card">
            <div className="benefit-icon">🌙</div>
            <h3 className="benefit-card-title">Better Sleep</h3>
            <p className="benefit-card-desc">Positioning master bedroom orientations to optimize lunar alignment, ensuring restful sleep and physical rejuvenation.</p>
          </div>
          {/* Card 2 */}
          <div className="benefit-card">
            <div className="benefit-icon">👥</div>
            <h3 className="benefit-card-title">Improved Relationships</h3>
            <p className="benefit-card-desc">Balancing Earth and Water elements in primary social areas to clear communication blocks and foster domestic bliss.</p>
          </div>
          {/* Card 3 */}
          <div className="benefit-card">
            <div className="benefit-icon">📈</div>
            <h3 className="benefit-card-title">Career Growth</h3>
            <p className="benefit-card-desc">Placing studies and desks in Mercury-aligned coordinates facing auspicious directions to accelerate career elevation.</p>
          </div>
          {/* Card 4 */}
          <div className="benefit-card">
            <div className="benefit-icon">💰</div>
            <h3 className="benefit-card-title">Financial Harmony</h3>
            <p className="benefit-card-desc">Activating wealth zones with appropriate tones and element-balancing fixtures to attract professional abundance.</p>
          </div>
          {/* Card 5 */}
          <div className="benefit-card">
            <div className="benefit-icon">🌀</div>
            <h3 className="benefit-card-title">Energy Balanced Spaces</h3>
            <p className="benefit-card-desc">Removing stagnation and aligning directional coordinates to facilitate a positive, constant flow of life force (prana).</p>
          </div>
          {/* Card 6 */}
          <div className="benefit-card">
            <div className="benefit-icon">✨</div>
            <h3 className="benefit-card-title">Personalized Interiors</h3>
            <p className="benefit-card-desc">Bespoke luxury curations matching color palettes and materials directly with your personal astrological elements.</p>
          </div>
        </div>
      </section>

      {/* Services Intro Details */}
      <section id="services" className="services-details-section">
        <div className="section-header">
          <span className="section-subtitle">Our Specializations</span>
          <h2 className="section-title">Astro-Interior Spatial Advisory</h2>
        </div>
        
        {/* Mobile Services Summary Cards */}
        <div className="mobile-services-summary">
          <div className="service-summary-card" data-sheet="services-residential">
            <div className="service-summary-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </div>
            <div className="service-summary-text">
              <h4>Residential Astro-Interiors</h4>
              <p>Peace, prosperity &amp; personal growth</p>
            </div>
            <svg className="service-summary-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 6 15 12 9 18"/></svg>
          </div>
          <div className="service-summary-card" data-sheet="services-corporate">
            <div className="service-summary-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            </div>
            <div className="service-summary-text">
              <h4>Corporate &amp; Workspaces</h4>
              <p>Leadership clarity &amp; business growth</p>
            </div>
            <svg className="service-summary-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 6 15 12 9 18"/></svg>
          </div>
          <div className="service-summary-card" data-sheet="services-hospitality">
            <div className="service-summary-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M12 6v12M6 12h12"/></svg>
            </div>
            <div className="service-summary-text">
              <h4>Hospitality &amp; Commercial</h4>
              <p>Guest comfort &amp; brand resonance</p>
            </div>
            <svg className="service-summary-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 6 15 12 9 18"/></svg>
          </div>
        </div>

        {/* Desktop Services Grid */}
        <div className="services-columns-grid">
          {/* Card 1: Residential */}
          <div className="service-adv-card">
            <div className="service-adv-header">
              <div className="service-adv-icon-wrap">
                <svg className="service-adv-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                <span className="service-adv-badge">Residential</span>
              </div>
              <h3 className="service-adv-title">Residential Astro-Interiors</h3>
              <p className="service-adv-tagline">Create a home designed to support peace, prosperity, health, and personal growth.</p>
              <button className="service-adv-toggle-btn" aria-expanded="false" aria-label="Show details for Residential Astro-Interiors">View Details <span className="toggle-icon">▾</span></button>
            </div>
            
            <div className="service-adv-block service-adv-challenges">
              <h4 className="service-adv-block-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                Client Challenges
              </h4>
              <p className="service-adv-text">Emotional stagnation in living areas, chronic fatigue in bedrooms, or communication blockages in shared family zones.</p>
            </div>
            
            <div className="service-adv-block">
              <h4 className="service-adv-block-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="12 2 2 22 22 22"/><line x1="12" y1="11" x2="12" y2="17"/>
                </svg>
                Our Strategic Approach
              </h4>
              <div className="service-adv-steps">
                <div className="service-adv-step">
                  <span className="step-dot"></span>
                  We align your home's layout to the elemental layout of your natal chart.
                </div>
                <div className="service-adv-step">
                  <span className="step-dot"></span>
                  Earth and Water zones are stabilized in the Southwest to ground relationships, while Fire zones in the Southeast promote health.
                </div>
              </div>
            </div>
            
            <div className="service-adv-block">
              <h4 className="service-adv-block-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                Key Deliverables
              </h4>
              <div className="deliverables-chips">
                <span className="deliv-chip">✓ Room Directional Map</span>
                <span className="deliv-chip">✓ Elements Palette Guide</span>
                <span className="deliv-chip">✓ Layout Adjustments</span>
              </div>
            </div>
            
            <div className="service-adv-footer">
              <a href="#contact" className="btn-gold service-adv-cta-btn">
                Book Residential Consultation <span className="btn-arrow">→</span>
              </a>
            </div>
          </div>
          
          {/* Card 2: Corporate */}
          <div className="service-adv-card">
            <div className="service-adv-header">
              <div className="service-adv-icon-wrap">
                <svg className="service-adv-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
                <span className="service-adv-badge">Corporate</span>
              </div>
              <h3 className="service-adv-title">Corporate & Workspaces</h3>
              <p className="service-adv-tagline">Unlock professional flow, leadership clarity, and strategic business growth.</p>
              <button className="service-adv-toggle-btn" aria-expanded="false" aria-label="Show details for Corporate Workspaces">View Details <span className="toggle-icon">▾</span></button>
            </div>
            
            <div className="service-adv-block service-adv-challenges">
              <h4 className="service-adv-block-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                Client Challenges
              </h4>
              <p className="service-adv-text">High employee friction, decision-making delays in boardroom cabins, or recurring financial blockages despite market opportunities.</p>
            </div>
            
            <div className="service-adv-block">
              <h4 className="service-adv-block-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="12 2 2 22 22 22"/><line x1="12" y1="11" x2="12" y2="17"/>
                </svg>
                Our Strategic Approach
              </h4>
              <div className="service-adv-steps">
                <div className="service-adv-step">
                  <span className="step-dot"></span>
                  We align executive desks to command coordinates based on the founder's Mercury and Jupiter alignments.
                </div>
                <div className="service-adv-step">
                  <span className="step-dot"></span>
                  We calibrate lighting frequency, color notes, and seating positions to foster mental sharpness.
                </div>
              </div>
            </div>
            
            <div className="service-adv-block">
              <h4 className="service-adv-block-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                Key Deliverables
              </h4>
              <div className="deliverables-chips">
                <span className="deliv-chip">✓ Desk Layout Plan</span>
                <span className="deliv-chip">✓ Energy Alignments</span>
                <span className="deliv-chip">✓ Boardroom Command map</span>
              </div>
            </div>
            
            <div className="service-adv-footer">
              <a href="#contact" className="btn-gold service-adv-cta-btn">
                Optimize My Workspace <span className="btn-arrow">→</span>
              </a>
            </div>
          </div>

          {/* Card 3: Hospitality */}
          <div className="service-adv-card">
            <div className="service-adv-header">
              <div className="service-adv-icon-wrap">
                <svg className="service-adv-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                  <path d="M12 6v12M6 12h12"/>
                </svg>
                <span className="service-adv-badge">Commercial</span>
              </div>
              <h3 className="service-adv-title">Hospitality & Commercial</h3>
              <p className="service-adv-tagline">Elevate guest comfort, customer retention, and brand resonance.</p>
              <button className="service-adv-toggle-btn" aria-expanded="false" aria-label="Show details for Hospitality and Commercial">View Details <span className="toggle-icon">▾</span></button>
            </div>
            
            <div className="service-adv-block service-adv-challenges">
              <h4 className="service-adv-block-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                Client Challenges
              </h4>
              <p className="service-adv-text">Low retention rates, inconsistent customer reviews, or sluggish revenue cycles in hotels, spas, or retail spaces.</p>
            </div>
            
            <div className="service-adv-block">
              <h4 className="service-adv-block-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="12 2 2 22 22 22"/><line x1="12" y1="11" x2="12" y2="17"/>
                </svg>
                Our Strategic Approach
              </h4>
              <div className="service-adv-steps">
                <div className="service-adv-step">
                  <span className="step-dot"></span>
                  We design spatial traffic patterns and material choices that evoke immediate comfort and luxury.
                </div>
                <div className="service-adv-step">
                  <span className="step-dot"></span>
                  By auditing primary entrance portals and reception zones, we ensure guests experience sensory delight.
                </div>
              </div>
            </div>
            
            <div className="service-adv-block">
              <h4 className="service-adv-block-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                Key Deliverables
              </h4>
              <div className="deliverables-chips">
                <span className="deliv-chip">✓ Circulation Blueprint</span>
                <span className="deliv-chip">✓ Material Palette Guidance</span>
                <span className="deliv-chip">✓ Entrance Optimization</span>
              </div>
            </div>
            
            <div className="service-adv-footer">
              <a href="#contact" className="btn-gold service-adv-cta-btn">
                Improve Commercial Space <span className="btn-arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works (Timeline) */}
      <section id="process" className="process-section">
        <div className="section-header">
          <span className="section-subtitle">Our Methodology</span>
          <h2 className="section-title">Your Alignment Journey</h2>
          <p className="section-desc">Five deliberate, structured steps to align your space with your cosmic blueprint.</p>

          {/* Mobile Process Cards (visible only on mobile) */}
          <div className="mobile-process-section">
            <div className="mobile-swipe-rail" id="process-swipe-rail">
              <div className="mobile-process-card">
                <div className="step-num">01</div>
                <h4>Strategic Consultation</h4>
                <p>We map your spatial challenges, lifestyle priorities, and design preferences in a comprehensive initial session.</p>
                <div className="process-chips">
                  <span className="process-chip-tag">✓ Lifestyle Assessment</span>
                  <span className="process-chip-tag">✓ Goal Mapping</span>
                </div>
              </div>
              <div className="mobile-process-card">
                <div className="step-num">02</div>
                <h4>Astro-Natal Mapping</h4>
                <p>We decode occupant birth charts and planetary cycles to map astrological alignments and energetic requirements.</p>
                <div className="process-chips">
                  <span className="process-chip-tag">✓ Birth Chart Casting</span>
                  <span className="process-chip-tag">✓ Dasha Audits</span>
                </div>
              </div>
              <div className="mobile-process-card">
                <div className="step-num">03</div>
                <h4>Spatial Energy Audit</h4>
                <p>A deep-dive assessment measuring entrance doors, directional coordinates, room locations, and layout circulation.</p>
                <div className="process-chips">
                  <span className="process-chip-tag">✓ Grid Mapping</span>
                  <span className="process-chip-tag">✓ Directional Axis</span>
                </div>
              </div>
              <div className="mobile-process-card">
                <div className="step-num">04</div>
                <h4>Blueprint Delivery</h4>
                <p>You receive a detailed room-by-room PDF blueprint with precise coordinates, color systems, and implementation actions.</p>
                <div className="process-chips">
                  <span className="process-chip-tag">✓ Spatial Blueprint PDF</span>
                  <span className="process-chip-tag">✓ Action Plan</span>
                </div>
              </div>
            </div>
            <div className="swipe-dots" id="process-swipe-dots">
              <button className="swipe-dot active" aria-label="Step 1"></button>
              <button className="swipe-dot" aria-label="Step 2"></button>
              <button className="swipe-dot" aria-label="Step 3"></button>
              <button className="swipe-dot" aria-label="Step 4"></button>
            </div>
          </div>
        </div>
        
        <div className="process-showcase-container">
          {/* 1. Progress Ribbon Indicators */}
          <div className="process-ribbon-wrapper">
            <div className="process-ribbon" id="process-ribbon">
              <div className="process-ribbon-progress" id="process-progress-bar"></div>
              
              <div className="process-node active" data-step="1">
                01
                <span className="process-node-label">Consultation</span>
              </div>
              <div className="process-node" data-step="2">
                02
                <span className="process-node-label">Astro-Mapping</span>
              </div>
              <div className="process-node" data-step="3">
                03
                <span className="process-node-label">Energy Audit</span>
              </div>
              <div className="process-node" data-step="4">
                04
                <span className="process-node-label">Design Recs</span>
              </div>
              <div className="process-node" data-step="5">
                05
                <span className="process-node-label">Blueprint</span>
              </div>
            </div>
          </div>

          {/* 2. Slider Split-Column Panels */}
          <div className="process-slide-wrapper">
            
            {/* Slide 1 */}
            <div className="process-slide active" id="process-slide-1">
              <div className="process-visualizer">
                {/* SVG diagram 1: Consultation Compass alignment */}
                <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="100" cy="100" r="80" stroke="var(--c-accent-border)" stroke-width="1"/>
                  <circle cx="100" cy="100" r="50" stroke="var(--c-accent-border)" stroke-width="1" stroke-dasharray="4,4"/>
                  {/* Rotating alignment dial */}
                  <line x1="100" y1="20" x2="100" y2="180" stroke="var(--c-accent)" stroke-width="1.5"/>
                  <line x1="20" y1="100" x2="180" y2="100" stroke="var(--c-accent-border)" stroke-width="1"/>
                  <polygon points="100,15 95,35 105,35" fill="var(--c-accent)"/>
                  <polygon points="100,185 95,165 105,165" fill="var(--c-accent-border)"/>
                  {/* Astrological alignment dots */}
                  <circle cx="100" cy="100" r="8" fill="var(--c-accent)" opacity="0.8"/>
                  <text x="94" y="55" fill="var(--c-text-primary)" font-family="var(--font-heading)" font-size="10" letter-spacing="1">N</text>
                  <text x="94" y="155" fill="var(--c-text-secondary)" font-family="var(--font-heading)" font-size="10" letter-spacing="1">S</text>
                </svg>
              </div>
              <div className="process-details-card">
                <div className="process-details-header">
                  <div className="process-details-meta">
                    <span className="process-details-num">01</span>
                    <span className="process-details-badge">Phase 1</span>
                  </div>
                  <h3 className="process-details-title">Strategic Consultation</h3>
                  <p className="process-details-tagline">Aligning spatial concerns, lifestyle priorities, and design preferences.</p>
                </div>
                <p className="process-details-desc">A comprehensive initial session mapping out your current spatial challenges, structural issues, and individual aesthetic goals.</p>
                <div className="process-details-block">
                  <h4 className="process-block-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    Key Focus Areas
                  </h4>
                  <div className="process-details-chips">
                    <span className="process-chip">✓ Lifestyle Assessment</span>
                    <span className="process-chip">✓ Structural Goal Mapping</span>
                    <span className="process-chip">✓ Brief Alignment Setup</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Slide 2 */}
            <div className="process-slide" id="process-slide-2">
              <div className="process-visualizer">
                {/* SVG diagram 2: Astrological birth chart casting */}
                <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Outer zodiac circle */}
                  <circle cx="100" cy="100" r="75" stroke="var(--c-accent-border)" stroke-width="1.5"/>
                  <circle cx="100" cy="100" r="45" stroke="var(--c-accent-border)" stroke-width="1" stroke-dasharray="3,3"/>
                  {/* Geometric natal chart lines */}
                  <polygon points="100,25 165,135 35,135" stroke="var(--c-accent)" stroke-width="1" opacity="0.6"/>
                  <polygon points="100,175 165,65 35,65" stroke="var(--c-accent-border)" stroke-width="1" opacity="0.6"/>
                  {/* Core natal points */}
                  <circle cx="100" cy="25" r="4" fill="var(--c-accent)"/>
                  <circle cx="165" cy="135" r="4" fill="var(--c-accent)"/>
                  <circle cx="35" cy="135" r="4" fill="var(--c-accent)"/>
                  <circle cx="100" cy="100" r="5" fill="var(--c-text-primary)"/>
                  {/* Diagonal lines connecting sectors */}
                  <line x1="100" y1="25" x2="100" y2="175" stroke="var(--c-accent-border)" stroke-dasharray="5,5"/>
                  <line x1="35" y1="65" x2="165" y2="135" stroke="var(--c-accent-border)" stroke-dasharray="5,5"/>
                </svg>
              </div>
              <div className="process-details-card">
                <div className="process-details-header">
                  <div className="process-details-meta">
                    <span className="process-details-num">02</span>
                    <span className="process-details-badge">Phase 2</span>
                  </div>
                  <h3 className="process-details-title">Astro-Natal Mapping</h3>
                  <p className="process-details-tagline">Decoding occupant birth charts and planetary cycles.</p>
                </div>
                <p className="process-details-desc">We analyze birth charts of primary occupants to map out the astrological alignments, current planetary periods (dasha), and individual energetic requirements.</p>
                <div className="process-details-block">
                  <h4 className="process-block-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    Key Focus Areas
                  </h4>
                  <div className="process-details-chips">
                    <span className="process-chip">✓ Birth Chart Casting</span>
                    <span className="process-chip">✓ Dasha Cycle Audits</span>
                    <span className="process-chip">✓ Elemental Calibration</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Slide 3 */}
            <div className="process-slide" id="process-slide-3">
              <div className="process-visualizer">
                {/* SVG diagram 3: Architectural floor plan grid layout */}
                <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Floor plan grid lines */}
                  <rect x="30" y="30" width="140" height="140" stroke="var(--c-accent-border)" stroke-width="1.5"/>
                  <line x1="76" y1="30" x2="76" y2="170" stroke="var(--c-accent-border)" stroke-width="0.8"/>
                  <line x1="124" y1="30" x2="124" y2="170" stroke="var(--c-accent-border)" stroke-width="0.8"/>
                  <line x1="30" y1="76" x2="170" y2="76" stroke="var(--c-accent-border)" stroke-width="0.8"/>
                  <line x1="30" y1="124" x2="170" y2="124" stroke="var(--c-accent-border)" stroke-width="0.8"/>
                  {/* Core block overlays */}
                  <rect x="35" y="35" width="36" height="36" fill="var(--c-accent-light)" stroke="var(--c-accent)" stroke-width="1" opacity="0.7"/>
                  <circle cx="148" cy="148" r="10" fill="var(--c-accent-light)" stroke="var(--c-accent)" stroke-width="1" opacity="0.7"/>
                  {/* Center point (Brahmasthan) */}
                  <rect x="94" y="94" width="12" height="12" stroke="var(--c-accent)" stroke-width="1" fill="#FFFFFF"/>
                  <circle cx="100" cy="100" r="2" fill="var(--c-accent)"/>
                  <text x="83" y="120" fill="var(--c-text-secondary)" font-family="var(--font-body)" font-size="8">Brahmasthan</text>
                </svg>
              </div>
              <div className="process-details-card">
                <div className="process-details-header">
                  <div className="process-details-meta">
                    <span className="process-details-num">03</span>
                    <span className="process-details-badge">Phase 3</span>
                  </div>
                  <h3 className="process-details-title">Spatial Energy Auditing</h3>
                  <p className="process-details-tagline">Analyzing directional axes, layout blocks, and grid alignment.</p>
                </div>
                <p className="process-details-desc">A deep-dive assessment of the building's physical layout. We measure entrance doors, directional coordinate balances, room locations, and layout circulation patterns.</p>
                <div className="process-details-block">
                  <h4 className="process-block-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    Key Focus Areas
                  </h4>
                  <div className="process-details-chips">
                    <span className="process-chip">✓ Entrance Portal Auditing</span>
                    <span className="process-chip">✓ Grid Layout Mapping</span>
                    <span className="process-chip">✓ Directional Axis Plottings</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Slide 4 */}
            <div className="process-slide" id="process-slide-4">
              <div className="process-visualizer">
                {/* SVG diagram 4: Color palettes & finishes design */}
                <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Color circle sectors */}
                  <circle cx="100" cy="100" r="70" stroke="var(--c-accent-border)" stroke-width="1"/>
                  <path d="M100 30 A 70 70 0 0 1 170 100 L 140 100 A 40 40 0 0 0 100 60 Z" fill="var(--c-accent-light)" stroke="var(--c-accent)" stroke-width="0.8"/>
                  <path d="M170 100 A 70 70 0 0 1 100 170 L 100 140 A 40 40 0 0 0 140 100 Z" fill="#EADEC9" stroke="var(--c-accent)" stroke-width="0.8"/>
                  <path d="M100 170 A 70 70 0 0 1 30 100 L 60 100 A 40 40 0 0 0 100 140 Z" fill="#FAF8F4" stroke="var(--c-accent-border)" stroke-width="0.8"/>
                  <path d="M30 100 A 70 70 0 0 1 100 30 L 100 60 A 40 40 0 0 0 60 100 Z" fill="#FFFFFF" stroke="var(--c-accent-border)" stroke-width="0.8"/>
                  {/* Core balancing dots */}
                  <circle cx="100" cy="100" r="20" stroke="var(--c-accent-border)" stroke-width="1" fill="#FFFFFF"/>
                  <circle cx="100" cy="100" r="6" fill="var(--c-accent)"/>
                </svg>
              </div>
              <div className="process-details-card">
                <div className="process-details-header">
                  <div className="process-details-meta">
                    <span className="process-details-num">04</span>
                    <span className="process-details-badge">Phase 4</span>
                  </div>
                  <h3 className="process-details-title">Design Recommendations</h3>
                  <p className="process-details-tagline">Formulating color formulas, layout changes, and finish guides.</p>
                </div>
                <p className="process-details-desc">We translate astrological requirements and spatial audits into luxury design recommendations (color systems, wood/metal elements, lighting layouts, furniture orientations).</p>
                <div className="process-details-block">
                  <h4 className="process-block-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    Key Focus Areas
                  </h4>
                  <div className="process-details-chips">
                    <span className="process-chip">✓ Materials & Textures Sourcing</span>
                    <span className="process-chip">✓ Palette Color Strategy</span>
                    <span className="process-chip">✓ Spatial Layout Swaps</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Slide 5 */}
            <div className="process-slide" id="process-slide-5">
              <div className="process-visualizer">
                {/* SVG diagram 5: Final Report Envelope & Seal */}
                <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Envelope backing sheet */}
                  <rect x="40" y="50" width="120" height="90" rx="4" stroke="var(--c-accent-border)" stroke-width="1.5" fill="#FFFFFF"/>
                  {/* Opened letter flaps */}
                  <path d="M40 50 L100 95 L160 50" stroke="var(--c-accent-border)" stroke-width="1.5" fill="#FAF8F4"/>
                  {/* Closing seal logo */}
                  <circle cx="100" cy="95" r="14" fill="var(--c-accent)" stroke="#FFFFFF" stroke-width="1.5"/>
                  <path d="M100 87 L100 103 M92 95 L108 95" stroke="#FFFFFF" stroke-width="1.5"/>
                  {/* Radiant sparks */}
                  <line x1="60" y1="120" x2="80" y2="120" stroke="var(--c-accent-border)" stroke-width="1" stroke-dasharray="2,2"/>
                  <line x1="120" y1="120" x2="140" y2="120" stroke="var(--c-accent-border)" stroke-width="1" stroke-dasharray="2,2"/>
                </svg>
              </div>
              <div className="process-details-card">
                <div className="process-details-header">
                  <div className="process-details-meta">
                    <span className="process-details-num">05</span>
                    <span className="process-details-badge">Phase 5</span>
                  </div>
                  <h3 className="process-details-title">Implementation Blueprint</h3>
                  <p className="process-details-tagline">Delivery of actionable spatial alignment reports.</p>
                </div>
                <p className="process-details-desc">You receive a detailed room-by-room PDF blueprint compiling precise furniture coordinates, element distributions, and alignment actions for execution at your own pace.</p>
                <div className="process-details-block">
                  <h4 className="process-block-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    Key Focus Areas
                  </h4>
                  <div className="process-details-chips">
                    <span className="process-chip">✓ Spatial Blueprint PDF</span>
                    <span className="process-chip">✓ Actionable Coordinates</span>
                    <span className="process-chip">✓ Implementation Guidance</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* 3. Navigation controls buttons */}
          <div className="process-controls">
            <button className="process-control-btn" id="process-prev-btn" aria-label="Previous step" disabled>
              <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
              </svg>
            </button>
            <button className="process-control-btn" id="process-next-btn" aria-label="Next step">
              <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Editorial Section: Unique Homes (hidden on mobile) */}
      <section className="editorial-quote-section scroll-reveal mobile-hidden" style={{ backgroundColor: 'var(--c-bg-secondary)', padding: '10rem 2rem', borderTop: '1px solid var(--c-accent-border)', borderBottom: '1px solid var(--c-accent-border)' }}>
        <div className="editorial-container" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h3 className="editorial-heading" style={{ fontFamily: 'var(--font-heading)', fontSize: '2.8rem', color: 'var(--c-text-primary)', marginBottom: '2.5rem', lineHeight: '1.25' }}>
            Every Home Should Be as Unique as the People Living in It
          </h3>
          <div className="editorial-body" style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: 'var(--c-text-secondary)', lineHeight: '2', marginBottom: '3.5rem', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p>
              This is not a makeshift arrangement or a collection of random design ideas. It is a home intentionally aligned with your unique planetary energies.
            </p>
            <p>
              Our interiors are never created by copying trends, social media inspiration or generic templates. Every colour palette, furniture layout, material selection and spatial recommendation is carefully crafted using your individual natal chart, creating spaces that feel deeply personal, harmonious and supportive of your life journey.
            </p>
          </div>
          <div className="editorial-quote-card" style={{ borderTop: '1px solid var(--c-accent-border)', borderBottom: '1px solid var(--c-accent-border)', padding: '2.5rem 1rem', maxWidth: '700px', margin: '0 auto' }}>
            <span style={{ fontSize: '2.5rem', color: 'var(--c-accent)', fontFamily: 'var(--font-heading)', display: 'block', marginBottom: '0.5rem', lineHeight: '1' }}>“</span>
            <p className="editorial-quote-text" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--c-text-primary)', fontStyle: 'italic', lineHeight: '1.5', margin: '0' }}>
              We don't simply design beautiful homes. We create spaces that are aligned with your life's energy.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="portfolio-section">
        <div className="section-header" style={{ maxWidth: '800px', margin: '0 auto 3rem', textAlign: 'center' }}>
          <span className="section-subtitle">Our Work</span>
          <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>Luxury Transformations</h2>
          <p className="section-desc" style={{ fontSize: '0.95rem', lineHeight: '1.7', color: 'var(--c-text-secondary)', margin: '0' }}>
            Every project we deliver is a bespoke spatial creation balanced for life's energy. Our portfolio represents custom-tailored residential and commercial spaces styled to align with our clients' personal horoscopes and functional requirements, ensuring harmony without compromising premium visual design.
          </p>
        </div>

        {/* Filter bar */}
        <div className="portfolio-filters-container">
          <button className="portfolio-filter-btn active" data-filter="all">All Projects</button>
          <button className="portfolio-filter-btn" data-filter="residential">Residential</button>
          <button className="portfolio-filter-btn" data-filter="hospitality">Hospitality</button>
          <button className="portfolio-filter-btn" data-filter="corporate">Corporate</button>
        </div>

        {/* Portfolio Grid */}
        <div className="portfolio-masonry-grid ios-swipe-rail">
          {/* Item 1 */}
          <div className="portfolio-item show-item" data-category="residential" data-id="1">
            <img src="assets/portfolio_apartment_living.jpg" alt="Luxury Apartment Living Room" loading="lazy" />
            <div className="portfolio-overlay">
              <h4>Celestial Living Room</h4>
            </div>
          </div>
          {/* Item 2 */}
          <div className="portfolio-item show-item" data-category="residential" data-id="2">
            <img src="assets/portfolio_apartment_bedroom.jpg" alt="Elegant master bedroom" loading="lazy" />
            <div className="portfolio-overlay">
              <h4>Luna Sanctuary Suite</h4>
            </div>
          </div>
          {/* Item 3 */}
          <div className="portfolio-item show-item" data-category="residential" data-id="3">
            <img src="assets/portfolio_apartment_dining.jpg" alt="Sophisticated dining area" loading="lazy" />
            <div className="portfolio-overlay">
              <h4>Abundance Dining Hall</h4>
            </div>
          </div>
          {/* Item 4 */}
          <div className="portfolio-item show-item" data-category="hospitality" data-id="4">
            <img src="assets/portfolio_hotel_lalit.jpg" alt="The Lalit Chandigarh luxury hotel" loading="lazy" />
            <div className="portfolio-overlay">
              <h4>The Lalit — Chandigarh</h4>
            </div>
          </div>
          {/* Item 5 */}
          <div className="portfolio-item show-item" data-category="residential" data-id="5">
            <img src="assets/portfolio_apartment_lounge.jpg" alt="Premium lounge area" loading="lazy" />
            <div className="portfolio-overlay">
              <h4>Grounded Lounge Retreat</h4>
            </div>
          </div>
          {/* Item 6 */}
          <div className="portfolio-item show-item" data-category="hospitality" data-id="6">
            <img src="assets/portfolio_spa_club7.jpg" alt="Club 7 Spa Ahmedabad" loading="lazy" />
            <div className="portfolio-overlay">
              <h4>Club 7 Spa — Ahmedabad</h4>
            </div>
          </div>
          {/* Item 7 */}
          <div className="portfolio-item show-item" data-category="corporate" data-id="7">
            <img src="assets/portfolio_office_md.jpg" alt="Executive MD cabin" loading="lazy" />
            <div className="portfolio-overlay">
              <h4>Executive Command Suite</h4>
            </div>
          </div>
          {/* Item 8 */}
          <div className="portfolio-item show-item" data-category="residential" data-id="8">
            <img src="assets/portfolio_apartment_foyer.jpg" alt="Grand foyer entrance" loading="lazy" />
            <div className="portfolio-overlay">
              <h4>Grand Foyer Welcome</h4>
            </div>
          </div>
          {/* Item 9 */}
          <div className="portfolio-item show-item" data-category="corporate" data-id="9">
            <img src="assets/portfolio_office_conference.jpg" alt="Modern conference room" loading="lazy" />
            <div className="portfolio-overlay">
              <h4>Strategic Boardroom</h4>
            </div>
          </div>
          {/* Item 10 */}
          <div className="portfolio-item show-item" data-category="hospitality" data-id="10">
            <img src="assets/portfolio_hotel_marriott.jpg" alt="Marriott hotel design concept" loading="lazy" />
            <div className="portfolio-overlay">
              <h4>Marriott — Design Concept</h4>
            </div>
          </div>
          {/* Item 11 */}
          <div className="portfolio-item show-item" data-category="residential" data-id="11">
            <img src="assets/portfolio_apartment_study.jpg" alt="Elegant home study" loading="lazy" />
            <div className="portfolio-overlay">
              <h4>Scholar's Study</h4>
            </div>
          </div>
          {/* Item 12 */}
          <div className="portfolio-item show-item" data-category="corporate" data-id="12">
            <img src="assets/portfolio_office_neeraj.jpg" alt="Professional office space" loading="lazy" />
            <div className="portfolio-overlay">
              <h4>Professional Practice Suite</h4>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', padding: '0 1.5rem' }}>
          <a href="/gallery" className="portfolio-see-all-btn">See All Projects →</a>
        </div>

        {/* Transformation Thinking Case Studies (hidden on mobile) */}
        <div className="transformation-case-studies mobile-hidden" style={{ maxWidth: '1200px', margin: '6rem auto 2rem', padding: '0 1rem' }}>
          <div className="section-header" style={{ maxWidth: '800px', margin: '0 auto 3rem', textAlign: 'center' }}>
            <span className="section-subtitle">Case Studies</span>
            <h3 className="section-title" style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', color: 'var(--c-text-primary)', marginBottom: '1.2rem' }}>Transformation Case Studies</h3>
            <p className="section-desc" style={{ fontSize: '0.95rem', color: 'var(--c-text-secondary)', lineHeight: '1.6', margin: '0' }}>
              Every featured project is built on transformation thinking, translating specific environmental challenges into energetic alignments and strategic life outcomes.
            </p>
          </div>
          
          <div className="ios-swipe-rail">
            {/* Case Study 1 */}
            <div style={{ background: '#FFFFFF', border: '1px solid var(--c-accent-border)', borderRadius: '12px', padding: '3rem 2.5rem', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.02)', transition: 'transform 0.3s ease' }}>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--c-accent)', fontWeight: '600', letterSpacing: '0.1em', display: 'block', marginBottom: '0.75rem' }}>Residential Case Study</span>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--c-text-primary)', marginBottom: '1.5rem', fontWeight: '500' }}>Luna Sanctuary Suite</h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', fontSize: '0.92rem', lineHeight: '1.6', color: 'var(--c-text-secondary)', fontFamily: 'var(--font-body)' }}>
                <div>
                  <strong style={{ color: 'var(--c-text-primary)', display: 'block', marginBottom: '0.3rem' }}>The Challenge:</strong>
                  Client suffered from chronic sleep disruption, daytime fatigue, and emotional low energy levels in a newly purchased luxury penthouse.
                </div>
                <div>
                  <strong style={{ color: 'var(--c-text-primary)', display: 'block', marginBottom: '0.3rem' }}>Astro Insight:</strong>
                  The master bedroom fell into a highly active North-Northeast zone, conflicting with the primary occupant's weak Lunar birth chart placement.
                </div>
                <div>
                  <strong style={{ color: 'var(--c-text-primary)', display: 'block', marginBottom: '0.3rem' }}>Design Recommendations:</strong>
                  Relocated the master suite layout coordinates, introducing warm clay color tones, heavy wood textures, and blackout drapes to ground the space.
                </div>
                <div>
                  <strong style={{ color: 'var(--c-text-primary)', display: 'block', marginBottom: '0.3rem' }}>Functional & Life Outcome:</strong>
                  Sleep scores normalized within seven days, restoring daytime productivity and personal energy levels.
                </div>
              </div>
            </div>
            
            {/* Case Study 2 */}
            <div style={{ background: '#FFFFFF', border: '1px solid var(--c-accent-border)', borderRadius: '12px', padding: '3rem 2.5rem', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.02)', transition: 'transform 0.3s ease' }}>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--c-accent)', fontWeight: '600', letterSpacing: '0.1em', display: 'block', marginBottom: '0.75rem' }}>Corporate Case Study</span>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--c-text-primary)', marginBottom: '1.5rem', fontWeight: '500' }}>Executive Command Suite</h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', fontSize: '0.92rem', lineHeight: '1.6', color: 'var(--c-text-secondary)', fontFamily: 'var(--font-body)' }}>
                <div>
                  <strong style={{ color: 'var(--c-text-primary)', display: 'block', marginBottom: '0.3rem' }}>The Challenge:</strong>
                  A financial advisory firm faced sluggish corporate growth, internal board friction, and recurring transaction delays.
                </div>
                <div>
                  <strong style={{ color: 'var(--c-text-primary)', display: 'block', marginBottom: '0.3rem' }}>Astro Insight:</strong>
                  The primary executive desk sat in a stagnant Mercury sector, oriented directly facing a solid windowless wall.
                </div>
                <div>
                  <strong style={{ color: 'var(--c-text-primary)', display: 'block', marginBottom: '0.3rem' }}>Design Recommendations:</strong>
                  Repositioned the desk to face North-Northeast, integrated walnut and polished brass finishes, and balanced task lighting to support Mercury communication fields.
                </div>
                <div>
                  <strong style={{ color: 'var(--c-text-primary)', display: 'block', marginBottom: '0.3rem' }}>Functional & Life Outcome:</strong>
                  Enhanced executive communication clarity, resulting in the successful closing of two major acquisitions within the quarter.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Before & After Comparison Slider (hidden on mobile) */}
      <section id="before-after" className="before-after-section mobile-hidden">
        <div className="section-header">
          <span className="section-subtitle">Visual Proof</span>
          <h2 className="section-title">The Impact of Alignment</h2>
          <p className="section-desc">Drag the interactive slider to compare spaces before and after cosmic alignment.</p>
        </div>

        {/* Room Tabs */}
        <div className="ba-tabs-container">
          <button className="ba-tab active" data-before="assets/before_living.jpg" data-after="assets/after_living.jpg" data-room="Living Room">Living Room</button>
          <button className="ba-tab" data-before="assets/before_bedroom.jpg" data-after="assets/after_bedroom.jpg" data-room="Master Bedroom">Master Bedroom</button>
          <button className="ba-tab" data-before="assets/before_kitchen.jpg" data-after="assets/after_kitchen.jpg" data-room="Kitchen">Kitchen</button>
          <button className="ba-tab" data-before="assets/before_entrance.jpg" data-after="assets/after_entrance.jpg" data-room="Entrance">Entrance</button>
          <button className="ba-tab" data-before="assets/before_drawing.jpg" data-after="assets/after_drawing.jpg" data-room="Drawing Room">Drawing Room</button>
        </div>

        <div className="slider-showcase">
          <div className="slider-container" id="before-after-slider">
            <img className="slider-img after-img" src="assets/after_living.jpg" alt="Aligned Space (After)" />
            <img className="slider-img before-img" src="assets/before_living.jpg" alt="Original Space (Before)" />
            
            <div className="slider-handle" id="slider-drag-handle">
              <div className="slider-button">
                <div className="slider-grip">
                  <span></span><span></span><span></span>
                </div>
                <svg className="slider-arrow slider-arrow-left" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
                <svg className="slider-arrow slider-arrow-right" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 6 15 12 9 18"/></svg>
              </div>
            </div>
            
            <div className="slider-label before-label">BEFORE</div>
            <div className="slider-label after-label">AFTER</div>
          </div>
        </div>
      </section>

      {/* About the Founder (hidden on mobile — available via bottom sheet) */}
      <section id="founder" className="founder-section mobile-hidden">
        <div className="founder-editorial-grid">
          <div className="founder-visual-wrap">
            <img src="assets/founder_richa.png" alt="Richa Agarwal, Lead Astro-Interior Consultant" />
          </div>
          <div className="founder-details-wrap">
            <span className="founder-badge">Legacy. Luxury. Alignment.</span>
            <h2 className="founder-name-title">Richa Agarwal — Pioneer of Astro-Interior Advisory</h2>
            <p className="founder-philosophy-quote">"A space must not only look exceptionally beautiful; it must also support your inner energetic balance. We don't simply design interiors; we align physical structures with celestial codes."</p>
            
            <div className="founder-story-body">
              <p>With over 24 years of experience delivering award-winning, high-end interiors, Richa Agarwal founded AstroInterior to bridge the gap between architectural layout and cosmic energy. Having successfully managed luxury hospitality suites, corporate boardrooms, and premium private residences across India, she observed that visual aesthetics represent only half of a space's true potential. Real luxury is felt—it is the sensation of harmony, focus, and immediate ease when entering an aligned space.</p>
              <p>By integrating the logical principles of modern architecture, environmental psychology, and Vedic astrological calculations, she provides clients with a sophisticated design approach that supports their life trajectory without requiring structural demolition.</p>
            </div>

            <div className="founder-highlights">
              <div className="highlight-item">
                <strong>24+ Years</strong>
                <span>Design Excellence</span>
              </div>
              <div className="highlight-item">
                <strong>500+ Spaces</strong>
                <span>Aligned Worldwide</span>
              </div>
            </div>

            <a href="#contact" className="btn-gold founder-cta-link">Request Spatial Alignment</a>
          </div>
        </div>
      </section>

      {/* Sample Astro Interior Report — Premium Layout */}
      {/* Sample Astro Interior Report — Premium Layout */}
      {/* Sample Report Showcase Card */}
      <section id="sample-report" className="sample-report-section scroll-reveal" style={{ backgroundColor: 'var(--c-bg-secondary)', borderTop: '1px solid var(--c-accent-border)', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <span className="section-subtitle" style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--c-accent)', fontWeight: '600', letterSpacing: '0.15em', marginBottom: '1rem' }}>Actionable Blueprint</span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', color: 'var(--c-text-primary)', marginBottom: '2rem' }}>Your Astro-Spatial Evaluation Report</h2>
          
          <div className="report-preview-card" id="open-report-modal-btn">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
              <span style={{ fontSize: '3rem' }}>📖</span>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: 'var(--c-text-primary)', margin: '0' }}>Preview Your Personalized Astro Report</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--c-text-secondary)', maxWidth: '450px', margin: '0 auto', lineHeight: '1.6' }}>
                Tap to explore a sample layout report detailing birth chart casting, bedroom orientation coordinates, elemental colors, and non-destructive spatial remedies.
              </p>
              <button className="btn-gold" style={{ padding: '0.8rem 2.5rem', fontSize: '0.88rem', borderRadius: '8px' }}>Open Interactive Preview</button>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Packages */}
      <section id="packages" className="packages-pricing-section">
        <div className="section-header">
          <span className="section-subtitle">Select Advisory Plan</span>
          <h2 className="section-title">Consultation Packages</h2>
        </div>

        <div className="packages-grid-pricing">
          {/* Card 1 */}
          <div className="package-pricing-card">
            <h3 className="pkg-title">Essential</h3>
            <p className="pkg-intro">Ideal for immediate advice on specific rooms or directional alignments.</p>
            <div className="pkg-price-tag">
              <span className="currency">₹</span>2,500
            </div>
            <ul className="pkg-perks">
              <li>1 Hour Virtual Consultation</li>
              <li>Basic Birth Chart Casting</li>
              <li>General Vastu Directional Tips</li>
              <li>Ideal for single room audits</li>
            </ul>
            <a href="#contact" className="btn-outline pkg-btn book-package-btn" data-package="Kickstarter">Book Essential</a>
          </div>
          {/* Card 2 */}
          <div className="package-pricing-card featured-pkg">
            <div className="pkg-recommended-tag">✦ Recommended</div>
            <h3 className="pkg-title">Premium</h3>
            <p className="pkg-intro">A complete space audit with comprehensive custom recommendations.</p>
            <div className="pkg-price-tag">
              <span className="currency">₹</span>11,000
            </div>
            <ul className="pkg-perks">
              <li>Detailed Astrological Audit</li>
              <li>Custom Color & Texture Curations</li>
              <li>Full 2-3 BHK Layout Mapping</li>
              <li>PDF Astro-Interior Design Report</li>
              <li>Follow-up Q&A Session</li>
            </ul>
            <a href="#contact" className="btn-gold pkg-btn book-package-btn" data-package="Astro Interior Report">Book Premium</a>
          </div>
          {/* Card 3 */}
          <div className="package-pricing-card">
            <h3 className="pkg-title">Elite Signature</h3>
            <p className="pkg-intro">The definitive luxury mapping for larger estates and ultimate transformation.</p>
            <div className="pkg-price-tag">
              <span className="currency">₹</span>25,000
            </div>
            <ul className="pkg-perks">
              <li>Comprehensive Family Horoscope Audits</li>
              <li>Full Site Vastu Energy Gridding</li>
              <li>Unlimited BHKs / Luxury Mansions</li>
              <li>Premium Material & Furniture Sourcing Guide</li>
              <li>3 Months Implementation Support</li>
            </ul>
            <a href="#contact" className="btn-outline pkg-btn book-package-btn" data-package="Signature Astro + Vastu">Book Elite Signature</a>
          </div>
        </div>

        {/* Toggle Button for Inclusions & Comparison */}
        <div style={{ textAlign: 'center', maxWidth: '440px', margin: '2rem auto 0', padding: '0 1.5rem' }}>
          <button type="button" className="inclusions-toggle-btn" id="toggle-packages-details-btn">Show Detailed Comparison &amp; Inclusions ▾</button>
        </div>

        <div className="package-inclusions-wrapper" id="packages-details-wrapper">
          <div className="comparison-table-wrapper" style={{ marginTop: '3rem' }}>
            <h3 className="comparison-table-title">Compare Offerings</h3>
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Features</th>
                  <th>Essential</th>
                  <th>Premium</th>
                  <th>Elite Signature</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Birth Chart Analysis</td>
                  <td>✓ Basic</td>
                  <td>✓ In-depth</td>
                  <td>✓ Complete Family</td>
                </tr>
                <tr>
                  <td>Zoning &amp; Layout Auditing</td>
                  <td>✓ Single Space</td>
                  <td>✓ 2-3 BHK</td>
                  <td>✓ Multi-story / Estates</td>
                </tr>
                <tr>
                  <td>Color &amp; Texture Blueprint</td>
                  <td>-</td>
                  <td>✓ Custom</td>
                  <td>✓ Bespoke Sourcing</td>
                </tr>
                <tr>
                  <td>Vastu Remedy Placement</td>
                  <td>-</td>
                  <td>✓ Yes</td>
                  <td>✓ Yes (Advanced)</td>
                </tr>
                <tr>
                  <td>Execution &amp; Material Support</td>
                  <td>-</td>
                  <td>-</td>
                  <td>✓ Direct coordination</td>
                </tr>
                <tr>
                  <td>Support Duration</td>
                  <td>7 days chat</td>
                  <td>30 days call/chat</td>
                  <td>90 days dedicated support</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section-home">
        <div className="section-header">
          <span className="section-subtitle">Testimonials</span>
          <h2 className="section-title">Client Transformations</h2>
        </div>

        {/* Google reviews badge */}
        <div className="google-reviews-badge">
          <div className="google-badge-logo">G</div>
          <div className="google-badge-text">
            <strong>Excellent 4.9/5</strong>
            <span>Based on 120+ client reviews</span>
          </div>
        </div>

        <div className="testimonials-slider-grid ios-swipe-rail">
          {/* Card 1 */}
          <div className="testimonial-lux-card">
            <div className="test-stars">★★★★★</div>
            <p className="test-quote">"After shifting our bed to the recommended Southwest coordinates and switching to warm earth tones, the restless sleeping patterns my husband suffered from for years disappeared within a week. The design is elegant, and the Vastu solutions are integrated invisibly."</p>
            <div className="test-user">
              <img src="assets/room_after.png" alt="Testimonial Room" className="test-user-img" />
              <div>
                <h4 className="test-user-name">Ananya Sen</h4>
                <p className="test-user-loc">Vasant Vihar, New Delhi — Farmhouse</p>
              </div>
            </div>
          </div>
          {/* Card 2 */}
          <div className="testimonial-lux-card">
            <div className="test-stars">★★★★★</div>
            <p className="test-quote">"Richa aligned our corporate offices in Mumbai. Her desk positions, element-based zoning, and light fixtures transformed our workspace energy. Not only did office morale improve, but our quarterly acquisitions grew by 35%. Astounding and luxury design at its best!"</p>
            <div className="test-user">
              <img src="assets/gallery_office.png" alt="Testimonial Room" className="test-user-img" />
              <div>
                <h4 className="test-user-name">Vikram Malhotra</h4>
                <p className="test-user-loc">BKC, Mumbai — Corporate Suite</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq-section-home">
        <div className="section-header">
          <span className="section-subtitle">FAQ</span>
          <h2 className="section-title">Common Enquiries</h2>
        </div>

        {/* FAQ Search bar */}
        <div style={{ maxWidth: '500px', margin: '0 auto 2.5rem', padding: '0 1.5rem', position: 'relative' }}>
          <input type="text" id="faq-search-input" placeholder="Search questions (e.g. Vastu, report, budget)..." style={{ width: '100%', height: '48px', border: '1px solid var(--c-accent-border)', borderRadius: '24px', padding: '0 1.2rem 0 2.8rem', outline: 'none', fontSize: '0.9rem', background: '#FFF', boxShadow: '0 5px 15px rgba(0,0,0,0.02)' }} />
          <span style={{ position: 'absolute', left: '2.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--c-text-secondary)', opacity: '0.6' }}>🔍</span>
        </div>

        <div className="faq-accordion-container" id="faq-popular-container">
          {/* Popular Q1 */}
          <div className="faq-item">
            <button className="faq-header" aria-expanded="false">
              <span>What is Astro-Interior Design?</span>
              <span className="faq-icon-indicator">+</span>
            </button>
            <div className="faq-panel">
              <div className="faq-content">
                <p>Astro-Interior Design is a specialized advisory practice that combines professional interior design and spatial architecture with personal Vedic astrology and Vastu energy gridding. It tailors the physical elements of a space (layouts, colors, lighting, textures) to the birth chart coordinates of the primary occupant.</p>
              </div>
            </div>
          </div>
          
          {/* Popular Q2 */}
          <div className="faq-item">
            <button className="faq-header" aria-expanded="false">
              <span>How is Astro-Interior Design different from traditional Vastu?</span>
              <span className="faq-icon-indicator">+</span>
            </button>
            <div className="faq-panel">
              <div className="faq-content">
                <p>Traditional Vastu uses static rules (e.g., placing the kitchen in the Southeast) regardless of who lives in the home. Astro-Interior Design overlays these rules with your personal natal chart. If your horoscope shows a conflict with a standard Vastu position, we adjust materials and color frequencies to neutralize the conflict.</p>
              </div>
            </div>
          </div>

          {/* Popular Q3 */}
          <div className="faq-item">
            <button className="faq-header" aria-expanded="false">
              <span>Do I need to provide birth details for a consultation?</span>
              <span className="faq-icon-indicator">+</span>
            </button>
            <div className="faq-panel">
              <div className="faq-content">
                <p>Yes. To construct your personalized spatial report, we require the date, exact time, and location of birth for the primary occupants. This allows us to map dominant planetary dashas and elemental structures.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Toggle details button */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button type="button" className="inclusions-toggle-btn" id="toggle-faqs-btn" style={{ maxWidth: '280px', margin: '0 auto' }}>See More Questions ▾</button>
        </div>

        {/* Hidden FAQs wrapper */}
        <div className="package-inclusions-wrapper" id="faqs-more-wrapper">
          <div className="faq-accordion-container" id="faq-extended-container" style={{ marginTop: '1.5rem' }}>
            {/* Extended Q4 */}
            <div className="faq-item">
              <button className="faq-header" aria-expanded="false">
                <span>Can recommendations be implemented gradually?</span>
                <span className="faq-icon-indicator">+</span>
              </button>
              <div className="faq-panel">
                <div className="faq-content">
                  <p>Yes. All spatial recommendations are categorized by impact. You can introduce elements, textiles, color highlights, and layout changes incrementally at your own pace.</p>
                </div>
              </div>
            </div>

            {/* Extended Q5 */}
            <div className="faq-item">
              <button className="faq-header" aria-expanded="false">
                <span>Is Astro-Interior consulting suitable for offices and commercial spaces?</span>
                <span className="faq-icon-indicator">+</span>
              </button>
              <div className="faq-panel">
                <div className="faq-content">
                  <p>Yes. We customize layout grids for offices to support team collaboration, executive decision-making, and financial flow. Desk placement, boardroom colors, and entry portals are aligned to the primary business owner's chart.</p>
                </div>
              </div>
            </div>

            {/* Extended Q6 */}
            <div className="faq-item">
              <button className="faq-header" aria-expanded="false">
                <span>Can existing homes be optimized without demolition?</span>
                <span className="faq-icon-indicator">+</span>
              </button>
              <div className="faq-panel">
                <div className="faq-content">
                  <p>Yes. We focus on non-destructive corrections. By adjusting furniture layouts, textiles, lighting warmth, and room styling, we balance energy flow without any structural demolition.</p>
                </div>
              </div>
            </div>

            {/* Extended Q7 */}
            <div className="faq-item">
              <button className="faq-header" aria-expanded="false">
                <span>What is included in the consultation?</span>
                <span className="faq-icon-indicator">+</span>
              </button>
              <div className="faq-panel">
                <div className="faq-content">
                  <p>Every consultation includes a thorough review of your layout, horoscope casting for the primary occupant, spatial element balancing recommendations, and a detailed room-by-room PDF report containing actionable color, material, and layout blueprints.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section (Luxury Split Layout) */}
      <section id="contact" className="contact-split-section">
        <div className="contact-split-container">
          {/* Left: Editorial Showcase Image */}
          <div className="contact-split-visual" style={{ backgroundImage: 'url("assets/hero_luxury.png")' }}>
            <div className="contact-visual-overlay">
              <div className="contact-visual-text">
                <h3>Let's Align Your Space</h3>
                <p>Experience the calmness of cosmic architecture. Fill in the request form and begin your interior transformation today.</p>
              </div>
            </div>
          </div>
          {/* Right: Premium Contact Form */}
          <div className="contact-split-form-wrap">
            <h3 className="contact-form-headline">Book Your Consultation</h3>
            
            <form id="astro-contact-form" className="premium-form">
              <div className="form-row">
                <div className="form-group">
                  <input type="text" id="frm-name" name="name" required placeholder=" " autoComplete="name" />
                  <label htmlFor="frm-name">Full Name *</label>
                </div>
                <div className="form-group">
                  <input type="tel" id="frm-phone" name="phone" required placeholder=" " autoComplete="tel" inputMode="tel" />
                  <label htmlFor="frm-phone">Mobile Number *</label>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <input type="email" id="frm-email" name="email" required placeholder=" " autoComplete="email" inputMode="email" />
                  <label htmlFor="frm-email">Email Address *</label>
                </div>
                <div className="form-group">
                  <input type="text" id="frm-city" name="city" required placeholder=" " autoComplete="address-level2" />
                  <label htmlFor="frm-city">City *</label>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <select id="frm-property-type" name="property_type" required>
                    <option value="" disabled selected hidden></option>
                    <option value="Residential Villa">Residential Villa</option>
                    <option value="Apartment / Penthouse">Apartment / Penthouse</option>
                    <option value="Corporate Office">Corporate Office</option>
                    <option value="Hospitality / Resort">Hospitality / Resort</option>
                    <option value="Other">Other Space</option>
                  </select>
                  <label htmlFor="frm-property-type">Property Type *</label>
                </div>
                <div className="form-group">
                  <select id="frm-package" name="package" required>
                    <option value="" disabled selected hidden></option>
                    <option value="Kickstarter">Essential Consultation – ₹2,500</option>
                    <option value="Astro Interior Report">Premium Astro-Interior Report – ₹11,000</option>
                    <option value="Signature Astro + Vastu">Elite Signature Consultation – ₹25,000</option>
                    <option value="Custom Consultation">General Consultation (Custom Quote)</option>
                  </select>
                  <label htmlFor="frm-package">Consultation Type *</label>
                </div>
              </div>

              <div className="form-group">
                <input type="date" id="frm-date" name="preferred_date" required placeholder=" " />
                <label htmlFor="frm-date">Preferred Date *</label>
              </div>

              <div className="form-group">
                <textarea id="frm-message" name="message" rows={4} placeholder=" "></textarea>
                <label htmlFor="frm-message">Describe your space & goals</label>
              </div>

              <button type="submit" className="btn-gold btn-submit-full" id="submit-form-btn">
                <span className="btn-text">Book My Consultation</span>
                <span className="btn-loader" style={{ display: 'none' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" stroke-dasharray="31.4" stroke-dashoffset="10"><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite"/></circle></svg>
                </span>
              </button>
            </form>

            {/* Inline Success State */}
            <div className="form-success-inline" id="form-success-inline" style={{ display: 'none' }}>
              <div className="success-checkmark">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="11" stroke="var(--c-accent)" stroke-width="1.5" fill="var(--c-accent-glow)"/>
                  <path d="M7 13l3 3 7-7" stroke="var(--c-accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="check-path"/>
                </svg>
              </div>
              <h3 className="success-title">Consultation Request Received ✦</h3>
              <p className="success-desc">Thank you for reaching out. Our team will connect with you within 24 hours to begin your personalized Astro Interior journey.</p>
              <a href="#onboarding" className="btn-gold" style={{ marginTop: '1.5rem' }}>Complete Your Profile</a>
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Charcoal Footer */}
      <footer className="minimal-footer">
        <div className="footer-grid-layout">
          <div className="footer-brand-column">
            <div className="footer-logo-wrap">
              <img src="assets/logo.png" alt="AstroInterior Logo" className="footer-logo-img" width="36" height="36" />
              <span className="footer-brand-title">ASTROINTERIOR</span>
            </div>
            <p className="footer-brand-desc">India's premier Astro Interior Design consultancy — merging Vedic astrology with luxury interior architecture to create birth-chart-aligned living environments.</p>
          </div>
          <div className="footer-links-column">
            <h4>Quick Navigation</h4>
            <nav aria-label="Footer navigation">
            <ul>
              <li><a href="#hero">Home</a></li>
              <li><a href="#about">About Astro Interior</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#portfolio">Portfolio</a></li>
              <li><a href="#process">Our Process</a></li>
              <li><a href="#packages">Consultation Packages</a></li>
              <li><a href="#faq">FAQs</a></li>
              <li><a href="#contact">Book Consultation</a></li>
              <li><a href="blog.html">Knowledge Hub</a></li>
              <li><a href="/gallery">Design Gallery</a></li>
              <li><a href="#sample-report">Sample Report</a></li>
            </ul>
            </nav>
          </div>
          <div className="footer-social-column">
            <h4>Connect</h4>
            <div className="footer-socials-grid">
              <a href="https://instagram.com" target="_blank" rel="noopener">Instagram</a>
              <a href="https://facebook.com" target="_blank" rel="noopener">Facebook</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener">LinkedIn</a>
              <a href="https://wa.me/917838048195" target="_blank" rel="noopener">WhatsApp</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom-line">
          <span>&copy; 2026 AstroInterior by Richa Agarwal. All Rights Reserved.</span>
          <div className="footer-bottom-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>

    </div>

    {/* 2. ONBOARDING FORM VIEW (hides page-home when active) */}
    <div id="page-onboarding" className="page-view">
      
      <section id="onboarding-section">
        <div className="section-header">
          <span className="section-subtitle">Complete Your Profile</span>
          <h2 className="section-title">Tell Us About Your Home</h2>
        </div>
        
        <p style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3rem', color: 'var(--c-text-secondary)', fontSize: '1.05rem', lineHeight: '1.8' }}>
          The more details you provide, the more personalized and accurate your Astro Interior consultation will be. All information is kept strictly confidential.
        </p>

        {/* 3-Step Genius Bar Wizard Progress Ribbon */}
        <div className="wizard-progress-container">
          <div className="wizard-progress-bar">
            <div className="wizard-progress-fill" id="wizard-progress-fill"></div>
            <div className="wizard-step-dot-wrap">
              <div className="wizard-step-dot active" data-step="1">1</div>
              <div className="wizard-step-dot" data-step="2">2</div>
              <div className="wizard-step-dot" data-step="3">3</div>
            </div>
          </div>
          <div className="wizard-steps-text">
            <span>1. Profile & Intent</span>
            <span>2. Cosmic Nodes</span>
            <span>3. Spatial Details</span>
          </div>
        </div>

        <form id="onboarding-form" className="onboarding-form">
          
          {/* STEP 1: Personal Details & Intent */}
          <div className="wizard-step-panel active" data-step="1">
            <div className="onboarding-section-card">
              <h3 className="onboarding-section-title" style={{ marginBottom: '1.5rem' }}>
                <span className="onboarding-section-num">1</span>
                Tell Us About Yourself
              </h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="ob-name">Full Name *</label>
                  <input type="text" id="ob-name" name="name" required placeholder="Enter your full name" style={{ height: '52px', fontSize: '0.95rem' }} />
                </div>
                <div className="form-group">
                  <label htmlFor="ob-email">Email Address *</label>
                  <input type="email" id="ob-email" name="email" required placeholder="name@domain.com" style={{ height: '52px', fontSize: '0.95rem' }} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="ob-mobile">Mobile Number *</label>
                <input type="tel" id="ob-mobile" name="mobile" required placeholder="+91 XXXXX XXXXX" style={{ height: '52px', fontSize: '0.95rem' }} />
              </div>
            </div>

            <div className="onboarding-section-card" style={{ marginTop: '2rem' }}>
              <h3 className="onboarding-section-title" style={{ marginBottom: '1.5rem' }}>
                <span className="onboarding-section-num">2</span>
                Choose Areas of Alignment
              </h3>
              <p style={{ color: 'var(--c-text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Select the primary zones in your home needing astrological calibration.</p>
              
              <div className="concern-cards-grid">
                <label className="onboarding-concern-card" aria-label="Entrance alignment">
                  <input type="checkbox" name="areas" value="Entrance" />
                  <span className="card-icon">🚪</span>
                  <span className="card-label">Entrance</span>
                </label>
                <label className="onboarding-concern-card" aria-label="Living room alignment">
                  <input type="checkbox" name="areas" value="Living Room" />
                  <span className="card-icon">🛋️</span>
                  <span className="card-label">Living Room</span>
                </label>
                <label className="onboarding-concern-card" aria-label="Kitchen alignment">
                  <input type="checkbox" name="areas" value="Kitchen" />
                  <span className="card-icon">🍳</span>
                  <span className="card-label">Kitchen</span>
                </label>
                <label className="onboarding-concern-card" aria-label="Master bedroom alignment">
                  <input type="checkbox" name="areas" value="Master Bedroom" />
                  <span className="card-icon">🛏️</span>
                  <span className="card-label">Master Bed</span>
                </label>
                <label className="onboarding-concern-card" aria-label="Pooja room alignment">
                  <input type="checkbox" name="areas" value="Pooja Room" />
                  <span className="card-icon">🧘</span>
                  <span className="card-label">Pooja Room</span>
                </label>
                <label className="onboarding-concern-card" aria-label="Executive office alignment">
                  <input type="checkbox" name="areas" value="Office" />
                  <span className="card-icon">💼</span>
                  <span className="card-label">Home Office</span>
                </label>
              </div>
            </div>
          </div>

          {/* STEP 2: Birth Information & Property Coordinates */}
          <div className="wizard-step-panel" data-step="2">
            <div className="onboarding-section-card">
              <h3 className="onboarding-section-title" style={{ marginBottom: '1.5rem' }}>
                <span className="onboarding-section-num">3</span>
                Astrological Coordinates
              </h3>
              <p style={{ color: 'var(--c-text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>We calculate your precise natal coordinate system. Exact values prevent layout errors.</p>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="ob-dob">Date of Birth *</label>
                  <input type="date" id="ob-dob" name="dob" required style={{ height: '52px', fontSize: '0.95rem' }} />
                </div>
                <div className="form-group">
                  <label htmlFor="ob-tob">Time of Birth *</label>
                  <input type="time" id="ob-tob" name="tob" required style={{ height: '52px', fontSize: '0.95rem' }} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="ob-pob">Place of Birth *</label>
                <input type="text" id="ob-pob" name="pob" required placeholder="City, State, Country" style={{ height: '52px', fontSize: '0.95rem' }} />
              </div>
            </div>

            <div className="onboarding-section-card" style={{ marginTop: '2rem' }}>
              <h3 className="onboarding-section-title" style={{ marginBottom: '1.5rem' }}>
                <span className="onboarding-section-num">4</span>
                Primary Energy Aspirations
              </h3>
              <p style={{ color: 'var(--c-text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Select the primary cosmic vibrations you wish to amplify.</p>
              
              <div className="concern-cards-grid">
                <label className="onboarding-concern-card" aria-label="Amplify career">
                  <input type="checkbox" name="challenges" value="Career" />
                  <span className="card-icon">📈</span>
                  <span className="card-label">Career</span>
                </label>
                <label className="onboarding-concern-card" aria-label="Amplify health">
                  <input type="checkbox" name="challenges" value="Health" />
                  <span className="card-icon">🌱</span>
                  <span className="card-label">Health</span>
                </label>
                <label className="onboarding-concern-card" aria-label="Amplify finance">
                  <input type="checkbox" name="challenges" value="Finance" />
                  <span className="card-icon">💰</span>
                  <span className="card-label">Finance</span>
                </label>
                <label className="onboarding-concern-card" aria-label="Amplify relationships">
                  <input type="checkbox" name="challenges" value="Relationships" />
                  <span className="card-icon">🤝</span>
                  <span className="card-label">Harmony</span>
                </label>
                <label className="onboarding-concern-card" aria-label="Amplify peace of mind">
                  <input type="checkbox" name="challenges" value="Peace of Mind" />
                  <span className="card-icon">🧘</span>
                  <span className="card-label">Peace</span>
                </label>
                <label className="onboarding-concern-card" aria-label="Amplify other concerns">
                  <input type="checkbox" name="challenges" value="Other" />
                  <span className="card-icon">✦</span>
                  <span className="card-label">Other</span>
                </label>
              </div>
            </div>
          </div>

          {/* STEP 3: Property Details & Floorplan Upload */}
          <div className="wizard-step-panel" data-step="3">
            <div className="onboarding-section-card">
              <h3 className="onboarding-section-title" style={{ marginBottom: '1.5rem' }}>
                <span className="onboarding-section-num">5</span>
                Spatial Specifications
              </h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="ob-property-type">Property Configuration *</label>
                  <select id="ob-property-type" name="property_type" required style={{ height: '52px', fontSize: '0.95rem' }}>
                    <option value="" disabled selected>Select configuration</option>
                    <option value="1 BHK">1 BHK</option>
                    <option value="2 BHK">2 BHK</option>
                    <option value="3 BHK">3 BHK</option>
                    <option value="4 BHK">4 BHK</option>
                    <option value="Bungalow">Bungalow / Villa</option>
                  </select>
                </div>
                <div className="form-group" id="ob-builtup-area-group">
                  <label htmlFor="ob-builtup-area">Approximate Area (sq. ft.) *</label>
                  <input type="number" id="ob-builtup-area" name="builtup_area" placeholder="e.g. 2400" style={{ height: '52px', fontSize: '0.95rem' }} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="ob-city">City *</label>
                  <input type="text" id="ob-city" name="city" required placeholder="New Delhi" style={{ height: '52px', fontSize: '0.95rem' }} />
                </div>
                <div className="form-group">
                  <label htmlFor="ob-state">State *</label>
                  <input type="text" id="ob-state" name="state" required placeholder="Delhi" style={{ height: '52px', fontSize: '0.95rem' }} />
                </div>
              </div>
            </div>

            <div className="onboarding-section-card" style={{ marginTop: '2rem' }}>
              <h3 className="onboarding-section-title" style={{ marginBottom: '1.5rem' }}>
                <span className="onboarding-section-num">6</span>
                Property Floorplan & Layout (Optional)
              </h3>
              <p style={{ color: 'var(--c-text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Upload existing layout plans, site maps, or floor drawings to accelerate chart alignment.</p>
              
              <div className="upload-zone" id="ob-upload-zone" style={{ border: '2px dashed var(--c-accent-border)', borderRadius: '16px', padding: '2.5rem', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s' }}>
                <div className="upload-zone-content">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" stroke-width="1.5" style={{ marginBottom: '1rem' }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  <p style={{ fontSize: '0.92rem', fontWeight: '500', marginBottom: '0.4rem' }}>Drag & drop floorplan files here or <span style={{ color: 'var(--c-accent)', textDecoration: 'underline' }}>browse files</span></p>
                  <span style={{ fontSize: '0.78rem', color: 'var(--c-text-secondary)' }}>Supports PDF, JPG, PNG up to 12MB</span>
                </div>
                <input type="file" id="ob-file-input" multiple accept="image/*,application/pdf" style={{ display: 'none' }} />
              </div>
              <div className="upload-preview-grid" id="ob-upload-previews" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}></div>
            </div>

            <div className="onboarding-section-card" style={{ marginTop: '2rem' }}>
              <h3 className="onboarding-section-title" style={{ marginBottom: '1.5rem' }}>
                <span className="onboarding-section-num">7</span>
                Additional Notes
              </h3>
              <div className="form-group">
                <textarea id="ob-notes" name="notes" rows={4} placeholder="Share any specific spatial issues, sleep patterns, layout constraints, or goals for this property alignment..." style={{ borderRadius: '12px', fontSize: '0.95rem' }}></textarea>
              </div>
              <div style={{ marginTop: '1.5rem' }}>
                <label className="consent-label" style={{ display: 'flex', gap: '1rem', alignItems: 'start', fontSize: '0.85rem', color: 'var(--c-text-secondary)', cursor: 'pointer', userSelect: 'none' }}>
                  <input type="checkbox" id="ob-consent" name="consent" required style={{ width: '20px', height: '20px', marginTop: '2px', cursor: 'pointer', borderRadius: '4px', border: '1px solid var(--c-accent-border)' }} />
                  <span>I authorize AstroInterior by Richa Agarwal to analyze these coordinates. All data is handled under strict professional privacy guidelines. *</span>
                </label>
              </div>
            </div>
          </div>

          {/* Wizard Navigation Footer */}
          <div className="wizard-footer-buttons">
            <button type="button" className="btn-gold" id="wizard-prev-btn" style={{ background: 'none', border: '1px solid var(--c-accent-border)', color: 'var(--c-text-primary)', display: 'none', padding: '1rem 2.5rem', borderRadius: '8px' }}>Back</button>
            <div style={{ marginLeft: 'auto' }}>
              <button type="button" className="btn-gold" id="wizard-next-btn" style={{ padding: '1rem 3.5rem', borderRadius: '8px' }}>Next Step</button>
              <button type="submit" className="btn-gold" id="ob-submit-btn" style={{ display: 'none', padding: '1rem 3.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Initialize Calibration</button>
            </div>
          </div>
        </form>

        {/* Onboarding Success Apple-Ticket View */}
        <div id="onboarding-success" style={{ display: 'none' }}>
          <div className="onboarding-success-card">
            <span className="success-sparkle">✦</span>
            <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--c-text-primary)', fontSize: '2.2rem', marginBottom: '1.5rem', fontWeight: '400', letterSpacing: '0.02em' }}>Calibration Initialized</h3>
            <p style={{ color: 'var(--c-text-secondary)', fontSize: '0.98rem', maxWidth: '500px', margin: '0 auto 2.5rem', lineHeight: '1.8', fontFamily: 'var(--font-body)' }}>
              Thank you. Our lead consultant, <strong>Richa Agarwal</strong>, is analyzing your astrological birth-grid relative to your property coordinates. You will receive a personalized spatial evaluation blueprint within 24 hours.
            </p>
            <a href="#hero" className="btn-gold" style={{ padding: '1.1rem 3.5rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', fontSize: '0.95rem', border: 'none', cursor: 'pointer' }}>Return to Dashboard</a>
          </div>
        </div>
      </section>

    </div>

  </main>

  {/* ✦ Mobile Expandable FAB (replaces scattered floating buttons on mobile) */}
  <div className="mobile-fab" id="mobile-fab">
    <div className="mobile-fab-actions">
      <a href="#contact" className="fab-action">
        <div className="fab-action-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        </div>
        <span className="fab-action-label">Book Consultation</span>
      </a>
      <a href="https://wa.me/917838048195?text=Hello%20AstroInterior%2C%20I%20would%20like%20to%20book%20an%20Astro%20Interior%20Consultation." target="_blank" rel="noopener" className="fab-action">
        <div className="fab-action-btn" style={{ color: '#25D366' }}>
          <svg viewBox="0 0 16 16" fill="currentColor" width="20" height="20"><path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326z"/></svg>
        </div>
        <span className="fab-action-label">WhatsApp</span>
      </a>
      <a href="tel:+917838048195" className="fab-action">
        <div className="fab-action-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        </div>
        <span className="fab-action-label">Call Now</span>
      </a>
      <a href="assets/Transcend_Astro_Sample_Report.pdf" download="AstroInterior Sample Report.pdf" className="fab-action">
        <div className="fab-action-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/></svg>
        </div>
        <span className="fab-action-label">Sample Report</span>
      </a>
    </div>
    <button className="mobile-fab-trigger" id="mobile-fab-trigger" aria-label="Quick actions">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
    </button>
  </div>

  {/* Bottom Sheet Backdrop */}
  <div className="bottom-sheet-backdrop" id="bottom-sheet-backdrop"></div>

  {/* Services Detail Bottom Sheet */}
  <div className="bottom-sheet" id="services-bottom-sheet">
    <div className="bottom-sheet-handle"></div>
    <div className="bottom-sheet-header">
      <h3 id="services-sheet-title">Service Details</h3>
      <button className="bottom-sheet-close" aria-label="Close">&times;</button>
    </div>
    <div className="bottom-sheet-body" id="services-sheet-body">
      {/* Content injected dynamically by JS */}
    </div>
  </div>

  {/* Founder Bottom Sheet */}
  <div className="bottom-sheet" id="founder-bottom-sheet">
    <div className="bottom-sheet-handle"></div>
    <div className="bottom-sheet-header">
      <h3>Meet the Founder</h3>
      <button className="bottom-sheet-close" aria-label="Close">&times;</button>
    </div>
    <div className="bottom-sheet-body">
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <img src="assets/founder_richa.png" alt="Richa Agarwal" style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--c-accent-border)' }} />
      </div>
      <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', textAlign: 'center', marginBottom: '0.25rem' }}>Richa Agarwal</h4>
      <p style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--c-accent)', marginBottom: '1.5rem' }}>Pioneer of Astro-Interior Advisory</p>
      <p style={{ fontSize: '0.9rem', lineHeight: '1.7', color: 'var(--c-text-secondary)', marginBottom: '1rem' }}>With over 24 years of experience delivering award-winning interiors, Richa founded AstroInterior to bridge architectural layout and cosmic energy.</p>
      <p style={{ fontSize: '0.9rem', lineHeight: '1.7', color: 'var(--c-text-secondary)', marginBottom: '1.5rem' }}>By integrating modern architecture, environmental psychology, and Vedic astrological calculations, she provides a sophisticated design approach that supports your life trajectory.</p>
      <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
        <div style={{ textAlign: 'center' }}><strong style={{ fontSize: '1.2rem', color: 'var(--c-text-primary)' }}>24+</strong><br /><span style={{ fontSize: '0.78rem', color: 'var(--c-text-secondary)' }}>Years</span></div>
        <div style={{ textAlign: 'center' }}><strong style={{ fontSize: '1.2rem', color: 'var(--c-text-primary)' }}>500+</strong><br /><span style={{ fontSize: '0.78rem', color: 'var(--c-text-secondary)' }}>Spaces Aligned</span></div>
      </div>
      <a href="#contact" className="btn-gold" style={{ width: '100%', textAlign: 'center', display: 'block', padding: '0.9rem', fontSize: '0.88rem', borderRadius: '8px' }}>Book Consultation</a>
    </div>
  </div>


  <a href="assets/Transcend_Astro_Sample_Report.pdf" download="AstroInterior Sample Report.pdf" className="floating-sample-report" id="floating-sample-report" aria-label="Download Sample Report">
    <span className="sample-report-glow"></span>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
    <span className="sample-report-text">Sample Report</span>
  </a>

  {/* Custom Cursor (Desktop) */}
  <div className="custom-cursor" id="custom-cursor">
    <div className="cursor-dot"></div>
    <div className="cursor-ring"></div>
  </div>

  {/* Floating WhatsApp FAB */}
  <a href="https://wa.me/917838048195?text=Hello%20AstroInterior%2C%20I%20would%20like%20to%20book%20an%20Astro%20Interior%20Consultation." target="_blank" rel="noopener" className="whatsapp-fab" id="whatsapp-fab" aria-label="Chat on WhatsApp">
    <svg width="28" height="28" fill="currentColor" viewBox="0 0 16 16" className="bi bi-whatsapp">
      <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
    </svg>
    <span className="fab-tooltip">Chat with us</span>
  </a>

  {/* Back to Top Button */}
  <button className="back-to-top-btn" id="back-to-top-btn" aria-label="Back to top">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="18 15 12 9 6 15"/>
    </svg>
  </button>

  {/* Mobile Sticky Bottom Navigation Bar */}
  <div className="mobile-sticky-cta" id="mobile-sticky-cta">
    <a href="#hero" className="mobile-sticky-link active" aria-label="Home">
      <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3m10-11v11a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
      </svg>
      Home
    </a>
    <a href="#services" className="mobile-sticky-link" aria-label="Services">
      <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
      </svg>
      Services
    </a>
    <a href="https://wa.me/917838048195?text=Hello%20AstroInterior%2C%20I%20would%20like%20to%20book%20an%20Astro%20Interior%20Consultation." target="_blank" rel="noopener" className="mobile-sticky-link" aria-label="Chat on WhatsApp">
      <svg fill="currentColor" viewBox="0 0 16 16">
        <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
      </svg>
      WhatsApp
    </a>
    <a href="tel:+917838048195" className="mobile-sticky-link" aria-label="Call Us">
      <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
      </svg>
      Call
    </a>
    <a href="#contact" className="mobile-sticky-link" aria-label="Book Consultation">
      <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
      Book
    </a>
  </div>
  
  <a href="#contact" className="floating-book-consult-btn-desktop" id="floating-book-consult-btn-desktop">Book Consultation</a>

  {/* Portfolio Lightbox Modal */}
  <div className="portfolio-lightbox" id="portfolio-lightbox">
    <div className="lightbox-backdrop"></div>
    <div className="lightbox-body">
      <button className="lightbox-close-btn" id="lightbox-close-btn" aria-label="Close lightbox">&times;</button>
      <button className="lightbox-nav lightbox-prev" id="lightbox-prev" aria-label="Previous project">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <button className="lightbox-nav lightbox-next" id="lightbox-next" aria-label="Next project">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 6 15 12 9 18"/></svg>
      </button>
      <div className="lightbox-image-wrap">
        <img src="" alt="" id="lightbox-main-img" className="lightbox-main-img" />
      </div>
      <div className="lightbox-details-panel">
        <h3 className="lightbox-project-title" id="lightbox-title"></h3>
        <div className="lightbox-counter"><span id="lightbox-current-index">1</span> of <span id="lightbox-total-count">12</span></div>
      </div>
    </div>
  </div>

  {/* Exit Intent Modal */}
  <div id="exit-intent-modal" className="luxury-modal" aria-hidden="true" style={{ display: 'none', position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', background: 'rgba(18, 19, 22, 0.7)', backdropFilter: 'blur(8px)', zIndex: '9999', justifyContent: 'center', alignItems: 'center', opacity: '0', transition: 'opacity 0.4s ease' }}>
    <div className="modal-card" style={{ background: 'var(--c-bg-primary)', border: '1px solid var(--c-accent-border)', borderRadius: '20px', padding: '3rem', maxWidth: '500px', width: '90%', position: 'relative', boxShadow: 'var(--card-shadow)', textAlign: 'center' }}>
      <button id="close-modal-btn" aria-label="Close modal" style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--c-text-secondary)' }}>&times;</button>
      <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--c-accent)', fontWeight: '600', letterSpacing: '0.15em', display: 'block', marginBottom: '1rem' }}>✦ Exclusive Spatial Blueprint</span>
      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--c-text-primary)', marginBottom: '1rem', fontWeight: '400' }}>Download the Astro-Interior Guide</h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--c-text-secondary)', lineHeight: '1.6', marginBottom: '2rem' }}>Get our complimentary spatial calibration guide to identify non-destructive remedies for your home immediately.</p>
      
      <form id="exit-intent-form" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input type="text" id="exit-name" placeholder="Your Name" required style={{ padding: '0.8rem 1rem', border: '1px solid var(--c-accent-border)', borderRadius: '8px', fontFamily: 'var(--font-body)', fontSize: '0.9rem', outline: 'none', backgroundColor: '#FFF', color: '#1E1E1E' }} />
        <input type="email" id="exit-email" placeholder="Your Email Address" required style={{ padding: '0.8rem 1rem', border: '1px solid var(--c-accent-border)', borderRadius: '8px', fontFamily: 'var(--font-body)', fontSize: '0.9rem', outline: 'none', backgroundColor: '#FFF', color: '#1E1E1E' }} />
        <button type="submit" className="btn-gold" style={{ padding: '1rem', fontSize: '0.9rem', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Claim Free Blueprint</button>
      </form>
    </div>
  </div>

  {/* Apple-Grade Floating Sticky Bottom Navigation Bar */}
  <div className="mobile-bottom-nav" id="mobile-bottom-nav">
    <a href="#hero" className="mobile-bottom-link active" id="nav-btn-home">
      <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
      <span>Home</span>
    </a>
    <a href="#services" className="mobile-bottom-link" id="nav-btn-services">
      <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
      <span>Services</span>
    </a>
    <a href="#portfolio" className="mobile-bottom-link" id="nav-btn-portfolio">
      <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
      <span>Projects</span>
    </a>
    <a href="#sample-report" className="mobile-bottom-link" id="nav-btn-report">
      <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
      <span>Report</span>
    </a>
    <a href="#contact" className="mobile-bottom-link" id="nav-btn-consult">
      <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      <span>Consult</span>
    </a>
  </div>

  {/* Global Frosted Glass Autocomplete Search Overlay */}
  <div className="search-overlay" id="search-overlay" aria-hidden="true" style={{ display: 'none' }}>
    <div className="search-modal-content" style={{ maxWidth: '600px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="search-header">
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: '#FFF', margin: '0' }}>Global Search</h3>
        <button id="close-search-btn" aria-label="Close search" style={{ background: 'none', border: 'none', fontSize: '2rem', cursor: 'pointer', color: 'rgba(255, 255, 255, 0.6)', lineHeight: '1' }}>&times;</button>
      </div>
      
      <div className="search-input-wrap">
        <svg className="search-icon-svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="text" className="search-input-field" id="global-search-input" placeholder="Search zodiac, rooms, colors, cities..." />
      </div>
      
      <div className="search-results-panel" id="search-results-panel">
        <div style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.4)', marginTop: '4rem' }}>
          <p>Type to begin searching the AstroInterior ecosystem...</p>
        </div>
      </div>
    </div>
  </div>

  {/* Interactive Report Preview Modal */}
  <div className="report-modal" id="report-preview-modal" aria-hidden="true" style={{ display: 'none' }}>
    <div className="report-modal-content">
      <button id="close-report-modal-btn" aria-label="Close preview" style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', fontSize: '2rem', cursor: 'pointer', color: 'var(--c-text-secondary)', zIndex: '10' }}>&times;</button>
      
      <div style={{ textAlign: 'center', borderBottom: '1px solid var(--c-accent-border)', paddingBottom: '1rem' }}>
        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--c-accent)', fontWeight: '600', letterSpacing: '0.1em' }}>Interactive Preview</span>
        <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', margin: '0.3rem 0 0' }}>AstroInterior Sample Report</h4>
      </div>
      
      <div className="report-modal-body">
        
        {/* Page 1: Cover */}
        <div className="report-preview-page">
          <div style={{ borderLeft: '4px solid var(--c-accent)', paddingLeft: '1.5rem', marginBottom: '2rem' }}>
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--c-text-secondary)', letterSpacing: '0.1em' }}>Page 1: Evaluation Dossier</span>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', margin: '0.5rem 0 0' }}>Astro-Spatial Report</h1>
          </div>
          <p style={{ fontSize: '0.95rem', lineHeight: '1.7', color: 'var(--c-text-secondary)', marginBottom: '1.5rem' }}>
            This report represents a comprehensive evaluation of the primary resident's birth chart (Kundali) mapped directly to the local architectural floorplan coordinates. We seek to align the elemental grid lines to amplify wealth, health, and peace of mind.
          </p>
          <div style={{ fontSize: '0.85rem', padding: '1rem', background: 'var(--c-bg-secondary)', borderRadius: '8px', color: 'var(--c-text-secondary)' }}>
            <strong>Consultant:</strong> Richa Agarwal (AstroInterior)<br />
            <strong>Project Reference:</strong> Delhi Penthouse
          </div>
        </div>

        {/* Page 2: Astronomical Coordinates */}
        <div className="report-preview-page">
          <div style={{ borderLeft: '4px solid var(--c-accent)', paddingLeft: '1.5rem', marginBottom: '2rem' }}>
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--c-text-secondary)', letterSpacing: '0.1em' }}>Page 2: Birth Chart Casting</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', margin: '0.5rem 0 0' }}>Elemental Energy Analysis</h2>
          </div>
          <p style={{ fontSize: '0.95rem', lineHeight: '1.7', color: 'var(--c-text-secondary)', marginBottom: '1rem' }}>
            Occupant birth details indicate a strong presence of the Fire Element, with Venus as the dominant ruling planet in the 10th house (career).
          </p>
          <table style={{ width: '100%', fontSize: '0.85rem', borderCollapse: 'collapse', marginTop: '1rem', color: 'var(--c-text-secondary)' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--c-accent-border)', textAlign: 'left' }}>
                <th style={{ padding: '0.5rem 0' }}>Quadrant</th>
                <th style={{ padding: '0.5rem 0' }}>Element</th>
                <th style={{ padding: '0.5rem 0' }}>Vedic Planet</th>
                <th style={{ padding: '0.5rem 0' }}>Design Remedy</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.03)' }}>
                <td style={{ padding: '0.5rem 0' }}>Northeast</td>
                <td style={{ padding: '0.5rem 0' }}>Water</td>
                <td style={{ padding: '0.5rem 0' }}>Jupiter</td>
                <td style={{ padding: '0.5rem 0' }}>Pooja Temple; Blue tints</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.03)' }}>
                <td style={{ padding: '0.5rem 0' }}>Southeast</td>
                <td style={{ padding: '0.5rem 0' }}>Fire</td>
                <td style={{ padding: '0.5rem 0' }}>Venus</td>
                <td style={{ padding: '0.5rem 0' }}>Kitchen; Gold trims</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.03)' }}>
                <td style={{ padding: '0.5rem 0' }}>Southwest</td>
                <td style={{ padding: '0.5rem 0' }}>Earth</td>
                <td style={{ padding: '0.5rem 0' }}>Rahu / Saturn</td>
                <td style={{ padding: '0.5rem 0' }}>Master Bed; heavy oak</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Page 3: Spatial Layout Remedies */}
        <div className="report-preview-page">
          <div style={{ borderLeft: '4px solid var(--c-accent)', paddingLeft: '1.5rem', marginBottom: '2rem' }}>
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--c-text-secondary)', letterSpacing: '0.1em' }}>Page 3: Spatial Remedies</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', margin: '0.5rem 0 0' }}>Non-Destructive Calibrations</h2>
          </div>
          <p style={{ fontSize: '0.95rem', lineHeight: '1.7', color: 'var(--c-text-secondary)', marginBottom: '1.5rem' }}>
            We recommend positioning the executive desk facing North-Northeast to align with Mercury's intellectual rays. Balance the room's electromagnetic field using a green slate backsplash and warm brass lighting trims.
          </p>
          <div style={{ padding: '1rem', border: '1px solid var(--c-accent-border)', borderRadius: '8px', fontSize: '0.85rem', color: 'var(--c-text-secondary)' }}>
            <strong>Action Item:</strong> Replace dark grey curtains in the bedroom with light cream organic linen to ground lunar energy.
          </div>
        </div>

      </div>
      
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center', borderTop: '1px solid var(--c-accent-border)', paddingTop: '1.5rem' }}>
        <a href="assets/Transcend_Astro_Sample_Report.pdf" download="AstroInterior Sample Report.pdf" className="btn-gold" style={{ padding: '0.8rem 2.5rem', fontSize: '0.9rem', borderRadius: '8px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
          Download Full PDF
        </a>
      </div>
    </div>
  </div>

  {/* Page Transition Overlay */}
  <div className="page-transition-overlay" id="page-transition"></div>

  {/* Scripts */}
  <script src="app.js"></script>

      
      {/* GSAP and animations libraries */}
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" strategy="beforeInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" strategy="beforeInteractive" />
      
      {/* Main app interaction logic script */}
      <Script src="/app.js" strategy="lazyOnload" />
    </>
  );
}
