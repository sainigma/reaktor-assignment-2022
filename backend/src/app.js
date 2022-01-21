const express = require('express')
const app = express()
const cors = require('cors')
const bodyParses = require('body-parser')
const reaktorRouter = require('../controllers/reaktor')

app.use(bodyParses.urlencoded({extended:true}))
app.use(bodyParses.json())
app.use(cors())
app.use('/', express.static(process.env.STATIC))

app.use('/api/history', reaktorRouter)

module.exports = app