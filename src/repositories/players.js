import { Player } from "../entities/player"

export class Players {
  constructor() {
    this.players = new Map()
  }

  append(player, gameId) {
    if (!Player.isPlayerValid(player)) {
      return SyntaxError
    }
    if (this.players.has(player.name)) {
      this.players.get(player.name).append(gameId)
    } else {
      this.players.set(player.name, new Player(player.name, gameId))
    }
    return true
  }

  getPlayer(playerName) {
    if (this.players.has(playerName)) {
      return this.players[playerName]
    }
    return undefined
  }
}