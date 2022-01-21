const fs = require('fs')
const { Connection } = require("../utils/db_connection");

const connection = new Connection('./dummy.db')

beforeEach(async() => {
  await connection.purge()
  await connection.init()
})

test('db is initialized', async () => {
  query = "select name from sqlite_schema where type = 'table' and name not like 'sqlite_%'"
  const result = await connection.query(query)
  expect(result).toEqual([ { name: 'Games' }, { name: 'Results' }, { name: 'Players' } ])
})

test('insertation works', async () => {
  let query = "create table Testing (id integer primary key, value1 integer, value2 text);"
  await connection.query(query)

  query = 'insert into Testing (value1, value2) values (?, ?);'
  await connection.query(query, [213, 'testing'])

  query = "select * from Testing;"
  const result = await connection.query(query)

  expect(result).toEqual([{id:1, value1: 213, value2: 'testing'}])
})

afterAll(() => {
  connection.purge()
})