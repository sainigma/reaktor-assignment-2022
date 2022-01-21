export class GameResult {
  constructor(playerA, playerB, gameState, timestamp) {
    this.players = [playerA.name, playerB.name]
    this.played = [playerA.played, playerB.played]
    this.gameState = gameState
    this.timestamp = timestamp
  }
}