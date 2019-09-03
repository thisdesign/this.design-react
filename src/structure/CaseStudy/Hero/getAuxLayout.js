import { css } from 'styled-components/macro'

const getAuxLayout = layout => {
  switch (layout) {
    case 'top-left':
      return css`
        top: 0;
        left: 0;
      `
    case 'top-center':
      return css`
        top: 0;
        left: 50%;
        transform: translateX(-50%);
      `
    case 'top-right':
      return css`
        top: 0;
        right: 0;
      `
    case 'middle-left':
      return css`
        top: 50%;
        left: 0;
        transform: translateY(-50%);
      `
    case 'middle-center':
      return css`
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
      `
    case 'middle-right':
      return css`
        top: 50%;
        right: 0;
        transform: translateY(-50%);
      `
    case 'bottom-left':
      return css`
        bottom: 0;
        left: 0;
      `
    case 'bottom-center':
      return css`
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      `
    case 'bottom-right':
      return css`
        bottom: 0;
        right: 0;
      `
    default:
      return null
  }
}

export default getAuxLayout
