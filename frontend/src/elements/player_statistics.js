import "./../styles/stats.css"

export default class PlayerStatistics {
  constructor(parent) {
    this.root = document.createElement('div')
    this.root.id = 'player_statistics'
    this.root.className = 'game_result stats'

    this.root.innerHTML = 'Player statistics'

    this.info = document.createElement('div')
    this.info.innerHTML = 'asdfasfdlkjasfklj'
    this.root.appendChild(this.info)

    parent.appendChild(this.root)
    this.set()
  }

  set(name, games, wins, draws, hands) {
    this.info.innerHTML = `
      <div class='header'>Otsikko</div>
      <div class='subheader'>Pelaajan nimi</div>
      <div class='right subcontainer'>Oikea juttu</div>
      <div class='left subcontainer'>Vasen juttu</div>
    `
  }
}