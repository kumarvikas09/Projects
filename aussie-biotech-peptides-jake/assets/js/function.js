$(document).ready(function () {
  // get header height
  let headerHeight = jQuery("header").outerHeight();
  headerHeight = headerHeight;
  jQuery("body")
    .get(0)
    .style.setProperty("--headerHeight", headerHeight + "px");

  $(".hemburger").click(function () {
    $(this).toggleClass("open");
    $("nav").slideToggle();
  });

   $('#searchToggle').on('click', function (e) {
    e.preventDefault();
    $('#searchPanel').toggleClass('active');
  });

  $('.close-search').on('click', function () {
    $('#searchPanel').removeClass('active');
  });
});
