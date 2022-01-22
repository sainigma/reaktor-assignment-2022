const Player = require('../entities/player')
const RPSJudge = require('../entities/rps_judge')
const { objectHasKeys } = require('../utils/validation')

const gameResultKeys = ['type', 'gameId', 'playerA', 'playerB']
const GamesRepository = require('../repositories/games_repository')

class GameResults {
  constructor(gamesRepository = undefined) {
    this.gamesRepository = gamesRepository
    if (this.gamesRepository == undefined) {
      this.gamesRepository = new GamesRepository()
    } 
    this.judge = new RPSJudge()
  }

  async _hasResult(gameId) {
    return await this.gamesRepository.hasResult(gameId)
  }

  async _hasOngoing(gameId) {
    return await this.gamesRepository.hasGame(gameId)
  }

  async _validate(data) {
    const validKeys = objectHasKeys(data, gameResultKeys)
    const resultExists = await this._hasResult(data.gameId)
    return validKeys && !resultExists
  }

  _validatePlayers(data, playerKeys = 2) {
    if (!Player.isDataValid(data.playerA, playerKeys) || !Player.isDataValid(data.playerB, playerKeys)) {
      return false
    }
    return true
  }

  _addGame(data) {
    return this.gamesRepository.addGame(data.gameId, [data.playerA.name, data.playerB.name])
  }

  async _endGame(data) {
    try {
      const names = [data.playerA.name, data.playerB.name]
      const hands = [data.playerA.played, data.playerB.played]
      const winner = this.judge.getWinner(hands[0],hands[1])
      return await this.gamesRepository.addResult(data.gameId, hands, names, winner, data.t)
    } catch (err) {
      console.error(err)
      return false
    }
  }

  async _addOngoing(data) {
    if (this._validatePlayers(data, 1) == false || await this._hasOngoing(data.gameId)) {
      return false
    }
    return await this._addGame(data)
  }

  async _addResult(data) {
    if (this._validatePlayers(data) == false) {
      throw new SyntaxError('Players failed validation')
    }
    const ongoing = await this._hasOngoing(data.gameId)
    if (!ongoing) {
      const result = await this._addGame(data)
      if (!result) {
        throw new SyntaxError('Invalid call sequence')
      }
    }

    const gameWasEnded = await this._endGame(data)
    if (!gameWasEnded) {
      await this.gamesRepository.removeGame(data.gameId)
      throw new SyntaxError('Result failed validation')
    }
    return true 
  }

  async append(data) {
    const dataIsValid = await this._validate(data)
    if (!dataIsValid) {
      throw new SyntaxError('failed data validation')
    }
    let result = false
    if (data.type === 'GAME_BEGIN') {
      result = await this._addOngoing(data)
    } else if (data.type === 'GAME_RESULT') {
      result = await this._addResult(data)
    }
    if (!result) {
      await this.gamesRepository.removeGame(data.gameId)
      throw new SyntaxError('failed validation')
    }
    return true
  }

  getOngoing(limit = 10) {
    return this.gamesRepository.getOngoing(limit)
  }

  getGames(limit = 10) {
    return this.gamesRepository.getGames(limit)
  }

  getResults(limit = 10) {
    return this.gamesRepository.getResults(limit)
  }

  getPlayer(name) {
    return this.gamesRepository.getPlayer(name)
  }
}

module.exports = GameResults