import OngoingGames from "./elements/ongoing"
import PlayerStatistics from "./elements/player_statistics"
import GameResults from "./elements/results"
import TopPlayers from "./elements/top_players"
import { fetchJSON } from './utils/fetcher'

export default class UI {
  constructor() {
    this.root = document.getElementById('ui')

    const statistics = document.createElement('div')
    statistics.className = 'child result'
    statistics.id = 'statistics'
    this.ongoingGames = new OngoingGames(this.root)
    this.gameResults = new GameResults(this.root)
    this.root.appendChild(statistics)

    this.playerStatistics = new PlayerStatistics(statistics)
    this.topPlayers = new TopPlayers(statistics)

    this.root.addEventListener("click", (element) => {
      if (element.target.attributes.name !== undefined || element.target.parentNode.attributes.name !== undefined) {
        let name
        if (element.target.attributes.name !== undefined) {
          name = element.target.attributes.name.value
        } else {
          name = element.target.parentNode.attributes.name.value
        }
        fetchJSON(`players/${name}`).then(data => {
          if (data.length > 0) {
            data = data[0]
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

  setTopPlayers(data) {
    if (data.length > 0) {
      this.topPlayers.set(data)
    }
  }
}