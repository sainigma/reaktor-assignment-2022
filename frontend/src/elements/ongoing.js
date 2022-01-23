import GameResults from "./results"

export default class OngoingGames {
  constructor(parent) {
    this.root = document.createElement('div')
    this.root.id = 'ongoing_games'
    this.root.className = 'child result'

    parent.appendChild(this.root)
    this.games = new Map()
  }

  static getInnerHtml(player1, player2) {
    return `
    <div class='icon winner_false left'></div>
    <div class='player_name right'>${player1}</div>
    <div class='icon vs fire'></div>
    <div class='player_name left'>${player2}</div>
    <div class='icon winner_false right flip'></div>
    `
  }

  addOngoing (id, player1, player2) {
    const div = document.createElement('div')
    div.className = 'game_result'
    div.innerHTML = OngoingGames.getInnerHtml(player1, player2)
    this.games.set(id, div)
    this.root.appendChild(div)
  }

  removeOngoing (id, players, hands, winner, time=0) {
    const div = this.games.get(id)
    if (div === undefined) {
      return
    }
    div.innerHTML = GameResults.getInnerHtml(players, hands, winner, time)
    //do animations etc
    setTimeout(() => {
      this.root.removeChild(div)
      this.games.delete(id)
    }, 5000)
  }
}