const GameResults = require("../services/game_results")
const invalidHistory = require("../tests/dummy_data/history_various_defects.json")
const history = require("../tests/dummy_data/history.json")
const GamesRepository = require("../repositories/games_repository")
const { Connection } = require("../utils/db_connection")

const connection = new Connection('./dummy_gameresults.db')
const gamesRepository = new GamesRepository(connection)
const gameResults = new GameResults(gamesRepository)

beforeEach(async() => {
  await connection.purge()
  await connection.init()
})

test('appending works', async() => {
  const example = history.data[0]
  const result = await gameResults.append(example)
  expect(result).toBe(true)
})

test('game results are added to repository', async () => {
  const historyLength = history.data.length

  for (let i = 0; i < historyLength; i++) {
    const entry = history.data[i]
    const result = await gameResults.append(entry)
    expect(result).toBe(true)
  }
  const results = await gameResults.getResults()
  expect(results.length).toBe(historyLength)
})

test('ongoing games are added to games, but not to results', async() => {
  const historyLength = history.data.length

  for (let i = 0; i < historyLength; i++) {
    let entry = Object.assign({},history.data[i])
    entry.type = 'GAME_BEGIN'
    const result = await gameResults.append(entry)
    expect(result).toBe(true)
  }

  const games = await gameResults.getGames()
  expect(games.length).toBe(historyLength)

  const results = await gameResults.getResults()
  expect(results.length).toBe(0)
})

test('invalid game results are not added to the repo', async () => {
  const historyLength = invalidHistory.data.length

  for (let i = 0; i < historyLength; i++) {
    const entry = invalidHistory.data[i]
    let result = false
    try {
      result = await gameResults.append(entry)
    } catch (e) {}
    
    expect(result).toBe(false)
  }
  const games = await gameResults.getGames()
  expect(games.length).toBe(0)

  const results = await gameResults.getResults()
  expect(results.length).toBe(0)
})

afterAll(async() => {
  connection.purge()
})