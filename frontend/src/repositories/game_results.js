import { Player } from "../entities/player"
import { RPSJudge } from "../entities/rps_judge"
import { GameResult } from "../entities/game_result"
import { Players } from "./players"
import { objectHasKeys } from "../utils/validation"

const gameResultKeys = ['type', 'gameId', 't', 'playerA', 'playerB']

export class GameResults {
  constructor() {
    this.games = new Map()
    this.players = new Players()
    this.judge = new RPSJudge()
  }

  addResult(data) {
    if (!objectHasKeys(data, gameResultKeys) || data.type !== 'GAME_RESULT' || this.games.has(data.gameId)) {
      return SyntaxError
    }
    if (!Player.isPlayerValid(data.playerA) || !Player.isPlayerValid(data.playerB)) {
      return SyntaxError
    }

    const playerA = data.playerA
    const playerB = data.playerB

    const playerAWon = this.judge.playerAWon(playerA.played, playerB.played)
    const playerBWon = playerAWon == -1 ? -1 : +!playerAWon

    this.players.append(playerA, data.gameId, playerAWon)
    this.players.append(playerB, data.gameId, playerBWon)

    this.games.set(data.gameId, new GameResult(playerA, playerB, playerAWon, data.t))
    return true
  }
}