/**
 * Reeya Digital / Riya Book Publication (रिया बुक पब्लिकेशन)
 * Interactive Portal Scripts (Crossword.in Inspired)
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Mobile Menu Drawer Navigation ---
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');

  function openDrawer() {
    mobileDrawer.classList.add('active');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('active');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  // Close drawer on clicking any anchor link
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // --- 2. Registration & Plan Application Modal ---
  const applyModal = document.getElementById('applyModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const planSelectInput = document.getElementById('modalPlanSelect');
  const modalFeeDisplay = document.getElementById('modalFeeDisplay');
  const modalAdvanceDisplay = document.getElementById('modalAdvanceDisplay');
  const regForm = document.getElementById('projectApplicationForm');

  const planData = {
    '1': { name: 'Plan 1 (50 Pages / 100 Sides)', salary: 25000, fee: 500, advance: 17500 },
    '2': { name: 'Plan 2 (80 Pages / 160 Sides)', salary: 30000, fee: 699, advance: 21000 },
    '3': { name: 'Plan 3 (100 Pages / 200 Sides)', salary: 35000, fee: 999, advance: 24500 }
  };

  function updateModalPlanDetails(planId) {
    const data = planData[planId] || planData['2'];
    if (planSelectInput) planSelectInput.value = planId;
    if (modalFeeDisplay) modalFeeDisplay.textContent = `₹${data.fee}/-`;
    if (modalAdvanceDisplay) modalAdvanceDisplay.textContent = `₹${data.advance.toLocaleString('en-IN')}/- (70%)`;
  }

  window.openApplicationModal = function(planId = '2') {
    updateModalPlanDetails(planId);
    if (applyModal) {
      applyModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  function closeApplicationModal() {
    if (applyModal) {
      applyModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeApplicationModal);
  if (applyModal) {
    applyModal.addEventListener('click', (e) => {
      if (e.target === applyModal) closeApplicationModal();
    });
  }

  if (planSelectInput) {
    planSelectInput.addEventListener('change', (e) => {
      updateModalPlanDetails(e.target.value);
    });
  }

  // --- 3. Interactive Salary & 70% Advance Calculator ---
  const pagesSlider = document.getElementById('pagesSlider');
  const pagesValDisplay = document.getElementById('pagesValDisplay');
  const durationPills = document.querySelectorAll('.calc-pill-btn');
  const calcSalaryDisplay = document.getElementById('calcSalaryDisplay');
  const calcAdvanceDisplay = document.getElementById('calcAdvanceDisplay');
  const calcBalanceDisplay = document.getElementById('calcBalanceDisplay');
  const calcDailyPaceDisplay = document.getElementById('calcDailyPaceDisplay');
  const calcEstimatedFeeDisplay = document.getElementById('calcEstimatedFeeDisplay');

  let currentDuration = 10; // default 10 days

  function recalculateEarnings() {
    if (!pagesSlider) return;
    const pages = parseInt(pagesSlider.value, 10);
    if (pagesValDisplay) pagesValDisplay.textContent = `${pages} Pages (${pages * 2} Sides)`;

    // Calculate rates aligned with user's official cards:
    // 50 pages -> 25000 (500/page)
    // 80 pages -> 30000 (375/page)
    // 100 pages -> 35000 (350/page)
    let salary = 0;
    let fee = 500;
    if (pages <= 50) {
      salary = 25000;
      fee = 500;
    } else if (pages <= 80) {
      salary = 25000 + Math.round(((pages - 50) / 30) * 5000);
      fee = 699;
    } else if (pages <= 100) {
      salary = 30000 + Math.round(((pages - 80) / 20) * 5000);
      fee = 999;
    } else {
      salary = 35000 + (pages - 100) * 300;
      fee = 1199;
    }

    const advance70 = Math.round(salary * 0.70);
    const balance30 = salary - advance70;
    const dailyPace = (pages / currentDuration).toFixed(1);

    if (calcSalaryDisplay) calcSalaryDisplay.textContent = `₹${salary.toLocaleString('en-IN')}/-`;
    if (calcAdvanceDisplay) calcAdvanceDisplay.textContent = `₹${advance70.toLocaleString('en-IN')}/-`;
    if (calcBalanceDisplay) calcBalanceDisplay.textContent = `₹${balance30.toLocaleString('en-IN')}/-`;
    if (calcDailyPaceDisplay) calcDailyPaceDisplay.textContent = `${dailyPace} pages/day`;
    if (calcEstimatedFeeDisplay) calcEstimatedFeeDisplay.textContent = `₹${fee}/-`;
  }

  if (pagesSlider) {
    pagesSlider.addEventListener('input', recalculateEarnings);
  }

  durationPills.forEach(pill => {
    pill.addEventListener('click', () => {
      durationPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentDuration = parseInt(pill.dataset.days, 10);
      recalculateEarnings();
    });
  });

  // Run initial calculation
  recalculateEarnings();

  // --- 4. Curated Book Catalog Filtering ---
  const filterTabs = document.querySelectorAll('.catalog-filter-tabs .tab-btn');
  const bookCards = document.querySelectorAll('.book-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.category;

      bookCards.forEach(card => {
        if (cat === 'all' || card.dataset.category === cat) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- 5. FAQ Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // --- 6. Lightbox Preview for High-Res Posters ---
  const lightbox = document.getElementById('imageLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeLightboxBtn = document.getElementById('closeLightboxBtn');

  window.openImageLightbox = function(src) {
    if (lightbox && lightboxImg) {
      lightboxImg.src = src;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (closeLightboxBtn) closeLightboxBtn.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // --- 7. Toast Notification Utility ---
  function showToast(message) {
    let toast = document.getElementById('toastNotice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toastNotice';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${message}</span>
    `;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  // --- 8. Application Form Submission Handler ---
  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('applicantName').value.trim();
      const phone = document.getElementById('applicantPhone').value.trim();
      const plan = planSelectInput.value;
      const device = document.getElementById('applicantDevice').value;
      const data = planData[plan] || planData['2'];

      if (!name || !phone) {
        alert('कृपया अपना नाम और मोबाइल नंबर भरें। (Please enter your name and mobile number.)');
        return;
      }

      // Show instant confirmation toast
      showToast(`धन्यवाद ${name}! आपका आवेदन सफलतापूवर्क प्राप्त हुआ। 70% एडवांस (₹${data.advance.toLocaleString('en-IN')}) सत्यापन हेतु हमारी टीम जल्द संपर्क करेगी।`);

      // Reset form & close modal
      regForm.reset();
      setTimeout(() => {
        closeApplicationModal();
      }, 1500);
    });
  }

  // --- 9. Smooth Scroll for all in-page anchors with dynamic header offset ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const siteHeader = document.querySelector('.site-header');
          const headerHeight = siteHeader ? siteHeader.offsetHeight : 70;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // --- 10. Persistently Fixed / Sticky Navbar Scroll State & Scrollspy ---
  const siteHeader = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.site-nav-menu .nav-menu-link');
  const trackedSections = document.querySelectorAll('section[id]');

  function handleNavbarScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Toggle elevated shadow and backdrop blur
    if (siteHeader) {
      if (scrollY > 15) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    // Scrollspy: highlight active section link in navigation menu
    if (navLinks.length && trackedSections.length) {
      let currentSectionId = '';
      const headerOffset = siteHeader ? siteHeader.offsetHeight + 60 : 120;

      trackedSections.forEach(sec => {
        const top = sec.offsetTop - headerOffset;
        const height = sec.offsetHeight;
        if (scrollY >= top && scrollY < top + height) {
          currentSectionId = sec.getAttribute('id');
        }
      });

      if (currentSectionId) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // Run immediately on page load
});
