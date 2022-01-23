const WebSocket = require('ws')
const GameResults = require('./services/game_results')
const gameResults = new GameResults()

module.exports = (server) => {
  const wsServerTX = new WebSocket.WebSocketServer({
    server: server
  })

  const sendResultToSockets = (message) => {
    wsServerTX.clients.forEach(socket => {
      socket.send(JSON.stringify(message))
    })
  } 
  
  const wsServerRX = new WebSocket('wss://bad-api-assignment.reaktor.com/rps/live')

  wsServerRX.onmessage = (event) => {
    try {
      const jsonData = JSON.parse(JSON.parse(event.data))
      gameResults.append(jsonData).then(result => {
        if (result) {
          const message = gameResults.getCached(jsonData)
          sendResultToSockets(message)
        }
      })
    } catch (error) {
      if (error instanceof SyntaxError) {
        console.error(`${error.message}: ${event.data}`)
      } else {
        console.error(error.name)
      }
    }
  }

  return [wsServerRX, wsServerTX]
}