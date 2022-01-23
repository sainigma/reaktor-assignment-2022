const rpsRouter = require('express').Router()
const GameResults = require('../services/game_results')
const gameResults = new GameResults()

rpsRouter.get('/', async(req, res, next) => {
  res.json({'asd':1}).status(200).end()
})

rpsRouter.get('/ongoing', async(req,res,next) => {
  const results = await gameResults.getOngoing()
  res.json(results).status(200).end()
})

rpsRouter.get('/results', async(req, res, next) => {
  const results = await gameResults.getResults()
  res.json(results).status(200).end()
})

rpsRouter.get('/players/top', async(req, res, next) => {
  const results = await gameResults.getTopPlayers()
  res.json(results).status(200).end()
})

rpsRouter.get('/players/:name', async(req, res, next) => {
  const name = req.params.name.replace('%20',' ')
  const result = await gameResults.getPlayer(name)
  res.json(result).status(200).end()
})

module.exports = rpsRouter