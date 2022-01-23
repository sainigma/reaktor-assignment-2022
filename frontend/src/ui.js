import OngoingGames from "./elements/ongoing"
import PlayerStatistics from "./elements/player_statistics"
import GameResults from "./elements/results"
import { fetchJSON } from './utils/fetcher'

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

    this.root.addEventListener("click", (element) => {
      if (element.target.className == 'player_name') {
        const name = element.target.innerText
        fetchJSON(`players/${name}`).then(data => {
          if (data.length > 0) {
            data = data[0]
            console.log(data)
            this.playerStatistics.set(data.id, data.games, data.wins, data.draws, data.rocks, data.papers, data.scissors)
          }
        })
      }
    })
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