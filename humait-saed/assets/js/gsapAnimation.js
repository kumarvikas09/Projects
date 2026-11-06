document.addEventListener("DOMContentLoaded", function () {
  // animation start
  gsap.registerPlugin(ScrollTrigger);
  const tl = gsap.timeline();

  tl.from(".hero-content h1", {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  })

    .from(
      ".hero-content .grad-border",
      {
        y: 30,
        opacity: 0,
        duration: 0.3,
      },
      "-=0.5",
    )

    .from(
      ".hero-content p",
      {
        y: 30,
        opacity: 0,
        duration: 0.4,
        stagger: 0.2,
      },
      "-=0.4",
    )

    .from(
      ".hero-content .books img",
      {
        x: 80,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.8",
    )

    .fromTo(
      ".hero-content .btn_wrapper2",
      { x: -200, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, ease: "bounce.out" },
      "-=0.5",
    )

    .fromTo(
      ".hero-content .btn_wrapper:not(.btn_wrapper2)",
      { x: 200, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, ease: "bounce.out" },
      "<",
    );

  gsap.to(".books img", {
    y: 15,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  const t2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".future-section",
    start: "top 80%", 
    toggleActions: "play none none none",
    // scrub: true
  }
});

  t2.from(".future-section .text-center>*", {
    duration: 0.3,
    y: 30,
    opacity: 0,
    // stagger: 0.3,
    ease: "power3.out",
  });

  t2.from(".future-section .content p", {
    duration: 0.3,
    y: 30,
    opacity: 0,
    stagger: 0.2,
    ease: "power3.out",
  });

  
  // animation end
});
