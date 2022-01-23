import OngoingGames from "./elements/ongoing"
import PlayerStatistics from "./elements/player_statistics"
import GameResults from "./elements/results"

export default class UI {
  constructor() {
    this.root = document.getElementById('ui')

    const statistics = document.createElement('div')
    statistics.className = 'child result'
    statistics.id = 'top_players'
    this.ongoingGames = new OngoingGames(this.root)
    this.gameResults = new GameResults(this.root)
    this.root.appendChild(statistics)

    this.playerStatistics = new PlayerStatistics(statistics)

    //this.ongoingGames.addOngoing('testi', 'pelaaja1', 'pelaaja2')
    //this.ongoingGames.removeOngoing('testi')
    //this.gameResults.addResult(['Testi Henkilö', 'Henki Testilö'], ['rock', 'paper'], 2)
  }

  addResult(data) {
    this.gameResults.addResult(
      [data.player1, data.player2],
      [data.hand1, data.hand2],
      data.winner, 0)
  }

  addOngoing(data) {
    this.ongoingGames.addOngoing(data.id, data.player1, data.player2)
  }

  removeOngoing(data) {
    this.ongoingGames.removeOngoing(
      data.id,
      [data.player1, data.player2],
      [data.hand1, data.hand2],
      data.winner, 0)
  }
}