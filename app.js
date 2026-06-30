/**
 * Transcend Consultant V2 — Main Application Script
 * Premium Astro-Interior Consultancy SPA
 */
document.addEventListener('DOMContentLoaded', () => {

  // --- 1. HEADER SCROLL & STICKY BEHAVIOR ---
  const header = document.getElementById('main-header');
  
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // --- 2. MOBILE NAVIGATION TOGGLE ---
  const menuToggle = document.getElementById('menu-toggle');
  const navbarLinks = document.getElementById('navbar-links');

  if (menuToggle && navbarLinks) {
    menuToggle.addEventListener('click', () => {
      navbarLinks.classList.toggle('active');
      const isOpen = navbarLinks.classList.contains('active');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu on nav link click
    navbarLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navbarLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- 3. SPA ROUTER WITH ANCHOR SMOOTH SCROLL ---
  const pageViews = document.querySelectorAll('.page-view');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Maps route hashes to views
  const routeMap = {
    '#home': 'page-home',
    '#about': 'page-home',
    '#services': 'page-home',
    '#portfolio': 'page-home',
    '#process': 'page-home',
    '#packages': 'page-home',
    '#testimonials': 'page-home',
    '#contact': 'page-home',
    '#onboarding': 'page-onboarding',
  };

  function navigateTo(hash) {
    if (!hash || hash === '#') hash = '#home';
    
    // Default to page-home for all section anchors, or page-onboarding
    const pageId = hash === '#onboarding' ? 'page-onboarding' : 'page-home';
    
    // Toggle page views
    pageViews.forEach(view => {
      view.classList.remove('active-route', 'fade-in-route');
    });
    
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
      targetPage.classList.add('active-route');
      // Trigger fade-in transition
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          targetPage.classList.add('fade-in-route');
        });
      });
    }
    
    // Update navigation active highlight links
    navLinks.forEach(link => {
      link.classList.remove('active-link');
      const linkHash = link.getAttribute('href');
      if (linkHash === hash) {
        link.classList.add('active-link');
      }
    });
    
    // Section scroll handling
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

  // Handle hash changes
  window.addEventListener('hashchange', () => {
    navigateTo(window.location.hash);
  });

  // Initial routing on page load
  navigateTo(window.location.hash || '#home');

  // Handle local link clicks
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const hash = anchor.getAttribute('href');
      if (hash && hash.startsWith('#')) {
        e.preventDefault();
        window.location.hash = hash;
      }
    });
  });

  // --- 4. ANIMATED STATISTICS COUNTERS ---
  const stats = document.querySelectorAll('.stat-number');
  if (stats.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const endVal = parseInt(target.getAttribute('data-target'), 10);
          if (!isNaN(endVal)) {
            animateCount(target, 0, endVal, 1500);
          }
          observer.unobserve(target);
        }
      });
    }, { threshold: 0.5 });

    stats.forEach(s => observer.observe(s));
  }

  function animateCount(el, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      el.innerText = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.innerText = end + "+";
      }
    };
    window.requestAnimationFrame(step);
  }

  // --- Scroll Reveal Animation Observer ---
  const reveals = document.querySelectorAll('.scroll-reveal');
  if (reveals.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    reveals.forEach(r => revealObserver.observe(r));
  }

  // --- 5. PORTFOLIO FILTERS ---
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
          } else {
            item.classList.remove('show-item');
          }
        });
      });
    });
  }

  // --- 6. BEFORE & AFTER IMAGE COMPARISON SLIDER ---
  const slider = document.getElementById('before-after-slider');
  const handle = document.getElementById('slider-drag-handle');
  const beforeImg = document.querySelector('.before-img');

  if (slider && handle && beforeImg) {
    let isDragging = false;

    function moveSlider(clientX) {
      const rect = slider.getBoundingClientRect();
      let pos = (clientX - rect.left) / rect.width;
      if (pos < 0) pos = 0;
      if (pos > 1) pos = 1;
      
      const percentage = pos * 100;
      handle.style.left = `${percentage}%`;
      beforeImg.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
    }

    handle.addEventListener('mousedown', () => isDragging = true);
    window.addEventListener('mouseup', () => isDragging = false);
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      moveSlider(e.clientX);
    });

    // Touch events for mobile responsiveness
    handle.addEventListener('touchstart', () => isDragging = true);
    window.addEventListener('touchend', () => isDragging = false);
    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      if (e.touches.length > 0) {
        moveSlider(e.touches[0].clientX);
      }
    });
  }

  // --- 7. FAQ ACCORDION ---
  const faqHeaders = document.querySelectorAll('.faq-header');
  if (faqHeaders.length > 0) {
    faqHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const item = header.parentElement;
        const panel = item.querySelector('.faq-panel');
        const isActive = item.classList.contains('active');
        
        // Close all other panels
        document.querySelectorAll('.faq-item').forEach(i => {
          i.classList.remove('active');
          const p = i.querySelector('.faq-panel');
          if (p) p.style.maxHeight = null;
        });

        if (!isActive) {
          item.classList.add('active');
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    });
  }

  // --- 8. CONTACT FORM SUBMISSION ---
  const contactForm = document.getElementById('astro-contact-form');
  const successModal = document.getElementById('form-success-modal');
  const successModalClose = document.getElementById('success-modal-close');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Clear forms inputs or perform validations if necessary...
      if (successModal) {
        successModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  if (successModalClose) {
    successModalClose.addEventListener('click', () => {
      if (successModal) {
        successModal.classList.remove('active');
        document.body.style.overflow = '';
      }
      // Navigate to onboarding profile form
      window.location.hash = '#onboarding';
    });
  }

  // --- 9. PACKAGE BOOKING BUTTONS PRE-FILL ---
  document.querySelectorAll('.book-package-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const packageName = btn.getAttribute('data-package');
      
      // Navigate to contact form and pre-fill selection
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

  // --- 10. ONBOARDING QUESTIONNAIRE FORM ---
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

  // Onboarding File Upload Zone drag-and-drop
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
        // Remove from uploadedFiles array keeping index mapping intact
        uploadedFiles[index] = null;
      });
    }
  }

  // Onboarding submission
  if (onboardingForm) {
    onboardingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (onboardingSuccess) {
        onboardingForm.style.display = 'none';
        onboardingSuccess.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // --- 11. EXIT INTENT POPUP (DESKTOP) & MOBILE SCROLL POPUP (75%) ---
  const exitModal = document.getElementById('exit-intent-modal');
  const exitClose = document.getElementById('exit-close');
  const leadMagnetForm = document.getElementById('exit-lead-magnet-form');

  if (exitModal) {
    // Desktop mouseleave exit-intent
    document.addEventListener('mouseleave', (e) => {
      if (window.innerWidth > 768 && e.clientY < 15 && !sessionStorage.getItem('exitIntentDismissed')) {
        exitModal.classList.add('active');
      }
    });

    // Mobile scroll-depth popup (triggers after 75% scroll)
    let scrollTriggered = false;
    window.addEventListener('scroll', () => {
      if (window.innerWidth <= 768 && !scrollTriggered && !sessionStorage.getItem('exitIntentDismissed')) {
        const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        if (scrollPercent > 0.75) {
          scrollTriggered = true;
          exitModal.classList.add('active');
        }
      }
    });

    if (exitClose) {
      exitClose.addEventListener('click', () => {
        exitModal.classList.remove('active');
        sessionStorage.setItem('exitIntentDismissed', 'true');
      });
    }

    if (leadMagnetForm) {
      leadMagnetForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert("The Astro-Interior Vastu Checklist has been successfully sent to your email!");
        exitModal.classList.remove('active');
        sessionStorage.setItem('exitIntentDismissed', 'true');
      });
    }
  }

  // --- 12. HERO KEN BURNS SLIDESHOW ---
  const heroSlides = document.querySelectorAll('.hero-slide');
  if (heroSlides.length > 1) {
    let currentSlide = 0;
    const slideInterval = 6000;

    setInterval(() => {
      heroSlides[currentSlide].classList.remove('hero-slide-active');
      currentSlide = (currentSlide + 1) % heroSlides.length;
      // Reset animation by forcing reflow
      const nextSlide = heroSlides[currentSlide];
      nextSlide.style.animation = 'none';
      nextSlide.offsetHeight; // trigger reflow
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

        baBeforeImg.src = beforeSrc;
        baAfterImg.src = afterSrc;

        // Reset slider handle to 50%
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

  // Project database for lightbox details
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
    if (lightboxPlanet) lightboxPlanet.textContent = data.planet;
    if (lightboxTitle) lightboxTitle.textContent = data.title;
    if (lightboxDesc) lightboxDesc.textContent = data.desc;

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

  // Attach portfolio card click events
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

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightboxFn();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });

  // Mobile swipe support for lightbox
  let touchStartX = 0;
  let touchEndX = 0;

  if (lightbox) {
    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 60) {
        if (diff > 0) navigateLightbox(1);  // swipe left = next
        else navigateLightbox(-1);           // swipe right = prev
      }
    }, { passive: true });
  }

});
