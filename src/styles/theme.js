import media from 'styles/media';

const margin = {
  lg: '5em',
  md: '2em',
  nav: '80px',
  navMobile: '40px',
};

const theme = {
  color: {
    bodyLt: '#111',
    caseStudyBg: '#f9f9f9',
  },

  ease: {
    standard: 'cubic-bezier(.4, 0, .2, 1)',
    decel: 'cubic-bezier(0, 0, .2, 1)',
    accel: 'cubic-bezier(.4, 0, 1, 1)',
  },

  ...{
    margin,
    media,
  },

  _h3: `
    font-size: .5em;
    line-height: 2.25;
    letter-spacing: 1px;
    text-transform: uppercase;
    font-family: calibre-regular;
  `,

  _wrapNav: `
    padding-left 40px;
    padding-right: 40px;

    ${media.tablet`
      padding-left 80px;
      padding-right: 80px;
    `};
  `,

  _padding: `
    ${media.tablet`
      padding: 0 4%;
    `}
  `,

  _wrap: `
    margin: 0px auto;
    padding: 0 8%;

    ${media.tablet`
      max-width: 1500px;
      width: 80%;
      padding: 0;
    `}
  `,

  _wrapDub: `
    margin: 0px auto;
    padding: 0 8%;

    max-width: 960px;
    width: 66.67%;
  `,

  _grid: `
    margin: 0 auto;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    display: block;

    ${media.tablet`display: flex;`}
  `,

  rootTransition: {
    duration: 600,
    ease: [0.4, 0, 0.2, 1],
  },
};

export default theme;
