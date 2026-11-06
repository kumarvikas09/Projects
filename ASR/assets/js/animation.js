/* ==========================================
Animation JavaScript (GSAP & ScrollTrigger)
File: animation.js
========================================== */

$(document).ready(function () {
  // Initialize Banner Section scroll animation (Section 1)
  initBannerSection();

  // Initialize Services pinned scroll animation (Specialized Medical Courier Services)
  initServicesPinAnimation();

  // Initialize How It Works connecting lines & scroll animation (Section 2)
  initHowItWorksConnectors();

  // Initialize Why ASR Section scroll animation
  initWhyAsrSection();

  // Initialize Healthcare pinned scroll animation (Section 3)
  initHealthcareScrollSection();

  // Initialize Contact section scroll animation (Section 4)
  initContactSection();

  // Initialize CTA section scroll animation (Section 5)
  initCtaSection();

  // Initialize About Page subtle animations (About Us page)
  initAboutPageAnimations();

  // Initialize Services Page Grid animations (Services page)
  initServicesGridAnimations();

  // Initialize FAQ section scroll animation (Contact page)
  initFaqSection();

  // Recalculate all ScrollTrigger start/end and pin coordinates in correct DOM order
  if (typeof ScrollTrigger !== "undefined") {
    ScrollTrigger.refresh();
  }
});

// Refresh ScrollTrigger after all page images, fonts, and assets finish loading
window.addEventListener("load", function () {
  if (typeof ScrollTrigger !== "undefined") {
    ScrollTrigger.refresh();
  }
});

// Helper to dynamically read current header height (scrolled compact state for pinning offset)
function getHeaderHeight() {
  const header = document.querySelector(".site_header");
  if (header) {
    if (header.classList.contains("site_header--scrolled")) {
      return header.offsetHeight;
    }
    return window.innerWidth >= 992 ? 74 : (window.innerWidth >= 576 ? 58 : 54);
  }
  return 74;
}

/* ==========================================
Banner Section Automatic Transition Animation
========================================== */
let bannerTimeline = null;
let bannerMatchMedia = null;

function initBannerSection() {
  const section = document.querySelector(".banner_section");
  if (!section || typeof gsap === "undefined") return;

  const contentCol = section.querySelector(".banner_section__content_col");
  const mediaCol = section.querySelector(".banner_section__media_col");
  const overlay = section.querySelector(".banner_section__overlay");
  const rangeItems = section.querySelectorAll(".banner_section__range_item");
  const fills = section.querySelectorAll(".banner_section__range_fill");
  const features = section.querySelector(".banner_section__features");
  const overlayFooter = section.querySelector(".banner_section__overlay_footer");

  if (!contentCol || !mediaCol || !overlay) return;

  // Clean up any existing timelines and matchMedia instances
  if (bannerTimeline) {
    bannerTimeline.kill();
    bannerTimeline = null;
  }
  if (bannerMatchMedia) {
    bannerMatchMedia.revert();
    bannerMatchMedia = null;
  }

  // Target percentages from data-progress attribute
  const targetPercentages = [];
  rangeItems.forEach(function (item) {
    targetPercentages.push(item.getAttribute("data-progress") || "60");
  });

  if (typeof ScrollTrigger === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);

  // Helper: Build the sequential scroll-controlled timeline for desktop
  function buildScrollSequence(tl) {
    // Stage 1: Reveal Overlay over the banner image
    tl.to(overlay, {
      autoAlpha: 1,
      y: 0,
      duration: 1.2,
      ease: "power1.out",
    });

    // Small breathing pause after overlay appears
    tl.to({}, { duration: 0.2 });

    // Stage 2: Sequential Range Items (Reveal -> Fill -> Next Reveal -> Next Fill...)
    if (rangeItems.length) {
      rangeItems.forEach(function (item, idx) {
        // Step A: Reveal current range item (fade in and slide upward into view)
        tl.to(item, {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power1.out",
        });

        // Step B: Fill the current item's range/progress indicator from empty to full
        const fill = item.querySelector(".banner_section__range_fill");
        if (fill) {
          const targetW = (targetPercentages[idx] || 60) + "%";
          tl.to(fill, {
            width: targetW,
            duration: 1.2,
            ease: "power1.inOut",
          });
        }

        // Step C: Ensure current fill completes before next item starts
        tl.to({}, { duration: 0.25 });
      });
    }

    // Stage 3: Reveal bottom-right mockup badge
    if (overlayFooter) {
      tl.to(overlayFooter, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: "power1.out",
      });
    }

    // Stage 4: Hold completed state before section unpins
    tl.to({}, { duration: 0.8 });
  }

  bannerMatchMedia = gsap.matchMedia();

  // ================================================================
  // Desktop & Tablet (min-width: 992px): Pinned ScrollTrigger Sequence
  // ================================================================
  bannerMatchMedia.add("(min-width: 992px)", () => {
    // Initial hidden states for desktop entrance and scroll sequence
    gsap.set(contentCol, { autoAlpha: 0, x: -70 });
    gsap.set(mediaCol, { autoAlpha: 0, x: 70 });
    gsap.set(overlay, { autoAlpha: 0, y: 24 });
    if (rangeItems.length) {
      gsap.set(rangeItems, { autoAlpha: 0, y: 20 });
    }
    fills.forEach(function (fill) {
      gsap.set(fill, { width: "0%" });
    });
    if (overlayFooter) {
      gsap.set(overlayFooter, { autoAlpha: 0, y: 12 });
    }
    if (features) {
      gsap.set(features, { autoAlpha: 0, y: 30 });
    }

    // 1. Column Entrances & Features on Page Load
    bannerTimeline = gsap.timeline({
      delay: 0.2,
    });

    bannerTimeline.to(contentCol, {
      autoAlpha: 1,
      x: 0,
      duration: 0.85,
      ease: "power2.out",
    });

    bannerTimeline.to(
      mediaCol,
      {
        autoAlpha: 1,
        x: 0,
        duration: 0.85,
        ease: "power2.out",
      },
      "<" // Synchronized with Content Column
    );

    if (features) {
      bannerTimeline.to(
        features,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
        },
        "-=0.1"
      );
    }

    // 2. Scroll-controlled scrubbed sequence with pinning
    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: () => "top " + getHeaderHeight() + "px",
        end: "+=2600",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    buildScrollSequence(scrollTimeline);

    return () => {
      if (bannerTimeline) {
        bannerTimeline.kill();
        bannerTimeline = null;
      }
      scrollTimeline.kill();
    };
  });

  // ================================================================
  // Mobile Devices (max-width: 991.98px): All ScrollTrigger Disabled
  // ================================================================
  bannerMatchMedia.add("(max-width: 991.98px)", () => {
    // 1. Reset columns and features to their normal visible layout
    gsap.set([contentCol, mediaCol], {
      clearProps: "transform,opacity,visibility",
    });
    if (features) {
      gsap.set(features, { clearProps: "transform,opacity,visibility" });
    }

    // 2. Display overlay, range items, and footer in their normal visible state
    gsap.set([overlay, overlayFooter], {
      autoAlpha: 1,
      y: 0,
      clearProps: "transform,opacity,visibility",
    });
    if (rangeItems.length) {
      gsap.set(rangeItems, {
        autoAlpha: 1,
        y: 0,
        clearProps: "transform,opacity,visibility",
      });
    }

    // 3. Set all progress fills to their final target values
    fills.forEach((fill, idx) => {
      const targetW = (targetPercentages[idx] || 100) + "%";
      gsap.set(fill, { width: targetW, clearProps: "transform" });
    });

    return () => {
      // Revert mobile styles when resizing back up to desktop
      gsap.set([overlay, overlayFooter], { clearProps: "all" });
      if (rangeItems.length) {
        gsap.set(rangeItems, { clearProps: "all" });
      }
      fills.forEach((fill) => {
        gsap.set(fill, { clearProps: "width" });
      });
    };
  });
}

