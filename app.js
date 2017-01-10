const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
const API = require('./api/api');

app.set('port', (process.env.PORT || 5000));

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// Process application/json
app.use(bodyParser.json());

// Index route
app.get('/', function(req, res) {
    res.send('Hello, I will help you charge your car');
});

app.post('/messages', function(req, res){
  var message = req.query.message;
  API.process(message).then(function(reply){
    res.send(reply);
  }).catch(error){
    res.send(error);
  }
})

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'));
})
