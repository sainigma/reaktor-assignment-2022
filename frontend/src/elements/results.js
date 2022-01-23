import "./../styles/game_results.css"

export default class GameResults {
  constructor(parent) {
    this.root = document.createElement('div')
    this.root.id = 'game_results'
    this.root.className = 'child result'

    parent.appendChild(this.root)
  }

  static getInnerHtml(players, hands, winner, time=0) {
    const player1Wins = winner == 1 ? 'winner' : 'loser'
    const player2Wins = winner == 2 ? 'winner' : 'loser'

    let innerHTML = `
    <div class='player_name'>${players[0]}</div>
    <div class='icon hand ${hands[0]} right ${player1Wins}'></div>
    <div class='icon vs'></div>
    <div class='icon hand ${hands[1]} left ${player2Wins}'></div>
    <div class='player_name'>${players[1]}</div>`

    if (winner > 0) {
      innerHTML = `
        <div class='icon winner_${winner == 1} left'></div>${innerHTML}
        <div class='icon winner_${winner == 2} right flip'></div>`
    } else {
      innerHTML = `<div class='icon draw left'></div>${innerHTML}<div class='icon draw right'></div>`
    }
    return innerHTML
  }

  addResult (players, hands, winner, time=0) {
    const div = document.createElement('div')
    div.className = 'game_result'
    div.innerHTML = GameResults.getInnerHtml(players, hands, winner, time)
    this.root.prepend(div)
  }
}