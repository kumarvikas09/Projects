$(document).ready(function () {
  // Get header height
  let headerHeight = jQuery("header").outerHeight();
  jQuery("body")
    .get(0)
    .style.setProperty("--headerHeight", headerHeight + "px");

  // Navigation drawer toggle
  const navToggle = document.getElementById('nav_toggle_btn');
  const navClose = document.getElementById('nav_close_btn');
  const navBackdrop = document.getElementById('nav_backdrop');
  const siteNav = document.getElementById('site_nav_menu');

  function closeNav() {
    if (navToggle) navToggle.classList.remove('open');
    if (siteNav) siteNav.classList.remove('active');
    if (navBackdrop) navBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  function openNav() {
    if (navToggle) navToggle.classList.add('open');
    if (siteNav) siteNav.classList.add('active');
    if (navBackdrop) navBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      if (siteNav.classList.contains('active')) {
        closeNav();
      } else {
        openNav();
      }
    });
  }

  if (navClose) {
    navClose.addEventListener('click', closeNav);
  }

  if (navBackdrop) {
    navBackdrop.addEventListener('click', closeNav);
  }

  if (siteNav) {
    const navLinks = siteNav.querySelectorAll('.site_header__nav_link');
    navLinks.forEach(function (link) {
      link.addEventListener('click', closeNav);
    });
  }

  // Interactive Before/After Sliders
  const sliders = document.querySelectorAll('[data-slider]');
  sliders.forEach(function (slider) {
    const range = slider.querySelector('[data-range]');
    const after = slider.querySelector('[data-after]');
    const divider = slider.querySelector('[data-divider]');

    if (range && after && divider) {
      const updateSlider = function (val) {
        after.style.width = val + '%';
        divider.style.left = val + '%';
      };
      range.addEventListener('input', function (e) {
        updateSlider(e.target.value);
      });
    }
  });

  // Product Thumbnail Tabs Handler
  const shopTabs = document.querySelectorAll('.grooming_shop_section__tab');
  const mainProductImg = document.getElementById('shop_main_product_img') || document.getElementById('product_main_image');
  if (shopTabs.length && mainProductImg) {
    shopTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        shopTabs.forEach(function (t) { t.classList.remove('active'); });
        this.classList.add('active');
        const imgInside = this.querySelector('img');
        if (imgInside) {
          const newSrc = imgInside.getAttribute('src');
          mainProductImg.style.opacity = '0';
          setTimeout(function () {
            mainProductImg.src = newSrc;
            mainProductImg.style.opacity = '1';
          }, 150);
        }
      });
    });
  }
});

// Global Helpers for Shop Section
function changeProductImage(imgSrc, tabEl) {
  const mainProductImg = document.getElementById('shop_main_product_img') || document.getElementById('product_main_image');
  const tabs = document.querySelectorAll('.grooming_shop_section__tab');
  if (tabs.length) {
    tabs.forEach(function (t) { t.classList.remove('active'); });
  }
  if (tabEl) {
    tabEl.classList.add('active');
  }
  if (mainProductImg && imgSrc) {
    mainProductImg.style.opacity = '0';
    setTimeout(function () {
      mainProductImg.src = imgSrc;
      mainProductImg.style.opacity = '1';
    }, 150);
  }
}

function adjustQty(amount) {
  const qtyVal = document.getElementById('product_qty_value') || document.getElementById('product_qty');
  if (qtyVal) {
    let currentVal = parseInt(qtyVal.textContent, 10) || 1;
    let newVal = currentVal + amount;
    if (newVal >= 1) {
      qtyVal.textContent = newVal;
    }
  }
}
