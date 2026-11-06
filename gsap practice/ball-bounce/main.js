// basic method
// 1. to() - currnt to another position
// 2. from() - from another to initial position
// 3. fromTo() - both 


gsap.from("h1", {
    duration: 3,
    opacity: 0,
    y:-30,
    ease: 'power3.out',
    // delay: 1
})

gsap.to(".ball", {
    duration: 1,
    y: -200,
    // ease: "power1.inOut",
    // delay: 1,
    repeat: -1,
    yoyo: true
})
gsap.to(".shadow",{
    duration: 1,
    scaleX: 0.5,
    opacity: 0.5,
    repeat: -1,
    yoyo: true,
    ease: ""
})