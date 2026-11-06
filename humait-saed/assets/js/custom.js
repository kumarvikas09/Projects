$(document).ready(function () {
  // Menu toggle
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");
  const closeBtn = document.querySelector(".menu-close");

  // Open menu
  toggle.addEventListener("click", () => {
    menu.classList.add("active");
  });

  // Close menu
  closeBtn.addEventListener("click", () => {
    menu.classList.remove("active");
  });

  // language dropdown

  const dropdown = document.querySelector(".lang-dropdown");
  const selected = dropdown.querySelector(".selected");
  const items = dropdown.querySelectorAll("li");

  selected.addEventListener("click", () => {
    dropdown.classList.toggle("active");
  });

  items.forEach((item) => {
    item.addEventListener("click", () => {
      selected.innerHTML = item.innerHTML;
      dropdown.classList.remove("active");
    });
  });

  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("active");
    }
  });

  // add sticky header
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 100) {
      $(".main-header").addClass("sticky");
    } else {
      $(".main-header").removeClass("sticky");
    }
  });
});
