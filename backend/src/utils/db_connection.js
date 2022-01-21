const fs = require('fs')
const sqlite3 = require('@vscode/sqlite3')

class Connection {
  constructor(dbpath = './app.db') {
    this.dbpath = dbpath
  }

  purge() {
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(this.dbpath)) {
        resolve()
      }
      fs.unlinkSync(this.dbpath)
      if (!fs.existsSync(this.dbpath)) {
        resolve()
      }
      reject()
    })
  }

  init() {
    return new Promise((resolve, reject) => {
      if (fs.existsSync(this.dbpath)) {
        reject('already initialized')
      }
      try {
        const db = new sqlite3.Database(this.dbpath)
        const queries = fs.readFileSync('./src/create.sql', 'utf8').toString().replace('\r','').split('\n')

        db.serialize(() => {
          db.run('PRAGMA foreign_keys=OFF;')
          db.run('BEGIN TRANSACTION;')
          queries.forEach((query) => {
            db.run(query, (err) => {
              if(err) {
                reject(err)
              }
            })
          })
          db.run('COMMIT;', (err) => {
            if (err) {
              reject(err)
            } else {
              resolve()
            }
          })
        })
        db.close()
      } catch (err) {
        reject(err)
      }
    })
  }

  query(sql, params = []) {
    return new Promise((resolve, reject) => {
      try {
        const db = new sqlite3.Database(this.dbpath)
        db.all(sql, params, (err, rows) => {
          if (err) {
            reject()
          } else {
            resolve(rows)
          }
        })

        db.close()
      } catch (error) {
        reject()
      }
    })
  }
}

module.exports = {
  connectionSingleton: new Connection(),
  Connection
}