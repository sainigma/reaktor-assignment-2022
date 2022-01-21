const rpsKeywords = ['SCISSORS','PAPER','ROCK']

class RPSJudge {
  constructor() {
    this._rpsEnumerator = new Map()
    this._rpsEnumerator.set(rpsKeywords[0], rpsKeywords[1])
    this._rpsEnumerator.set(rpsKeywords[1], rpsKeywords[2])
    this._rpsEnumerator.set(rpsKeywords[2], rpsKeywords[0])
  }

  static isPlayValid(played) {
    return rpsKeywords.includes(played)
  }

  getWinner(playedA, playedB) {
    if (!this._rpsEnumerator.has(playedA) || !this._rpsEnumerator.has(playedB)) {
      throw new SyntaxError(`unidentified hands: ${playedA} ${playedB}`)
    }
    if (playedA === playedB) {
      return -1
    } else if (this._rpsEnumerator.get(playedA) === playedB) {
      return 1
    }
    return 0
  }
}

module.exports = RPSJudge