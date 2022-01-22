const { objectHasKeys } = require("../utils/validation")

const playerDataKeys = ['name', 'played']

class Player {
  constructor() {}

  static isDataValid = (playerData, keys = 2) => {
    if (keys == 2) {
      return objectHasKeys(playerData, playerDataKeys)
    }
    return objectHasKeys(playerData, [playerDataKeys[0]])
  }
}

module.exports = Player