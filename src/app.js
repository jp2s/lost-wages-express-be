const express = require('express')
const MongoClient = require('mongodb').MongoClient
const cors = require('cors')

const { expressPort, mongodbUrl } = require('./util/config')
const { utilEndpoints } = require('./endpoints/util')
const { entryEndpoints } = require('./endpoints/entry')

const app = express()
let db

app.use(
  cors({
    origin: '*',
  }),
)
app.use(express.json())

MongoClient.connect(mongodbUrl, (err, client) => {
  db = client.db()

  for (let i = 0; i < utilEndpoints.length; ++i) {
    utilEndpoints[i](app, db)
  }

  for (let i = 0; i < entryEndpoints.length; ++i) {
    entryEndpoints[i](app, db)
  }
})

app.listen(expressPort, () => {
  console.log(`Running on port ${expressPort}...`)
})
