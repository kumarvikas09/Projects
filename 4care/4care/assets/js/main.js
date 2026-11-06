jQuery(document).ready(function () {
  'use strict';

  /*==========================================================================
    STICKY HEADER ON SCROLL
  ==========================================================================*/
  const header = document.querySelector('.header-nav');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  /*==========================================================================
    ACCESSIBILITY CONTROLS
  ==========================================================================*/
  // 1. Contrast Mode Toggle
  const contrastToggleBtn = document.getElementById('contrast-toggle');
  if (contrastToggleBtn) {
    contrastToggleBtn.addEventListener('click', function () {
      document.documentElement.classList.toggle('high-contrast');
      const isHighContrast = document.documentElement.classList.contains('high-contrast');
      localStorage.setItem('high-contrast', isHighContrast ? 'true' : 'false');
      contrastToggleBtn.setAttribute('aria-pressed', isHighContrast);
    });

    // Check saved state
    if (localStorage.getItem('high-contrast') === 'true') {
      document.documentElement.classList.add('high-contrast');
      contrastToggleBtn.setAttribute('aria-pressed', 'true');
    }
  }

  // 2. Text Scaling Toggle Classes (Max 3 Steps Up/Down)
  const textIncreaseBtn = document.getElementById('text-increase');
  const textDecreaseBtn = document.getElementById('text-decrease');
  const bodyEl = document.body;
  let textScaleLevel = 0; // Ranges from -3 to +3

  function updateFontScale() {
    // Clear all level classes
    bodyEl.classList.remove(
      'font-scale-up-1', 'font-scale-up-2', 'font-scale-up-3',
      'font-scale-down-1', 'font-scale-down-2', 'font-scale-down-3'
    );

    // Apply active class
    if (textScaleLevel > 0) {
      bodyEl.classList.add(`font-scale-up-${textScaleLevel}`);
    } else if (textScaleLevel < 0) {
      bodyEl.classList.add(`font-scale-down-${Math.abs(textScaleLevel)}`);
    }

    // Enable/disable buttons based on limits
    if (textIncreaseBtn) {
      textIncreaseBtn.disabled = (textScaleLevel >= 3);
      textIncreaseBtn.style.opacity = (textScaleLevel >= 3) ? '0.3' : '1';
      textIncreaseBtn.style.cursor = (textScaleLevel >= 3) ? 'not-allowed' : 'pointer';
    }
    if (textDecreaseBtn) {
      textDecreaseBtn.disabled = (textScaleLevel <= -3);
      textDecreaseBtn.style.opacity = (textScaleLevel <= -3) ? '0.3' : '1';
      textDecreaseBtn.style.cursor = (textScaleLevel <= -3) ? 'not-allowed' : 'pointer';
    }
  }

  if (textIncreaseBtn) {
    textIncreaseBtn.addEventListener('click', function () {
      if (textScaleLevel < 3) {
        textScaleLevel++;
        updateFontScale();
      }
    });
  }

  if (textDecreaseBtn) {
    textDecreaseBtn.addEventListener('click', function () {
      if (textScaleLevel > -3) {
        textScaleLevel--;
        updateFontScale();
      }
    });
  }

  // Initialize
  updateFontScale();

  /*==========================================================================
    OWL CAROUSEL INITIALIZATION
  ==========================================================================*/
  const testimonials = jQuery('.testimonials-carousel');
  if (testimonials.length && typeof jQuery.fn.owlCarousel !== 'undefined') {
    testimonials.owlCarousel({
      loop: true,
      margin: 20,
      nav: true,
      dots: true,
      autoplay: true,
      autoplayTimeout: 6000,
      autoplayHoverPause: true,
      navText: [
        '<i class="bi bi-arrow-left" aria-hidden="true"></i>',
        '<i class="bi bi-arrow-right" aria-hidden="true"></i>'
      ],
      responsive: {
        0: {
          items: 1
        },
        992: {
          items: 2
        },
        1200: {
          items: 3
        }
      }
    });
  }

  /*==========================================================================
    ACCORDION INTERACTION
  ==========================================================================*/
  const accordionButtons = document.querySelectorAll('.accordion-custom-button');
  accordionButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const targetId = this.getAttribute('aria-controls');
      const targetCollapse = document.getElementById(targetId);
      const isExpanded = this.getAttribute('aria-expanded') === 'true';

      // Close other accordion items
      const activeItems = document.querySelectorAll('.accordion-custom-collapse');
      activeItems.forEach(item => {
        if (item.id !== targetId) {
          item.style.maxHeight = null;
          const matchingBtn = document.querySelector(`[aria-controls="${item.id}"]`);
          if (matchingBtn) {
            matchingBtn.setAttribute('aria-expanded', 'false');
          }
        }
      });

      // Toggle current item
      if (isExpanded) {
        this.setAttribute('aria-expanded', 'false');
        targetCollapse.style.maxHeight = null;
      } else {
        this.setAttribute('aria-expanded', 'true');
        targetCollapse.style.maxHeight = targetCollapse.scrollHeight + 'px';
      }
    });
  });

  /*==========================================================================
    EVENT REGISTRATION: CONDITIONAL PLAN-MANAGEMENT FIELDS
  ==========================================================================*/
  const planRadios = document.querySelectorAll('input[name="plan_management"]');
  const planManagedPanel = document.getElementById('ev-plan-managed-fields');
  const selfManagedPanel = document.getElementById('ev-self-managed-fields');

  if (planRadios.length && planManagedPanel && selfManagedPanel) {
    const planManagerName = document.getElementById('ev-pm-name');
    const planManagerEmail = document.getElementById('ev-pm-email');
    const billingEmail = document.getElementById('ev-billing-email');

    function togglePlanFields() {
      const checked = document.querySelector('input[name="plan_management"]:checked');
      const value = checked ? checked.value : '';
      const isPlanManaged = value === 'Plan Managed';
      const isSelfManaged = value === 'Self Managed';

      planManagedPanel.classList.toggle('visible', isPlanManaged);
      selfManagedPanel.classList.toggle('visible', isSelfManaged);

      // Only mark hidden inputs required while their panel is open — the
      // browser refuses to submit a form containing an invalid hidden
      // required field, which would silently block the whole registration.
      if (planManagerName) planManagerName.required = isPlanManaged;
      if (planManagerEmail) planManagerEmail.required = isPlanManaged;
      if (billingEmail) billingEmail.required = isSelfManaged;
    }

    planRadios.forEach(radio => radio.addEventListener('change', togglePlanFields));
    togglePlanFields();
  }

  /*==========================================================================
    TEAM PAGE: CATEGORY FILTERING + PAGINATION + DYNAMIC MODAL DATA
  ==========================================================================*/
  const teamTabs = document.querySelectorAll('#teamCategoryTabs .nav-link');
  const teamCols = Array.from(document.querySelectorAll('.team-item-col'));
  const TEAM_PAGE_SIZE = 8;
  let teamCategory = 'all';
  let teamPage = 1;

  function getFilteredTeamCols() {
    return teamCols.filter(col => teamCategory === 'all' || col.getAttribute('data-category') === teamCategory);
  }

  function renderTeamPagination(totalPages) {
    const pagination = document.getElementById('teamPagination');
    const wrapper = document.querySelector('.team-pagination-wrapper');
    if (!pagination || !wrapper) return;

    if (totalPages <= 1) {
      wrapper.style.display = 'none';
      return;
    }
    wrapper.style.display = '';

    pagination.querySelectorAll('.page-num-item').forEach(el => el.remove());

    const nextItem = document.getElementById('nextPageItem');
    for (let p = 1; p <= totalPages; p++) {
      const li = document.createElement('li');
      li.className = 'page-item page-num-item' + (p === teamPage ? ' active' : '');
      const btn = document.createElement('button');
      btn.className = 'page-link page-num-btn';
      btn.type = 'button';
      btn.textContent = p;
      btn.addEventListener('click', function () {
        teamPage = p;
        renderTeamGrid();
      });
      li.appendChild(btn);
      pagination.insertBefore(li, nextItem);
    }

    const prevItem = document.getElementById('prevPageItem');
    if (prevItem) prevItem.classList.toggle('disabled', teamPage === 1);
    if (nextItem) nextItem.classList.toggle('disabled', teamPage === totalPages);
  }

  function renderTeamGrid() {
    const filtered = getFilteredTeamCols();
    const totalPages = Math.max(1, Math.ceil(filtered.length / TEAM_PAGE_SIZE));
    teamPage = Math.min(Math.max(teamPage, 1), totalPages);

    teamCols.forEach(col => { col.style.display = 'none'; });
    filtered.forEach((col, i) => {
      if (Math.floor(i / TEAM_PAGE_SIZE) + 1 === teamPage) {
        col.style.display = 'block';
      }
    });

    renderTeamPagination(totalPages);
  }

  if (teamTabs.length) {
    teamTabs.forEach(tab => {
      tab.addEventListener('click', function () {
        teamTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        teamCategory = this.getAttribute('data-category');
        teamPage = 1;
        renderTeamGrid();
      });
    });
  }

  const prevPageBtn = document.getElementById('prevPageBtn');
  const nextPageBtn = document.getElementById('nextPageBtn');
  if (prevPageBtn) {
    prevPageBtn.addEventListener('click', function () {
      if (teamPage > 1) { teamPage--; renderTeamGrid(); }
    });
  }
  if (nextPageBtn) {
    nextPageBtn.addEventListener('click', function () {
      const totalPages = Math.max(1, Math.ceil(getFilteredTeamCols().length / TEAM_PAGE_SIZE));
      if (teamPage < totalPages) { teamPage++; renderTeamGrid(); }
    });
  }

  if (teamCols.length) {
    renderTeamGrid();
  }



  // Dynamic Bootstrap Modal Population
  const teamModalEl = document.getElementById('teamMemberModal');
  if (teamModalEl) {
    teamModalEl.addEventListener('show.bs.modal', function (event) {
      const triggerCard = event.relatedTarget;
      if (!triggerCard) return;

      const name = triggerCard.getAttribute('data-name') || '';
      const role = triggerCard.getAttribute('data-role') || '';
      const category = triggerCard.getAttribute('data-category') || '';
      const specialty = triggerCard.getAttribute('data-specialty') || '';
      const image = triggerCard.getAttribute('data-image') || '';
      const email = triggerCard.getAttribute('data-email') || '';
      const phone = triggerCard.getAttribute('data-phone') || '';
      const bio = triggerCard.getAttribute('data-bio') || '';

      const modalName = teamModalEl.querySelector('#modalMemberName');
      const modalRole = teamModalEl.querySelector('#modalMemberRole');
      const modalCategory = teamModalEl.querySelector('#modalCategoryBadge');
      const modalSpecialty = teamModalEl.querySelector('#modalMemberSpecialty');
      const modalImg = teamModalEl.querySelector('#modalMemberImg');
      const modalBio = teamModalEl.querySelector('#modalMemberBio');
      const modalPhone = teamModalEl.querySelector('#modalMemberPhone');
      const modalEmail = teamModalEl.querySelector('#modalMemberEmail');

      if (modalName) modalName.textContent = name;
      if (modalRole) modalRole.textContent = role;
      if (modalCategory) modalCategory.textContent = category;
      if (modalSpecialty) modalSpecialty.textContent = specialty;
      if (modalImg) {
        modalImg.src = image;
        modalImg.alt = name;
      }
      if (modalBio) modalBio.textContent = bio;
      if (modalPhone) modalPhone.href = `tel:${phone.replace(/\s+/g, '')}`;
      if (modalEmail) modalEmail.href = `mailto:${email}`;
    });
  }

  // Explicit Card Click Listener for Bootstrap Modal
  const teamCards = document.querySelectorAll('.team-card-clickable');
  if (teamCards.length && teamModalEl) {
    teamCards.forEach(card => {
      card.addEventListener('click', function (e) {
        if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
          const bsModal = bootstrap.Modal.getOrCreateInstance(teamModalEl);
          bsModal.show(card);
        }
      });
    });
  }

  /*==========================================================================
    SINGLE HEADER: CUSTOM RIGHT-SIDE DRAWER & SUBMENU ACCORDION
  ==========================================================================*/
  const mobileNavToggleBtn = document.getElementById('mobileNavToggleBtn');
  const mobileDrawerCloseBtn = document.getElementById('mobileDrawerCloseBtn');
  const mainNavbarNav = document.getElementById('mainNavbarNav');
  const mobileNavBackdrop = document.getElementById('mobileNavBackdrop');

  function openMobileDrawer() {
    if (mainNavbarNav) mainNavbarNav.classList.add('show');
    if (mobileNavBackdrop) mobileNavBackdrop.classList.add('show');
    if (mobileNavToggleBtn) mobileNavToggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileDrawer() {
    if (mainNavbarNav) mainNavbarNav.classList.remove('show');
    if (mobileNavBackdrop) mobileNavBackdrop.classList.remove('show');
    if (mobileNavToggleBtn) mobileNavToggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', function (e) {
      e.preventDefault();
      if (mainNavbarNav && mainNavbarNav.classList.contains('show')) {
        closeMobileDrawer();
      } else {
        openMobileDrawer();
      }
    });
  }

  if (mobileDrawerCloseBtn) {
    mobileDrawerCloseBtn.addEventListener('click', function (e) {
      e.preventDefault();
      closeMobileDrawer();
    });
  }

  if (mobileNavBackdrop) {
    mobileNavBackdrop.addEventListener('click', function () {
      closeMobileDrawer();
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mainNavbarNav && mainNavbarNav.classList.contains('show')) {
      closeMobileDrawer();
    }
  });

  // Handle mobile submenu dropdown triggers (Services mega menu, Resources, Contact)
  const mobileDropdownToggles = document.querySelectorAll('.header-nav .dropdown-toggle-split');
  mobileDropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function (e) {
      if (window.innerWidth < 1200) {
        e.preventDefault();
        e.stopPropagation();
        const parentLi = this.closest('.dropdown, .menu-item-has-children');
        if (parentLi) {
          const wasOpen = parentLi.classList.contains('show');
          // Close other open sibling dropdowns on mobile
          document.querySelectorAll('.header-nav .navbar-collapse .dropdown.show, .header-nav .navbar-collapse .menu-item-has-children.show').forEach(el => {
            if (el !== parentLi) {
              el.classList.remove('show');
              const splitBtn = el.querySelector('.dropdown-toggle-split');
              if (splitBtn) {
                splitBtn.classList.remove('show');
                splitBtn.setAttribute('aria-expanded', 'false');
              }
            }
          });
          parentLi.classList.toggle('show', !wasOpen);
          this.classList.toggle('show', !wasOpen);
          this.setAttribute('aria-expanded', !wasOpen ? 'true' : 'false');
        }
      }
    });
  });
});
