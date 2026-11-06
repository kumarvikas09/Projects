/**
 * Slarify Landing Page Scripts
 * Authority: AGENTS.md / MEMORY.md
 */

$(document).ready(function() {
  "use strict";

  // ==========================================
  // 1. NAVBAR DYNAMIC SCROLL EFFECT
  // ==========================================
  const $navbar = $('.navbar-custom');
  
  function checkScroll() {
    if ($(window).scrollTop() > 50) {
      $navbar.addClass('navbar-scrolled');
    } else {
      $navbar.removeClass('navbar-scrolled');
    }
  }

  $(window).on('scroll load', checkScroll);

  // ==========================================
  // 2. OWL CAROUSEL SETUP
  // ==========================================

  // Finance Cards Slider (4 Cards)
  $(".owl-finance").owlCarousel({
    loop: false,
    dots: true,
    autoplay: false,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        margin: 16,
        loop: true,
        dots: true
      },
      768: {
        items: 2,
        margin: 20,
        loop: true,
        dots: true
      },
      992: {
        items: 4,
        margin: 24,
        loop: false,
        dots: false,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false
      }
    }
  });

  // Spreadsheet vs Slarify Cards Slider (3 Cards)
  $(".owl-vs").owlCarousel({
    loop: false,
    dots: true,
    autoplay: false,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        margin: 16,
        loop: true,
        dots: true
      },
      768: {
        items: 2,
        margin: 20,
        loop: true,
        dots: true
      },
      992: {
        items: 3,
        margin: 24,
        loop: false,
        dots: false,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false
      }
    }
  });

  // Pricing Cards Slider (3 Cards)
  $(".owl-pricing").owlCarousel({
    loop: false,
    dots: true,
    autoplay: false,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        margin: 16,
        loop: true,
        dots: true
      },
      768: {
        items: 2,
        margin: 20,
        loop: true,
        dots: true
      },
      992: {
        items: 3,
        margin: 24,
        loop: false,
        dots: false,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false
      }
    }
  });

  // Testimonials Logo Loop / Review Slider
  $(".owl-testimonials").owlCarousel({
    loop: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        margin: 16
      },
      768: {
        items: 2,
        margin: 20
      },
      992: {
        items: 3,
        margin: 24
      }
    }
  });

  // ==========================================
  // 3. SCROLL FADE-IN ANIMATIONS
  // ==========================================
  const fadeElements = document.querySelectorAll('.fade-in-up');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Trigger once
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    });

    fadeElements.forEach(element => {
      observer.observe(element);
    });
  } else {
    // Fallback if IntersectionObserver is not supported
    fadeElements.forEach(element => {
      element.classList.add('active');
    });
  }

  // ==========================================
  // 4. ACCORDION FOCUS HELPER
  // ==========================================
  $('.accordion-button').on('click', function() {
    const $item = $(this).closest('.accordion-item');
    if (!$(this).hasClass('collapsed')) {
      $item.css('border-color', 'rgba(0, 168, 232, 0.4)');
    } else {
      $item.css('border-color', '');
    }
  });
});