/* ==========================================
How It Works Section Connecting Lines & Node Animation
========================================== */
let howItWorksTimeline = null;

function initHowItWorksConnectors() {
  const section = document.querySelector(".how_it_works_section");
  if (!section) return;

  const flow = section.querySelector(".how_it_works_section__flow");
  const svg = section.querySelector(".how_it_works_section__svg_lines");
  const card1 = section.querySelector(".how_it_works_section__card--step_1");
  const card2 = section.querySelector(".how_it_works_section__card--step_2");
  const card3 = section.querySelector(".how_it_works_section__card--step_3");

  if (!flow || !svg || !card1 || !card2 || !card3) return;

  let isUpdating = false;

  function updatePaths() {
    if (isUpdating) return;
    isUpdating = true;

    // 1. Clean up previous GSAP timeline and ScrollTrigger instance
    if (howItWorksTimeline) {
      if (howItWorksTimeline.scrollTrigger) {
        howItWorksTimeline.scrollTrigger.kill();
      }
      howItWorksTimeline.kill();
      howItWorksTimeline = null;
    }

    // Reset card animated properties before measuring natural DOM rects
    if (typeof gsap !== "undefined") {
      gsap.set([card1, card2, card3], {
        clearProps: "transform,opacity,visibility",
      });
      gsap.set(svg, { clearProps: "opacity,visibility" });
    }

    const flowRect = flow.getBoundingClientRect();
    const isDesktop = window.innerWidth >= 768;

    const c1 = card1.getBoundingClientRect();
    const c2 = card2.getBoundingClientRect();
    const c3 = card3.getBoundingClientRect();

    let visiblePathsHtml = "";
    let guidePathD = "";
    const nodeRadius = isDesktop ? 12 : 10;

    let tCard2 = 0.35;

    if (!isDesktop) {
      // Mobile vertical layout
      const midX = c1.left - flowRect.left + c1.width / 2;
      const y1Bottom = c1.bottom - flowRect.top;
      const y2Top = c2.top - flowRect.top;
      const y2Bottom = c2.bottom - flowRect.top;
      const y3Top = c3.top - flowRect.top;

      const d1 = `M ${midX} ${y1Bottom} V ${y2Top}`;
      const d2 = `M ${midX} ${y2Bottom} V ${y3Top}`;

      visiblePathsHtml = `
        <path class="how_it_works_section__path" d="${d1}"></path>
        <path class="how_it_works_section__path" d="${d2}"></path>
      `;

      guidePathD = `M ${midX} ${y1Bottom} V ${y3Top}`;

      const totalMobileSpan = y3Top - y1Bottom;
      if (totalMobileSpan > 0) {
        tCard2 = Math.min(Math.max((y2Top - y1Bottom) / totalMobileSpan, 0.2), 0.6);
      }
    } else {
      const cornerRadius = 24;
      const cardCornerR = 16;

      // Path 1: Card 1 right edge -> Card 2 top entrance
      const p1StartX = c1.right - flowRect.left;
      const p1StartY = c1.top - flowRect.top + c1.height * 0.35;
      const p1EndX = c2.left - flowRect.left + c2.width * 0.5;
      const p1EndY = c2.top - flowRect.top;

      const path1 = `M ${p1StartX} ${p1StartY} H ${p1EndX - cornerRadius} Q ${p1EndX} ${p1StartY} ${p1EndX} ${p1StartY + cornerRadius} V ${p1EndY}`;

      // Path 2: Card 2 left edge -> Card 3 top entrance
      const p2StartX = c2.left - flowRect.left;
      const p2StartY = c2.top - flowRect.top + c2.height * 0.35;
      const p2EndX = c3.left - flowRect.left + c3.width * 0.5;
      const p2EndY = c3.top - flowRect.top;

      const path2 = `M ${p2StartX} ${p2StartY} H ${p2EndX + cornerRadius} Q ${p2EndX} ${p2StartY} ${p2EndX} ${p2StartY + cornerRadius} V ${p2EndY}`;

      visiblePathsHtml = `
        <path class="how_it_works_section__path" d="${path1}"></path>
        <path class="how_it_works_section__path" d="${path2}"></path>
      `;

      // Continuous guide path linking Step 1 through Step 3
      guidePathD = [
        `M ${p1StartX} ${p1StartY}`,
        `H ${p1EndX - cornerRadius}`,
        `Q ${p1EndX} ${p1StartY} ${p1EndX} ${p1StartY + cornerRadius}`,
        `V ${p1EndY}`,
        `H ${p2StartX + cardCornerR}`,
        `Q ${p2StartX} ${p1EndY} ${p2StartX} ${p1EndY + cardCornerR}`,
        `V ${p2StartY}`,
        `H ${p2EndX + cornerRadius}`,
        `Q ${p2EndX} ${p2StartY} ${p2EndX} ${p2StartY + cornerRadius}`,
        `V ${p2EndY}`,
      ].join(" ");

      // Measure segment lengths to identify exact arrival time at Card 2
      const tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      const tempP1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
      tempP1.setAttribute("d", path1);
      tempSvg.appendChild(tempP1);

      document.body.appendChild(tempSvg);
      const lenPath1 = tempP1.getTotalLength();
      document.body.removeChild(tempSvg);

      tCard2 = lenPath1;
    }

    const maskId = "how_it_works_path_mask";

    svg.innerHTML = `
      <defs>
        <mask id="${maskId}" maskUnits="userSpaceOnUse">
          <path class="how_it_works_section__mask_path" d="${guidePathD}" fill="none" stroke="#ffffff" stroke-width="32" stroke-linecap="round"></path>
        </mask>
      </defs>
      <g mask="url(#${maskId})">
        ${visiblePathsHtml}
      </g>
      <path class="how_it_works_section__guide_path" d="${guidePathD}"></path>
      <circle class="how_it_works_section__node" cx="0" cy="0" r="${nodeRadius}"></circle>
    `;

    const guidePath = svg.querySelector(".how_it_works_section__guide_path");
    const maskPath = svg.querySelector(".how_it_works_section__mask_path");
    const nodeCircle = svg.querySelector(".how_it_works_section__node");

    if (!guidePath || !nodeCircle) {
      isUpdating = false;
      return;
    }

    const totalLength = guidePath.getTotalLength();
    if (!totalLength) {
      isUpdating = false;
      return;
    }

    if (maskPath) {
      maskPath.style.strokeDasharray = `${totalLength + 20} ${totalLength + 20}`;
      maskPath.style.strokeDashoffset = `${totalLength + 20}`;
    }

    if (isDesktop) {
      tCard2 = Math.min(Math.max(tCard2 / totalLength, 0.2), 0.6);
    }

    // Set initial position of node circle at Step 1
    const startPoint = guidePath.getPointAtLength(0);
    nodeCircle.setAttribute("cx", startPoint.x);
    nodeCircle.setAttribute("cy", startPoint.y);

    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      isUpdating = false;
      return;
    }

    // 2. Initial state: Step 1 is visible, Steps 2, 3 are hidden with slight downward offset
    gsap.set(card1, { autoAlpha: 1, y: 0 });
    gsap.set([card2, card3], { autoAlpha: 0, y: 35 });
    gsap.set(nodeCircle, { autoAlpha: 0 });

    // 3. Timeline starting when section reaches comfortable viewport position
    const motionProgress = { progress: 0 };
    const TOTAL_TIME = 100;

    howItWorksTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top center", // Starts when section reaches approximately the middle of the viewport
        end: "bottom 75%",   // Completes comfortably while section & Step 3 are visible
        scrub: 1,            // Silky responsive scrub without lag
        invalidateOnRefresh: true,
        onLeaveBack: () => {
          gsap.set(svg, { autoAlpha: 0 });
        },
        onEnter: () => {
          gsap.set(svg, { autoAlpha: 1 });
        },
        onEnterBack: () => {
          gsap.set(svg, { autoAlpha: 1 });
        },
      },
    });

    // Fade in the ball at Step 1 right as animation begins
    howItWorksTimeline.fromTo(
      nodeCircle,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 2.5, ease: "power1.out" },
      0
    );

    // Animate ball and progressive dashed path reveal synchronously along guide path
    howItWorksTimeline.to(
      motionProgress,
      {
        progress: 1,
        ease: "none",
        duration: TOTAL_TIME,
        onUpdate: () => {
          const currentLength = motionProgress.progress * totalLength;
          const point = guidePath.getPointAtLength(currentLength);
          nodeCircle.setAttribute("cx", point.x);
          nodeCircle.setAttribute("cy", point.y);
          if (maskPath) {
            maskPath.style.strokeDashoffset = Math.max(0, totalLength - currentLength);
          }
        },
      },
      0
    );

    // Sequential card reveals: smooth fade-up triggered as the ball arrives at each step
    const revealDuration = 10;

    // Step 2 reveals as the ball reaches Card 2
    const timeCard2 = tCard2 * TOTAL_TIME;
    howItWorksTimeline.to(
      card2,
      {
        autoAlpha: 1,
        y: 0,
        ease: "power2.out",
        duration: revealDuration,
      },
      Math.max(0, timeCard2 - revealDuration * 0.4)
    );

    // Step 3 reveals as the ball approaches Card 3
    howItWorksTimeline.to(
      card3,
      {
        autoAlpha: 1,
        y: 0,
        ease: "power2.out",
        duration: revealDuration,
      },
      TOTAL_TIME - revealDuration - 2
    );

    // Buffer at the end to hold final state before scrolling past
    howItWorksTimeline.to({}, { duration: 8 });

    isUpdating = false;

    // Refresh ScrollTrigger so all section positions and pin offsets stay synchronized
    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.refresh();
    }
  }

  updatePaths();

  let resizeTimer = null;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(updatePaths, 150);
  });

  window.addEventListener("load", updatePaths);
}

