export default class ParallaxController {
  constructor({ container, el }) {
    this.container = container;
    this.el = el;
    this.scrollTop = 0;
    this.ticking = false;
  }

  addListener = () => {
    this.container.addEventListener(
      'scroll',
      this.handleScroll,
      { passive: true },
    );
  }

  setContainer = (container) => {
    this.container = container;
  }

  handleScroll = () => {
    this.scrollTop = this.container.scrollTop;

    if (!this.ticking) {
      this.ticking = true;
      window.requestAnimationFrame(this.setOffset);
    }
  }

  setOffset = () => {
    const bounds = this.getBounds();
    const idk = ((bounds.top + bounds.height) / 2) - (window.innerHeight / 2);
    const offset = (-idk / 4);
    this.el.style.transform = `translate3d(0,${offset}px, 0)`;
    this.ticking = false;
  }

  init = () => {
    this.addListener();
    console.log('asdfs');
  }

  getBounds = () => this.el.getBoundingClientRect();
}
