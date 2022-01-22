import OngoingGames from "./elements/ongoing"
import GameResults from "./elements/results"

export default class UI {
  constructor() {
    this.root = document.getElementById('ui')

    const topPlayers = document.createElement('div')
    topPlayers.className = 'child result'
    topPlayers.id = 'top_players'
    this.ongoingGames = new OngoingGames(this.root)
    this.gameResults = new GameResults(this.root)
    this.root.appendChild(topPlayers)

    this.ongoingGames.addOngoing('testi', 'pelaaja1', 'pelaaja2')
    //this.ongoingGames.removeOngoing('testi')
    this.gameResults.addResult(['Testi Henkilö', 'Henki Testilö'], ['rock', 'paper'], 2)
    this.gameResults.addResult(['Testi Henkilö', 'Henki Testilö'], ['rock', 'paper'], 2)
    this.gameResults.addResult(['Testi Henkilö', 'Henki Testilö'], ['rock', 'paper'], 2)
    this.gameResults.addResult(['Testi Henkilö', 'Henki Testilö'], ['rock', 'paper'], 2)
    this.gameResults.addResult(['Testi Henkilö', 'Henki Testilö'], ['rock', 'paper'], 2)
    this.gameResults.addResult(['Testi Henkilö', 'Henki Testilö'], ['rock', 'paper'], 2)
    this.gameResults.addResult(['Testi Henkilö', 'Henki Testilö'], ['rock', 'paper'], 2)
    this.gameResults.addResult(['Testi Henkilö', 'Henki Testilö'], ['rock', 'paper'], 2)
    this.gameResults.addResult(['Testi Henkilö', 'Henki Testilö'], ['rock', 'paper'], 2)
    this.gameResults.addResult(['Testi Henkilö', 'Henki Testilö'], ['rock', 'paper'], 2)
    this.gameResults.addResult(['Testi Henkilö', 'Henki Testilö'], ['rock', 'paper'], 2)
    this.gameResults.addResult(['Testi Henkilö', 'Henki Testilö'], ['rock', 'paper'], 2)
    this.gameResults.addResult(['Testi Henkilö', 'Henki Testilö'], ['rock', 'paper'], 2)
    this.gameResults.addResult(['Viimeinen Henkilö', 'Henki Testilö'], ['rock', 'paper'], 2)
  }
}