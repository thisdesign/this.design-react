const fs = require('fs')
const esm = require('esm')(module)

const getPrismicData = esm('./getPrismicData').default

async function getData() {
  console.log('FETCHING API...')
  const data = await getPrismicData()
  fs.writeFileSync('src/data/APP_DATA.json', JSON.stringify({ data }))
  console.log('FETCHED DATA')
}

getData()
