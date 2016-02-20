var express    = require('express');   
var app        = express();         
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/db');

app.use(express.static(__dirname + '/public')); 

/************
  API Routes
*************/

var users = require('./app/routes/user');
var goals = require('./app/routes/goal');

app.use('/api/users', users);
app.use('/api/goals', goals);

// START THE SERVER
app.listen(8080);
