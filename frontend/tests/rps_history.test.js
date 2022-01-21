import { RPSHistory } from "../src/services/rps_history";
import * as history from "../tests/dummy_data/history.json";

let lastURL = ''

class mockService {
  constructor() {}

  async get(URL) {
    lastURL = URL
    return {
      json:()=>{return history}
    }
  }
}

test('service loads pages and moves cursor', async() => {
  const firstCursor = history.cursor.split('?')[1]
  const rpsHistory = new RPSHistory('dummy', new mockService())
  await rpsHistory.fetchPage()

  expect(rpsHistory.pages.length).toBe(1)
  expect(rpsHistory.cursor).toBe(firstCursor)
  
  history.cursor = "/rps/history?=new"
  await rpsHistory.fetchPage()

  expect(rpsHistory.pages.length).toBe(2)
  expect(rpsHistory.cursor).toBe('=new')
  expect(lastURL).toBe(`dummy?${firstCursor}`)
})