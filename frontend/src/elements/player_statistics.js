import "./../styles/stats.css"
import TopPlayers from "./top_players"

export default class PlayerStatistics {
  constructor(parent) {
    this.root = document.createElement('div')
    this.root.id = 'player_statistics'
    this.root.className = 'game_result stats'

    this.info = document.createElement('div')
    this.info.innerHTML = 'click player to open stats'

    this.root.appendChild(this.info)

    parent.appendChild(this.root)
  }

  set(name, games, wins, draws, rocks, papers, scissors) {
    const handsTotal = rocks + papers + scissors
    const getRatioString = (hands) => {
      if (handsTotal < 1) {
        return 'Inf'
      }
      return `${(100 * hands / handsTotal).toFixed(1)}%`
    }
    
    const hands = [
      {name: 'rock', value: rocks},
      {name: 'paper', value: papers},
      {name: 'scissors', value: scissors}
    ].sort((first, other) => {
      return first.value < other.value ? 1 : -1
    })

    this.info.innerHTML = `
      <div class='container rows'>
        <div class='header'>Player statistics</div>
        <div class='subheader'>${name}</div>
        <div class='subcontainer inline'>
          <table>
            <tr><td>victories</td><td>${wins}</td></tr>
            <tr><td>draws</td><td>${draws}</td></tr>
            <tr><td>losses</td><td>${games - wins - draws}</td></tr>
            <tr><td>games</td><td>${games}</td></tr>
            <tr><td>W/L ratio</td><td>${TopPlayers.getRatio(games, wins, draws)}</td></tr>
          </table>
        </div>
        <div class='subcontainer'>
          
          <div class='hand subcontainer'>
            <div class='combined hand'>
              <div class='icon hand ${hands[0].name}'></div>
              <div class='icon hand ${hands[1].name}'></div>
              <div class='icon hand ${hands[2].name}'></div>
            </div>
          </div>
          <div class='subheader ratios'>Prefers ${hands[0].name}</div>
          <div class='subheader ratios'>
            ${getRatioString(hands[0].value)}/${getRatioString(hands[1].value)}/${getRatioString(hands[2].value)}
          </div>
        </div>
      </div>
    `
  }
}