/* ==========================================
Why ASR Section Scroll Animation
========================================== */
let whyAsrTimeline = null;

function initWhyAsrSection() {
  const section = document.querySelector(".why_asr_section");
  if (!section || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

  const header = section.querySelector(".why_asr_section__header");
  const cards = section.querySelectorAll(".why_asr_section__card");
  const footer = section.querySelector(".why_asr_section__footer");

  // Respect prefers-reduced-motion accessibility preference
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    if (header) gsap.set(header, { autoAlpha: 1, y: 0 });
    if (cards.length) gsap.set(cards, { autoAlpha: 1, y: 0 });
    if (footer) gsap.set(footer, { autoAlpha: 1, y: 0 });
    return;
  }

  // Clean up any existing timeline and ScrollTrigger instance
  if (whyAsrTimeline) {
    if (whyAsrTimeline.scrollTrigger) {
      whyAsrTimeline.scrollTrigger.kill();
    }
    whyAsrTimeline.kill();
    whyAsrTimeline = null;
  }

  // Set initial hidden states to prevent flickering before scroll trigger fires (matching cta_section)
  if (header) gsap.set(header, { autoAlpha: 0, y: 45 });
  if (cards.length) gsap.set(cards, { autoAlpha: 0, y: 55 });
  if (footer) gsap.set(footer, { autoAlpha: 0, y: 40 });

  // Sequential reveal timeline matching cta_section ScrollTrigger configuration
  whyAsrTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });

  // 1. Section Header — reveal from bottom to top
  if (header) {
    whyAsrTimeline.to(header, {
      autoAlpha: 1,
      y: 0,
      duration: 0.55,
      ease: "power2.out",
    });
  }

  // 2. Four Cards — sequential one-by-one reveal from bottom to top with subtle stagger
  if (cards.length) {
    whyAsrTimeline.to(
      cards,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.14,
        ease: "power2.out",
        onComplete: () => {
          gsap.set(cards, { clearProps: "transform" });
        },
      },
      "-=0.2"
    );
  }

  // 3. Bottom CTA Area — reveal closing sentence and Contact Us button from bottom to top
  if (footer) {
    whyAsrTimeline.to(
      footer,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.15"
    );
  }
}

