$(document).ready(function () {
  "use strict";

  // Cache header and navigation elements
  const $siteHeader = $(".site_header");
  const $hamburger = $(".hemburger");
  const $navMenu = $(".header_section__nav");
  const $navBackdrop = $(".header_section__nav_backdrop");
  const $navClose = $(".header_section__nav_close");
  const $navLinks = $(".header_section__menu_link, .header_section__btn, .header_section__nav_contact_item");

  // Function to calculate and set dynamic header height
  function updateHeaderHeight() {
    if ($siteHeader.length) {
      const headerHeight = $siteHeader.outerHeight();
      document.body.style.setProperty("--headerHeight", headerHeight + "px");
    }
  }

  // Initial update & on window resize
  updateHeaderHeight();
  $(window).on("resize", function () {
    updateHeaderHeight();
    if ($(window).width() >= 1200 && $navMenu.hasClass("active")) {
      closeMobileMenu();
    }
  });

  // Sticky header on scroll
  $(window).on("scroll", function () {
    const scrollPos = $(window).scrollTop();
    if (scrollPos > 40) {
      $siteHeader.addClass("sticky");
    } else {
      $siteHeader.removeClass("sticky");
    }
  });

  // Mobile & tablet menu open / close functions
  function openMobileMenu() {
    $hamburger.addClass("open").attr("aria-expanded", "true");
    $navMenu.addClass("active");
    $navBackdrop.addClass("active");
    $("body").addClass("menu-open").css("overflow", "hidden");
  }

  function closeMobileMenu() {
    $hamburger.removeClass("open").attr("aria-expanded", "false");
    $navMenu.removeClass("active");
    $navBackdrop.removeClass("active");
    $("body").removeClass("menu-open").css("overflow", "");
  }

  // Hamburger toggle click
  $hamburger.on("click", function (e) {
    e.preventDefault();
    if ($(this).hasClass("open")) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  // Dedicated drawer close button click
  $navClose.on("click", function (e) {
    e.preventDefault();
    closeMobileMenu();
  });

  // Close mobile menu when backdrop is clicked
  $navBackdrop.on("click", function () {
    closeMobileMenu();
  });

  // Close mobile menu when nav link is clicked
  $navLinks.on("click", function () {
    if ($(window).width() < 1200) {
      closeMobileMenu();
    }
  });

  // Close mobile menu on Escape key press
  $(document).on("keydown", function (e) {
    if (e.key === "Escape" && $navMenu.hasClass("active")) {
      closeMobileMenu();
    }
  });

  // Smooth scrolling for internal anchor links
  $('a[href^="#"]').on("click", function (e) {
    const targetId = $(this).attr("href");
    if (targetId && targetId !== "#" && $(targetId).length) {
      e.preventDefault();
      const headerOffset = $siteHeader.outerHeight() || 80;
      const targetPosition = $(targetId).offset().top - headerOffset + 10;
      $("html, body").animate(
        {
          scrollTop: targetPosition,
        },
        500
      );
    }
  });

  // Universal Scroll-Triggered Reveal Animation for Content Sections
  const $revealElements = $(".reveal_left, .reveal_right, .reveal_bottom");

  if ($revealElements.length) {
    if ("IntersectionObserver" in window) {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReducedMotion) {
        $revealElements.addClass("is_revealed");
      } else {
        const revealObserver = new IntersectionObserver(
          function (entries, observer) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                entry.target.classList.add("is_revealed");
                observer.unobserve(entry.target);
              }
            });
          },
          {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px",
          }
        );

        $revealElements.each(function () {
          revealObserver.observe(this);
        });

        // If page was loaded directly with a hash anchor, reveal elements in that section immediately
        if (window.location.hash) {
          const $targetSec = $(window.location.hash);
          if ($targetSec.length) {
            $targetSec.find(".reveal_left, .reveal_right, .reveal_bottom").addClass("is_revealed");
            $targetSec.closest("section").find(".reveal_left, .reveal_right, .reveal_bottom").addClass("is_revealed");
          }
        }
      }
    } else {
      // Fallback for browsers/environments without IntersectionObserver
      $revealElements.addClass("is_revealed");
    }
  }

  // Testimonials Owl Carousel Initialization
  const $testimonialsSlider = $(".testimonials_section__slider");
  if ($testimonialsSlider.length && typeof $.fn.owlCarousel === "function") {
    // Avoid duplicate initialization
    if (!$testimonialsSlider.hasClass("owl-loaded")) {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      $testimonialsSlider.owlCarousel({
        items: 3,
        loop: true,
        margin: 28,
        autoplay: !prefersReducedMotion,
        autoplayTimeout: 3500,
        autoplayHoverPause: true,
        slideBy: 1,
        smartSpeed: prefersReducedMotion ? 0 : 600,
        nav: true,
        dots: true,
        navText: [
          '<span class="testimonials_section__nav_btn testimonials_section__nav_btn--prev" aria-label="Previous testimonial slide"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg></span>',
          '<span class="testimonials_section__nav_btn testimonials_section__nav_btn--next" aria-label="Next testimonial slide"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></span>'
        ],
        responsive: {
          0: {
            items: 1,
            margin: 16
          },
          768: {
            items: 2,
            margin: 24
          },
          992: {
            items: 3,
            margin: 28
          }
        }
      });
    }
  }

  // Contact Form Validation and Submission Handling
  const $contactForm = $("#contactForm");
  const $formStatus = $("#contactFormStatus");

  if ($contactForm.length) {
    const $fullNameInput = $("#contactFullName");
    const $emailInput = $("#contactEmail");
    const $phoneInput = $("#contactPhone");
    const $subjectInput = $("#contactSubject");
    const $messageInput = $("#contactMessage");

    // Helper functions for validation
    function validateEmail(email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    }

    function validatePhone(phone) {
      const cleanPhone = phone.replace(/[\s\-\(\)\.]/g, "");
      return cleanPhone.length >= 7 && /^[\+]?[0-9]{7,15}$/.test(cleanPhone);
    }

    function setFieldStatus($field, isValid, errorMsg) {
      const $group = $field.closest(".contact_section__field_group");
      const $feedback = $group.find(".contact_section__error_feedback");
      if (!isValid) {
        $field.addClass("is-invalid");
        $group.addClass("has-error");
        if (errorMsg) {
          $feedback.text(errorMsg);
        }
      } else {
        $field.removeClass("is-invalid");
        $group.removeClass("has-error");
      }
    }

    // Clear invalid state on live input
    $contactForm.find("input, textarea").on("input change", function () {
      if ($(this).hasClass("is-invalid")) {
        setFieldStatus($(this), true);
      }
    });

    // Submit event handler
    $contactForm.on("submit", function (e) {
      e.preventDefault();

      const nameVal = $.trim($fullNameInput.val());
      const emailVal = $.trim($emailInput.val());
      const phoneVal = $.trim($phoneInput.val());
      const subjectVal = $.trim($subjectInput.val());
      const messageVal = $.trim($messageInput.val());

      let isValid = true;
      let $firstInvalidField = null;

      // Validate Full Name
      if (nameVal.length < 2) {
        setFieldStatus($fullNameInput, false, "Please enter your full name (minimum 2 characters).");
        isValid = false;
        $firstInvalidField = $firstInvalidField || $fullNameInput;
      } else {
        setFieldStatus($fullNameInput, true);
      }

      // Validate Email
      if (!validateEmail(emailVal)) {
        setFieldStatus($emailInput, false, "Please enter a valid business email address.");
        isValid = false;
        $firstInvalidField = $firstInvalidField || $emailInput;
      } else {
        setFieldStatus($emailInput, true);
      }

      // Validate Phone
      if (!validatePhone(phoneVal)) {
        setFieldStatus($phoneInput, false, "Please enter a valid contact phone number.");
        isValid = false;
        $firstInvalidField = $firstInvalidField || $phoneInput;
      } else {
        setFieldStatus($phoneInput, true);
      }

      // Validate Subject
      if (subjectVal.length < 2) {
        setFieldStatus($subjectInput, false, "Please enter a subject for your inquiry.");
        isValid = false;
        $firstInvalidField = $firstInvalidField || $subjectInput;
      } else {
        setFieldStatus($subjectInput, true);
      }

      // Validate Message
      if (messageVal.length < 10) {
        setFieldStatus($messageInput, false, "Please enter your message (minimum 10 characters).");
        isValid = false;
        $firstInvalidField = $firstInvalidField || $messageInput;
      } else {
        setFieldStatus($messageInput, true);
      }

      // If invalid, focus first error field and show alert
      if (!isValid) {
        $formStatus
          .removeClass("contact_section__status_alert--info")
          .addClass("contact_section__status_alert--error")
          .html('<div class="contact_section__alert_title">Submission Incomplete</div><p class="contact_section__alert_desc mb-0">Please fill in all highlighted required fields with valid details before sending.</p>')
          .slideDown(250);
        if ($firstInvalidField) {
          $firstInvalidField.focus();
        }
        return;
      }

      // Prepare mailto link for legitimate client dispatch without fake server confirmation
      const mailtoSubject = encodeURIComponent("Inquiry: " + subjectVal + " - " + nameVal);
      const mailtoBody = encodeURIComponent(
        "Full Name: " + nameVal + "\n" +
        "Email: " + emailVal + "\n" +
        "Phone: " + phoneVal + "\n" +
        "Subject: " + subjectVal + "\n\n" +
        "Message:\n" + messageVal + "\n\n" +
        "-- Sent via SVP Minerals Online Desk"
      );
      const mailtoUrl = "mailto:info.svpminerals@gmail.com?subject=" + mailtoSubject + "&body=" + mailtoBody;

      // Present professional dispatch status without fake server response
      $formStatus
        .removeClass("contact_section__status_alert--error")
        .addClass("contact_section__status_alert--info")
        .html(
          '<div class="contact_section__alert_title">Inquiry Prepared for Transmission</div>' +
          '<p class="contact_section__alert_desc">' +
            'Your message details have been validated. Since direct backend email server integration is not yet connected for this static deployment, your inquiry is ready to dispatch directly to <strong>info.svpminerals@gmail.com</strong>.' +
          '</p>' +
          '<div class="d-flex flex-wrap gap-2 align-items-center mt-2">' +
            '<a href="' + mailtoUrl + '" class="contact_section__alert_btn">' +
              '<span>Open Default Email Client</span>' +
              '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>' +
            '</a>' +
            '<span class="text-muted small">Or call our trading desk directly at +91 9537179655</span>' +
          '</div>'
        )
        .slideDown(250);

      // Launch default email client
      window.location.href = mailtoUrl;
    });
  }
});
