let ticking = false;
let el = null;
let container = null;

const _getBounds = () => el.getBoundingClientRect();

const _transform = (offset) => {
  el.style.transform = `translate3d(0,${offset}px, 0)`;
};

const _getOffset = () => {
  const bounds = _getBounds();
  const idk = ((bounds.top + bounds.height) / 2) - (window.innerHeight / 2);
  const offset = (-idk / 4);
  return offset;
};
const setOffset = () => {
  _transform(_getOffset());
  ticking = false;
};


const _handleScroll = () => {
  if (!ticking) {
    ticking = true;
    window.requestAnimationFrame(setOffset);
  }
};

const _addListener = () => {
  container.addEventListener(
    'scroll',
    _handleScroll,
    { passive: true },
  );
};

export default class ParallaxController {
  constructor({ container: cont, el: elem }) {
    container = cont;
    el = elem;
  }

  init = () => {
    _addListener();
  }

  destroy = () => {
    console.log('destroy');
  }
}
