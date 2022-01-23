const express = require('express')
const app = express()
const cors = require('cors')
const bodyParses = require('body-parser')
const rpsRouter = require('./controllers/rps_router')

app.use(bodyParses.urlencoded({extended:true}))
app.use(bodyParses.json())
app.use(cors())
app.use(`/`, express.static(process.env.STATIC))

app.use(`/rps/`, rpsRouter)

module.exports = app