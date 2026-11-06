gsap.from("h1", {
    duration: 3,
    opacity: 0,
    y:-30,
    ease: 'power3.out',
    // delay: 1
})
gsap.registerPlugin(ScrollTrigger);

let cards = document.querySelectorAll(".card");

cards.forEach(card => {
  gsap.to(card, {
    scale: 0.2,
    opacity: 0,
    rotate: 60,
    duration: 1,
    ease: "power1.out",

    scrollTrigger: {
      trigger: card,
      start: 'top 5%',
      end: "+=900px",
      scrub: true,
      // markers: true
    }
  });
});