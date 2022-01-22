const GamesRepository = require("../repositories/games_repository");
const { Connection } = require("../utils/db_connection");

const connection = new Connection('./dummy_gamesrepo.db')
let gamesRepository

beforeEach(async() => {
  await connection.purge()
  await connection.init()
  gamesRepository = new GamesRepository(connection)
})

test('games are added', async () => {
  const result = await gamesRepository.addGame('testi', ['henkilö1', 'henkilö2'])
  expect(result).toBe(true)

  const hasGame = await gamesRepository.hasGame('testi')
  expect(hasGame).toBe(true)
})

test('game cannot be added twice', async () => {
  let result = await gamesRepository.addGame('testi', ['henkilö1', 'henkilö2'])
  expect(result).toBe(true)
  
  result = await gamesRepository.addGame('testi', ['henkilö1', 'henkilö2'])
  expect(result).toBe(false)

  const hasGame = await gamesRepository.hasGame('testi')
  expect(hasGame).toBe(true)
})

test('results cannot be added if an ongoing game does not exists', async () => {
  let result = await gamesRepository.addResult('testi', ['SCISSOR', 'ROCK'], ['henkilö1', 'henkilö2'], 1, 1231234124)
  expect(result).toBe(false)
})

test('players are added', async () => {
  await gamesRepository.addPlayer('Testi Henkilö')
  const result = await gamesRepository.getPlayer('Testi Henkilö')
  expect(result.length).toBe(1)
  expect(result[0].id).toBe('Testi Henkilö')
})

afterAll(async() => {
  connection.purge()
})