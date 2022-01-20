import { Player } from "../entities/player"

export class Players {
  constructor() {
    this.players = new Map()
  }

  append(playerName, gameId) {
    if (this.players.has(playerName)) {
      this.players[playerName].append(gameId)
    } else {
      this.players.set(playerName, new Player(playerName, gameId))
    }
  }

  getPlayer(playerName) {
    if (this.players.has(playerName)) {
      return this.players[playerName]
    }
    return undefined
  }
}