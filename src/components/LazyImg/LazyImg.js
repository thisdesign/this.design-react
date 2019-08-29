import React from 'react'
import PropTypes from 'prop-types'
import { useInView } from 'react-intersection-observer'
import ImgShell from './ImgShell'

function LazyImg({ src, alt, aspect }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '150px',
  })

  return <ImgShell ref={ref} {...{ src, alt, aspect }} show={inView} />
}

LazyImg.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  aspect: PropTypes.number.isRequired,
}

export default LazyImg
