import React, { memo } from 'react'
import Nav from 'structure/Nav'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import About from 'structure/About'
import Work from 'structure/Work'
import Root from 'structure/Root'
import useSaved from 'hooks/useSaved'
import Styled from './Styled'
import 'style/fontFamilies.css'

const { ViewInner, View } = Styled

const Layout = memo(({ view: viewProp, workUid }) => {
  const dispatch = useDispatch()
  const currentCsUid = useSaved(workUid)
  const isTransitioning = useSelector(state => state.transition.isTransitioning)
  const view = useSelector(state => state.view)

  React.useEffect(() => {
    dispatch({
      type: 'CHANGE_VIEW',
      view: viewProp,
      currentCsUid,
    })
  }, [currentCsUid, dispatch, viewProp])

  const extraProps = { isTransitioning, view }

  return (
    <>
      <Nav />
      <View.Root as="main" {...extraProps}>
        <Root />
      </View.Root>
      <View.About {...extraProps}>
        <ViewInner.About {...extraProps}>
          <About />
        </ViewInner.About>
      </View.About>
      <View.Work {...extraProps}>
        <ViewInner.Work {...extraProps}>
          <Work />
        </ViewInner.Work>
      </View.Work>
    </>
  )
})

Layout.propTypes = {
  view: PropTypes.oneOf(['root', 'work', 'about']).isRequired,
}

export default Layout
