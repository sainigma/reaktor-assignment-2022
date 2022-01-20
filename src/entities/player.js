import { objectHasKeys } from "../utils/validation"
import { RPSJudge } from "./rps_judge"

export class Player {
  constructor(name, gameId, played, gameState) {
    this.name = name
    this.games = []
    this.draws = []
    this.victories = []
    this.plays = new Map()
    this.append(gameId, played, gameState)
  }

  append(gameId, played, gameState) {
    this.games.push(gameId)
    if (gameState == 0) {
      this.victories.push(gameId)
    } else if (gameState == -1) {
      this.draws.push(gameId)
    }
    if (this.plays.has(played)) {
      this.plays.set(played, this.plays.get(played) + 1)
    } else {
      this.plays.set(played, 1)
    }
  }

  static isPlayerValid(player) {
    const expectedKeys = ['name', 'played']
    return objectHasKeys(player, expectedKeys) && RPSJudge.isPlayValid(player.played)
  }
}