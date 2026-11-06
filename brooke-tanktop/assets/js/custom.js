//Menu
jQuery(document).ready(function ($) {
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 50) {
      $("header").addClass("header-fixed");
    } else {
      $("header").removeClass("header-fixed");
    }
  });
  let headerHeight = jQuery("header").outerHeight();
  headerHeight = headerHeight;
  jQuery("body")
    .get(0)
    .style.setProperty("--headerHeight", headerHeight + "px");

  // COLLECTION CAROUSELS (multiple sections)
  $(".collection-carousel").each(function () {
    var owl = $(this);

    owl.owlCarousel({
      loop: true,
      margin: 20,
      nav: false,
      dots: false,
      lazyLoad: true,
      responsive: {
        0: { items: 1 },
        576: { items: 1 },
        768: { items: 3 },
        1200: { items: 4 },
      },
    });

    // Find buttons in SAME section
    var section = owl.closest(".shop-collection-section");

    section.find(".owl-prev").click(function () {
      owl.trigger("prev.owl.carousel");
    });

    section.find(".owl-next").click(function () {
      owl.trigger("next.owl.carousel");
    });
  });

  // ITEM CAROUSELS (multiple sections)
  $(".item-carousel").each(function () {
    var owl = $(this);

    owl.owlCarousel({
      loop: true,
      margin: 20,
      nav: false,
      dots: true,
      lazyLoad: true,
      responsive: {
        0: { items: 1 },
        576: { items: 1 },
        768: { items: 3 },
        1200: { items: 4 },
      },
    });

    // Find buttons in SAME section
    var section = owl.closest(".shop-collection-section");

    section.find(".owl-prev").click(function () {
      owl.trigger("prev.owl.carousel");
    });

    section.find(".owl-next").click(function () {
      owl.trigger("next.owl.carousel");
    });
  });

  $(".header-top-sc img").click(function () {
    $(".header-top-sc").slideToggle();
  });

  $(".menu-toggle, .cross-btn").click(function () {
    $(".menu-wrap").toggleClass("open");
  });
});

const marquee = document.querySelector(".marquee");
if (marquee) {
// Duplicate content for seamless scrolling
const marqueeContent = marquee.innerHTML;
marquee.innerHTML += marqueeContent;
}

