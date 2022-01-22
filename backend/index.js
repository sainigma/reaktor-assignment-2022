require('dotenv').config()

const start = () => {
  const server = require('./src/server')
  const sockets = require('./src/ws_server')(server)

  server.listen(process.env.PORT, () => {
    console.log(`Server initialized, running at ${process.env.PORT}`)
  })
}

if (process.env.DEBUG == 1) {
  const { Connection } = require('./src/utils/db_connection')
  const connection = new Connection()
  connection.purge().then(() => {
    connection.init().then(() => {
      start()
    })
  })
} else {
  start()
}