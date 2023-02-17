const express = require('express')
const MongoClient = require('mongodb').MongoClient
const cors = require('cors')

const {
  isProduction,
  expressPort,
  mongodbUrl,
  entryCollection,
} = require('./util/config')

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
})

app.listen(expressPort, () => {
  console.log(`Running on port ${expressPort}...`)
})

app.get('/welcome', (req, res) => res.send('Welcome to the Lost Wages API'))

app.get('/env', (req, res) => res.send(isProduction))

app.get('/test', (req, res) => {
  db.collection(entryCollection).insertOne({ foo: 'foo', bar: 'bar' })
  res.send('test')
})

app.get('/entries', async (req, res) => {
  const data = await db.collection(entryCollection).find({}).toArray()

  res.json(data)
})

app.post('/entry', (req, res) => {
  db.collection(entryCollection).insertOne(req.body)
  res.send(req.body)
})
