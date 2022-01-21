import { GameResults } from "../src/repositories/game_results";
import * as invalidHistory from "../tests/dummy_data/history_various_defects.json";
import * as history from "../tests/dummy_data/history.json";

test('valid data is added to repository', () => {
  const gameResults = new GameResults()
  const historyLength = history.data.length

  const entriesAddedWithoutProblems = true

  history.data.forEach(entry => {
    const result = gameResults.addResult(entry)
    if (result !== true) {
      entriesAddedWithoutProblems = false
    }
  })

  expect(entriesAddedWithoutProblems).toBe(true)
  expect(gameResults.games.size).toBe(historyLength)
})

test('invalid data throws error', () => {
  const gameResults = new GameResults()
  let entryWasAccepted = false
  invalidHistory.data.forEach(data => {
    const result = gameResults.addResult(data)
    if (result !== SyntaxError) {
      entryWasAccepted = true
    }
  })
  expect(entryWasAccepted).toBe(false)
})