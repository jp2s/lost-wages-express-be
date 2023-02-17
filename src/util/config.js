const isProduction = false
const productionDb = 'lost-wages'
const devDb = 'dev-lost-wages'

const expressPort = 8080
const mongodbUrl = `mongodb://localhost:27017/${
  isProduction ? productionDb : devDb
}`
const entryCollection = 'entry'

module.exports = { isProduction, expressPort, mongodbUrl, entryCollection }
