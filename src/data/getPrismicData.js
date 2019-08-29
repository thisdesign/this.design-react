const Prismic = require('prismic-javascript')
const config = require('../site.config')

export const getApi = async () => Prismic.getApi(config.prismicEndpoint)

export default async function getPrismicData() {
  const api = await getApi()
  const allCaseStudies = await api
    .query(Prismic.Predicates.at('document.type', 'casestudy'), {
      pageSize: 50,
    })
    .then(res => res.results)

  return { allCaseStudies }
}
