import { RPSHistory } from "./utils/json_requester"
import { Players } from "./repositories/players"


const init = () => {
  const target = document.getElementById("asd")
  target.innerHTML = "Webpack toimii"
  const rpsHistory = new RPSHistory('./reaktor/rps/history')
  const players = new Players()
  window.test = () => {
    rpsHistory.pages.forEach(page => {
      players.appendHistory(page['data'])
    })
  }
}

window.onload = init