jQuery(document).ready(function ($) {

  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 50) {
      $('.nav-container').addClass('scrolled');
    } else {
      $('.nav-container').removeClass('scrolled');
    }
  });


  /***** menu */
  $(".menu-wrap .main-menu > ul > li").has("ul").addClass("has-submenu");
  $("#menuToggle").click(function (e) {
    $(this).toggleClass("active");
    $(".menu-wrap .menu-list-sc").addClass("active");
  });
  $("#closeMenu").click(function (e) {

    $(".menu-wrap .menu-list-sc").removeClass("active");
  });



  // Add dropdown icon inside <a>
  $(".menu-wrap .main-menu > ul > li.has-submenu > a").append(
    '<span class="dropdown-icon">▼</span>'
  );

  // Click ONLY on dropdown icon
  $(".menu-wrap").on("click", ".dropdown-icon", function (e) {
    e.preventDefault(); // stop link redirect
    e.stopPropagation(); // stop triggering <a>

    $(this).closest("li").toggleClass("clicked");
  });

  $(".banner-slider").owlCarousel({
    items: 1,
    loop: true,
    margin: 10,
    nav: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true
  });


  function setSubmenuHeight() {
    var innerHeight = $('.submenu-inner-wp').outerHeight(); // gets height including padding
    $('.submenu-cust').css('min-height', innerHeight + 80);
  }

  // Run on load
  setSubmenuHeight();

  // Optional: run again on window resize (for responsiveness)
  $(window).resize(function () {
    setSubmenuHeight();
  });


// 1. Inject close button inside nav (only once)
if ($('.menu-close').length === 0) {
  $('.site_header nav').prepend('<button class="menu-close">✕</button>');
}

// 2. Toggle menu open
$('.menu-toggle').click(function(e) {
  e.stopPropagation(); // prevent triggering document click
  // $(this).toggleClass('active');
  $('.site_header nav').toggleClass('active');
});

// 3. Close button click
$(document).on('click', '.menu-close', function() {
  $('.site_header nav').removeClass('active');
  $('.menu-toggle').removeClass('active');
});

// 4. Click outside to close
$(document).click(function(e) {
  if (
    !$(e.target).closest('.site_header nav').length &&
    !$(e.target).closest('.menu-toggle').length
  ) {
    $('.site_header nav').removeClass('active');
    $('.menu-toggle').removeClass('active');
  }
});


$('.submenu-lft h2 + ul > li > a').append(' <i class="fas fa-chevron-down submenu-icon"></i>');
  $('.top-ul li a i').on('click', function (e) {
    e.preventDefault();       // stop link navigation
    e.stopPropagation();      // stop bubbling to <a>

    $(this).closest('li').toggleClass('active');
  });
  $(' .submenu-lft h2 + ul > li > a i').on('click', function (e) {
    e.preventDefault();       // stop link navigation
    e.stopPropagation();      // stop bubbling to <a>

    $(this).closest('li').toggleClass('active-nest');
  });
  


});
