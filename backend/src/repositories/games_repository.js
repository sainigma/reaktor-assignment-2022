const Player = require("../entities/player")
const RPSJudge = require("../entities/rps_judge")
const { connectionSingleton } = require("../utils/db_connection")

class GamesRepository {
  constructor(db = connectionSingleton) {
    this.db = db
    this.ongoingCache = new Map()
    this.resultsCache = new Map()
  }

  async addPlayer(playerName) {
    return await this.db.query('insert or ignore into Players (id) values (?)', [playerName])
  }

  async updateHand(playerName, hand) {
    const dbKeywords = ['scissors', 'papers', 'rocks']
    const keyword = dbKeywords[RPSJudge.getKeywordIndex(hand)]
    if (keyword == undefined) {
      return
    }
    const query = `update Players set ${keyword} = ${keyword} + 1 where id = ?`
    return await this.db.query(query, [playerName])
  }

  async addGame(gameId, playerNames) {
    const gameExists = await this.hasGame(gameId)
    if (gameExists) {
      return false
    }
    await this.addPlayer(playerNames[0])
    await this.addPlayer(playerNames[1])
    await this.db.query(
      'insert into Games (id, player1, player2) values (?, ?, ?)', 
      [gameId, playerNames[0], playerNames[1]]
    )
    this.ongoingCache.set(gameId, {id: gameId, player1: playerNames[0], player2: playerNames[1]})
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
    
    await this.db.query(
      'insert into Results (id, hand1, hand2, winner, t) values (?, ?, ?, ?, ?)', 
      [gameId, hands[0], hands[1], winner, timestamp]
    )
    
    await this.db.query('update Players set games = games + 1 where id in (?, ?)', playerNames)
    
    await this.db.query(
      'update Players set games = 1 where id in (?, ?)', playerNames
    )
    
    await this.updateHand(playerNames[0], hands[0])
    await this.updateHand(playerNames[1], hands[1])

    if (winner == 0) {
      await this.db.query(
        'update Players set draws = draws + 1 where id in (?, ?)', playerNames
      )
    } else {
      await this.db.query(
        'update Players set wins = wins + 1 where id = ?', [playerNames[winner - 1]]
      )
    }

    this.ongoingCache.delete(gameId)
    this.resultsCache.set(gameId, {id: gameId, winner, player1: playerNames[0], player2: playerNames[1], hand1: hands[0], hand2: hands[1]})

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
    const rows = await this.db.query(
      'select r.id, r.winner, g.player1, g.player2, r.hand1, r.hand2 from Results r left join Games g on r.id = g.id order by r.t desc limit ?', [limit]
    )
    return rows
  }

  async getPlayer(name) {
    const rows = await this.db.query('select * from Players where id = ?', [name])
    return rows
  }

  async getTopPlayers() {
    const rows = await this.db.query('select * from Players order by 2 * wins + draws desc limit 10')
    return rows
  }

  getCached(id, type) {
    let cache
    if (type == 'GAME_RESULT') {
      cache = this.resultsCache
    } else if (type == 'GAME_BEGIN') {
      cache = this.ongoingCache
    } else {
      return
    }
    const result = cache.get(id)
    cache.delete(id)
    return result
  }
}

module.exports = GamesRepository