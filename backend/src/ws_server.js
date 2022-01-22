const WebSocket = require('ws')
const GameResults = require('./services/game_results')
const gameResults = new GameResults()

module.exports = (server) => {
  const wsServerRX = new WebSocket('wss://bad-api-assignment.reaktor.com/rps/live')
  wsServerRX.onopen = (data) => {
  }
  wsServerRX.onmessage = (event) => {
    try {
      const jsonData = JSON.parse(JSON.parse(event.data))
      gameResults.append(jsonData)
    } catch (error) {
      if (error instanceof SyntaxError) {
        console.error(`${error.message}: ${event.data}`)
      } else {
        console.error(error.name)
      }
    }
  }
  const wsServerTX = new WebSocket.WebSocketServer({
    server: server
  })

  return [wsServerRX, wsServerTX]
}