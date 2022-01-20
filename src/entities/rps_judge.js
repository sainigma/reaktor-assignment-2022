const rpsKeywords = ['SCISSORS','PAPER','ROCK']

export class RPSJudge {
  constructor(keywords = rpsKeywords) {
    this._rpsEnumerator = new Map()
    this._buildRPSEnumerator(keywords)
  }

  _buildRPSEnumerator(keywords) {
    for (let i = 0; i < keywords.length; i++) {
      const winsAgainst = i + 1 < keywords.length ? keywords[i + 1] : keywords[0]
      this._rpsEnumerator.set(keywords[i], winsAgainst)
    }
  }

  static isPlayValid(played) {
    return rpsKeywords.includes(played)
  }

  playerAWon(playedA, playedB) {
    if (!this._rpsEnumerator.has(playedA) || !this._rpsEnumerator.has(playedB)) {
      return SyntaxError
    }
    if (playedA === playedB) {
      return -1
    } else if (this._rpsEnumerator.get(playedA) === playedB) {
      return 1
    }
    return 0
  }
}