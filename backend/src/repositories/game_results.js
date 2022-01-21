const Player = require('../entities/player')
const RPSJudge = require('../entities/rps_judge')
const { objectHasKeys } = require('./../utils/validation')

const gameResultKeys = ['type', 'gameId', 't', 'playerA', 'playerB']
const { GamesServiceSingleton } = require('./../services/games_service')
const defaultGamesService = GamesServiceSingleton

class GameResults {
  constructor(gamesService = defaultGamesService) {
    this.gamesService = gamesService
    this.judge = new RPSJudge()
  }

  _hasResult(gameId) {
    return this.gamesService.hasGame(gameId, false)
  }

  _hasOngoing(gameId) {
    return this.gamesService.hasGame(gameId, true)
  }

  _validate(data, playerKeys = 2) {
    if (!objectHasKeys(data, gameResultKeys) || this._hasResult(data.gameId)) {
      return false
    }
    return true
  }

  _validatePlayers(data, playerKeys = 2) {
    if (!Player.isDataValid(data.playerA, playerKeys) || !Player.isDataValid(data.playerB, playerKeys)) {
      return false
    }
    return true
  }

  _addGame(data) {
    return this.gamesService.addGame(data.gameId, [data.playerA.name, data.playerB.name])
  }

  _endGame(data) {
    try {
      const names = [data.playerA.name, data.playerB.name]
      const hands = [data.playerA.played, data.playerB.played]
      const winner = this.judge.getWinner(hands[0],hands[1])
      return this.gamesService.addResult(data.gameId, hands, names, winner, data.t)
    } catch (e) {
      return false
    }
  }

  _addOngoing(data) {
    if (this._validatePlayers(data, 1) == false || this._hasOngoing(data.gameId)) {
      return false
    }
    return this._addGame(data)
  }

  _addResult(data) {
    if (this._validatePlayers(data) == false) {
      throw new SyntaxError('Players failed validation')
    }
    if (!this._hasOngoing(data.gameId)) {
      const result = this._addGame(data)
      if (!result) {
        throw new SyntaxError('Invalid call sequence')
      }
    }

    if (!this._endGame(data)) {
      this.gamesService.removeGame(data.gameId)
      throw new SyntaxError('Result failed validation')
    }
    return true 
  }

  append(data) {
    if (!this._validate(data)) {
      throw SyntaxError('failed data validation')
    }
    let result = false
    if (data.type === 'GAME_BEGIN') {
      result = this._addOngoing(data)
    } else if (data.type === 'GAME_RESULT') {
      result = this._addResult(data)
    }
    if (!result) {
      this.gamesService.removeGame(data.gameId)
      throw SyntaxError('failed validation')
    }
  }
}

module.exports = GameResults