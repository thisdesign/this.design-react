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
  ...{ margin },

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
    @media (min-width: 768px){
      padding: 0 4%;
    }
  `,
  _wrap: `
    margin: 0px auto;

    @media (max-width: 768px){
      padding: 0 8%!important;
    }

    @media (min-width: 768px){
      max-width: 1500px;
      width: 80%;
    }
  `,

  _grid: `
    margin: 0 auto;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;

    @media (min-width: 768px){
      display: flex;
    }
  `,
};


export default theme;
