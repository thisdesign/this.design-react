import React from 'react'
import useFetch from 'util/useFetch'
import api from './api'
import './Instagram.scss'

function Instagram() {
  const response = useFetch(api)
  const urls =
    response && response.data.map(img => img.images.standard_resolution.url)

  return (
    <div className="about__instagram -wrap">
      {urls &&
        urls.map(imgUrl => (
          <a
            href="https://instagram.com/this"
            key={imgUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="about__instagram__item"
              src={imgUrl}
              alt="This Design"
            />
          </a>
        ))}
    </div>
  )
}

export default React.memo(Instagram)
