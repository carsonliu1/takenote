const express = require('express');
const { getNotes, submit, statusUpdate } = require('./models/noteModel.js')
//const db = FILL_ME_IN

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(__dirname + '/../client/dist'));

app.listen(port, (req, res) => {
  console.log(`Listening on port ${port}`);
});

app.get('/api/notes', (req, res) => {
  getNotes((err, data) => {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(200).json(data)
    }
  })
});

app.post('/api/notes', (req, res) => {
  submit(req.body, (err, data) => {
    if(err) {
      res.status(400).send('Unable to save')
    } else {
      getNotes((err, data2) => {
        if(err) {
          res.status(400).send('unable to retrieve')
        } else {
          res.status(200).json(data2)
        }
      })
    }
  })
})

app.patch('/api/notes/:id', (req, res) => {
  statusUpdate(req.params.id, req.body.status, (err, data) => {
    if(err) {
      res.status(400).send('unable to update status')
    } else {
      getNotes((err, data2) => {
        if(err) {
          res.status(400).send('unable to retrieve updated data')
        } else {
          res.status(200).json(data2)
        }
      })
    }
  })
})