const texts = ["UI/UX Designer", "Gamer", "Singer", "Frontend Developer"];
const textElem = document.querySelector("h3");
let index = 0;

function animText() {
  const word = texts[index];
  textElem.textContent = word;

  // entry animation
  gsap.fromTo(textElem, {
    y: 50,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 1,
    // ease: "elastic.in(1,0.9)"
  }
);

    // exit animation
    gsap.to(textElem, {
        y: -50,
        duration: 0.8,
        delay: 2,
        opacity: 0,
        ease: "power2.in",
        onComplete: () =>{
            index = (index + 1) % texts.length;
            animText();
        },
    })
}

animText();