/* ==========================================
Healthcare Section ScrollTrigger Animation
========================================== */
function initHealthcareScrollSection() {
  const section = document.querySelector(".healthcare_section");
  if (!section) return;

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("GSAP or ScrollTrigger is not loaded.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const mm = gsap.matchMedia();

  // Desktop & Tablet Landscape (min-width: 992px)
  mm.add("(min-width: 992px)", () => {
    const mediaCol = section.querySelector(".healthcare_section__media_col");
    const contentCol = section.querySelector(".healthcare_section__content_col");
    const overlay = section.querySelector(".healthcare_section__overlay");
    const overlayContent = section.querySelector(".healthcare_section__overlay_content");

    if (!mediaCol || !contentCol || !overlay) return;

    // Set initial state matching Design 1
    gsap.set(mediaCol, { width: "100%" });
    gsap.set(contentCol, { autoAlpha: 0, x: 80 });
    gsap.set(overlay, { autoAlpha: 0 });
    if (overlayContent) {
      gsap.set(overlayContent, { autoAlpha: 0, y: 25 });
    }

    // Scroll-driven pinned timeline
    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=2200",
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Step 1: Smoothly resize the image from full width to left half (Design 1 -> split layout)
    scrollTimeline.to(
      mediaCol,
      {
        width: "48%",
        ease: "power2.inOut",
        duration: 2.2,
      },
      0
    );

    // Step 2: Reveal the right content panel as image approaches its half width
    scrollTimeline.to(
      contentCol,
      {
        autoAlpha: 1,
        x: 0,
        ease: "power2.out",
        duration: 1.6,
      },
      1.0
    );

    // Step 3: Reveal the blue overlay and text on top of the image
    scrollTimeline.to(
      overlay,
      {
        autoAlpha: 1,
        ease: "power2.out",
        duration: 1.2,
      },
      2.2
    );

    // Subtle upward reveal for overlay stats & text
    if (overlayContent) {
      scrollTimeline.to(
        overlayContent,
        {
          autoAlpha: 1,
          y: 0,
          ease: "power2.out",
          duration: 1.0,
        },
        2.4
      );
    }

    // Settled pause so user views complete Design 2 before unpinning
    scrollTimeline.to({}, { duration: 0.6 });

    return () => {
      scrollTimeline.kill();
    };
  });
}

/* ==========================================
Contact Section Scroll Animation
========================================== */
let contactTimeline = null;

function initContactSection() {
  const section = document.querySelector(".contact_section");
  if (!section || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

  const header = section.querySelector(".contact_section__header");
  const formCard = section.querySelector(".contact_section__form_card");
  const infoCard = section.querySelector(".contact_section__info_card, .contact_section__col_info");

  // Respect prefers-reduced-motion accessibility preference
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    if (header) gsap.set(header, { autoAlpha: 1, y: 0 });
    if (formCard) gsap.set(formCard, { autoAlpha: 1, y: 0 });
    if (infoCard) gsap.set(infoCard, { autoAlpha: 1, y: 0 });
    return;
  }

  // Clean up any existing timeline and ScrollTrigger instance
  if (contactTimeline) {
    if (contactTimeline.scrollTrigger) {
      contactTimeline.scrollTrigger.kill();
    }
    contactTimeline.kill();
    contactTimeline = null;
  }

  // Pre-hide elements to prevent flickering before scroll trigger fires (matching cta_section pattern)
  if (header) gsap.set(header, { autoAlpha: 0, y: 35 });
  if (infoCard) gsap.set(infoCard, { autoAlpha: 0, y: 35 });
  if (formCard) gsap.set(formCard, { autoAlpha: 0, y: 45 });

  // Sequential reveal timeline matching cta_section ScrollTrigger configuration
  contactTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    onComplete: function () {
      if (header) gsap.set(header, { clearProps: "transform" });
      if (infoCard) gsap.set(infoCard, { clearProps: "transform" });
      if (formCard) gsap.set(formCard, { clearProps: "transform" });
    },
  });

  // 1. Heading and description (if separate header present)
  if (header) {
    contactTimeline.to(header, {
      autoAlpha: 1,
      y: 0,
      duration: 0.55,
      ease: "power2.out",
    });
  }

  // 2. Contact Information Column (left) — animate upward into view with subtle fade-in
  if (infoCard) {
    contactTimeline.to(
      infoCard,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      header ? "-=0.3" : 0
    );
  }

  // 3. Contact Form Card (right) — animate upward into view with gentle fade-in
  if (formCard) {
    contactTimeline.to(
      formCard,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.65,
        ease: "power2.out",
      },
      infoCard ? "-=0.3" : 0
    );
  }
}

/* ==========================================
CTA Section Animation
========================================== */
let ctaTimeline = null;
let ctaGlowAnimationId = null;

