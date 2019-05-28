import React, { useContext } from 'react'
import isMobile from 'util/isMobile'
import LayoutContext from 'containers/Layout/LayoutContext'
import { Homepage } from './Homepage'

function HomepageWrapper({ openingFromHome }) {
  //eslint-disable-line
  const { siteInfo } = useContext(LayoutContext)
  const urls = siteInfo.data[
    isMobile() ? 'video_group_mobile' : 'video_group'
  ].map(vid => vid.link.url)
  const randomUrl = urls[Math.floor(Math.random() * urls.length)]

  const reelEnabled = siteInfo.data.reel_enabled === 'True'
  const reelUrl = siteInfo.data.studio_reel.url

  return (
    <Homepage
      {...{
        reelEnabled,
        reelUrl,
        randomUrl,
        openingFromHome,
      }}
    />
  )
}

export default HomepageWrapper
