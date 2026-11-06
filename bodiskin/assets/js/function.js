// let body = document.querySelector("body");
// let lastScrollTop = 0;
// let header = document.querySelector("header");

// function onloaded() {
//   body.style.setProperty("--headerHeight", header.offsetHeight + "px");
// }
// window.addEventListener("load", onloaded);

// window.addEventListener("scroll", function () {
//   let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

//   if (scrollTop > lastScrollTop) {
//     header.classList.add("active");
//   } else {
//     header.classList.remove("active");
//   }
//   if (scrollTop > 1000) {
//     header.classList.add("sticky");
//   } else {
//     header.classList.remove("sticky");
//   }
//   lastScrollTop = scrollTop;
// });


let body = document.querySelector("body");
let header = document.querySelector("header");

function onloaded() {
  body.style.setProperty("--headerHeight", header.offsetHeight + "px");
}
window.addEventListener("load", onloaded);

window.addEventListener("scroll", function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Active when scroll > 0
  if (scrollTop > 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }

  // Sticky when scroll > 1000
  if (scrollTop > 1000) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
});


// let header = document.querySelector("header");

// window.addEventListener("scroll", () => {
//   let scrollTop = window.scrollY;

//   if (scrollTop > 900) {
//     header.classList.add("sticky");
//     header.classList.remove("slideup");
//   } else {
//     header.classList.remove("sticky");
//     header.classList.add("slideup");
//   }
// });

$(document).ready(function () {
  $(".js_mega_menu, .megamenu").hover(
    function () {
      $(".megamenu").stop().slideDown();
      $(".js_mega_menu").addClass("active");
    },
    function () {
      $(".megamenu").stop().slideUp();
      $(".js_mega_menu").removeClass("active");
    }
  );

  var PrdSwiper = new Swiper(".product_swiper", {
      // Core settings
      slidesPerView: 2.5,       
      spaceBetween: 30,          
      centeredSlides: true,      
      loop: true,                
      grabCursor: true,          
      slidesOffsetBefore: 500,     
      slidesOffsetAfter: 0,

  navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    
  // breakpoints: {
  //   // Responsive design, changing slidesPerView based on screen width Code by Amit Niranjan
  //   640: {
  //     slidesPerView: 1.4
  //   },
  //   768: {
  //     slidesPerView: 2.5
  //   },
  //   1024: {
  //     slidesPerView: 4.2
  //   }
  // }
});


  var Realswiper = new Swiper(".real_result", {
    loop: false,
    spaceBetween: 30,
    slidesPerView: 1,
    allowTouchMove: false,
    // centeredSlides: true,

    navigation: {
      nextEl: ".next_slide",
      prevEl: ".prev_slide",
    },
  });

  var Imgswiper = new Swiper(".img_slider", {
    loop: true,
    spaceBetween: 30,
    slidesPerView: 4,
    // centeredSlides: true,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints: {
      1200: {
        slidesPerView: 4,
      },
      992: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 2,
      },
      0: {
        slidesPerView: 1,
      },
    },
  });
  var Fiveswiper = new Swiper(".five_items_slider", {
    loop: true,
    spaceBetween: 20,
    slidesPerView: 5,
    allowTouchMove: false, 
    // centeredSlides: true,

    navigation: {
      nextEl: ".prev_swiper",
      prevEl: ".next_swiper",
    },

    breakpoints: {
      1440: {
        slidesPerView: 5,
      },
      992: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      0: {
        spaceBetween: 10,
        slidesPerView: 2,
      },
    },
  });
  var Testemonialswiper = new Swiper(".testemonials_slider", {
    loop: true,
    spaceBetween: 30,
    slidesPerView: 4,
    // centeredSlides: true,

    navigation: {
      nextEl: ".custom_next_swiper",
      prevEl: ".custom_prev_swiper",
    },

    breakpoints: {
      1200: {
        slidesPerView: 4,
      },
      992: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 2,
      },
      0: {
        slidesPerView: 1,
      },
    },
  });

  var HeaderPrdswiper = new Swiper(".header_product_swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    // loop: true,
    speed: 400,
    allowTouchMove: false, // prevent manual stop

    // breakpoints: {
    //   1024: { slidesPerView: 1 },
    //   768: { slidesPerView: 3 },
    //   480: { slidesPerView: 1 },
    // },
  });

  // $('#slide1').on("mouseenter", function () {
  //   HeaderPrdswiper.slideTo(0);
  // });
  // $('#slide2').on("mouseenter", function () {
  //   HeaderPrdswiper.slideTo(1);
  // });
  // $('#slide3').on("mouseenter", function () {
  //   HeaderPrdswiper.slideTo(2);
  // });
  // $('#slide4').on("mouseenter", function () {
  //   HeaderPrdswiper.slideTo(3);
  // });
  // $('#slide5').on("mouseenter", function () {
  //   HeaderPrdswiper.slideTo(4);
  // });
  // $('#slide6').on("mouseenter", function () {
  //   HeaderPrdswiper.slideTo(5);
  // });
  // $('#slide7').on("mouseenter", function () {
  //   HeaderPrdswiper.slideTo(6);
  // });

  $('.slide-thumb').on("mouseenter", function () {
    let index = $(this).data('slide'); 
    HeaderPrdswiper.slideTo(index-1);
  });
  

  var Brandswiper = new Swiper(".brandsSwiper", {
    slidesPerView: 5,
    spaceBetween: 40,
    loop: true,
    speed: 4000,
    allowTouchMove: false, // prevent manual stop

    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },

    breakpoints: {
      1024: { slidesPerView: 5 },
      768: { slidesPerView: 4 },
      480: { slidesPerView: 3 },
      320: { slidesPerView: 2 },
    },
  });

  $(".quick_add .sizes button").click(function () {
    $(".quick_add .sizes button").removeClass("active");
    $(this).addClass("active");
  });

  $(".quick_add_btn").click(function () {
    $(".quick_add").removeClass("active");
    $(this).next().addClass("active");
  });

  $(document).click(function (e) {
    if (!$(e.target).closest(".quick_add, .quick_add_btn").length) {
      $(".quick_add").removeClass("active");
    }
  });

  $(".tab_img_change .tab_btn").click(function () {
    $(".tab_img_change .tab_btn").removeClass("active");
    $(this).addClass("active");
    // get target tab content id/class
    let data_tab = $(this).attr("data-tab");
    let data_text = $(this).attr("data-text");

    // content active
    $(".tab_content_img img").removeClass("active");
    $("#" + data_tab).addClass("active");

    // content active
    $(".tab_img_change .title").removeClass("active");
    $("#" + data_text).addClass("active");
  });

  $(".lab_testing .count").click(function(){
    $(".lab_testing .count").removeClass("active");
    $(this).addClass("active");

     // get target tab content id/class
    let data_tab = $(this).attr("data-tab");

    // image active
    $(".middle div").removeClass("active");
    $("#" + data_tab).addClass("active");

  })

});