function initCtaSection() {
  const ctaSection = document.querySelector(".cta_section");
  if (!ctaSection || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

  const card = ctaSection.querySelector(".cta_section__card");
  const glowOne = ctaSection.querySelector(".cta_section__glow--one");
  const glowTwo = ctaSection.querySelector(".cta_section__glow--two");
  const badge = ctaSection.querySelector(".cta_section__badge");
  const heading = ctaSection.querySelector(".cta_section__heading");
  const subtitle = ctaSection.querySelector(".cta_section__subtitle");
  const actions = ctaSection.querySelector(".cta_section__actions");
  const actionLinks = actions ? actions.querySelectorAll("a") : [];
  const ctaContacts = ctaSection.querySelector(".cta_section__contacts");
  const btnFirst = actionLinks[0];
  const btnSecond = actionLinks[1];

  if (!card) return;

  // Clean up any existing timeline and ScrollTrigger instance
  if (ctaTimeline) {
    if (ctaTimeline.scrollTrigger) {
      ctaTimeline.scrollTrigger.kill();
    }
    ctaTimeline.kill();
    ctaTimeline = null;
  }

  // Clean up existing bouncing screensaver animation
  if (ctaGlowAnimationId) {
    cancelAnimationFrame(ctaGlowAnimationId);
    ctaGlowAnimationId = null;
  }

  // Continuous screensaver bouncing animation for glow elements
  if (glowOne && glowTwo) {
    // Clear any previous GSAP transforms so direct top/left styles control positioning cleanly
    gsap.set([glowOne, glowTwo], {
      clearProps: "transform,x,y,xPercent,yPercent",
    });

    // Helper to calculate card boundary dimensions and maximum travel ranges
    function getBounds() {
      const cardW = card.clientWidth || card.offsetWidth || 1200;
      const cardH = card.clientHeight || card.offsetHeight || 440;

      const w1 = glowOne.offsetWidth || 580;
      const h1 = glowOne.offsetHeight || 360;
      const w2 = glowTwo.offsetWidth || 500;
      const h2 = glowTwo.offsetHeight || 320;

      return {
        cardW,
        cardH,
        maxX1: Math.max(0, cardW - w1),
        maxY1: Math.max(0, cardH - h1),
        maxX2: Math.max(0, cardW - w2),
        maxY2: Math.max(0, cardH - h2),
      };
    }

    let bounds = getBounds();

    // Glow One starting state: upper-left, moving down-right at moderate speed
    const glow1 = {
      x: bounds.maxX1 * 0.12,
      y: bounds.maxY1 * 0.15,
      vx: 48, // pixels per second
      vy: 34, // pixels per second
    };

    // Glow Two starting state: lower-right, moving up-left at independent speed
    const glow2 = {
      x: bounds.maxX2 * 0.88,
      y: bounds.maxY2 * 0.82,
      vx: -40, // pixels per second
      vy: -46, // pixels per second
    };

    glowOne.style.left = glow1.x.toFixed(2) + "px";
    glowOne.style.top = glow1.y.toFixed(2) + "px";
    glowTwo.style.left = glow2.x.toFixed(2) + "px";
    glowTwo.style.top = glow2.y.toFixed(2) + "px";

    let lastTime = performance.now();

    function renderGlows(now) {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      // Recalculate bounds if card dimensions loaded late
      if (bounds.maxX1 === 0 && card.clientWidth > 0) {
        bounds = getBounds();
      }

      if (dt > 0) {
        // --- 1. Update Glow One ---
        glow1.x += glow1.vx * dt;
        glow1.y += glow1.vy * dt;

        // Bounce off left/right edges
        if (glow1.x <= 0) {
          glow1.x = 0;
          glow1.vx = Math.abs(glow1.vx);
        } else if (glow1.x >= bounds.maxX1) {
          glow1.x = bounds.maxX1;
          glow1.vx = -Math.abs(glow1.vx);
        }

        // Bounce off top/bottom edges
        if (glow1.y <= 0) {
          glow1.y = 0;
          glow1.vy = Math.abs(glow1.vy);
        } else if (glow1.y >= bounds.maxY1) {
          glow1.y = bounds.maxY1;
          glow1.vy = -Math.abs(glow1.vy);
        }

        // --- 2. Update Glow Two ---
        glow2.x += glow2.vx * dt;
        glow2.y += glow2.vy * dt;

        // Bounce off left/right edges
        if (glow2.x <= 0) {
          glow2.x = 0;
          glow2.vx = Math.abs(glow2.vx);
        } else if (glow2.x >= bounds.maxX2) {
          glow2.x = bounds.maxX2;
          glow2.vx = -Math.abs(glow2.vx);
        }

        // Bounce off top/bottom edges
        if (glow2.y <= 0) {
          glow2.y = 0;
          glow2.vy = Math.abs(glow2.vy);
        } else if (glow2.y >= bounds.maxY2) {
          glow2.y = bounds.maxY2;
          glow2.vy = -Math.abs(glow2.vy);
        }

        // --- 3. Render Positions via top and left ---
        glowOne.style.left = glow1.x.toFixed(2) + "px";
        glowOne.style.top = glow1.y.toFixed(2) + "px";

        glowTwo.style.left = glow2.x.toFixed(2) + "px";
        glowTwo.style.top = glow2.y.toFixed(2) + "px";
      }

      ctaGlowAnimationId = requestAnimationFrame(renderGlows);
    }

    ctaGlowAnimationId = requestAnimationFrame(renderGlows);

    // Responsive resize handler to dynamically adjust boundaries
    let resizeTimer = null;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        bounds = getBounds();
        if (glow1.x > bounds.maxX1) glow1.x = bounds.maxX1;
        if (glow1.y > bounds.maxY1) glow1.y = bounds.maxY1;
        if (glow2.x > bounds.maxX2) glow2.x = bounds.maxX2;
        if (glow2.y > bounds.maxY2) glow2.y = bounds.maxY2;
      }, 100);
    });

    // Reset lastTime on tab visibility change to prevent jumps
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) {
        lastTime = performance.now();
      }
    });
  }

  // Set initial hidden states to prevent flickering before scroll trigger fires
  gsap.set(card, { autoAlpha: 0, y: 45 });
  if (badge) gsap.set(badge, { autoAlpha: 0, y: 15 });
  if (heading) gsap.set(heading, { autoAlpha: 0, y: 20 });
  if (subtitle) gsap.set(subtitle, { autoAlpha: 0, y: 15 });
  if (btnFirst && btnSecond) {
    gsap.set(btnFirst, { opacity: 0, x: -60 });
    gsap.set(btnSecond, { opacity: 0, x: 60 });
  } else if (btnFirst) {
    gsap.set(btnFirst, { opacity: 0, y: 20 });
  }
  if (ctaContacts) gsap.set(ctaContacts, { autoAlpha: 0, y: 20 });

  // Sequential reveal timeline
  ctaTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ctaSection,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });

  // 1. .cta_section__card — reveal from bottom to top
  ctaTimeline.to(card, {
    autoAlpha: 1,
    y: 0,
    duration: 0.55,
    ease: "power3.out",
  });

  // 2. .cta_section__badge — reveal after the card animation
  if (badge) {
    ctaTimeline.to(
      badge,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.35,
        ease: "power2.out",
      },
      "-=0.2"
    );
  }

  // 3. .cta_section__heading — reveal after the badge
  if (heading) {
    ctaTimeline.to(
      heading,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.42,
        ease: "power2.out",
      },
      "-=0.15"
    );
  }

  // 4. .cta_section__subtitle — reveal after the heading
  if (subtitle) {
    ctaTimeline.to(
      subtitle,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.38,
        ease: "power2.out",
      },
      "-=0.15"
    );
  }

  // 5. .cta_section__actions anchors — smooth slide-in
  if (btnFirst && btnSecond) {
    ctaTimeline
      .fromTo(
        btnFirst,
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.48, ease: "power2.out" },
        "-=0.15"
      )
      .fromTo(
        btnSecond,
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.48, ease: "power2.out" },
        "<"
      );
  } else if (btnFirst) {
    ctaTimeline.to(
      btnFirst,
      {
        opacity: 1,
        y: 0,
        duration: 0.48,
        ease: "power2.out",
      },
      "-=0.15"
    );
  } else if (actions) {
    ctaTimeline.to(
      actions,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.55,
        ease: "power2.out",
      },
      "-=0.15"
    );
  }

  // 6. .cta_section__contacts — reveal after action buttons
  if (ctaContacts) {
    ctaTimeline.to(
      ctaContacts,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.45,
        ease: "power2.out",
      },
      "-=0.15"
    );
  }
}

