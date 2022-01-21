const Player = require('../entities/player')
const RPSJudge = require('../entities/rps_judge')
const { objectHasKeys } = require('../utils/validation')

const gameResultKeys = ['type', 'gameId', 'playerA', 'playerB']
const { gamesRepositorySingleton } = require('../repositories/games_repository')
const defaultGamesRepository = gamesRepositorySingleton

class GameResults {
  constructor(gamesRepository = defaultGamesRepository) {
    this.gamesRepository = gamesRepository
    this.judge = new RPSJudge()
  }

  _hasResult(gameId) {
    return this.gamesRepository.hasResult(gameId)
  }

  _hasOngoing(gameId) {
    return this.gamesRepository.hasGame(gameId)
  }

  _validate(data) {
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
    return this.gamesRepository.addGame(data.gameId, [data.playerA.name, data.playerB.name])
  }

  _endGame(data) {
    try {
      const names = [data.playerA.name, data.playerB.name]
      const hands = [data.playerA.played, data.playerB.played]
      const winner = this.judge.getWinner(hands[0],hands[1])
      return this.gamesRepository.addResult(data.gameId, hands, names, winner, data.t)
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
      this.gamesRepository.removeGame(data.gameId)
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
      this.gamesRepository.removeGame(data.gameId)
      throw SyntaxError('failed validation')
    }
  }

  getResults() {
    return this.gamesRepository.getResults()
  }
}

module.exports = GameResults