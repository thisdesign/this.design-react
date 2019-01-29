import React, { useContext } from 'react';

import LayoutContext from 'containers/Layout/LayoutContext';
import useFetch from 'util/useFetch';
import api from './api';
import './Instagram.scss';

function Instagram() {
  const { view } = useContext(LayoutContext);
  const response = view === 'about' && useFetch(api);
  const urls = response && response.data.map(img => img.images.standard_resolution.url);

  return (
    <div className="about__instagram -wrap">
      {urls && urls.map(imgUrl => (
        <a href="https://instagram.com/this" key={imgUrl}>
          <img className="about__instagram__item" src={imgUrl} alt="This Design" />
        </a>
        ))
      }
    </div>
  );
}

export default React.memo(Instagram);
