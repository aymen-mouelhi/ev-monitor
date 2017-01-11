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

app.use('/',express.static('./public'));

app.get('/api', function(req, res) {
    res.send('EVlink Charging Station API');
});

app.post('api/messages', function(req, res){
  var input = req.query.input;
  var intent = req.query.intent;
  API.process(input, intent).then(function(reply){
    res.send(reply);
  }).catch(function(error){
    res.send(error);
  });
});

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'));
})
