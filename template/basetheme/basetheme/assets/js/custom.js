$(document).ready(function () {

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
});
