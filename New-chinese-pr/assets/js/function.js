$(document).ready(function () {
  // Calculate and apply header height dynamically
  const updateHeaderHeight = function () {
    const headerElement = document.querySelector(".site_header");
    if (headerElement) {
      const headerHeight = headerElement.offsetHeight;
      document.body.style.setProperty("--headerHeight", headerHeight + "px");
    }
  };

  updateHeaderHeight();
  window.addEventListener("resize", updateHeaderHeight);

  // Mobile navigation hamburger toggle
  $(".site_header__hamburger").on("click", function () {
    $(this).toggleClass("active");
    $(".site_header__nav").slideToggle(260).toggleClass("open");
  });

  // Close mobile nav when clicking on nav link
  $(".site_header__link").on("click", function () {
    if ($(window).width() < 1200) {
      $(".site_header__hamburger").removeClass("active");
      $(".site_header__nav").slideUp(260).removeClass("open");
    }
  });

  // Initialize Hero Owl Carousel Banner with Fade Effect
  const initHeroSlider = function () {
    const $heroSlider = $(".hero_section__slider");
    if ($heroSlider.length && typeof $.fn.owlCarousel === "function") {
      $heroSlider.owlCarousel({
        items: 1,
        loop: true,
        margin: 0,
        nav: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 6000,
        autoplayHoverPause: true,
        animateOut: "fadeOut",
        animateIn: "fadeIn",
        autoHeight: false,
        smartSpeed: 900,
        navText: [
          '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>',
          '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>',
        ],
      });
    }
  };

  initHeroSlider();

  let animateSingleStatCounter = null;
  let runStatsCounterAnimation = null;

  // Animate stats counter numbers from 0 to target value on scroll into view
  const initStatsCounter = function () {
    const $counterElements = $(".what_we_do_section__counter");
    if (!$counterElements.length) return;

    animateSingleStatCounter = function (cardElement) {
      const $counter = $(cardElement).find(".what_we_do_section__counter");
      if (!$counter.length || $counter.data("animated")) return;
      $counter.data("animated", true);

      const targetValue = parseInt($counter.attr("data-target"), 10);
      if (isNaN(targetValue)) return;

      const duration = 1500; // 1.5s smooth rolling duration
      const startTime = performance.now();

      const updateCount = function (currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const easeOutProgress = 1 - Math.pow(1 - progress, 3);
        const currentCount = Math.floor(easeOutProgress * targetValue);

        $counter.text(currentCount.toLocaleString());

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          $counter.text(targetValue.toLocaleString());
        }
      };

      requestAnimationFrame(updateCount);
    };

    let allAnimated = false;
    runStatsCounterAnimation = function () {
      if (allAnimated) return;
      allAnimated = true;

      $(".what_we_do_section__stat_card").each(function () {
        animateSingleStatCounter(this);
      });
    };

    const statsSection = document.querySelector(".what_we_do_section__stats");
    if (statsSection && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              runStatsCounterAnimation();
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.25 }
      );
      observer.observe(statsSection);
    } else {
      // Fallback if IntersectionObserver is not supported
      runStatsCounterAnimation();
    }
  };

  initStatsCounter();

  // Process Flow interactive step navigation with native JavaScript scroll-driven pinning interaction
  const initProcessFlow = function () {
    const $stepButtons = $(".process_flow_section__step_btn");
    const $panels = $(".process_flow_section__panel");
    const $progressBar = $(".process_flow_section__nav_progress");
    const totalSteps = $stepButtons.length;
    const processSection = document.querySelector(".process_flow_section");
    const stickyWrap = document.querySelector(".process_flow_section__sticky_wrap");

    if (!totalSteps || !processSection || !stickyWrap) return;

    let currentStep = 1;
    let isInitial = true;
    let isClickScrolling = false;
    let clickScrollTimer = null;
    let scrollDistance = 0;
    let stickyTop = 0;

    // Dynamically calibrate nav track so 0% aligns with Step 1 center and 100% aligns with Step 5 center
    const alignNavTrack = function () {
      if (window.innerWidth < 992) return;
      const $firstBtn = $stepButtons.first();
      const $lastBtn = $stepButtons.last();
      const $nav = $(".process_flow_section__nav");
      const $track = $(".process_flow_section__nav_track");
      if (!$firstBtn.length || !$lastBtn.length || !$nav.length || !$track.length) return;

      const $firstNode = $firstBtn.find(".process_flow_section__step_node");
      const $lastNode = $lastBtn.find(".process_flow_section__step_node");
      if (!$firstNode.length || !$lastNode.length) return;

      const navEl = $nav[0];
      const firstEl = $firstNode[0];
      const lastEl = $lastNode[0];

      const navRect = navEl.getBoundingClientRect();
      const firstRect = firstEl.getBoundingClientRect();
      const lastRect = lastEl.getBoundingClientRect();

      const firstCenter = (firstRect.left + firstRect.width / 2) - navRect.left;
      const lastCenter = (lastRect.left + lastRect.width / 2) - navRect.left;

      if (firstCenter >= 0 && lastCenter > firstCenter) {
        $track.css({
          left: firstCenter + "px",
          width: (lastCenter - firstCenter) + "px",
          right: "auto",
        });

        // Keep active step indicator aligned after layout recalibration
        if (currentStep) {
          const currentPercent = getStepPositionPercent(currentStep);
          $progressBar.css("width", currentPercent + "%");
        }
      }
    };

    // Calculate the exact percentage position along the nav track for any given step
    const getStepPositionPercent = function (stepIndex) {
      if (stepIndex <= 1) return 0;
      if (stepIndex >= totalSteps) return 100;

      const trackEl = document.querySelector(".process_flow_section__nav_track");
      const targetBtn = document.querySelector('.process_flow_section__step_btn[data-step="' + stepIndex + '"]');
      if (!trackEl || !targetBtn) {
        return ((stepIndex - 1) / (totalSteps - 1)) * 100;
      }

      const targetNode = targetBtn.querySelector(".process_flow_section__step_node");
      if (!targetNode) {
        return ((stepIndex - 1) / (totalSteps - 1)) * 100;
      }

      const trackRect = trackEl.getBoundingClientRect();
      const nodeRect = targetNode.getBoundingClientRect();

      if (trackRect.width <= 0) return ((stepIndex - 1) / (totalSteps - 1)) * 100;

      const nodeCenter = nodeRect.left + (nodeRect.width / 2);
      const targetDistance = nodeCenter - trackRect.left;
      const percent = (targetDistance / trackRect.width) * 100;

      return Math.max(0, Math.min(100, percent));
    };

    // Interpolate scrub progress along actual physical node positions
    const getScrubProgressPercent = function (progress) {
      const clamped = Math.max(0, Math.min(1, progress));
      const segment = clamped * (totalSteps - 1);
      const index = Math.floor(segment);
      if (index >= totalSteps - 1) {
        return getStepPositionPercent(totalSteps);
      }
      const frac = segment - index;
      const pStart = getStepPositionPercent(index + 1);
      const pEnd = getStepPositionPercent(index + 2);
      return pStart + frac * (pEnd - pStart);
    };

    // Smoothly animate progress bar to exact position of a step
    const animateProgressBar = function (stepIndex) {
      if (totalSteps <= 1) return;
      const targetPercent = getStepPositionPercent(stepIndex);
      $progressBar.css({
        transition: "width 0.45s cubic-bezier(0.25, 1, 0.5, 1)",
        width: targetPercent + "%",
      });
    };

    // Scroll active step button into view on mobile
    const scrollBtnIntoView = function (step) {
      if (window.innerWidth >= 992) return;
      const navContainer = document.querySelector(".process_flow_section__nav");
      const activeBtn = document.querySelector('.process_flow_section__step_btn[data-step="' + step + '"]');
      if (navContainer && activeBtn) {
        const targetScrollLeft = activeBtn.offsetLeft - (navContainer.clientWidth / 2) + (activeBtn.clientWidth / 2);
        navContainer.scrollTo({
          left: Math.max(0, targetScrollLeft),
          behavior: "smooth",
        });
      }
    };

    const setStep = function (stepIndex, updateProgress) {
      if (stepIndex < 1) stepIndex = 1;
      if (stepIndex > totalSteps) stepIndex = totalSteps;

      const isSameStep = !isInitial && stepIndex === currentStep;

      // Always move progress bar to exact step position if clicked or requested
      if (updateProgress) {
        animateProgressBar(stepIndex);
      }

      if (isSameStep) return;

      const previousStep = currentStep;
      currentStep = stepIndex;
      const direction = stepIndex >= previousStep ? 1 : -1;

      // Update button active state
      $stepButtons.removeClass("active");
      $stepButtons.filter('[data-step="' + stepIndex + '"]').addClass("active");

      // Smooth progress bar update if not disabled and not already animated above
      if (updateProgress !== false && !updateProgress) {
        animateProgressBar(stepIndex);
      }

      const $nextPanel = $panels.filter('[data-panel="' + stepIndex + '"]');

      if (isInitial) {
        isInitial = false;
        $panels.removeClass("active");
        $nextPanel.addClass("active");
        $progressBar.css("width", "0%");
        return;
      }

      // Hide all other panels immediately
      $panels.not($nextPanel).removeClass("active");

      // Activate next panel with smooth reveal
      $nextPanel.addClass("active");
      scrollBtnIntoView(stepIndex);
      const nextPanelEl = $nextPanel[0];

      if (nextPanelEl && typeof nextPanelEl.animate === "function") {
        nextPanelEl.animate(
          [
            { opacity: 0, transform: "translateY(" + (direction * 10) + "px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          {
            duration: 380,
            easing: "cubic-bezier(0.25, 1, 0.5, 1)",
            fill: "forwards",
          }
        );

        // Micro-settle for the panel image
        const $nextImg = $nextPanel.find(".process_flow_section__panel_img");
        if ($nextImg.length && typeof $nextImg[0].animate === "function") {
          $nextImg[0].animate(
            [
              { transform: "scale(1.03)" },
              { transform: "scale(1)" },
            ],
            {
              duration: 500,
              easing: "cubic-bezier(0.25, 1, 0.5, 1)",
              fill: "forwards",
            }
          );
        }
      }
    };

    // Calibrate desktop pinning height and sticky offset
    const calibrateSectionHeight = function () {
      if (window.innerWidth >= 992) {
        const wrapHeight = stickyWrap.offsetHeight;
        stickyTop = 0;
        stickyWrap.style.top = "-100px";
        scrollDistance = window.innerHeight * 2.2;
        processSection.style.minHeight = (wrapHeight + scrollDistance) + "px";
      } else {
        stickyWrap.style.top = "";
        processSection.style.minHeight = "";
        scrollDistance = 0;
      }
    };

    // Update scroll scrub calculation
    const updateScrollScrub = function () {
      if (window.innerWidth < 992 || isClickScrolling || scrollDistance <= 0) return;

      const sectionRect = processSection.getBoundingClientRect();
      const scrolled = stickyTop - sectionRect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollDistance));

      let calculatedStep = Math.round(progress * (totalSteps - 1)) + 1;
      if (calculatedStep > totalSteps) calculatedStep = totalSteps;
      if (calculatedStep < 1) calculatedStep = 1;

      if (calculatedStep !== currentStep) {
        setStep(calculatedStep, false);
      }

      // Smooth laser beam tracker progression aligned with physical node coordinates
      const beamPercentage = getScrubProgressPercent(progress);
      $progressBar.css({
        transition: "none",
        width: beamPercentage + "%",
      });
    };

    // Initial setup
    setStep(1);
    alignNavTrack();
    calibrateSectionHeight();

    // Scroll listener using requestAnimationFrame for smooth performance
    let ticking = false;
    const handleScroll = function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          updateScrollScrub();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Window resize & load listeners
    window.addEventListener("resize", function () {
      alignNavTrack();
      calibrateSectionHeight();
      if (currentStep) {
        animateProgressBar(currentStep);
      }
      updateScrollScrub();
    });

    window.addEventListener("load", function () {
      alignNavTrack();
      calibrateSectionHeight();
      if (currentStep) {
        animateProgressBar(currentStep);
      }
      updateScrollScrub();
    });

    // Step button click handlers
    $stepButtons.on("click", function (e) {
      e.preventDefault();
      const clickedStep = parseInt($(this).attr("data-step"), 10);
      if (isNaN(clickedStep)) return;

      isClickScrolling = true;
      clearTimeout(clickScrollTimer);

      setStep(clickedStep, true);

      if (window.innerWidth >= 992 && scrollDistance > 0) {
        const stepProgress = (clickedStep - 1) / (totalSteps - 1);
        const sectionTopDoc = processSection.getBoundingClientRect().top + window.scrollY;
        const targetScrollY = sectionTopDoc - stickyTop + (stepProgress * scrollDistance);

        window.scrollTo({
          top: targetScrollY,
          behavior: "smooth",
        });

        clickScrollTimer = setTimeout(function () {
          isClickScrolling = false;
        }, 800);
      } else {
        isClickScrolling = false;
      }

      // On mobile screens, scroll clicked step button into view
      if (window.innerWidth < 992) {
        scrollBtnIntoView(clickedStep);
      }
    });

    // Touch swipe gesture support on mobile for process panels
    const panelContainer = document.querySelector(".process_flow_section__panels");
    if (panelContainer) {
      let touchStartX = 0;
      let touchStartY = 0;

      panelContainer.addEventListener("touchstart", function (e) {
        if (e.touches && e.touches.length === 1) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
        }
      }, { passive: true });

      panelContainer.addEventListener("touchend", function (e) {
        if (window.innerWidth >= 992) return;
        if (!touchStartX || !touchStartY || !e.changedTouches || !e.changedTouches.length) return;

        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;

        // Detect clean horizontal swipe
        if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
          if (diffX > 0 && currentStep < totalSteps) {
            // Swiped left -> advance to next step
            setStep(currentStep + 1, true);
          } else if (diffX < 0 && currentStep > 1) {
            // Swiped right -> go to previous step
            setStep(currentStep - 1, true);
          }
        }
        touchStartX = 0;
        touchStartY = 0;
      }, { passive: true });
    }

    // User manual scroll input instantly restores scrubbing
    window.addEventListener("wheel", function () { isClickScrolling = false; }, { passive: true });
    window.addEventListener("touchmove", function () { isClickScrolling = false; }, { passive: true });
    window.addEventListener("keydown", function () { isClickScrolling = false; }, { passive: true });
    window.addEventListener("scrollend", function () { isClickScrolling = false; }, { passive: true });
  };

  initProcessFlow();

  // Category Filter for Featured Products
  const initFeaturedProductsFilter = function () {
    const $tabBtns = $(".featured_products_section__tab_btn");
    const $cards = $(".featured_products_section__card_col");

    if (!$tabBtns.length || !$cards.length) return;

    $tabBtns.on("click", function () {
      const $btn = $(this);
      const filter = $btn.attr("data-filter");

      $tabBtns.removeClass("active");
      $btn.addClass("active");

      if (filter === "all") {
        $cards.stop().fadeIn(250);
      } else {
        $cards.each(function () {
          const $card = $(this);
          if ($card.attr("data-category") === filter) {
            $card.stop().fadeIn(250);
          } else {
            $card.stop().hide();
          }
        });
      }
    });
  };

  initFeaturedProductsFilter();

  // Final CTA Consultation Form Submit Handler
  const initFinalCtaForm = function () {
    const $form = $("#finalCtaForm");
    if (!$form.length) return;

    $form.on("submit", function (e) {
      e.preventDefault();
      alert("感谢您的定制咨询！世宗高科技工程团队已收到您的食材工况需求，我们将在24小时内与您联系并提供流水线选型方案与图纸。");
      $form[0].reset();
    });
  };

  initFinalCtaForm();

  // Scroll reveal animations (AOS and native IntersectionObserver)
  const initScrollAnimations = function () {
    // Respect user's motion preferences
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Process Flow Section — nav reveal using native IntersectionObserver
    const processNav = document.querySelector(".process_flow_section__nav");
    if (processNav && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              if (typeof processNav.animate === "function") {
                processNav.animate(
                  [
                    { opacity: 0, transform: "translateY(24px)" },
                    { opacity: 1, transform: "translateY(0)" },
                  ],
                  {
                    duration: 850,
                    easing: "cubic-bezier(0.25, 1, 0.5, 1)",
                    fill: "forwards",
                  }
                );
              }
              obs.unobserve(processNav);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -12% 0px" }
      );
      observer.observe(processNav);
    }

    // AOS (Animate On Scroll) initialization
    if (typeof AOS !== "undefined") {
      AOS.init({
        duration: 700,
        easing: "ease-out-cubic",
        once: true,
        offset: 70,
        disable: function () {
          // Disable AOS animations on mobile screens and mobile devices
          return window.innerWidth < 992 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        },
      });

      // Recalibrate AOS on resize
      window.addEventListener("resize", function () {
        AOS.refresh();
      });
    }
  };

  initScrollAnimations();
});

