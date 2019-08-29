import { buildURL } from 'react-imgix'

const BASE_URL = 'https://thisstaging.cdn.prismic.io/thisstaging/'
const IMGIX_URL = 'http://this.imgix.net/'

const getImgIxUrl = inputUrl =>
  inputUrl && inputUrl.includes(BASE_URL)
    ? inputUrl.replace(BASE_URL, IMGIX_URL)
    : undefined

export default function resizeImg(url, options) {
  if (url) {
    const imgIxUrl = getImgIxUrl(url)
    return buildURL(imgIxUrl, options)
  }
  return undefined
}
