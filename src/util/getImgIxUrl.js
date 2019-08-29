const BASE_URL = 'https://thisstaging.cdn.prismic.io/thisstaging/'
const IMGIX_URL = 'https://this.imgix.net/'

const getImgIxUrl = inputUrl =>
  inputUrl && inputUrl.includes(BASE_URL)
    ? inputUrl.replace(BASE_URL, IMGIX_URL)
    : undefined

export default getImgIxUrl
