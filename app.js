const bulletSelectors = document.querySelectorAll(".bullet");

const bullet1 = document.querySelector(".bullet1");
const bullet2 = document.querySelector(".bullet2");
const bullet3 = document.querySelector(".bullet3");
const bullet4 = document.querySelector(".bullet4");
const bullet5 = document.querySelector(".bullet5");

bullet1.addEventListener("click", () => {
  window.location.assign('hamstring.html');
  });

bullet2.addEventListener("click", () => {
  window.location.assign('elbowWrist.html');
  });

// bullet3.addEventListener("click", () => {
//   window.location.assign('quads.html');
//   });

bullet4.addEventListener("click", () => {
  window.location.assign('shoulders.html');
  });

  bullet5.addEventListener("click", () => {
    window.location.assign('quads.html');
    });



