const { isProduction } = require('../util/config')

const apiWelcome = (app, db) =>
  app.get('/welcome', (req, res) => res.send('Welcome to the Lost Wages API'))

const apiGetEnvironement = (app, db) =>
  app.get('/env', (req, res) => res.send(isProduction))

const utilEndpoints = [apiWelcome, apiGetEnvironement]

module.exports = { utilEndpoints }
