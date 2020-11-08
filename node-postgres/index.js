const express = require('express')
const app = express()
const port = 3001

const sessions_model = require('./sessions_model')

app.use(express.json())

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
  });
  
app.get('/', (req, res) => {
    sessions_model.getUsers()
    .then(response => {
        res.status(200).send(response);
    })
    .catch(error => {
        console.log(error);
        res.status(500).send(error);
    })
})

  app.post('/users', (req, res) => {
    sessions_model.createUser(req.body)
    .then(response => {
      console.log(response);
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
  })



app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
