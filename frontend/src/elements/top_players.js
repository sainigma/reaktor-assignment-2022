import "./../styles/top_players.css"

export default class TopPlayers {
  constructor(parent) {
    this.root = document.createElement('div')
    this.root.id = 'top_players'
    this.root.className = 'game_result stats'

    this.toplist = document.createElement('div')
    this.toplist.innerHTML = 'stats here'

    this.root.appendChild(this.toplist)

    parent.appendChild(this.root)
  }

  static getRatio = (games, wins, draws) => {
    const losses = games - wins - draws
    if (losses < 1) {
      return 'Inf&nbsp;'
    }
    return (wins / losses).toFixed(2)
  }

  set(players) {

    let playerHtml = ''
    for(let i in players) {
      i = parseInt(i)
      const player = players[i]
      playerHtml += `
        <div class='player_name top' name='${player.id}'>
          <div>${i + 1}.</div>
          <div>${player.id}</div>
          <div>${player.wins}/${player.draws}/${player.games - player.wins - player.draws}/${TopPlayers.getRatio(player.games, player.wins, player.draws)}&nbsp;</div>
        </div>`
    }

    let innerHtml = `
      <div class='container rows>
        <div class='header'>Top players</div>
        <div class='header top'><div>&nbsp;</div><div>W/D/L/ratio</div></div>
        ${playerHtml}
      </div>
    `
    this.toplist.innerHTML = innerHtml
  }
}