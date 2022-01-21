const reaktor = require('express').Router()
const axios = require('axios')

reaktor.get('/*', async(req,res,next) => {
  res.json({'asd':1}).status(200).end()
})

module.exports = reaktor