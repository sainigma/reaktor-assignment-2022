import { RPSHistory } from "./services/rps_history"

const init = () => {
  const target = document.getElementById("asd")
  target.innerHTML = "Webpack toimii"
  const rpsHistory = new RPSHistory('./reaktor/rps/history')
  rpsHistory.fetchPage()
  window.test = () => {
    console.log(rpsHistory.pages)
  }
}

window.onload = init