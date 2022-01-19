export class RPSHistory {
  constructor(URI) {
    this.URI = URI
    this.pages = []
    this.pagesToFetch = 0
    this.cursor = ''
    this.fetchPages(3)
  }

  addPage(response) {
    try {
      const page = JSON.parse(response)
      this.pages.push(page)
      if ('cursor' in page) {
        this.cursor = page['cursor'].split('?')[1]
        setTimeout(()=>{
          this.fetchPage()
        }, 100)
        
      }
    } catch {
      return
    }
  }

  fetchPage() {
    if (this.pagesToFetch == 0) {
      return
    }
    
    jsonRequest(`${this.URI}?${this.cursor}`, this.addPage.bind(this))
    this.pagesToFetch -= 1
  }

  fetchPages(pages) {
    this.pagesToFetch = pages
    this.fetchPage()
  }
}

export const jsonRequest = (URL, next) => {
  let http = new XMLHttpRequest()
  http.withCredentials = true
  http.addEventListener('load', (event) => {
    next(event.target.response)
  })
  http.open("GET", URL)
  http.setRequestHeader("Content-Type", "application/json")
  http.send()
}