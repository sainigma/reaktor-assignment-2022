import { RPSJudge } from "../src/entities/rps_judge";

test('SCISSORS should beat PAPER', () => {
  const rpsJudge = new RPSJudge()
  console.log(rpsJudge.rpsEnumerator)
  const result = rpsJudge.getWinner('SCISSORS', 'PAPER')
  expect(result).toBe(0)
})

test('SCISSORS should lose to ROCK', () => {
  const rpsJudge = new RPSJudge()
  const result = rpsJudge.getWinner('SCISSORS', 'ROCK')
  expect(result).toBe(1)
})

test('Same plays result to draw', () => {
  const rpsJudge = new RPSJudge()
  const result = rpsJudge.getWinner('PAPER', 'PAPER')
  expect(result).toBe(-1)
})

test('Invalid key throws error', () => {
  const rpsJudge = new RPSJudge()
  const result = rpsJudge.getWinner('ASD', 'PAPER')
  expect(result).toBe(EvalError)
})