const parallax = document.querySelector(".parallax");
const cards = Array.from(parallax.querySelectorAll(".parallax__cardItem"));

window.onload = function reverseIndex() {
  [...cards].reverse().map((card, index) => {
    card.style.zIndex = index;
  });
};

console.log(cards);
const start = 200;
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
