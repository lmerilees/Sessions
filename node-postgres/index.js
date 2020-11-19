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
  
app.post('/getUsers', (req, res) => {
  sessions_model.getUsers(req.body)
  .then(response => {
      res.status(200).send(response);
   })
  .catch(error => {
      res.status(500).send(error);
  })
})

app.post('/getProfile', (req, res) => {
  sessions_model.getProfile(req.body)
  .then(response => {
      //console.log(response);
      res.status(200).send(response);
  })
  .catch(error => {
    console.log(error);
      res.status(500).send(error);
  })
})

app.post('/createUser', (req, res) => {
  console.log("/createUser")
  sessions_model.createUser(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/getSpots', (req, res) => {
  sessions_model.getSpots()
  .then(response => {
      res.status(200).send(response);
  })
  .catch(error => {
    console.log(error);
      res.status(500).send(error);
  })
})

app.post('/createSpot', (req, res) => {
  sessions_model.createSpot(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    //console.log(error);
    res.status(500).send(error);
  })
})

app.post('/modifyProfile', (req, res) => {
  sessions_model.modifyProfile(req.body)
  .then(response => {
    //console.log(response);
    res.status(200).send(response);
  })
  .catch(error => {
    console.log(error);
    res.status(500).send(error);
  })
})

app.post('/updateRep', (req, res) => {
  sessions_model.updateRep(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    console.log(error);
    res.status(500).send(error);
  })
})

app.post('/updateRating', (req, res) => {
  sessions_model.updateRating(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    console.log(error);
    res.status(500).send(error);
  })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

