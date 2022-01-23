import "./../styles/stats.css"

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
      return first.value < other.value
    })
    console.log(hands)

    this.info.innerHTML = `
      <div class='container rows'>
        <div class='header'>Player statistics</div>
        <div class='subheader'>${name}</div>
        <div class='subcontainer inline'>
          <div class='subcontainer'>games</div>
          <div class='subcontainer'>${games}</div>
          <div class='subcontainer'>victories</div>
          <div class='subcontainer'>${wins}</div>
          <div class='subcontainer'>draws</div>
          <div class='subcontainer'>${draws}</div>
        </div>
        <div class='subcontainer'>
          <div class='subheader'>Prefers</div>
          <div class='hand subcontainer'>
            <div class='icon hand ${hands[0].name} first'></div>
            <div class='icon hand ${hands[1].name} second'></div>
            <div class='icon hand ${hands[2].name} third'></div>
          </div>
          <div class='subheader'>
            ${getRatioString(hands[0].value)} / 
            ${getRatioString(hands[1].value)} / 
            ${getRatioString(hands[2].value)}
          </div>
        </div>
      </div>
    `
  }
}