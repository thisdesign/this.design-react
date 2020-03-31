import React, { useEffect, useRef, useState } from 'react'
import { PrismicImage } from 'types/prismic'
import S from './PanningGallery.Styled'
import Flickity from 'flickity-imagesloaded'

type PanningGallery = {
  items: {
    image: PrismicImage
  }[]
  primary: {
    cell_width: number | null
    cell_grouping: boolean
  }
}

type DirectionIndex = -1 | 0 | 1

const PanningGallery: React.FC<{ data: PanningGallery }> = ({ data }) => {
  const [directionIndex, setDirectionIndex] = useState<DirectionIndex>(0)
  const galleryRef = useRef()
  const flickity = useRef<any>()

  // initialize flickity
  useEffect(() => {
    if (galleryRef.current) {
      const flkty = new Flickity(galleryRef.current, {
        imagesLoaded: true,
        wrapAround: true,
        prevNextButtons: false,
        pageDots: false,
        groupCells: data.primary.cell_grouping === true ? 2 : 1,
      })

      flickity.current = flkty
    }
  }, [])

  const xBounds = useRef({
    furthestLeft: null,
    furthestRight: null,
  })

  // set bounds of "next", "prev", or "inside"
  const setXBounds = () => {
    if (flickity.current) {
      const centerRects = flickity.current.selectedCells.map(item =>
        item.element.getBoundingClientRect()
      )

      const furthestLeft = Math.min(...centerRects.map(rect => rect.x))
      const furthestRight = Math.max(
        ...centerRects.map(rect => rect.x + rect.width)
      )

      xBounds.current = { furthestRight, furthestLeft }
    }
  }

  // forward or backward
  const getDirectionIndex = (mouseX): DirectionIndex => {
    setXBounds()
    if (xBounds.current.furthestLeft > mouseX) return -1
    if (xBounds.current.furthestRight < mouseX) return 1
    return 0
  }

  // events
  useEffect(() => {
    if (flickity.current) {
      const flkty = flickity.current

      flkty.on('change', setXBounds)

      flkty.on('staticClick', event => {
        const indexChange = getDirectionIndex(event.clientX)
        flkty.select(flkty.selectedIndex + indexChange, true)
      })
    }
  }, [flickity.current])

  // for cursor
  const handleMouseOver = (e: React.MouseEvent) => {
    const directionIndexOfMouse = getDirectionIndex(e.clientX)

    if (directionIndexOfMouse !== directionIndex) {
      setDirectionIndex(directionIndexOfMouse)
    }
  }

  return (
    <>
      DIRECTION INDEX: {directionIndex}
      <S.Wrapper ref={galleryRef} className="flexy-carousel ">
        {data.items.map(
          (item, i) =>
            item.image.url && (
              <S.ImageWrapper
                width={data.primary.cell_width}
                onMouseMove={handleMouseOver}
              >
                <img src={item.image.url} />
              </S.ImageWrapper>
            )
        )}
      </S.Wrapper>
    </>
  )
}

export default PanningGallery
