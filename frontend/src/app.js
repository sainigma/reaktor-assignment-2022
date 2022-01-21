import { RPSHistory } from "./services/rps_history"
import { GameResults } from "./repositories/game_results"

const rpsHistory = new RPSHistory('./reaktor/rps/history')
const gameResults = new GameResults()

const drawResults = () => {
  const gamesList = Array.from(asd.games.values()).sort((first, other) => first.timestamp - other.timestamp)
  console.log(gameResults.games.values())
}

const parsePage = (page) => {
  const data = page.data
  for (let i = 0; i < data.length; i++) {
    gameResults.addResult(data[i])
  }
}

const fetchPages = async () => {
  const page = await rpsHistory.fetchPage()
  parsePage(page)
  if (rpsHistory.cursor !== '') {
    console.log(page)
    setTimeout(fetchPages, 100)
  }
}

const init = async () => {
  fetchPages()
}

window.onload = init