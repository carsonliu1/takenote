const db = require('../db.js')

module.exports = {
  getNotes: (cb) => {
    const q = `SELECT * FROM notes`
    db.query(q, (err, data) => {
      if (err) {
        cb(err)
      } else {
        cb(null, data)
      }
    })
  },
  submit: (body, cb) => {
    const { title, category, tagline, note } = body
    const q = `INSERT INTO notes (title, category, tagline, note) VALUES (?, ?, ?, ?)`
    db.query(q, [title, category, tagline, note], (err, data) => {
      if(err) {
        cb(err)
      } else [
        cb(null, data)
      ]
    })
  },
  statusUpdate: (id, status, cb) => {
    const q = `UPDATE notes SET status=? WHERE id=?`
    db.query(q, [status, id], (err, data) => {
      console.log(err)
      if(err) {
        cb(err)
      } else {
        cb(null, data)
      }
    })
  },
}