/* ==========================================
Specialized Services Section ScrollTrigger Animation
========================================== */
function initServicesPinAnimation() {
  const section = document.querySelector(".services_pin_section");
  if (!section) return;

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("GSAP or ScrollTrigger is not loaded.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const mm = gsap.matchMedia();

  // 1. Desktop & Tablet Landscape (min-width: 992px)
  mm.add("(min-width: 992px)", () => {
    const centerCol = section.querySelector(".services_pin_section__col--center");
    const centerCard = section.querySelector(".services_pin_section__center_card");
    const centerImg = section.querySelector(".services_pin_section__center_img");
    const leftCol = section.querySelector(".services_pin_section__col--left");
    const rightCol = section.querySelector(".services_pin_section__col--right");

    if (!centerCol || !leftCol || !rightCol) return;

    const leftCards = leftCol.querySelectorAll(".services_pin_section__card");
    const rightCards = rightCol.querySelectorAll(".services_pin_section__card");

    const header = section.querySelector(".services_pin_section__header");
    const headerBadge = header ? header.querySelector(".services_pin_section__badge") : null;
    const headerHeading = header ? header.querySelector(".services_pin_section__heading") : null;
    const headerDesc = header ? header.querySelector(".services_pin_section__desc") : null;
    const headerLink = header ? header.querySelector(".services_pin_section__action") : null;

    // Header Entrance Animation (plays smoothly as user scrolls towards the section)
    let headerTl = null;
    if (header) {
      headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      if (headerBadge) {
        headerTl.fromTo(headerBadge, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" });
      }
      if (headerHeading) {
        headerTl.fromTo(headerHeading, { autoAlpha: 0, y: 25 }, { autoAlpha: 1, y: 0, duration: 0.55, ease: "power2.out" }, "-=0.25");
      }
      if (headerDesc) {
        headerTl.fromTo(headerDesc, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" }, "-=0.3");
      }
      if (headerLink) {
        headerTl.fromTo(headerLink, { autoAlpha: 0, y: 15 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" }, "-=0.3");
      }
    }

    // Initial States:
    // Center column starts full width with slight internal zoom for cinematic camera pull
    gsap.set(centerCol, {
      width: "100%",
    });
    if (centerImg) {
      gsap.set(centerImg, {
        scale: 1.15,
        transformOrigin: "center center",
      });
    }
    if (centerCard) {
      gsap.set(centerCard, {
        boxShadow: "0 8px 24px -4px rgba(0, 23, 60, 0.06)",
      });
    }

    // Column wrappers are positioned and ready
    gsap.set([leftCol, rightCol], {
      autoAlpha: 1,
      pointerEvents: "none",
    });

    // Initial State for Four Cards:
    // Left cards start off-screen to the left with opacity: 0
    if (leftCards.length) {
      gsap.set(leftCards, {
        x: -100,
        opacity: 0,
        autoAlpha: 0,
      });
    }
    // Right cards start off-screen to the right with opacity: 0
    if (rightCards.length) {
      gsap.set(rightCards, {
        x: 100,
        opacity: 0,
        autoAlpha: 0,
      });
    }

    // Coordinated Pinned Scrubbed Timeline:
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: () => "top " + getHeaderHeight() + "px",
        end: "+=1600",
        pin: true,
        pinSpacing: true,
        scrub: 1.1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const isFinished = self.progress > 0.88;
          leftCol.style.pointerEvents = isFinished ? "auto" : "none";
          rightCol.style.pointerEvents = isFinished ? "auto" : "none";
        },
      },
    });

    // --- STEP 1: Center Column Animation ---
    // Center column animates into its exact center resting position (width: calc(28% - 10px))
    // Completes and settles fully in the center before any cards begin to appear
    tl.to(
      centerCol,
      {
        width: "calc(28% - 10px)",
        duration: 1.2,
        ease: "power2.inOut",
      },
      0
    );

    if (centerImg) {
      tl.to(
        centerImg,
        {
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
        },
        0
      );
    }

    if (centerCard) {
      tl.to(
        centerCard,
        {
          boxShadow: "0 20px 48px -10px rgba(0, 23, 60, 0.16)",
          duration: 1.2,
          ease: "power2.out",
        },
        0
      );
    }

    // --- STEP 2: Animate the Four Cards ---
    // Starts strictly AFTER the center column animation has completely finished (at time: 1.2)
    // Top cards: Left (Prescription Delivery) slides in from left, Right (Lab & Sample Runs) from right
    if (leftCards[0]) {
      tl.to(
        leftCards[0],
        {
          x: 0,
          opacity: 1,
          autoAlpha: 1,
          duration: 0.65,
          ease: "power2.out",
        },
        1.2
      );
    }

    if (rightCards[0]) {
      tl.to(
        rightCards[0],
        {
          x: 0,
          opacity: 1,
          autoAlpha: 1,
          duration: 0.65,
          ease: "power2.out",
        },
        1.2
      );
    }

    // Bottom cards: Left (Clinic Deliveries) from left, Right (Vaccine Delivery) from right, with subtle stagger
    if (leftCards[1]) {
      tl.to(
        leftCards[1],
        {
          x: 0,
          opacity: 1,
          autoAlpha: 1,
          duration: 0.65,
          ease: "power2.out",
        },
        1.38
      );
    }

    if (rightCards[1]) {
      tl.to(
        rightCards[1],
        {
          x: 0,
          opacity: 1,
          autoAlpha: 1,
          duration: 0.65,
          ease: "power2.out",
        },
        1.38
      );
    }

    // --- STEP 3: Extra Cards Row Below Pinned Stage ---
    const extraRow = section.querySelector(".services_pin_section__extra_row");
    let extraTl = null;
    let extraCardLeft = null;
    let extraCardRight = null;
    if (extraRow) {
      extraCardLeft = extraRow.querySelector(".services_pin_section__card--extra_left");
      extraCardRight = extraRow.querySelector(".services_pin_section__card--extra_right");

      if (extraCardLeft && extraCardRight) {
        gsap.set(extraCardLeft, { x: -100, opacity: 0, autoAlpha: 0 });
        gsap.set(extraCardRight, { x: 100, opacity: 0, autoAlpha: 0 });

        extraTl = gsap.timeline({
          scrollTrigger: {
            trigger: extraRow,
            pinnedContainer: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        extraTl
          .to(extraCardLeft, {
            x: 0,
            opacity: 1,
            autoAlpha: 1,
            duration: 0.65,
            ease: "power2.out",
          })
          .to(
            extraCardRight,
            {
              x: 0,
              opacity: 1,
              autoAlpha: 1,
              duration: 0.65,
              ease: "power2.out",
            },
            "<0.1"
          );
      }
    }

    return () => {
      if (headerTl) headerTl.kill();
      tl.kill();
      if (extraTl) extraTl.kill();
      gsap.set(
        [
          centerCol,
          centerCard,
          centerImg,
          leftCol,
          rightCol,
          ...leftCards,
          ...rightCards,
        ],
        { clearProps: "all" }
      );
      if (headerBadge) gsap.set(headerBadge, { clearProps: "all" });
      if (headerHeading) gsap.set(headerHeading, { clearProps: "all" });
      if (headerDesc) gsap.set(headerDesc, { clearProps: "all" });
      if (headerLink) gsap.set(headerLink, { clearProps: "all" });
      if (extraCardLeft) gsap.set(extraCardLeft, { clearProps: "all" });
      if (extraCardRight) gsap.set(extraCardRight, { clearProps: "all" });
    };
  });

  // 2. Mobile & Tablet Portrait (< 992px)
  // Clean scroll reveal without pinning or extra spacing
  mm.add("(max-width: 991.98px)", () => {
    const centerCol = section.querySelector(".services_pin_section__col--center");
    const stageCards = section.querySelectorAll(".services_pin_section__stage .services_pin_section__card");

    const mobileTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    if (centerCol) {
      mobileTl.fromTo(
        centerCol,
        { autoAlpha: 0, y: 35 },
        { autoAlpha: 1, y: 0, duration: 0.65, ease: "power2.out" }
      );
    }

    if (stageCards.length) {
      mobileTl.fromTo(
        stageCards,
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.12, ease: "power2.out" },
        "-=0.3"
      );
    }

    // Extra cards on mobile: slide in from left and right as user scrolls to their row
    const extraRow = section.querySelector(".services_pin_section__extra_row");
    let extraMobileTl = null;
    let extraCardLeft = null;
    let extraCardRight = null;
    if (extraRow) {
      extraCardLeft = extraRow.querySelector(".services_pin_section__card--extra_left");
      extraCardRight = extraRow.querySelector(".services_pin_section__card--extra_right");
      if (extraCardLeft && extraCardRight) {
        gsap.set(extraCardLeft, { x: -60, opacity: 0, autoAlpha: 0 });
        gsap.set(extraCardRight, { x: 60, opacity: 0, autoAlpha: 0 });

        extraMobileTl = gsap.timeline({
          scrollTrigger: {
            trigger: extraRow,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        extraMobileTl
          .to(extraCardLeft, { x: 0, opacity: 1, autoAlpha: 1, duration: 0.65, ease: "power2.out" })
          .to(extraCardRight, { x: 0, opacity: 1, autoAlpha: 1, duration: 0.65, ease: "power2.out" }, "<0.1");
      }
    }

    return () => {
      mobileTl.kill();
      if (extraMobileTl) extraMobileTl.kill();
      if (centerCol) gsap.set(centerCol, { clearProps: "all" });
      if (stageCards.length) gsap.set(stageCards, { clearProps: "all" });
      if (extraCardLeft) gsap.set(extraCardLeft, { clearProps: "all" });
      if (extraCardRight) gsap.set(extraCardRight, { clearProps: "all" });
    };
  });
}

/* ==========================================
About Page Subtle Animations
========================================== */
function initAboutPageAnimations() {
  if (typeof gsap === "undefined") return;

  const bannerSection = document.querySelector(".inner_banner_section");
  const storySection = document.querySelector(".about_story_section");
  const trackRecordSection = document.querySelector(".about_track_record_section");
  const pillarsSection = document.querySelector(".about_pillars_section");

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 1. Inner Banner Entrance Animation (on page load)
  if (bannerSection) {
    const bannerElements = bannerSection.querySelectorAll(
      ".inner_banner_section__subheading, .inner_banner_section__title, .inner_banner_section__desc"
    );
    if (bannerElements.length) {
      if (prefersReducedMotion) {
        gsap.set(bannerElements, { autoAlpha: 1, y: 0 });
      } else {
        gsap.from(bannerElements, {
          autoAlpha: 0,
          y: 20,
          duration: 0.65,
          stagger: 0.12,
          ease: "power2.out",
          delay: 0.15,
        });
      }
    }
  }

  // 2. About Story Section (Immediately below banner — reveals smoothly on initial page load)
  if (storySection) {
    const storyContent = storySection.querySelector(".about_story_section__content");
    const mediaWrapper = storySection.querySelector(".about_story_section__media_wrapper");
    const floatingCard = storySection.querySelector(".about_story_section__floating_card");

    if (prefersReducedMotion) {
      if (storyContent) gsap.set(storyContent, { autoAlpha: 1, y: 0 });
      if (mediaWrapper) gsap.set(mediaWrapper, { autoAlpha: 1, x: 0 });
      if (floatingCard) gsap.set(floatingCard, { autoAlpha: 1, y: 0 });
    } else {
      // Runs smoothly on initial page load in sync with the banner, without requiring any scroll
      const storyTl = gsap.timeline({
        delay: 0.25,
      });

      // Left Content Entrance (smooth upward reveal)
      if (storyContent) {
        storyTl.fromTo(
          storyContent,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            onComplete: () => {
              gsap.set(storyContent, { clearProps: "transform" });
            },
          },
          0
        );
      }

      // Right Media Wrapper Entrance (smooth slide from right)
      if (mediaWrapper) {
        storyTl.fromTo(
          mediaWrapper,
          { autoAlpha: 0, x: 50 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.85,
            ease: "power2.out",
            onComplete: () => {
              gsap.set(mediaWrapper, { clearProps: "transform" });
            },
          },
          0
        );
      }

      // Floating Card Entrance — waits 2 seconds after all other section elements finish revealing
      if (floatingCard) {
        storyTl.fromTo(
          floatingCard,
          { autoAlpha: 0, y: 35 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: "power2.out",
            onComplete: () => {
              // Ensure floating card cleanly retains its CSS coordinates and hover transitions
              gsap.set(floatingCard, { clearProps: "transform" });
            },
          },
          "+=2.0" // 2-second delay after entire section finishes revealing
        );
      }
    }
  }

  // 3. ScrollTrigger-based Animations for Subsequent Sections (Sections 3 & 4)
  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    // Track Record Section Scroll Reveal
    if (trackRecordSection) {
      const trCard = trackRecordSection.querySelector(".about_track_record_section__card");
      const trBadge = trackRecordSection.querySelector(".about_track_record_section__badge");
      const trHeading = trackRecordSection.querySelector(".about_track_record_section__heading");
      const trItems = trackRecordSection.querySelectorAll(".about_track_record_section__item");

      if (prefersReducedMotion) {
        if (trCard) gsap.set(trCard, { autoAlpha: 1, y: 0 });
        if (trBadge) gsap.set(trBadge, { autoAlpha: 1, y: 0 });
        if (trHeading) gsap.set(trHeading, { autoAlpha: 1, y: 0 });
        if (trItems.length) gsap.set(trItems, { autoAlpha: 1, y: 0 });
      } else {
        if (trCard) gsap.set(trCard, { autoAlpha: 0, y: 35 });
        if (trBadge) gsap.set(trBadge, { autoAlpha: 0, y: 20 });
        if (trHeading) gsap.set(trHeading, { autoAlpha: 0, y: 20 });
        if (trItems.length) gsap.set(trItems, { autoAlpha: 0, y: 35 });

        const trTl = gsap.timeline({
          scrollTrigger: {
            trigger: trackRecordSection,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        });

        if (trCard) {
          trTl.to(trCard, { autoAlpha: 1, y: 0, duration: 0.65, ease: "power2.out" });
        }
        if (trBadge) {
          trTl.to(trBadge, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" }, "-=0.35");
        }
        if (trHeading) {
          trTl.to(trHeading, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3");
        }
        if (trItems.length) {
          trTl.to(
            trItems,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.75,
              stagger: 0.12,
              ease: "power2.out",
              onComplete: () => {
                gsap.set(trItems, { clearProps: "transform" });
              },
            },
            "-=0.25"
          );
        }
      }
    }

    // Pillars Section Scroll Reveal (Sequential Upward Entrance)
    if (pillarsSection) {
      const pillarsHeader = pillarsSection.querySelector(".about_pillars_section__header");
      const pillarCards = pillarsSection.querySelectorAll(".about_pillars_section__card");

      if (prefersReducedMotion) {
        if (pillarsHeader) gsap.set(pillarsHeader, { autoAlpha: 1, y: 0 });
        if (pillarCards.length) gsap.set(pillarCards, { autoAlpha: 1, y: 0 });
      } else {
        if (pillarsHeader) gsap.set(pillarsHeader, { autoAlpha: 0, y: 25 });
        if (pillarCards.length) gsap.set(pillarCards, { autoAlpha: 0, y: 65 });

        const pillarsTl = gsap.timeline({
          scrollTrigger: {
            trigger: pillarsSection,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        });

        if (pillarsHeader) {
          pillarsTl.to(pillarsHeader, {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            ease: "power2.out",
          });
        }

        if (pillarCards.length) {
          pillarsTl.to(
            pillarCards,
            {
              autoAlpha: 1,
              y: 0,
              duration: 1.0,
              stagger: 0.18,
              ease: "power3.out",
              onComplete: () => {
                gsap.set(pillarCards, { clearProps: "transform" });
              },
            },
            "-=0.15"
          );
        }
      }
    }
  }
}

/* ==========================================
Services Page Grid Animations
========================================== */
function initServicesGridAnimations() {
  if (typeof gsap === "undefined") return;

  const servicesGrid = document.querySelector(".services_grid");
  if (!servicesGrid) return;

  const rows = servicesGrid.querySelectorAll(".services_grid__row");
  if (!rows.length) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    gsap.set(servicesGrid.querySelectorAll(".services_grid__col--left, .services_grid__col--right"), {
      autoAlpha: 1,
      x: 0,
      y: 0,
    });
    return;
  }

  const isMobile = window.innerWidth < 768;

  // 1. Initial Row (Row 1): Reveals automatically on page load without requiring scroll
  const firstRow = rows[0];
  if (firstRow) {
    const leftCol = firstRow.querySelector(".services_grid__col--left");
    const rightCol = firstRow.querySelector(".services_grid__col--right");

    const firstRowTl = gsap.timeline({
      delay: 0.25,
    });

    if (leftCol) {
      firstRowTl.fromTo(
        leftCol,
        { autoAlpha: 0, x: isMobile ? 0 : -45, y: isMobile ? 25 : 0 },
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => {
            gsap.set(leftCol, { clearProps: "transform" });
          },
        },
        0
      );
    }

    if (rightCol) {
      firstRowTl.fromTo(
        rightCol,
        { autoAlpha: 0, x: isMobile ? 0 : 45, y: isMobile ? 25 : 0 },
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => {
            gsap.set(rightCol, { clearProps: "transform" });
          },
        },
        0.14
      );
    }
  }

  // 2. Remaining Rows (Rows 2 to 6): Trigger reveal as each row enters viewport
  if (typeof ScrollTrigger !== "undefined" && rows.length > 1) {
    gsap.registerPlugin(ScrollTrigger);

    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const leftCol = row.querySelector(".services_grid__col--left");
      const rightCol = row.querySelector(".services_grid__col--right");

      // Pre-hide to prevent flicker before ScrollTrigger triggers
      if (leftCol) gsap.set(leftCol, { autoAlpha: 0, x: isMobile ? 0 : -45, y: isMobile ? 25 : 0 });
      if (rightCol) gsap.set(rightCol, { autoAlpha: 0, x: isMobile ? 0 : 45, y: isMobile ? 25 : 0 });

      const rowTl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });

      if (leftCol) {
        rowTl.to(
          leftCol,
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => {
              gsap.set(leftCol, { clearProps: "transform" });
            },
          },
          0
        );
      }

      if (rightCol) {
        rowTl.to(
          rightCol,
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => {
              gsap.set(rightCol, { clearProps: "transform" });
            },
          },
          0.14
        );
      }
    }
  }
}

