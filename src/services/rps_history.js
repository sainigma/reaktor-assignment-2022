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
      this.cursor = page['cursor'].split('?')[1]        
    }
  }

  async fetchPage() {
    const page = await this.service.get(`${this.URI}?${this.cursor}`).then(response => response.json())
    await this.addPage(page)
  }
}

class DefaultService {
  constructor() {}

  async get(URL) {
    const result = await fetch(URL)
    return result
  }
}