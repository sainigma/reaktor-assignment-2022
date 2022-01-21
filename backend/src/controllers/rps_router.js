const rpsRouter = require('express').Router()
const axios = require('axios')
const GameResults = require('../repositories/game_results')
const gameResults = new GameResults()

rpsRouter.get('/', async(req, res, next) => {
  res.json({'asd':1}).status(200).end()
})

rpsRouter.get('/results', async(req, res, next) => {
  res.json(gameResults.getResults()).status(200).end()
})

module.exports = rpsRouter