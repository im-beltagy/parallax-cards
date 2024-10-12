class Parallax {
  constructor(element) {
    this.element = element;
    this.cards = Array.from(
      this.element.querySelectorAll(".parallax__cardItem")
    );
    this.start = this.element.querySelector(".parallax__cards").offsetTop;
    this.end = this.element.clientHeight + 300;
    this.breakpoint = (this.end - this.start) / this.cards.length;
    this.headdings = Array.from(
      this.element.querySelectorAll(".parallax__headding")
    );
    this.init();
  }

  init() {
    this.reverseIndex();
    window.onload = this.reverseIndex;
    window.addEventListener("scroll", this.scroll.bind(this));
    window.addEventListener("load", this.resize.bind(this));
    window.addEventListener("resize", this.resize.bind(this));
    this.drawLine();
  }

  reverseIndex() {
    [...this.cards].reverse().map((card, index) => {
      card.style.zIndex = index;
    });
  }

  scroll() {
    const scroll = window.scrollY - (this.element.offsetTop + this.start);
    const hiddenCards = scroll > 0 ? Math.floor(scroll / this.breakpoint) : -1;

    this.cards.forEach((card, index) => {
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
  }

  resize() {
    const parallaxWrapper = this.element.querySelector(".parallax__wrapper");
    const parallaxContent = this.element.querySelector(".parallax__content");
    const diff = window.innerHeight - parallaxContent.clientHeight;
    parallaxWrapper.style.top = `${diff < 0 ? diff : 0}px`;
  }

  drawLine() {
    this.headdings.forEach((item) => {
      item.classList.add("parallax__headding--drawLine");
    });

    function unDrawLine() {
      this.headdings.forEach((item) => {
        item.classList.remove("parallax__headding--drawLine");
      });
      setTimeout(() => this.drawLine(), 1500);
    }

    setTimeout(() => unDrawLine(), 5000);
  }
}

Array.from(document.querySelectorAll(".parallax")).forEach((element) => {
  new Parallax(element);
});
