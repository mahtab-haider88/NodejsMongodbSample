var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');

// Create the application.
var app = express();

// Add Middleware necessary for REST API's
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELTE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/hello', function(req, res, next){
  res.send('Hello World');
  next();
});
mongoose.connect('mongodb://localhost/meanapp');
mongoose.connection.once('open', function(){
  app.models = require('./models/index');

  var routes = require('./routes');
  _.each(routes, function(controller, route){
    app.use(route, controller(app, route));
  });
  console.log('listening on port 3000');
  app.listen(3000);
});
