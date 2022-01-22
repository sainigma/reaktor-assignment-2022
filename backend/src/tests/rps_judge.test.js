const RPSJudge = require("../entities/rps_judge")

test('SCISSORS should beat PAPER', () => {
  const rpsJudge = new RPSJudge()
  const result = rpsJudge.getWinner('SCISSORS', 'PAPER')
  expect(result).toBe(1)
})

test('SCISSORS should lose to ROCK', () => {
  const rpsJudge = new RPSJudge()
  const result = rpsJudge.getWinner('SCISSORS', 'ROCK')
  expect(result).toBe(2)
})

test('Same plays result to draw', () => {
  const rpsJudge = new RPSJudge()
  const result = rpsJudge.getWinner('ROCK', 'ROCK')
  expect(result).toBe(0)
})

test('Invalid key throws SyntaxError', () => {
  const rpsJudge = new RPSJudge()
  const method = () => {
    rpsJudge.getWinner('ASD', 'PAPER')
  }
  expect(method).toThrow(SyntaxError)
})