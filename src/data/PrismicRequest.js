const Prismic = require('prismic-javascript')
const config = require('../site.config')

export const getApi = async () => Prismic.getApi(config.prismicEndpoint)

async function getContextDocs() {
  return this.api.query(Prismic.Predicates.at('document.type', 'context'))
}

function getSelectedCtx() {
  return this.contextDocs.results.filter(item => item.uid === this.contextId)[0]
}

function getCtxItems() {
  return this.selectedCtx.data.case_study_list.map(item => item.case_study_item)
}

export default class PrismicRequest {
  constructor({ context }) {
    this.contextId = context
  }

  async init() {
    this.api = await getApi()
    this.contextDocs = await getContextDocs.call(this)
    this.selectedCtx = getSelectedCtx.call(this)
    this.ctxItems = getCtxItems.call(this)
  }

  async getCtxUids() {
    return this.contextDocs.results.map(item => item.uid)
  }

  async getCtxCaseStudies() {
    const ids = this.ctxItems.map(item => item.id)
    return this.api.getByIDs([...ids]).then(res => res.results)
  }

  filterCtxCaseStudies(allCaseStudies) {
    const uids = this.ctxItems.map(item => item.uid)
    return uids.map(uid => allCaseStudies.filter(cs => cs.uid === uid)[0])
  }

  async getAllCaseStudies() {
    return this.api
      .query(Prismic.Predicates.at('document.type', 'casestudy'), {
        pageSize: 50,
      })
      .then(res => res.results)
  }
}
