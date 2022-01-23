import "./styles/ui.css"
import UI from "./ui"
import { fetchJSON } from './utils/fetcher'
let ui

const startSocket = () => {
  const socket = new WebSocket(`ws://${window.location.host}/reaktor/`)

  socket.onopen = () => {
    console.log('connected')
  }

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data)
    if (data.winner !== undefined) {
      ui.removeOngoing(data)
      fetchTopPlayers()
      setTimeout(() => {
        ui.addResult(data)
      }, 1150)      
    } else {
      ui.addOngoing(data)
    }
  }
}

const addData = (data, method) => {
  for (const i in data) {
    method(data[i])
  }
}

const fetchTopPlayers = () => {
  fetchJSON(`players/top`).then(data => {
    ui.setTopPlayers(data)
  })
}

const fetchOngoing = () => {
  fetchJSON('ongoing').then(data => {
    addData(data, ui.addOngoing.bind(ui))
  })
}

const fetchResults = () => {
  fetchJSON('results').then(data => {
    addData(data, ui.addResult.bind(ui))
  })
}

const init = async () => {
  ui = new UI()
  
  startSocket()
  fetchOngoing()
  fetchResults()
  fetchTopPlayers()
}

window.onload = init