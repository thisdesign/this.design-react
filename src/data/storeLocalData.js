const fs = require('fs')
const esm = require('esm')(module)

const PrismicRequest = esm('./PrismicRequest').default

async function getData() {
  console.log('FETCHING API...')

  const prismic = new PrismicRequest({ context: 'home' })

  const data = await prismic.init().then(async () => {
    const ctxCaseStudies = await prismic.getCtxCaseStudies()
    return { ctxCaseStudies }
  })

  fs.writeFileSync('src/data/APP_DATA.json', JSON.stringify(data))
  console.log('FETCHED DATA')
}

getData()
