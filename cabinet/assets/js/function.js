$(document).ready(function () {
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

  $(".prdouct_tab_wrapper .tab_btn").click(function () {
    $(".prdouct_tab_wrapper .tab_btn").removeClass("active");
    $(this).addClass("active");
  });

  $(".main_product_img .heart").click(function () {
    $(this).toggleClass("active");
  });

  $(".filter_item button").click(function () {
    $(this).next().slideToggle();
    $(this).toggleClass("show");
  });

  $(".filterd_keyword .btns_wrapper").on("click", "svg", function () {
    $(this).closest("button").remove();
  });

  $(".range").each(function () {
    updateSlider($(this));
  });

  $(".range").on("input", function () {
    updateSlider($(this));
  });

  function updateSlider($slider) {
    let value = $slider.val();
    let min = $slider.attr("min");
    let max = $slider.attr("max");

    let percent = ((value - min) / (max - min)) * 100;

    $slider.css(
      "background",
      "linear-gradient(to right, #5b5bf7 " +
        percent +
        "%, #ddd " +
        percent +
        "%)",
    );

    $slider.siblings(".value").text(value);
  }

  $(".disable_accordion").on("change", function () {
    let $accItem = $(this).closest(".acc_item");
    let $body = $accItem.find(".toggle_elem");
    let $heading = $accItem.find(".acc_heading");

    if ($(this).is(":checked")) {
      $body.hide();
      $heading.addClass("disable");
    } else {
      $body.show();
      $heading.removeClass("disable");
    }
  });

  $(".toggle_item").on("click", function () {
    $(this).next().toggle();
    $(this).toggleClass("active");
  });

  $(".plus").click(function () {
    let qty = parseInt($(".qty-input").val());
    $(".qty-input").val(qty + 1);
  });

  $(".minus").click(function () {
    let qty = parseInt($(".qty-input").val());
    if (qty > 1) {
      $(".qty-input").val(qty - 1);
    }
  });

  $(".select_color").on("change", function () {
    let selectedText = $(this).find("option:selected").text();

    $(this).closest(".acc_body").find(".selected_choice b").text(selectedText);
  });
  $(".testimonial-carousel").owlCarousel({
    loop: true,
    margin: 30,
    dots: true,
    nav: false,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      1200: { items: 3 },
    },
  });

  $(".sub_items li").click(function () {
    var keywordText = $(this).text().trim();

    var buttonHtml = `
        <button type="button">
            <span class="keyword">${keywordText}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" 
                viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
                class="lucide lucide-x cursor-pointer hover:text-primary-900">
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
            </svg>
        </button>
    `;

    $(".filterd_keyword .btns_wrapper").append(buttonHtml);
  });

  $(".hemburger").click(function () {
    $(".mobile_menu_drawer").addClass("show");
  });

  $(".cross").click(function () {
    $(".mobile_menu_drawer").removeClass("show");
    $(".filter_wrapper").fadeOut();
  });

  $(".filter_btn_mob button").click(function () {
    $(".filter_wrapper").fadeIn();
  });

  $(".heart_icon").click(function () {
    $(this).toggleClass("active");
  });

  let isOwlActive = false;

  function toggleOwl() {
    const $slider = $(".property-slider");

    if ($(window).width() < 768) {
      if (!isOwlActive) {
        $slider.addClass("owl-carousel owl-theme");
        $slider.owlCarousel({
          items: 1.2,
          loop: true,
          margin: 20,
          dots: false,
          nav: false,
          //   autoplay: true,
          //   autoplayTimeout: 10000,
          //   autoplaySpeed: 900,
          smartSpeed: 900,
          //   autoplayHoverPause: true,
        });
        isOwlActive = true;
      }
    } else {
      if (isOwlActive) {
        $slider.trigger("destroy.owl.carousel");
        $slider.removeClass("owl-carousel owl-theme");
        $slider.find(".owl-stage-outer").children().unwrap();
        $slider.removeAttr("style");
        isOwlActive = false;
      }
    }
  }
  toggleOwl();

  $(".zoom-container")
    .on("mousemove", function (e) {
      let containerOffset = $(this).offset();
      let x = e.pageX - containerOffset.left;
      let y = e.pageY - containerOffset.top;

      let width = $(this).width();
      let height = $(this).height();

      let moveX = (x / width) * 100;
      let moveY = (y / height) * 100;

      $(this)
        .find("img")
        .css({
          "transform-origin": moveX + "% " + moveY + "%",
          transform: "scale(2)",
        });
    })
    .on("mouseleave", function () {
      $(this).find("img").css("transform", "scale(1)");
    });

  var slider = $(".customers_slider");

  slider.owlCarousel({
    loop: true,
    margin: 30,
    nav: false,
    dots: false,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 4 },
    },
  });

  $(".custom_next").click(function () {
    slider.trigger("next.owl.carousel");
  });

  $(".custom_prev").click(function () {
    slider.trigger("prev.owl.carousel");
  });

  document.querySelectorAll(".customers_section .wishlist").forEach((btn) => {
    btn.addEventListener("click", function () {
      this.classList.toggle("active");
    });
  });

  $('input[name="finish"]').on("change", function () {
    let finish = $(this).next('span').text();
    let color = $(this).closest('.card').find('h6').text();

    $('#finish').text(finish);
    $('#color').text(color);
  });
});
