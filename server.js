var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/db');

app.use(bodyParser.urlencoded({ extended: true })); 

/************
  API Routes
*************/

var users = require('./app/routes/user');

app.use('/api/users', users);

// START THE SERVER
app.listen(8080);
