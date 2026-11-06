/* ==========================================
Main Site Functionality JavaScript
File: function.js
========================================== */

$(document).ready(function () {
  const header = document.querySelector(".site_header");

  // Calculate and store dynamic header height as CSS custom property
  function updateHeaderHeight() {
    const currentHeader = header || document.querySelector("header");
    const headerHeight = currentHeader ? currentHeader.offsetHeight : 0;
    document.body.style.setProperty("--headerHeight", headerHeight + "px");
  }

  updateHeaderHeight();

  // Scroll handler for smooth header shrink transition
  // if (header) {
  //   let isScrolled = false;
  //   const handleHeaderScroll = function () {
  //     const shouldScroll = window.scrollY > 0;
  //     if (shouldScroll !== isScrolled) {
  //       isScrolled = shouldScroll;
  //       if (isScrolled) {
  //         header.classList.add("site_header--scrolled");
  //       } else {
  //         header.classList.remove("site_header--scrolled");
  //       }
  //       updateHeaderHeight();
  //     }
  //   };

  //   window.addEventListener("scroll", handleHeaderScroll, { passive: true });
  //   handleHeaderScroll();
  // }

  // Update header height on window resize
  window.addEventListener("resize", function () {
    updateHeaderHeight();
  });

  // Mobile navigation hamburger toggle
  const navToggle = document.getElementById("siteHeaderToggle");
  const navMenu = document.getElementById("siteHeaderNav");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      const isOpen = navMenu.classList.toggle("is_open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close mobile nav when any navigation link is clicked
    navMenu.querySelectorAll(".site_header__nav_link").forEach(function (link) {
      link.addEventListener("click", function () {
        navMenu.classList.remove("is_open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Helper to get current dynamic header offset
  function getHeaderOffset() {
    const currentHeader = document.querySelector(".site_header") || document.querySelector("header");
    return currentHeader ? currentHeader.offsetHeight : (window.innerWidth >= 992 ? 105 : 64);
  }

  // Smooth scroll to an in-page section accounting for the fixed/sticky header
  function smoothScrollTo(targetSelector, updateHash) {
    if (!targetSelector) return false;
    let target = null;
    try {
      target = document.querySelector(targetSelector);
    } catch (err) {
      return false;
    }
    if (!target) return false;

    const offset = getHeaderOffset() + 20;
    const targetTop = target.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: "smooth",
    });

    if (updateHash && window.history && window.history.pushState) {
      window.history.pushState(null, null, targetSelector);
    }
    return true;
  }

  // Intercept anchor clicks on the current page for smooth scrolling
  document.querySelectorAll('a[href*="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#" || href.startsWith("mailto:") || href.startsWith("tel:")) return;

      const parts = href.split("#");
      const pathPart = parts[0];
      const hashPart = parts[1] ? "#" + parts[1] : "";

      if (!hashPart) return;

      const currentPath = window.location.pathname.split("/").pop() || "index.html";
      const isCurrentPage =
        !pathPart ||
        pathPart === currentPath ||
        (currentPath === "index.html" && (pathPart === "" || pathPart === "index.html")) ||
        (currentPath === "" && (pathPart === "" || pathPart === "index.html"));

      if (isCurrentPage) {
        const targetElement = document.querySelector(hashPart);
        if (targetElement) {
          e.preventDefault();
          smoothScrollTo(hashPart, true);

          if (navMenu && navMenu.classList.contains("is_open")) {
            navMenu.classList.remove("is_open");
            if (navToggle) navToggle.setAttribute("aria-expanded", "false");
          }
        }
      }
    });
  });

  // Handle direct navigation or page refresh with a hash (e.g. index.html#why-asr)
  if (window.location.hash) {
    const initialHash = window.location.hash;
    window.addEventListener("load", function () {
      setTimeout(function () {
        smoothScrollTo(initialHash, false);
      }, 180);
    });
  }

  // Contact Form Submission Handler (validates and routes to asrlogistics.sk@outlook.com)
  const contactForms = document.querySelectorAll(".contact_section__form");
  contactForms.forEach(function (form) {
    const submitBtn = form.querySelector(".contact_section__btn");
    if (!submitBtn) return;

    submitBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const nameInput = form.querySelector('input[name="name"]');
      const orgInput = form.querySelector('input[name="organization"]');
      const phoneInput = form.querySelector('input[name="phone"]');
      const emailInput = form.querySelector('input[name="email"]');
      const serviceInput = form.querySelector('select[name="service_type"]');
      const scheduleInput = form.querySelector('select[name="schedule_type"]');
      const messageInput = form.querySelector('textarea[name="message"]');

      if (nameInput && !nameInput.value.trim()) {
        nameInput.focus();
        nameInput.reportValidity();
        return;
      }
      if (orgInput && !orgInput.value.trim()) {
        orgInput.focus();
        orgInput.reportValidity();
        return;
      }
      if (phoneInput && !phoneInput.value.trim()) {
        phoneInput.focus();
        phoneInput.reportValidity();
        return;
      }
      if (emailInput && !emailInput.value.trim()) {
        emailInput.focus();
        emailInput.reportValidity();
        return;
      }

      const subject = encodeURIComponent("ASR Logistics Delivery Inquiry - " + (orgInput ? orgInput.value : (nameInput ? nameInput.value : "")));
      const bodyLines = [
        "Name: " + (nameInput ? nameInput.value : ""),
        "Organization: " + (orgInput ? orgInput.value : ""),
        "Phone: " + (phoneInput ? phoneInput.value : ""),
        "Email: " + (emailInput ? emailInput.value : ""),
        "Service Type: " + (serviceInput && serviceInput.value ? serviceInput.options[serviceInput.selectedIndex].text : "Not specified"),
        "Schedule Type: " + (scheduleInput && scheduleInput.value ? scheduleInput.options[scheduleInput.selectedIndex].text : "Not specified"),
        "",
        "Message:",
        messageInput ? messageInput.value : ""
      ];

      const mailtoUrl = "mailto:asrlogistics.sk@outlook.com?subject=" + subject + "&body=" + encodeURIComponent(bodyLines.join("\n"));
      window.location.href = mailtoUrl;
    });
  });
});