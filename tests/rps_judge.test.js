import { RPSJudge } from "../src/entities/rps_judge";

test('SCISSORS should beat PAPER', () => {
  const rpsJudge = new RPSJudge()
  const result = rpsJudge.playerAWon('SCISSORS', 'PAPER')
  expect(result).toBe(1)
})

test('SCISSORS should lose to ROCK', () => {
  const rpsJudge = new RPSJudge()
  const result = rpsJudge.playerAWon('SCISSORS', 'ROCK')
  expect(result).toBe(0)
})

test('Same plays result to draw', () => {
  const rpsJudge = new RPSJudge()
  const result = rpsJudge.playerAWon('PAPER', 'PAPER')
  expect(result).toBe(-1)
})

test('Invalid key throws error', () => {
  const rpsJudge = new RPSJudge()
  const result = rpsJudge.playerAWon('ASD', 'PAPER')
  expect(result).toBe(SyntaxError)
})