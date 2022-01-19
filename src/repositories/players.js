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
}