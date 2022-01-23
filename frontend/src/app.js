import "./styles/ui.css"
import UI from "./ui"

let ui

const startSocket = () => {
  const socket = new WebSocket(`ws://localhost/`)

  socket.onopen = () => {
    console.log('connected')
  }

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data)
    if (data.winner !== undefined) {
      ui.removeOngoing(data)
      setTimeout(() => {
        ui.addResult(data)
      }, 5000)      
    } else {
      ui.addOngoing(data)
    }
  }
}

const fetchData = async(URI) => {
  return await fetch(`/rps/${URI}`).then(response => {
    return response.json()
  })
}

const addData = (data, method) => {
  for (const i in data) {
    method(data[i])
  }
}

const fetchTopPlayers = () => {

}

const fetchOngoing = () => {
  fetchData('ongoing').then(data => {
    addData(data, ui.addOngoing.bind(ui))
  })
}

const fetchResults = () => {
  fetchData('results').then(data => {
    addData(data, ui.addResult.bind(ui))
  })
}

const init = async () => {
  ui = new UI()
  
  startSocket()
  fetchOngoing()
  fetchResults()
  
}

window.onload = init