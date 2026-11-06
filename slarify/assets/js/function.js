document.addEventListener("DOMContentLoaded", function () {

  let headerHeight = document.querySelector("header").offsetHeight;

  document.body.style.setProperty(
    "--headerHeight",
    headerHeight + "px"
  );

  const hamburger = document.querySelector(".site_header .hemburger");
  const nav = document.querySelector(".site_header nav");

  // open nav
  hamburger.addEventListener("click", function () {

    nav.classList.add("open-nav");

    // create close button only once
    if (!document.querySelector(".site_header .close-btn")) {

      const closeBtn = document.createElement("span");

      closeBtn.classList.add("close-btn");
      closeBtn.innerHTML = "✖";

      nav.appendChild(closeBtn);
    }

  });

  // delegated close event
  document.addEventListener("click", function (e) {

    if (e.target.classList.contains("close-btn")) {
      nav.classList.remove("open-nav");
    }

  });
});