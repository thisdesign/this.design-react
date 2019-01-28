import { css } from 'styled-components';

const sizes = {
  desktop: 1200,
  laptop: 992,
  tablet: 768,
  phone: 576,
};

// Iterate through the sizes and create a media template
const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${sizes[label]}px) {
      ${css(...args)}
    }
  `.join('');
  return acc;
}, {});

const margin = {
  lg: '5em',
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

  timing: {
    csTransition: 600,
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
    padding: 0 80px
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

  _grid: `
    margin: 0 auto;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border: 1px solid blue;
    display: block;

    ${media.tablet`display: flex;`}
  `,
};

export default theme;
