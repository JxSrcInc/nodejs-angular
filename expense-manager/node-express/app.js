var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
 
var users = require('./routes/users');
var transactions = require('./routes/transactions');
var categories = require('./routes/categories');
var app = express();
 
app.use(bodyParser.json());
/* content-type = text/plain
app.use(bodyParser.text());
*/
// content-type = application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
/* if not use proxy
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
*/
//app.use('/api/v1/users', users);
app.use('/api/v1/transactions',transactions);
app.use('/api/v1/categories',categories);
 
module.exports = app;
 