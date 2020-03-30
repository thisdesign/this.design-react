import styled from 'styled-components'

const Wrapper = styled.div`
  overflow: hidden;
  outline: none !important;

  img {
    width: 100%; /* half-width */
  }

  .flickity-slider {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
  }
`

const ImageWrapper = styled.div`
  width: 50%;
  padding: 0.5rem;
`

export default { ImageWrapper, Wrapper }
