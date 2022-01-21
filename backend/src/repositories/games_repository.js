const Player = require("../entities/player")
const RPSJudge = require("../entities/rps_judge")
const { connectionSingleton } = require("../utils/db_connection")

class GamesRepository {
  constructor(db = connectionSingleton) {
    this.db = db
    this.games = new Map()
    this.results = new Map()
    this.players = new Map()
  }

  addPlayer(playerName) {
    if (this.players.has(playerName)) {
      return
    }
    this.players.set(playerName, new Player())
  }

  addGame(gameId, playerNames) {
    if (this.hasGame(gameId)) {
      return false
    }
    this.addPlayer(playerNames[0])
    this.addPlayer(playerNames[1])
    this.games.set(gameId, {players: playerNames, ongoing:true})
    return true
  }

  removeGame(gameId) {
    if (this.hasGame(gameId)) {
      this.games.delete(gameId)
    }
    return true
  }

  addResult(gameId, hands, playerNames, winner, timestamp) {
    if (!this.hasGame(gameId) || this.hasResult(gameId) || !timestamp) {
      return false
    }

    const gameEntry = this.games.get(gameId)
    gameEntry.ongoing = false
    this.games.set(gameId, gameEntry)

    this.results.set(gameId, {hands, winner, timestamp})

    this.players.get(playerNames[0]).games++
    this.players.get(playerNames[1]).games++
    if (winner == -1) {
      this.players.get(playerNames[0]).draws++
      this.players.get(playerNames[1]).draws++
    } else {
      this.players.get(playerNames[winner]).wins++
    }

    return true
  }

  hasResult(gameId) {
    return this.results.has(gameId)
  }

  hasGame(gameId) {
    return this.games.has(gameId)
  }

  getResults(limit = 100) {
    return Array.from(this.results.values())
  }
}

module.exports = {
  gamesRepositorySingleton: new GamesRepository(),
  GamesRepository
}