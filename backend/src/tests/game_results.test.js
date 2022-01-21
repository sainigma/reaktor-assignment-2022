const GameResults = require("../repositories/game_results")
const invalidHistory = require("../tests/dummy_data/history_various_defects.json")
const history = require("../tests/dummy_data/history.json")
const { GamesService } = require("../services/games_service")

let gamesService, gameResults

beforeEach(() => {
  gamesService = new GamesService()
  gameResults = new GameResults(gamesService)
})

test('ongoing games are added to games, but not to results', () => {
  const historyLength = history.data.length

  history.data.forEach(entry => {
    let entryCopy = Object.assign({}, entry)
    entryCopy.type = 'GAME_BEGIN'
    gameResults.append(entryCopy)
  })
  expect(gamesService.games.size).toBe(historyLength)
  expect(gamesService.results.size).toBe(0)
})

test('valid data is added to repository', () => {
  const historyLength = history.data.length

  let entriesAddedWithoutProblems = true

  history.data.forEach(entry => {
    try {
      gameResults.append(entry)
    } catch (e) {
      console.log(e)
      entriesAddedWithoutProblems = false
    }
  })

  expect(entriesAddedWithoutProblems).toBe(true)
  expect(gamesService.results.size).toBe(historyLength)
})

test('invalid data throws SyntaxError', () => {
  const gameResults = new GameResults()
  invalidHistory.data.forEach(data => {
    const method = () => {
      gameResults.append(data)
    }
    expect(method).toThrow(SyntaxError)
    expect(gameResults.gamesService.games.size).toBe(0)
  })
})
