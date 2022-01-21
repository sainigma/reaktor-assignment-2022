const GameResults = require("../services/game_results")
const invalidHistory = require("../tests/dummy_data/history_various_defects.json")
const history = require("../tests/dummy_data/history.json")
const GamesRepository = require("../repositories/games_repository")
const { Connection } = require("../utils/db_connection")

let gamesRepository, gameResults
const connection = new Connection('./dummy.db')

beforeEach(async() => {
  await connection.purge()
  await connection.init()
  gamesRepository = new GamesRepository(connection)
  gameResults = new GameResults(gamesRepository)
})

test('ongoing games are added to games, but not to results', async() => {
  const historyLength = history.data.length

  history.data.forEach(entry => {
    let entryCopy = Object.assign({}, entry)
    entryCopy.type = 'GAME_BEGIN'
    gameResults.append(entryCopy)
  })
  expect(gamesRepository.games.size).toBe(historyLength)
  expect(gamesRepository.results.size).toBe(0)
})

test('valid data is added to repository', async() => {
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
  expect(gamesRepository.results.size).toBe(historyLength)
})

test('invalid data throws SyntaxError', async() => {
  const gameResults = new GameResults()
  invalidHistory.data.forEach(data => {
    const method = () => {
      gameResults.append(data)
    }
    expect(method).toThrow(SyntaxError)
    expect(gameResults.gamesRepository.games.size).toBe(0)
  })
})

afterAll(() => {
  connection.purge()
})