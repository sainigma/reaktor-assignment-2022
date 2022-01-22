const rpsRouter = require('express').Router()
const axios = require('axios')
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

module.exports = rpsRouter