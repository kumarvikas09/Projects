let tl = gsap.timeline();

tl.from("h2", {
  opacity: 0,
  y: 30,
})

tl.from("h3", {
  opacity: 0,
  y: 30,
})
tl.from("p", {
  opacity: 0,
  y: 30,
})
tl.to("a", {
  opacity: 1,
  scale: 1,
  duration: 0.8,
  ease: "back.out(1.7)"
})