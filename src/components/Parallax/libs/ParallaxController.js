export default class ParallaxController {
  constructor({ container, el }) {
    this.container = container;
    this.el = el;
  }
  addListener = () => {
    this.container.addEventListener(
      'scroll',
      this.setOffset,
      { passive: true },
    );
  }

  setContainer = (container) => {
    this.container = container;
  }

  setOffset = () => {
    const bounds = this.getBounds();
    const idk = ((bounds.top + bounds.height) / 2) - (window.innerHeight / 2);
    const offset = (-idk / 4);
    this.el.style.transform = `translate3d(0,${offset}px, 0)`;
  }

  init = () => {
    this.addListener();
    console.log('asdfs');
  }

  getBounds = () => this.el.getBoundingClientRect();
}
