export class RPSHistory {
  constructor(URI, service = new DefaultService()) {
    this.URI = URI
    this.pages = []
    this.cursor = ''
    this.service = service
  }

  async addPage(page) {
    this.pages.push(page)
    if ('cursor' in page) {
      const newCursor = page['cursor'].split('?')[1]
      if (newCursor === undefined) {
        this.cursor = ''
      } else {
        this.cursor = newCursor
      }
    } else {
      this.cursor = ''
    }
  }

  async fetchPage() {
    const page = await this.service.get(`${this.URI}?${this.cursor}`).then(response => response.json())
    await this.addPage(page)
    return this.pages.at(-1)
  }
}

class DefaultService {
  constructor() {}

  async get(URL) {
    const result = await fetch(URL)
    return result
  }
}