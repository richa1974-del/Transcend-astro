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

});
