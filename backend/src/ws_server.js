const WebSocket = require('ws')

module.exports = (server) => {
  const wsServerRX = new WebSocket('wss://bad-api-assignment.reaktor.com/rps/live')
  wsServerRX.onopen = (data) => {
  }
  wsServerRX.onmessage = (event) => {
    try {
      const jsonData = JSON.parse(event.data)
      console.log(jsonData)
    } catch (error) {
      if (error instanceof SyntaxError) {
        console.error(error.name)
      } else {
        console.error(error.message)
      }
    }
  }
  const wsServerTX = new WebSocket.WebSocketServer({
    server: server
  })

  return [wsServerRX, wsServerTX]
}