export class Player {
  constructor(name, gameId) {
    this.name = name
    this.games = [gameId]
  }

  append(gameId) {
    this.games.push(gameId)
  }
}