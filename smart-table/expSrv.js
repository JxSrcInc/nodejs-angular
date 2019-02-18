/*
  Node.js server
*/

var port = 8090;
if(process.argv.length == 3) {
  port = process.argv[2];
}

var express = require('express');
var util = require('./server/util.js');

var app = express();
app.use(express.static('web'));

app.get('/', function (req, res) {
  console.log(__dirname + "/web/index.html" );
   res.sendFile( __dirname + "/web/index.html" );
});

app.get('/createTable', function (req, res) {
  console.log("createTable --------------------------------");
  console.log("request: cols=%s, rows=%s, start=%s", req.query.cols, req.query.rows, req.query.start);
  var json = util.createTable(req.query.cols, req.query.rows, req.query.start);
  console.log("response: %s", JSON.stringify(json));
  res.send(json);
});

var server = app.listen(port, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("app listening at http://%s:%s", host, port)

});
