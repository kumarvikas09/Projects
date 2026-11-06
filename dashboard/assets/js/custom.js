$(".toggleMenu").click(function (e) {
  e.preventDefault(0);
  $(".main_menunav").toggleClass("visible");
});

jQuery(function () {
  var owl = jQuery(".propListing");
  owl.owlCarousel({
    margin: 25,
    loop: false,
    nav: true,
    autoplay: false,
    navText: [
      "<i class='fa-solid fa-chevron-left'></i>",
      "<i class='fa-solid fa-chevron-right'></i>",
    ],
    responsive: {
      0: {
        items: 1.2,
        margin: 10,
      },

      600: {
        items: 1,
        margin: 10,
      },

      1024: {
        items: 3,
        dots: false,
        nav: true,
      },
    },
  });
});

jQuery(function () {
  var owl = jQuery(".reviewSlider");
  owl.owlCarousel({
    items: 3,
    margin: 0,
    loop: false,
    nav: true,
    autoplay: true,
    navText: [
      "<i class='fa-solid fa-chevron-left'></i>",
      "<i class='fa-solid fa-chevron-right'></i>",
    ],
    responsive: {
      0: {
        items: 1,
        margin: 10,
      },

      600: {
        items: 1,
        margin: 10,
      },

      1024: {
        items: 3,
        dots: false,
        nav: true,
      },
    },
  });
});

$(document).ready(function () {
  $("#filterOptions li a").click(function () {
    var ourClass = $(this).attr("class");
    $("#filterOptions li").removeClass("active");
    $(this).parent().addClass("active");

    if (ourClass == "all") {
      $("#ourHolder").children("div.item").show();
    } else {
      $("#ourHolder")
        .children("div:not(." + ourClass + ")")
        .hide();
      $("#ourHolder")
        .children("div." + ourClass)
        .show();
    }
    return false;
  });
});

