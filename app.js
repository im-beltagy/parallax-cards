const parallax = document.querySelector(".parallax");
const cards = Array.from(parallax.querySelectorAll(".parallax__cardItem"));

window.onload = function reverseIndex() {
  [...cards].reverse().map((card, index) => {
    card.style.zIndex = index;
  });
};

const start = parallax.querySelector(".parallax__cards").offsetTop;
const end = parallax.clientHeight + 300;
const breakpoint = (end - start) / cards.length;

window.addEventListener("scroll", (e) => {
  const scroll = window.scrollY - (parallax.offsetTop + start);
  const hiddenCards = scroll > 0 ? Math.floor(scroll / breakpoint) : -1;

  cards.forEach((card, index) => {
    if (index <= hiddenCards) {
      card.style.setProperty("--hidden", 1);
    } else {
      card.style.setProperty("--hidden", 0);
    }
    card.style.setProperty(
      "--rotate",
      `${Math.max(index - hiddenCards - 1, 0)}`
    );
  });
});

function resize() {
  const parallaxWrapper = parallax.querySelector(".parallax__wrapper");
  const parallaxContent = parallax.querySelector(".parallax__content");
  const diff = window.innerHeight - parallaxContent.clientHeight;
  console.log(diff, window.innerHeight, parallaxContent.clientHeight);
  parallaxWrapper.style.top = `${diff < 0 ? diff : 0}px`;
}
window.addEventListener("load", resize);
window.addEventListener("resize", resize);

const headdings = Array.from(document.querySelectorAll(".parallax__headding"));
(function drawLine() {
  headdings.forEach((item) => {
    item.classList.add("parallax__headding--drawLine");
  });

  function unDrawLine() {
    headdings.forEach((item) => {
      item.classList.remove("parallax__headding--drawLine");
    });
    setTimeout(() => drawLine(), 1500);
  }

  setTimeout(() => unDrawLine(), 5000);
})();
