module.exports = {
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest"
  },
  collectCoverageFrom : ["src/**/*.js"],
  coverageThreshold: {
    "global": {
    "branches": 50,
    "functions": 50,
    "lines": 50,
    "statements": 50
    }
  }
};