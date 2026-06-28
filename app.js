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

  // --- 3. SPA ROUTER ---
  const pageViews = document.querySelectorAll('.page-view');
  const navLinks = document.querySelectorAll('.nav-link');
  const routeMap = {
    '#home': 'page-home',
    '#about': 'page-about',
    '#about-philosophy': 'page-about',
    '#why-transcend': 'page-about',
    '#services': 'page-services',
    '#services-details': 'page-services',
    '#packages': 'page-packages',
    '#consultation-packages': 'page-packages',
    '#gallery': 'page-gallery',
    '#gallery-portfolio': 'page-gallery',
    '#testimonials': 'page-testimonials',
    '#contact': 'page-contact',
    '#onboarding': 'page-onboarding',
    '#how-it-works': 'page-home',
  };

  function navigateTo(hash) {
    if (!hash || hash === '#') hash = '#home';
    
    const pageId = routeMap[hash] || 'page-home';
    
    // Toggle page visibility
    pageViews.forEach(view => {
      view.classList.remove('active-route', 'fade-in-route');
    });
    
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
      targetPage.classList.add('active-route');
      // Trigger fade-in after a brief delay for transition
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          targetPage.classList.add('fade-in-route');
        });
      });
    }
    
    // Update active nav link
    navLinks.forEach(link => {
      link.classList.remove('active-link');
      const linkHash = link.getAttribute('href');
      if (linkHash === hash || (routeMap[linkHash] === pageId && linkHash === hash)) {
        link.classList.add('active-link');
      }
    });
    
    // Scroll to top or to specific section
    const sectionTarget = document.querySelector(hash);
    if (sectionTarget && hash !== '#home' && hash !== '#about' && hash !== '#services' && hash !== '#packages' && hash !== '#gallery' && hash !== '#testimonials' && hash !== '#contact' && hash !== '#onboarding') {
      setTimeout(() => {
        sectionTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Handle hash change
  window.addEventListener('hashchange', () => {
    navigateTo(window.location.hash);
  });

  // Initial route on page load
  navigateTo(window.location.hash || '#home');

  // Handle nav link clicks
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const hash = anchor.getAttribute('href');
      if (hash && hash.startsWith('#')) {
        e.preventDefault();
        window.location.hash = hash;
      }
    });
  });

  // --- 4. SCROLL REVEAL ANIMATIONS ---
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        scrollObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements that should animate on scroll
  document.querySelectorAll('.process-step, .why-astro-card, .package-card, .testimonial-card, .service-card, .lux-card, .info-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    scrollObserver.observe(el);
  });

  // Add revealed state
  const style = document.createElement('style');
  style.textContent = `.revealed { opacity: 1 !important; transform: translateY(0) !important; }`;
  document.head.appendChild(style);

  // Stagger process steps
  document.querySelectorAll('.process-step').forEach((step, i) => {
    step.style.transitionDelay = `${i * 0.1}s`;
  });

  document.querySelectorAll('.why-astro-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.08}s`;
  });

  // --- 5. CONTACT FORM SUBMISSION ---
  const contactForm = document.getElementById('astro-contact-form');
  const successModal = document.getElementById('form-success-modal');
  const successModalClose = document.getElementById('success-modal-close');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Show success modal
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
      // Navigate to onboarding form
      window.location.hash = '#onboarding';
    });
  }

  // --- 6. PACKAGE BOOKING BUTTONS ---
  document.querySelectorAll('.book-package-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const packageName = btn.getAttribute('data-package');
      
      // Navigate to contact form and pre-fill package
      window.location.hash = '#contact';
      
      setTimeout(() => {
        const packageSelect = document.getElementById('frm-package');
        if (packageSelect) {
          // Find matching option
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

  // --- 7. ONBOARDING FORM ---
  const onboardingForm = document.getElementById('onboarding-form');
  const onboardingSuccess = document.getElementById('onboarding-success');
  const propertyTypeSelect = document.getElementById('ob-property-type');
  const builtupAreaGroup = document.getElementById('ob-builtup-area-group');

  // Conditional field: show built-up area for Bungalow
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

  // File upload drag-and-drop
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
          // PDF or other file
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
        item.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;background:var(--c-cream);padding:0.5rem;"><span style="font-size:0.65rem;color:var(--c-text-muted);text-align:center;word-break:break-all;">${name}</span></div><button class="upload-remove" type="button" data-index="${index}">&times;</button>`;
      }
      
      previewGrid.appendChild(item);

      // Remove handler
      item.querySelector('.upload-remove').addEventListener('click', (e) => {
        e.stopPropagation();
        item.remove();
      });
    }
  }

  // Onboarding form submission
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

  // --- 8. ROOM ENERGY SCANNER ---
  const scanBtn = document.getElementById('btn-start-scan');
  const roomSelect = document.getElementById('scanner-room-type');
  const telemetryText = document.getElementById('scan-telemetry');

  const scannerData = {
    bedroom: {
      prana: 'Moderate – 65%',
      element: '🌙 Moon (Water Element)',
      remedies: [
        'Position the bed headboard facing South or West for restorative sleep.',
        'Use deep blue or silver tones for curtain and bedding fabrics.',
        'Add a round mirror reflecting natural light from the East.',
        'Place Moonstone crystal clusters near the bedside for lunar grounding.',
        'Ensure the room is free from electronic screens after 9 PM.'
      ]
    },
    kitchen: {
      prana: 'High – 80%',
      element: '🔥 Mars (Fire Element)',
      remedies: [
        'Ensure the stove faces Southeast – the Agni Moola direction.',
        'Use warm terracotta or red accent tiles on the kitchen backsplash.',
        'Keep the water source (sink) away from the fire source (stove) on opposite walls.',
        'Hang copper utensils decoratively to channel Mars abundance.',
        'Include red flowers or spicy herbs in the kitchen window.'
      ]
    },
    living: {
      prana: 'Low – 42%',
      element: '🪐 Jupiter (Air/Space Element)',
      remedies: [
        'Orient the primary sofa to face North or East to invoke expansion.',
        'Integrate yellow or gold accent cushions for Jupiter\'s energy.',
        'Add a large water feature or aquarium in the Northeast corner.',
        'Use round or oval coffee tables to promote uninterrupted energy flow.',
        'Keep the Southwest corner grounded with heavy furniture.'
      ]
    },
    office: {
      prana: 'Elevated – 75%',
      element: '☿ Mercury (Earth Element)',
      remedies: [
        'Face your desk towards the North or East to harness career momentum.',
        'Incorporate green accent lighting or plants behind the monitor.',
        'Place a small Ganesh idol or crystal on the desk for obstacle removal.',
        'Ensure no mirror directly reflects your workspace.',
        'Position bookshelves along the West wall for knowledge grounding.'
      ]
    }
  };

  if (scanBtn && roomSelect && telemetryText) {
    scanBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const room = roomSelect.value;
      if (!room) {
        alert('Please select a room type first.');
        return;
      }

      telemetryText.innerText = 'SCANNING...';
      scanBtn.disabled = true;

      setTimeout(() => {
        const data = scannerData[room];
        document.getElementById('scan-prana').innerText = data.prana;
        document.getElementById('scan-element').innerText = data.element;
        
        const remediesList = document.getElementById('scan-remedies');
        remediesList.innerHTML = '';
        data.remedies.forEach(r => {
          const li = document.createElement('li');
          li.innerText = r;
          remediesList.appendChild(li);
        });

        telemetryText.innerText = 'SCAN COMPLETE — REMEDIES GENERATED';
        scanBtn.disabled = false;
      }, 2000);
    });
  }

  // --- 9. APPOINTMENT CALENDAR ---
  const calendarGrid = document.getElementById('calendar-grid-container');
  const monthYearDisplay = document.getElementById('calendar-month-year');
  const prevMonthBtn = document.getElementById('calendar-prev-month');
  const nextMonthBtn = document.getElementById('calendar-next-month');
  const slotsContainer = document.getElementById('time-slots-container');
  const frmMessage = document.getElementById('frm-message');

  if (calendarGrid && monthYearDisplay) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    let date = new Date(today.getFullYear(), today.getMonth(), 1);
    let selectedDay = null;
    let selectedSlot = null;

    const mockTimeSlots = [
      '10:00 AM - 10:45 AM',
      '11:00 AM - 11:45 AM',
      '2:00 PM - 2:45 PM',
      '3:00 PM - 3:45 PM',
      '5:00 PM - 5:45 PM',
      '6:00 PM - 6:45 PM',
    ];

    function renderCalendar() {
      const year = date.getFullYear();
      const month = date.getMonth();
      monthYearDisplay.innerText = `${months[month]} ${year}`;
      
      calendarGrid.innerHTML = '';
      
      // Day headers
      days.forEach(d => {
        const dayHeader = document.createElement('div');
        dayHeader.classList.add('calendar-day-header');
        dayHeader.innerText = d;
        calendarGrid.appendChild(dayHeader);
      });

      // First day offset
      const firstDay = new Date(year, month, 1).getDay();
      for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement('div');
        empty.classList.add('calendar-day-cell', 'empty');
        calendarGrid.appendChild(empty);
      }

      // Days of month
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      for (let d = 1; d <= daysInMonth; d++) {
        const cell = document.createElement('div');
        cell.classList.add('calendar-day-cell');
        cell.innerText = d;

        const cellDate = new Date(year, month, d);
        if (cellDate < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
          cell.classList.add('disabled');
        } else {
          cell.addEventListener('click', () => {
            document.querySelectorAll('.calendar-day-cell').forEach(c => c.classList.remove('selected'));
            cell.classList.add('selected');
            selectedDay = `${d} ${months[month]} ${year}`;
            selectedSlot = null;
            renderTimeSlots();
          });
        }
        calendarGrid.appendChild(cell);
      }
    }

    function renderTimeSlots() {
      slotsContainer.innerHTML = '<h4 style="font-family:var(--font-heading); color:var(--c-gold); margin-bottom:1rem;">Available Slots</h4>';
      const slotGrid = document.createElement('div');
      slotGrid.classList.add('slots-grid');
      
      mockTimeSlots.forEach(slot => {
        const btn = document.createElement('button');
        btn.classList.add('time-slot-btn');
        btn.innerText = slot;
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          document.querySelectorAll('.time-slot-btn').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          selectedSlot = slot;
          updateContactFormMessage();
        });
        slotGrid.appendChild(btn);
      });
      slotsContainer.appendChild(slotGrid);
    }

    function updateContactFormMessage() {
      if (selectedDay && selectedSlot && frmMessage) {
        frmMessage.value = `[Appointment Booked] Consultation Date: ${selectedDay} at ${selectedSlot.split(' - ')[0]}.\n\nDescribe your space goals here...`;
      }
    }

    if (prevMonthBtn) {
      prevMonthBtn.addEventListener('click', (e) => {
        e.preventDefault();
        date.setMonth(date.getMonth() - 1);
        renderCalendar();
      });
    }

    if (nextMonthBtn) {
      nextMonthBtn.addEventListener('click', (e) => {
        e.preventDefault();
        date.setMonth(date.getMonth() + 1);
        renderCalendar();
      });
    }

    renderCalendar();
  }

  // --- 10. EXIT INTENT POPUP ---
  const exitIntentModal = document.getElementById('exit-intent-modal');
  const exitClose = document.getElementById('exit-close');

  if (exitIntentModal) {
    document.addEventListener('mouseleave', (e) => {
      if (e.clientY < 15 && !sessionStorage.getItem('exitIntentDismissed')) {
        exitIntentModal.classList.add('active');
      }
    });

    if (exitClose) {
      exitClose.addEventListener('click', () => {
        exitIntentModal.classList.remove('active');
        sessionStorage.setItem('exitIntentDismissed', 'true');
      });
    }

    const leadMagnetForm = document.getElementById('exit-lead-magnet-form');
    if (leadMagnetForm) {
      leadMagnetForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Thank you! The Astro-Interior Vastu Checklist has been sent to your email.");
        exitIntentModal.classList.remove('active');
        sessionStorage.setItem('exitIntentDismissed', 'true');
      });
    }
  }

  // --- 11. SMOOTH SCROLL FOR ANCHOR LINKS ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target && document.getElementById(routeMap[targetId] || '')) {
        // It's a route change, handled by router
        return;
      }
    });
  });

});
