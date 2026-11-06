/**
 * Instlld - Australia's Installation Specialists
 * Custom Frontend Scripts
 * Conforms strictly to AGENTS.md standards:
 * - Pure Vanilla JavaScript (no external runtime dependencies required)
 * - camelCase naming convention for variables and functions
 * - Accessible ARIA attributes and keyboard controls
 * - Zero global variable leakage
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header Scroll Effect
  const siteHeader = document.getElementById('siteHeader');
  if (siteHeader) {
    const handleHeaderScroll = () => {
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollPosition > 40) {
        siteHeader.classList.add('header_section--scrolled');
      } else {
        siteHeader.classList.remove('header_section--scrolled');
      }
    };

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll();
  }

  // 2. Mobile Navigation Toggle & Backdrop
  const menuToggle = document.getElementById('headerMenuToggle');
  const headerNav = document.getElementById('headerNavMenu');
  const headerBackdrop = document.getElementById('headerBackdrop');
  const navLinks = document.querySelectorAll('.header_section__nav_link');

  const closeMobileNav = () => {
    if (menuToggle) {
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
    if (headerNav) {
      headerNav.classList.remove('active');
    }
    if (headerBackdrop) {
      headerBackdrop.classList.remove('active');
    }
    document.body.style.overflow = '';
  };

  const openMobileNav = () => {
    if (menuToggle) {
      menuToggle.classList.add('active');
      menuToggle.setAttribute('aria-expanded', 'true');
    }
    if (headerNav) {
      headerNav.classList.add('active');
    }
    if (headerBackdrop) {
      headerBackdrop.classList.add('active');
    }
    document.body.style.overflow = 'hidden';
  };

  if (menuToggle && headerNav) {
    menuToggle.addEventListener('click', (event) => {
      event.preventDefault();
      const isOpen = headerNav.classList.contains('active');
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    if (headerBackdrop) {
      headerBackdrop.addEventListener('click', closeMobileNav);
    }

    navLinks.forEach((link) => {
      link.addEventListener('click', closeMobileNav);
    });

    // Close on Escape key press
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && headerNav.classList.contains('active')) {
        closeMobileNav();
      }
    });

    // Close on viewport resize back to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 992 && headerNav.classList.contains('active')) {
        closeMobileNav();
      }
    });
  }

  // 3. Popular Installation Services Carousel Controls
  const carouselTrack = document.getElementById('popularServicesTrack');
  const btnPrev = document.getElementById('popularServicesPrev');
  const btnNext = document.getElementById('popularServicesNext');

  if (carouselTrack && btnPrev && btnNext) {
    const getScrollStep = () => {
      const card = carouselTrack.querySelector('.popular_services_section__card');
      return card ? card.offsetWidth + 22 : 240;
    };

    btnPrev.addEventListener('click', (event) => {
      event.preventDefault();
      const step = getScrollStep();
      carouselTrack.scrollBy({ left: -(step * 2), behavior: 'smooth' });
    });

    btnNext.addEventListener('click', (event) => {
      event.preventDefault();
      const step = getScrollStep();
      carouselTrack.scrollBy({ left: step * 2, behavior: 'smooth' });
    });
  }

  // 4. Category Section Slider Controls & Pagination Dots
  const categoryTrack = document.getElementById('categorySliderTrack');
  const categoryDots = document.querySelectorAll('.category_section__dot');
  const categoryPrevBtn = document.getElementById('categorySliderPrev');
  const categoryNextBtn = document.getElementById('categorySliderNext');

  if (categoryTrack) {
    // Arrow slide navigation
    if (categoryPrevBtn) {
      categoryPrevBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const slideWidth = categoryTrack.clientWidth;
        categoryTrack.scrollBy({
          left: -slideWidth,
          behavior: 'smooth'
        });
      });
    }

    if (categoryNextBtn) {
      categoryNextBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const slideWidth = categoryTrack.clientWidth;
        categoryTrack.scrollBy({
          left: slideWidth,
          behavior: 'smooth'
        });
      });
    }

    if (categoryDots.length > 0) {
      // Dot click slide navigation
      categoryDots.forEach((dot) => {
        dot.addEventListener('click', (event) => {
          event.preventDefault();
          const slideIndex = parseInt(dot.getAttribute('data-slide-index') || '0', 10);
          const slideWidth = categoryTrack.clientWidth;
          categoryTrack.scrollTo({
            left: slideIndex * slideWidth,
            behavior: 'smooth'
          });

          categoryDots.forEach((item) => item.classList.remove('active'));
          dot.classList.add('active');
        });
      });

      // Synchronize active dot on scroll/swipe
      let isScrollDebounce;
      categoryTrack.addEventListener(
        'scroll',
        () => {
          clearTimeout(isScrollDebounce);
          isScrollDebounce = setTimeout(() => {
            const slideWidth = categoryTrack.clientWidth;
            if (slideWidth > 0) {
              const activeIndex = Math.min(
                categoryDots.length - 1,
                Math.max(0, Math.round(categoryTrack.scrollLeft / slideWidth))
              );
              categoryDots.forEach((dot, index) => {
                if (index === activeIndex) {
                  dot.classList.add('active');
                } else {
                  dot.classList.remove('active');
                }
              });
            }
          }, 60);
        },
        { passive: true }
      );

      // Keep active slide centered on window resize
      window.addEventListener('resize', () => {
        const activeDot = document.querySelector('.category_section__dot.active');
        if (activeDot && categoryTrack) {
          const activeIndex = parseInt(activeDot.getAttribute('data-slide-index') || '0', 10);
          categoryTrack.scrollLeft = activeIndex * categoryTrack.clientWidth;
        }
      });
    }
  }

  // 5. Postcode Search Form Validation & Interaction
  const searchForm = document.getElementById('postcodeSearchForm');
  const postcodeInput = document.getElementById('postcodeInput');

  if (searchForm && postcodeInput) {
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const postcode = postcodeInput.value.trim();
      if (!postcode) {
        postcodeInput.focus();
        postcodeInput.setAttribute('placeholder', 'Please enter a postcode');
        return;
      }

      alert(`Finding installation services near postcode: ${postcode}`);
    });
  }

  // 6. Service Category Tabs Switcher (Design Layout Tabs)
  const categoryTabs = document.querySelectorAll('.service_category_section__category_item');
  const categoryPanes = document.querySelectorAll('.service_category_section__tab_pane');
  const activeTitle = document.getElementById('activeCategoryTitle');
  const resultsCount = document.getElementById('serviceResultsCount');

  if (categoryTabs.length > 0 && categoryPanes.length > 0) {
    categoryTabs.forEach((tab) => {
      tab.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = tab.getAttribute('data-tab-target');
        const catName = tab.getAttribute('data-category-name');
        const count = tab.getAttribute('data-category-count') || '9';

        // 1. Update active tab styling
        categoryTabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');

        // 2. Display corresponding static service cards pane
        categoryPanes.forEach((pane) => {
          if (pane.id === targetId) {
            pane.classList.add('active');
          } else {
            pane.classList.remove('active');
          }
        });

        // 3. Update active category title and count
        if (activeTitle && catName) {
          activeTitle.textContent = `${catName} Services`;
        }
        if (resultsCount) {
          resultsCount.textContent = `Showing ${count} sample services`;
        }

        // 4. Smooth scroll into view on mobile
        if (window.innerWidth < 992) {
          const contentArea = document.querySelector('.service_category_section__content');
          if (contentArea) {
            contentArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  }
});
