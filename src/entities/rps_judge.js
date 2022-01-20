const rpsKeywords = ['SCISSORS','PAPER','ROCK']

export class RPSJudge {
  constructor(keywords = rpsKeywords) {
    this.rpsEnumerator = new Map()
    this._buildRPSEnumerator(keywords)
  }

  _buildRPSEnumerator(keywords) {
    for (let i = 0; i < keywords.length; i++) {
      const winsAgainst = i + 1 < keywords.length ? keywords[i + 1] : keywords[0]
      this.rpsEnumerator.set(keywords[i], winsAgainst)
    }
  }

  getWinner(playedA, playedB) {
    if (!this.rpsEnumerator.has(playedA) || !this.rpsEnumerator.has(playedB)) {
      return EvalError
    }
    if (playedA === playedB) {
      return -1
    } else if (this.rpsEnumerator.get(playedA) === playedB) {
      return 0
    }
    return 1
  }
}