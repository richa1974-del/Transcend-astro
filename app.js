/**
 * Transcend Consultant V3 — Premium Application Script
 * GSAP-powered animations, magnetic buttons, custom cursor, premium interactions
 */
document.addEventListener('DOMContentLoaded', () => {

  // --- 0. LUXURY PRELOADER PROGRESS & ANIMATION ---
  const preloader = document.getElementById('preloader');
  const progress = document.getElementById('preloader-progress');
  
  let progressWidth = 0;
  const preloaderInterval = setInterval(() => {
    if (progressWidth < 80) {
      progressWidth += Math.random() * 10;
      if (progress) progress.style.width = `${progressWidth}%`;
    }
  }, 80);

  window.addEventListener('load', () => {
    clearInterval(preloaderInterval);
    if (progress) progress.style.width = '100%';
    
    setTimeout(() => {
      if (preloader) {
        preloader.classList.add('fade-out');
      }
      triggerHeroAnimations();
    }, 400);
  });

  function triggerHeroAnimations() {
    if (window.gsap) {
      const gsap = window.gsap;
      
      // Reveal header
      gsap.fromTo('#main-header', 
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: 0.1 }
      );
      
      // Staggered hero text reveals
      gsap.fromTo('.hero-anim',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', stagger: 0.15, delay: 0.3 }
      );
      
      // Stats item reveals
      gsap.fromTo('.trust-stat-card',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.1, delay: 0.8 }
      );
    } else {
      // Fallback
      const anims = document.querySelectorAll('.hero-anim');
      anims.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
      const headerEl = document.getElementById('main-header');
      if (headerEl) {
        headerEl.style.opacity = '1';
        headerEl.style.transform = 'translateY(0)';
      }
    }
  }

  // --- 1. HEADER SCROLL & STICKY BEHAVIOR ---
  const header = document.getElementById('main-header');
  
  if (header) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScroll = currentScroll;
    }, { passive: true });
  }

  // --- 2. MOBILE NAVIGATION TOGGLE (Full-screen overlay) ---
  const menuToggle = document.getElementById('menu-toggle');
  const navbarLinks = document.getElementById('navbar-links');
  let menuScrollPos = 0;

  function openMenu() {
    menuScrollPos = window.scrollY;
    navbarLinks.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.classList.add('menu-open');
    document.body.classList.add('menu-overlay-open');
    document.body.style.top = `-${menuScrollPos}px`;
    
    if (window.gsap) {
      window.gsap.fromTo(navbarLinks.querySelectorAll('li'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out', delay: 0.1 }
      );
    }
  }

  function closeMenu() {
    navbarLinks.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.classList.remove('menu-open');
    document.body.classList.remove('menu-overlay-open');
    document.body.style.top = '';
    window.scrollTo(0, menuScrollPos);
  }

  if (menuToggle && navbarLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navbarLinks.classList.contains('active');
      if (!isOpen) {
        openMenu();
      } else {
        closeMenu();
      }
    });

    navbarLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });
  }

  // --- 3. SPA ROUTER WITH ANCHOR SMOOTH SCROLL ---
  const pageViews = document.querySelectorAll('.page-view');
  const navLinks = document.querySelectorAll('.nav-link');

  function navigateTo(hash) {
    if (!hash || hash === '#') hash = '#home';
    
    const pageId = hash === '#onboarding' ? 'page-onboarding' : 'page-home';
    
    pageViews.forEach(view => {
      view.classList.remove('active-route', 'fade-in-route');
    });
    
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
      targetPage.classList.add('active-route');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          targetPage.classList.add('fade-in-route');
        });
      });
    }
    
    navLinks.forEach(link => {
      link.classList.remove('active-link');
      const linkHash = link.getAttribute('href');
      if (linkHash === hash) {
        link.classList.add('active-link');
      }
    });
    
    if (pageId === 'page-home') {
      if (hash === '#home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const sectionTarget = document.querySelector(hash);
        if (sectionTarget) {
          setTimeout(() => {
            sectionTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  window.addEventListener('hashchange', () => {
    navigateTo(window.location.hash);
  });

  navigateTo(window.location.hash || '#home');

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const hash = anchor.getAttribute('href');
      if (hash && hash.startsWith('#')) {
        e.preventDefault();
        window.location.hash = hash;
      }
    });
  });

  // --- 4. GSAP ANIMATIONS ---
  function initGSAP() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      // Retry after a short delay if GSAP hasn't loaded yet
      setTimeout(initGSAP, 200);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Hero entrance animations
    const heroAnims = document.querySelectorAll('.hero-anim');
    if (heroAnims.length > 0) {
      gsap.fromTo(heroAnims, 
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.3 }
      );
    }

    // Section headers - fade up on scroll
    gsap.utils.toArray('.section-header').forEach(header => {
      gsap.fromTo(header,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            once: true
          }
        }
      );
    });

    // Benefit cards - staggered reveal
    gsap.utils.toArray('.benefit-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.7,
          delay: i * 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            once: true
          }
        }
      );
    });

    // Services detail cards
    gsap.utils.toArray('.services-detail-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 85%', once: true }
        }
      );
    });

    // Portfolio items - clip-path wipe reveal
    gsap.utils.toArray('.portfolio-item').forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, y: 30, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.6,
          delay: (i % 3) * 0.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: item, start: 'top 90%', once: true }
        }
      );
    });

    // Timeline steps - stagger from left
    gsap.utils.toArray('.timeline-step').forEach((step, i) => {
      gsap.fromTo(step,
        { opacity: 0, x: -50 },
        {
          opacity: 1, x: 0, duration: 0.7,
          delay: i * 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: step, start: 'top 85%', once: true }
        }
      );
    });

    // Package cards - scale up reveal
    gsap.utils.toArray('.package-pricing-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50, scale: 0.92 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.7,
          delay: i * 0.12,
          ease: 'back.out(1.2)',
          scrollTrigger: { trigger: card, start: 'top 85%', once: true }
        }
      );
    });

    // Testimonial cards
    gsap.utils.toArray('.testimonial-lux-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8,
          delay: i * 0.2,
          ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 85%', once: true }
        }
      );
    });

    // Founder section parallax
    const founderImg = document.querySelector('.founder-visual-wrap img');
    if (founderImg) {
      gsap.to(founderImg, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: '.founder-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      });
    }

    // Discover section parallax
    const discoverImg = document.querySelector('.discover-img');
    if (discoverImg) {
      gsap.to(discoverImg, {
        y: -30, scale: 1.05,
        ease: 'none',
        scrollTrigger: {
          trigger: '.discover-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2
        }
      });
    }

    // FAQ items
    gsap.utils.toArray('.faq-item').forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.5,
          delay: i * 0.08,
          ease: 'power2.out',
          scrollTrigger: { trigger: item, start: 'top 90%', once: true }
        }
      );
    });

    // Trust section stat cards
    gsap.utils.toArray('.trust-stat-card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6,
          delay: i * 0.12,
          ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 88%', once: true }
        }
      );
    });

    // Scroll reveal sections (editorial, sample report)
    gsap.utils.toArray('.scroll-reveal').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 80%', once: true }
        }
      );
    });

    // Before/After section
    const baSection = document.querySelector('.before-after-section');
    if (baSection) {
      gsap.fromTo(baSection.querySelector('.slider-showcase'),
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: baSection, start: 'top 75%', once: true }
        }
      );
    }

    // Contact section
    const contactSection = document.querySelector('.contact-split-section');
    if (contactSection) {
      gsap.fromTo(contactSection.querySelector('.contact-split-visual'),
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: contactSection, start: 'top 80%', once: true }
        }
      );
      gsap.fromTo(contactSection.querySelector('.contact-split-form-wrap'),
        { opacity: 0, x: 40 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: contactSection, start: 'top 80%', once: true }
        }
      );
    }
  }

  // Initialize GSAP after a short delay to ensure scripts are loaded
  setTimeout(initGSAP, 100);

  // --- 5. ANIMATED STATISTICS COUNTERS ---
  const stats = document.querySelectorAll('.stat-number');
  if (stats.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const endVal = parseInt(target.getAttribute('data-target'), 10);
          if (!isNaN(endVal)) {
            animateCount(target, 0, endVal, 1800);
          }
          observer.unobserve(target);
        }
      });
    }, { threshold: 0.5 });

    stats.forEach(s => observer.observe(s));
  }

  function animateCount(el, start, end, duration) {
    let startTimestamp = null;
    const easeOutQuart = t => 1 - Math.pow(1 - t, 4);
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const rawProgress = Math.min((timestamp - startTimestamp) / duration, 1);
      const progress = easeOutQuart(rawProgress);
      el.innerText = Math.floor(progress * (end - start) + start);
      if (rawProgress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.innerText = end + "+";
      }
    };
    window.requestAnimationFrame(step);
  }

  // --- 6. PORTFOLIO FILTERS ---
  const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (filterBtns.length > 0 && portfolioItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        portfolioItems.forEach(item => {
          const categories = item.getAttribute('data-category').split(' ');
          if (filter === 'all' || categories.includes(filter)) {
            item.classList.add('show-item');
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            requestAnimationFrame(() => {
              item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            });
          } else {
            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            setTimeout(() => item.classList.remove('show-item'), 300);
          }
        });
      });
    });
  }

  // --- 7. PREMIUM BEFORE & AFTER SLIDER ---
  const slider = document.getElementById('before-after-slider');
  const handle = document.getElementById('slider-drag-handle');
  const beforeImg = document.querySelector('.before-img');

  if (slider && handle && beforeImg) {
    let isDragging = false;
    let currentPercentage = 50;

    slider.setAttribute('tabindex', '0');

    function moveSlider(clientX) {
      const rect = slider.getBoundingClientRect();
      let pos = (clientX - rect.left) / rect.width;
      pos = Math.max(0.02, Math.min(0.98, pos));
      
      currentPercentage = pos * 100;
      handle.style.left = `${currentPercentage}%`;
      beforeImg.style.clipPath = `polygon(0 0, ${currentPercentage}% 0, ${currentPercentage}% 100%, 0 100%)`;
    }

    // Mouse events
    slider.addEventListener('mousedown', (e) => {
      isDragging = true;
      slider.classList.add('slider-active');
      moveSlider(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
      slider.classList.remove('slider-active');
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      moveSlider(e.clientX);
    });

    // Touch events
    slider.addEventListener('touchstart', (e) => {
      isDragging = true;
      slider.classList.add('slider-active');
      if (e.touches.length > 0) {
        moveSlider(e.touches[0].clientX);
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
      slider.classList.remove('slider-active');
    });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      if (e.touches.length > 0) {
        moveSlider(e.touches[0].clientX);
      }
    }, { passive: true });

    // Keyboard accessibility
    slider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        currentPercentage = Math.max(2, currentPercentage - 2);
        handle.style.left = `${currentPercentage}%`;
        beforeImg.style.clipPath = `polygon(0 0, ${currentPercentage}% 0, ${currentPercentage}% 100%, 0 100%)`;
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        currentPercentage = Math.min(98, currentPercentage + 2);
        handle.style.left = `${currentPercentage}%`;
        beforeImg.style.clipPath = `polygon(0 0, ${currentPercentage}% 0, ${currentPercentage}% 100%, 0 100%)`;
      }
    });
  }

  // --- 8. FAQ ACCORDION ---
  const faqHeaders = document.querySelectorAll('.faq-header');
  if (faqHeaders.length > 0) {
    faqHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const item = header.parentElement;
        const panel = item.querySelector('.faq-panel');
        const isActive = item.classList.contains('active');
        
        document.querySelectorAll('.faq-item').forEach(i => {
          i.classList.remove('active');
          const p = i.querySelector('.faq-panel');
          if (p) p.style.maxHeight = null;
          const icon = i.querySelector('.faq-icon-indicator');
          if (icon) icon.textContent = '+';
        });

        if (!isActive) {
          item.classList.add('active');
          panel.style.maxHeight = panel.scrollHeight + "px";
          const icon = item.querySelector('.faq-icon-indicator');
          if (icon) icon.textContent = '−';
        }
      });
    });
  }

  // --- 9. CONTACT FORM SUBMISSION (with API call) ---
  const contactForm = document.getElementById('astro-contact-form');
  const formSuccessInline = document.getElementById('form-success-inline');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = document.getElementById('submit-form-btn');
      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoader = submitBtn.querySelector('.btn-loader');
      
      // Show loading state
      if (btnText) btnText.style.display = 'none';
      if (btnLoader) btnLoader.style.display = 'inline-flex';
      submitBtn.disabled = true;

      // Gather form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());

      try {
        // Try to POST to backend API
        const response = await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        // If successful, great. If not (no backend yet), still show success.
      } catch (err) {
        // Backend not available yet - graceful fallback
        console.log('Backend not available, form data:', data);
      }

      // Show inline success state
      setTimeout(() => {
        contactForm.style.display = 'none';
        if (formSuccessInline) {
          formSuccessInline.style.display = 'block';
          formSuccessInline.style.opacity = '0';
          formSuccessInline.style.transform = 'translateY(20px)';
          requestAnimationFrame(() => {
            formSuccessInline.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            formSuccessInline.style.opacity = '1';
            formSuccessInline.style.transform = 'translateY(0)';
          });
        }
      }, 800);
    });
  }

  // --- 10. PACKAGE BOOKING BUTTONS PRE-FILL ---
  document.querySelectorAll('.book-package-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const packageName = btn.getAttribute('data-package');
      
      window.location.hash = '#contact';
      
      setTimeout(() => {
        const packageSelect = document.getElementById('frm-package');
        if (packageSelect) {
          for (let option of packageSelect.options) {
            if (option.value === packageName) {
              packageSelect.value = packageName;
              break;
            }
          }
        }
      }, 200);
    });
  });

  // --- 11. ONBOARDING QUESTIONNAIRE FORM ---
  const onboardingForm = document.getElementById('onboarding-form');
  const onboardingSuccess = document.getElementById('onboarding-success');
  const propertyTypeSelect = document.getElementById('ob-property-type');
  const builtupAreaGroup = document.getElementById('ob-builtup-area-group');

  if (propertyTypeSelect && builtupAreaGroup) {
    propertyTypeSelect.addEventListener('change', () => {
      if (propertyTypeSelect.value === 'Bungalow') {
        builtupAreaGroup.style.display = 'block';
        document.getElementById('ob-builtup-area').setAttribute('required', 'required');
      } else {
        builtupAreaGroup.style.display = 'none';
        document.getElementById('ob-builtup-area').removeAttribute('required');
      }
    });
  }

  // File Upload Zone
  const uploadZone = document.getElementById('ob-upload-zone');
  const fileInput = document.getElementById('ob-file-input');
  const previewGrid = document.getElementById('ob-upload-previews');
  let uploadedFiles = [];

  if (uploadZone && fileInput && previewGrid) {
    uploadZone.addEventListener('click', () => fileInput.click());
    
    uploadZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadZone.classList.add('drag-over');
    });

    uploadZone.addEventListener('dragleave', () => {
      uploadZone.classList.remove('drag-over');
    });

    uploadZone.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadZone.classList.remove('drag-over');
      handleFiles(e.dataTransfer.files);
    });

    fileInput.addEventListener('change', () => {
      handleFiles(fileInput.files);
    });

    function handleFiles(files) {
      Array.from(files).forEach(file => {
        if (file.size > 10 * 1024 * 1024) {
          alert(`File "${file.name}" exceeds 10MB limit.`);
          return;
        }
        uploadedFiles.push(file);
        
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            addPreview(e.target.result, file.name, uploadedFiles.length - 1);
          };
          reader.readAsDataURL(file);
        } else {
          addPreview(null, file.name, uploadedFiles.length - 1);
        }
      });
    }

    function addPreview(src, name, index) {
      const item = document.createElement('div');
      item.classList.add('upload-preview-item');
      item.setAttribute('data-index', index);
      
      if (src) {
        item.innerHTML = `<img src="${src}" alt="${name}"><button class="upload-remove" type="button" data-index="${index}">&times;</button>`;
      } else {
        item.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;background:var(--c-bg-secondary);padding:0.5rem;"><span style="font-size:0.65rem;color:var(--c-text-secondary);text-align:center;word-break:break-all;">${name}</span></div><button class="upload-remove" type="button" data-index="${index}">&times;</button>`;
      }
      
      previewGrid.appendChild(item);

      item.querySelector('.upload-remove').addEventListener('click', (e) => {
        e.stopPropagation();
        item.remove();
        uploadedFiles[index] = null;
      });
    }
  }

  // Onboarding submission
  if (onboardingForm) {
    onboardingForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Try to POST to backend
      const formData = new FormData(onboardingForm);
      const data = Object.fromEntries(formData.entries());
      
      try {
        await fetch('/api/leads/onboarding', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
      } catch (err) {
        console.log('Backend not available, onboarding data:', data);
      }

      if (onboardingSuccess) {
        onboardingForm.style.display = 'none';
        onboardingSuccess.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // --- 12. HERO KEN BURNS SLIDESHOW ---
  const heroSlides = document.querySelectorAll('.hero-slide');
  if (heroSlides.length > 1) {
    let currentSlide = 0;
    const slideInterval = 6000;

    setInterval(() => {
      heroSlides[currentSlide].classList.remove('hero-slide-active');
      currentSlide = (currentSlide + 1) % heroSlides.length;
      const nextSlide = heroSlides[currentSlide];
      nextSlide.style.animation = 'none';
      nextSlide.offsetHeight;
      nextSlide.style.animation = '';
      nextSlide.classList.add('hero-slide-active');
    }, slideInterval);
  }

  // --- 13. BEFORE & AFTER TAB SWITCHING ---
  const baTabs = document.querySelectorAll('.ba-tab');
  const baBeforeImg = document.querySelector('.before-img');
  const baAfterImg = document.querySelector('.after-img');
  const baHandle = document.getElementById('slider-drag-handle');

  if (baTabs.length > 0 && baBeforeImg && baAfterImg) {
    baTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        baTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const beforeSrc = tab.getAttribute('data-before');
        const afterSrc = tab.getAttribute('data-after');

        // Fade transition
        baBeforeImg.style.opacity = '0';
        baAfterImg.style.opacity = '0';
        
        setTimeout(() => {
          baBeforeImg.src = beforeSrc;
          baAfterImg.src = afterSrc;
          
          baBeforeImg.onload = () => {
            baBeforeImg.style.transition = 'opacity 0.5s ease';
            baBeforeImg.style.opacity = '1';
          };
          baAfterImg.onload = () => {
            baAfterImg.style.transition = 'opacity 0.5s ease';
            baAfterImg.style.opacity = '1';
          };
        }, 200);

        if (baHandle) {
          baHandle.style.left = '50%';
          baBeforeImg.style.clipPath = 'polygon(0 0, 50% 0, 50% 100%, 0 100%)';
        }
      });
    });
  }

  // --- 14. PORTFOLIO LIGHTBOX ---
  const lightbox = document.getElementById('portfolio-lightbox');
  const lightboxImg = document.getElementById('lightbox-main-img');
  const lightboxPlanet = document.getElementById('lightbox-planet');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const lightboxBackdrop = document.querySelector('.lightbox-backdrop');
  const portfolioCards = document.querySelectorAll('.portfolio-item[data-id]');

  const projectDB = {
    '1': { planet: '☽ Moon Influence', title: 'Celestial Living Room', desc: 'A masterfully aligned living space in GK-2, New Delhi featuring champagne beige marble flooring, custom ivory furnishings, and hand-carved brass accents drawing positive lunar energy.', img: 'assets/portfolio_apartment_living.jpg' },
    '2': { planet: '♀ Venus Influence', title: 'Luna Sanctuary Suite', desc: 'An elegant master bedroom utilizing desaturated sage green wall details, linen textiles, and raw oak woodwork to promote deep rest and planetary harmony.', img: 'assets/portfolio_apartment_bedroom.jpg' },
    '3': { planet: '♃ Jupiter Influence', title: 'Abundance Dining Hall', desc: 'A sophisticated dining area with crystal chandeliers and natural wood accents, aligned with Jupiter energies to foster nourishment, abundance, and family prosperity.', img: 'assets/portfolio_apartment_dining.jpg' },
    '4': { planet: '☉ Sun Influence', title: 'The Lalit — Chandigarh', desc: 'Luxury hospitality interior for The Lalit hotel, channeling solar vitality through golden accents, warm lighting, and spacious layouts that invite success and prestige.', img: 'assets/portfolio_hotel_lalit.jpg' },
    '5': { planet: '♄ Saturn Influence', title: 'Grounded Lounge Retreat', desc: 'A premium apartment lounge with plush furnishings and art installations. Saturn grounding through deep earth tones and structured geometric arrangements.', img: 'assets/portfolio_apartment_lounge.jpg' },
    '6': { planet: '☽ Moon Influence', title: 'Club 7 Spa — Ahmedabad', desc: 'A tranquil wellness spa designed with lunar healing principles. Soft ambient lighting, natural stone, and water elements create a restorative sanctuary.', img: 'assets/portfolio_spa_club7.jpg' },
    '7': { planet: '☿ Mercury Influence', title: 'Executive Command Suite', desc: 'An executive MD cabin with premium leather seating and walnut finishes. Mercury alignment channels intellectual clarity for decisive leadership.', img: 'assets/portfolio_office_md.jpg' },
    '8': { planet: '♃ Jupiter Influence', title: 'Grand Foyer Welcome', desc: 'A grand foyer entrance with marble and brass detailing. Jupiter influence at the threshold invites cosmic abundance and creates powerful first impressions.', img: 'assets/portfolio_apartment_foyer.jpg' },
    '9': { planet: '☿ Mercury Influence', title: 'Strategic Boardroom', desc: 'A modern conference room with professional lighting and clean design. Communication flow optimized through Vastu principles for productive meetings.', img: 'assets/portfolio_office_conference.jpg' },
    '10': { planet: '☉ Sun Influence', title: 'Marriott — Design Concept', desc: 'Interior design visualization for Marriott hotel properties, incorporating solar vitality through warm palettes and grand spatial proportions.', img: 'assets/portfolio_hotel_marriott.jpg' },
    '11': { planet: '☿ Mercury Influence', title: "Scholar's Study", desc: 'An elegant home study with built-in bookshelves and ambient lighting. Directional alignment promotes intellectual growth and focused learning.', img: 'assets/portfolio_apartment_study.jpg' },
    '12': { planet: '♄ Saturn Influence', title: 'Professional Practice Suite', desc: 'A professional office space with modern furnishing and natural light. Saturn discipline grounds the workspace for sustained productivity and success.', img: 'assets/portfolio_office_neeraj.jpg' }
  };

  let currentLightboxId = null;
  const projectIds = Object.keys(projectDB);

  function openLightbox(id) {
    const data = projectDB[id];
    if (!data || !lightbox) return;

    currentLightboxId = id;
    lightboxImg.src = data.img;
    lightboxImg.alt = data.title;
    if (lightboxTitle) lightboxTitle.textContent = data.title;

    const currentIndex = projectIds.indexOf(id) + 1;
    const totalCount = projectIds.length;
    const currentEl = document.getElementById('lightbox-current-index');
    const totalEl = document.getElementById('lightbox-total-count');
    if (currentEl) currentEl.textContent = currentIndex;
    if (totalEl) totalEl.textContent = totalCount;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightboxFn() {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
      currentLightboxId = null;
    }
  }

  function navigateLightbox(direction) {
    if (!currentLightboxId) return;
    const idx = projectIds.indexOf(currentLightboxId);
    let newIdx = idx + direction;
    if (newIdx < 0) newIdx = projectIds.length - 1;
    if (newIdx >= projectIds.length) newIdx = 0;
    openLightbox(projectIds[newIdx]);
  }

  if (portfolioCards.length > 0 && lightbox) {
    portfolioCards.forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        openLightbox(id);
      });
      card.style.cursor = 'pointer';
    });
  }

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightboxFn);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightboxFn);
  if (lightboxPrev) lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
  if (lightboxNext) lightboxNext.addEventListener('click', () => navigateLightbox(1));

  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightboxFn();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });

  // Mobile swipe for lightbox
  let touchStartX = 0;
  if (lightbox) {
    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      const diff = touchStartX - e.changedTouches[0].screenX;
      if (Math.abs(diff) > 60) {
        navigateLightbox(diff > 0 ? 1 : -1);
      }
    }, { passive: true });
  }

  // --- 15. CUSTOM CURSOR (Desktop Only) ---
  const cursorEl = document.getElementById('custom-cursor');
  if (cursorEl && window.innerWidth > 1024) {
    const dot = cursorEl.querySelector('.cursor-dot');
    const ring = cursorEl.querySelector('.cursor-ring');
    
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dot) {
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
      }
    });

    // Smooth ring follow
    function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      if (ring) {
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';
      }
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Grow on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .portfolio-item, .benefit-card, .package-pricing-card, input, textarea, select');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursorEl.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => cursorEl.classList.remove('cursor-hover'));
    });

    document.body.classList.add('custom-cursor-active');
  }

  // --- 16. MAGNETIC BUTTONS ---
  const magneticBtns = document.querySelectorAll('.btn-gold, .btn-outline, .btn-gold-hero, .btn-outline-hero, #header-cta, .report-download-btn, .report-consult-btn, .founder-cta-link, .service-adv-cta-btn');
  if (window.innerWidth > 1024) {
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
        btn.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
        setTimeout(() => { btn.style.transition = ''; }, 400);
      });
    });
  }

  // --- 17. FLOATING SAMPLE REPORT BUTTON VISIBILITY ---
  const sampleReportBtn = document.getElementById('floating-sample-report');
  if (sampleReportBtn) {
    let reportBtnVisible = false;
    window.addEventListener('scroll', () => {
      if (window.scrollY > 600 && !reportBtnVisible) {
        reportBtnVisible = true;
        sampleReportBtn.classList.add('visible');
      } else if (window.scrollY <= 600 && reportBtnVisible) {
        reportBtnVisible = false;
        sampleReportBtn.classList.remove('visible');
      }
    }, { passive: true });
  }

  // --- 17.2 MOBILE STICKY BOTTOM NAV AUTO-HIDE ---
  const mobileStickyBar = document.getElementById('mobile-sticky-cta');
  if (mobileStickyBar) {
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      // Scroll down: hide; Scroll up: show
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        mobileStickyBar.classList.add('hidden');
      } else {
        mobileStickyBar.classList.remove('hidden');
      }
      lastScrollY = currentScrollY;
    }, { passive: true });

    // Highlight active link based on scroll viewport positioning
    const navLinks = mobileStickyBar.querySelectorAll('.mobile-sticky-link');
    const sections = document.querySelectorAll('section[id], header[id]');
    
    window.addEventListener('scroll', () => {
      let currentSectionId = '';
      sections.forEach(sec => {
        const top = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        if (window.scrollY >= top && window.scrollY < top + height) {
          currentSectionId = sec.getAttribute('id');
        }
      });

      if (currentSectionId) {
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href && href.includes(currentSectionId)) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    }, { passive: true });
  }

  // --- 17.5 INTERACTIVE PROCESS JOURNEY SLIDER ---
  const processNodes = document.querySelectorAll('.process-node');
  const processSlides = document.querySelectorAll('.process-slide');
  const processProgressBar = document.getElementById('process-progress-bar');
  const prevBtn = document.getElementById('process-prev-btn');
  const nextBtn = document.getElementById('process-next-btn');

  if (processNodes.length > 0 && processSlides.length > 0) {
    let currentStep = 1;
    const totalSteps = processNodes.length;

    // Helper to calculate ribbon progress line width percentage
    const updateProgressBar = (step) => {
      const percentage = ((step - 1) / (totalSteps - 1)) * 100;
      if (processProgressBar) {
        processProgressBar.style.width = `${percentage}%`;
      }
    };

    const goToStep = (step) => {
      if (step < 1 || step > totalSteps) return;

      currentStep = step;

      // Update Ribbon Node Classes
      processNodes.forEach(node => {
        const nodeStep = parseInt(node.getAttribute('data-step'));
        if (nodeStep === currentStep) {
          node.classList.add('active');
        } else {
          node.classList.remove('active');
        }
      });

      // Update Slides Content & Active classes
      processSlides.forEach(slide => {
        slide.classList.remove('active');
      });

      const activeSlide = document.getElementById(`process-slide-${currentStep}`);
      if (activeSlide) {
        activeSlide.classList.add('active');

        // GSAP entry animation for active slide details
        if (window.gsap) {
          window.gsap.fromTo(activeSlide.querySelectorAll('.process-visualizer, .process-details-header, .process-details-desc, .process-details-block'), 
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out', overwrite: 'auto' }
          );
        }
      }

      // Update Progress Ribbon
      updateProgressBar(currentStep);

      // Disable/Enable control buttons
      if (prevBtn) prevBtn.disabled = currentStep === 1;
      if (nextBtn) nextBtn.disabled = currentStep === totalSteps;
    };

    // Bind Node Clicks
    processNodes.forEach(node => {
      node.addEventListener('click', () => {
        const targetStep = parseInt(node.getAttribute('data-step'));
        goToStep(targetStep);
      });
    });

    // Bind Button Clicks
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentStep > 1) {
          goToStep(currentStep - 1);
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentStep < totalSteps) {
          goToStep(currentStep + 1);
        }
      });
    }

    // Initialize progress ribbon state on load
    updateProgressBar(currentStep);
  }

  // --- 18. LAZY IMAGE REVEAL ---
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  if (lazyImages.length > 0) {
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('img-loaded');
          imgObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    lazyImages.forEach(img => {
      img.classList.add('img-lazy');
      imgObserver.observe(img);
    });
  }

  // --- 19. SCROLL PROGRESS BAR ---
  const scrollProgressBar = document.getElementById('scroll-progress-bar');
  if (scrollProgressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      scrollProgressBar.style.width = `${scrollPercent}%`;
    }, { passive: true });
  }

  // --- 20. BACK TO TOP BUTTON ---
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- 21. SERVICE CARD MOBILE ACCORDION ---
  const serviceToggleBtns = document.querySelectorAll('.service-adv-toggle-btn');
  serviceToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.service-adv-card');
      if (!card) return;
      
      const isExpanded = card.classList.contains('expanded');
      
      // Close all other cards
      document.querySelectorAll('.service-adv-card.expanded').forEach(other => {
        if (other !== card) {
          other.classList.remove('expanded');
          const otherBtn = other.querySelector('.service-adv-toggle-btn');
          if (otherBtn) {
            otherBtn.setAttribute('aria-expanded', 'false');
            otherBtn.innerHTML = 'View Details <span class="toggle-icon">▾</span>';
          }
        }
      });
      
      // Toggle current card
      if (isExpanded) {
        card.classList.remove('expanded');
        btn.setAttribute('aria-expanded', 'false');
        btn.innerHTML = 'View Details <span class="toggle-icon">▾</span>';
      } else {
        card.classList.add('expanded');
        btn.setAttribute('aria-expanded', 'true');
        btn.innerHTML = 'Hide Details <span class="toggle-icon">▾</span>';
        
        // GSAP entry animation for revealed blocks
        if (window.gsap) {
          window.gsap.fromTo(card.querySelectorAll('.service-adv-block, .service-adv-footer'),
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out', delay: 0.1 }
          );
        }
      }
    });
  });

});
