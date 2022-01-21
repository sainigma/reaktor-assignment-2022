require('dotenv').config()

const server = require('./src/server')
const sockets = require('./src/ws_server')(server)

server.listen(process.env.PORT, () => {
  console.log(`Server initialized, running at ${process.env.PORT}`)
})