/* ==========================================
Contact FAQ Section Animation
========================================== */
let faqTimeline = null;

function initFaqSection() {
  const faqSection = document.querySelector(".contact_faq_section");
  if (!faqSection || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

  const header = faqSection.querySelector(".contact_faq_section__header");
  const items = faqSection.querySelectorAll(".contact_faq_section__item");

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    if (header) gsap.set(header, { autoAlpha: 1, y: 0 });
    if (items.length) gsap.set(items, { autoAlpha: 1, y: 0 });
    return;
  }

  if (faqTimeline) {
    if (faqTimeline.scrollTrigger) {
      faqTimeline.scrollTrigger.kill();
    }
    faqTimeline.kill();
    faqTimeline = null;
  }

  if (header) gsap.set(header, { autoAlpha: 0, y: 30 });
  if (items.length) gsap.set(items, { autoAlpha: 0, y: 25 });

  faqTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: faqSection,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });

  if (header) {
    faqTimeline.to(header, {
      autoAlpha: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      onComplete: () => {
        gsap.set(header, { clearProps: "transform" });
      },
    });
  }

  if (items.length) {
    faqTimeline.to(
      items,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        onComplete: () => {
          gsap.set(items, { clearProps: "transform" });
        },
      },
      "-=0.25"
    );
  }
}

