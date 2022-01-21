const app = require('./app')

let server

if(process.env.PORT == 443){
  const https = require('https')
  const http = require('http')
  http.createServer(app.app).listen(80)
  server = https.createServer(process.env.CREDENTIALS, app)
}else{
  const http = require('http')
  server = http.createServer(app)
}

module.exports = server