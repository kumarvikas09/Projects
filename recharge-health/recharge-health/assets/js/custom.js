$(document).ready(function () {
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 50) {
      $(".nav-container").addClass("scrolled");
    } else {
      $(".nav-container").removeClass("scrolled");
    }
  });

  /***** menu */
  $(".menu-wrap .main-menu > ul > li").has("ul").addClass("has-submenu");
  $("#menuToggle").click(function () {
    $(this).toggleClass("active");
    $(".menu-wrap .menu-list-sc").addClass("active");
  });
  $("#closeMenu").click(function () {
    $(".menu-wrap .menu-list-sc").removeClass("active");
  });

  // Add dropdown icon inside <a>
  $(".menu-wrap .main-menu > ul > li.has-submenu > a").append(
    '<span class="dropdown-icon">&#9660;</span>'
  );

  // Click ONLY on dropdown icon
  $(".menu-wrap").on("click", ".dropdown-icon", function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).closest("li").toggleClass("clicked");
  });

  // Header navigation mobile toggle
  var headerNavToggle = document.getElementById("headerNavToggle");
  var headerNav = document.getElementById("headerNav");

  if (headerNavToggle && headerNav) {
    headerNavToggle.addEventListener("click", function () {
      this.classList.toggle("active");
      headerNav.classList.toggle("active");
    });
  }

  // Ensure hero background video plays continuously
  var heroVideo = document.querySelector(".hero_section__video");
  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.loop = true;

    var playVideo = function () {
      var promise = heroVideo.play();
      if (promise !== undefined) {
        promise.catch(function () {
          heroVideo.muted = true;
          heroVideo.play();
        });
      }
    };

    playVideo();

    heroVideo.addEventListener("ended", function () {
      heroVideo.currentTime = 0;
      playVideo();
    });

    document.addEventListener("visibilitychange", function () {
      if (!document.hidden && heroVideo.paused) {
        playVideo();
      }
    });

    ["touchstart", "click", "scroll"].forEach(function (evt) {
      window.addEventListener(
        evt,
        function () {
          if (heroVideo.paused) {
            playVideo();
          }
        },
        { once: true, passive: true }
      );
    });
  }

  // ==========================================
  // Product Page Interactions
  // ==========================================

  $(".product_single_section__thumb").on("click", function () {
    var newImageSrc = $(this).attr("data-img");
    if (newImageSrc) {
      $(".product_single_section__thumb").removeClass(
        "product_single_section__thumb--active"
      );
      $(this).addClass("product_single_section__thumb--active");

      var $mainImg = $("#productMainImg");
      $mainImg.css("opacity", "0.4");
      setTimeout(function () {
        $mainImg.attr("src", newImageSrc);
        $mainImg.css("opacity", "1");
      }, 150);
    }
  });

  var $qtyInput = $("#productQty");
  $("#qtyMinus").on("click", function () {
    var currentVal = parseInt($qtyInput.val(), 10) || 1;
    if (currentVal > 1) {
      $qtyInput.val(currentVal - 1);
    }
  });

  $("#qtyPlus").on("click", function () {
    var currentVal = parseInt($qtyInput.val(), 10) || 1;
    if (currentVal < 99) {
      $qtyInput.val(currentVal + 1);
    }
  });

  // ==========================================
  // Testimonials Slider (Owl Carousel)
  // Initializes only when card count exceeds 3
  // ==========================================
  var $testimonialsCarousel = $("#testimonialsCarousel");
  var $testimonialsNav    = $("#testimonialsSliderNav");
  var TESTIMONIALS_SLIDER_THRESHOLD = 3;

  if ($testimonialsCarousel.length) {
    var cardCount = $testimonialsCarousel.find(".testimonials_section__card_wrap").length;

    if (cardCount > TESTIMONIALS_SLIDER_THRESHOLD) {

      // Reveal prev/next nav
      $testimonialsNav
        .addClass("testimonials_section__slider_nav--visible")
        .removeAttr("aria-hidden");

      // Enable loop only when there are enough items to clone (items * 2)
      var enableLoop = cardCount >= 6;

      // Init Owl Carousel
      $testimonialsCarousel.owlCarousel({
        items: 3,
        loop: enableLoop,
        margin: 16,
        nav: false,
        dots: false,
        smartSpeed: 500,
        autoHeight: false,
        responsive: {
          0: {
            items: 1,
            loop: cardCount > 1
          },
          576: {
            items: 1,
            loop: cardCount > 1
          },
          768: {
            items: 2,
            loop: cardCount > 2
          },
          992: {
            items: 3,
            loop: enableLoop
          }
        }
      });

      // Wire custom prev/next buttons
      $("#testimonialsPrev").on("click", function () {
        $testimonialsCarousel.trigger("prev.owl.carousel");
      });

      $("#testimonialsNext").on("click", function () {
        $testimonialsCarousel.trigger("next.owl.carousel");
      });
    }
  }
});