const Player = require('../entities/player')
const { objectHasKeys } = require('./../utils/validation')

const gameResultKeys = ['type', 'gameId', 't', 'playerA', 'playerB']

class GameResults {
  constructor() {
  }

  _hasResult(gameId) {
    //return true if db has game with id
  }

  _hasOngoing(gameId) {

  }

  _validate(data, playerKeys = 2) {
    if (!objectHasKeys(data, gameResultKeys) || this.hasResult(data.gameId)) {
      return SyntaxError
    }
    return true
  }

  _validatePlayers(data, playerKeys = 2) {
    if (!Player.isDataValid(data.playerA, playerKeys) || !Player.isDataValid(data.playerB, playerKeys)) {
      return SyntaxError
    }
    return true
  }

  _addGame(gameId, playerAName, playerBName) {
    
  }

  _endGame(gameId, playerAPlayed, playerBPlayed) {

  }

  _addOngoing(data) {
    if (this._validatePlayers(data, 1) == SyntaxError || this._hasOngoing(data.gameId)) {
      return SyntaxError
    }
    return this._addGame(data)
  }

  _addResult(data) {
    if (this._validatePlayers(data) == SyntaxError) {
      return SyntaxError
    }
    if (!this._hasOngoing(data.gameId)) {
      const result = this._addGame(data)
      if (result !== true) {
        return result
      }
    }
    return this._endGame(data)
  }

  append(data) {
    if (this._validate(data) == SyntaxError) {
      return SyntaxError
    }
    if (data.type === 'GAME_BEGIN') {
      return this._addOngoing(data)
    } else if (data.type === 'GAME_RESULT') {
      return this._addResult(data)
    }
    return SyntaxError
  }
}