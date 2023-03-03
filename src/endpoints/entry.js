const { entryCollection } = require('../util/config')

const apiGetAllEntries = (app, db) =>
  app.get('/entries', async (req, res) => {
    const data = await db.collection(entryCollection).find({}).toArray()

    res.json(data)
  })

const apiPostEntry = (app, db) =>
  app.post('/entry', (req, res) => {
    db.collection(entryCollection).insertOne(req.body)
    res.send(req.body)
  })

const entryEndpoints = [apiGetAllEntries, apiPostEntry]

module.exports = { entryEndpoints }
