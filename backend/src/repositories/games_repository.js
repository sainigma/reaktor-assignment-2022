const Player = require("../entities/player")
const RPSJudge = require("../entities/rps_judge")
const { connectionSingleton } = require("../utils/db_connection")

class GamesRepository {
  constructor(db = connectionSingleton) {
    this.db = db
    this.players = new Map()
  }

  addPlayer(playerName) {
    if (this.players.has(playerName)) {
      return
    }
    this.players.set(playerName, new Player())
  }

  async addGame(gameId, playerNames) {
    const gameExists = await this.hasGame(gameId)
    if (gameExists) {
      return false
    }
    this.addPlayer(playerNames[0])
    this.addPlayer(playerNames[1])
    await this.db.query(
      'insert into Games (id, player1, player2, ongoing) values (?, ?, ?, ?)', 
      [gameId, playerNames[0], playerNames[1], 1]
    )
    return true
  }

  async removeGame(gameId) {
    const gameExists = await this.hasGame(gameId)
    if (gameExists) {
      await this.db.query('delete from Games where id = ?', [gameId])
    }
    return true
  }

  async addResult(gameId, hands, playerNames, winner, timestamp) {
    if (!timestamp) {
      return false
    }

    const gameExists = await this.hasGame(gameId)
    const resultExists = await this.hasResult(gameId)
    if (!gameExists || resultExists) {
      return false
    }

    await this.db.query('update Games set ongoing = 0 where id = ?', [gameId])
    
    await this.db.query(
      'insert into Results (id, hand1, hand2, winner, t) values (?, ?, ?, ?, ?)', 
      [gameId, hands[0], hands[1], winner, timestamp]
    )

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

  async hasResult(gameId) {
    const rows = await this.db.query('select id from Results where id = ?', [gameId])
    return rows.length > 0
  }

  async hasGame(gameId) {
    const rows = await this.db.query('select id from Games where id = ?', [gameId])
    return rows.length > 0
  }

  async getOngoing(limit = 100) {
    const query = 'select * from games g where g.id not in (select r.id from Results r)'
    return await this.db.query(query)
  }

  async getGames(limit = 100) {
    const rows = await this.db.query('select * from Games')
    return rows
  }

  async getResults(limit = 100) {
    const rows = await this.db.query('select * from Results')
    return rows
  }
}

module.exports = GamesRepository