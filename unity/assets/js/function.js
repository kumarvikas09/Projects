jQuery(document).ready(function ($) {
  // get header height
  let headerHeight = jQuery("header").outerHeight();
  headerHeight = headerHeight;
  jQuery("body")
    .get(0)
    .style.setProperty("--headerHeight", headerHeight + "px");

  $(window).scroll(function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 100) {
      $(".site_header").addClass("sticky");
    } else {
      $(".site_header").removeClass("sticky");
    }
  });

  $(".site_header .hemburger").click(function () {
    $(".site_header nav").addClass("open-nav");
  
    // Create close button only once
    if ($(".site_header .close-btn").length === 0) {
      $(".site_header nav").append('<span class="close-btn">✖</span>');
    }
  });
  
  // Delegated event
  $(document).on("click", ".site_header .close-btn", function () {
    $(".site_header nav").removeClass("open-nav");
  });
  // Set countdown time
  let countdownTime = 8 * 60 * 60 + 40 * 60 + 12;

  function updateCountdown() {

    const hours = Math.floor(countdownTime / 3600);
    const minutes = Math.floor((countdownTime % 3600) / 60);
    const seconds = countdownTime % 60;

    $("#hours").text(String(hours).padStart(2, "0"));
    $("#minutes").text(String(minutes).padStart(2, "0"));
    $("#seconds").text(String(seconds).padStart(2, "0"));

    if (countdownTime > 0) {
      countdownTime--;
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
});
