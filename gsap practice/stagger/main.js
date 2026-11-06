gsap.to(".card li", {
  duration: 0.8,
  y: 0,
  opacity: 1,
  stagger: 0.3,
  ease: "power3.out"
});

gsap.to(".box",{
  duration: 1,
  scale: 0,
  repeat: -1,
  yoyo: true,
  stagger:{
    each: 1,
    from: "random"
  }
})