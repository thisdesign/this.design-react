import { buildURL } from 'react-imgix'
import getImgIxUrl from './getImgIxUrl'

export default function resizeImg(url, options) {
  if (url) {
    const imgIxUrl = getImgIxUrl(url)
    return buildURL(imgIxUrl, options)
  }
  return undefined
}
