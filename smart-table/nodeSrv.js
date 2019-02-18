/*
  Node.js server
*/

var port = 8090;
if(process.argv.length == 3) {
  port = process.argv[2];
}

var http = require('http');
var fs = require('fs');
var url = require('url');
var util = require('./server/util.js');
var querystring = require('querystring');

http.createServer(function (req, res) {
  var pathname = url.parse(req.url).pathname;
  if(pathname === '/') {
    pathname = '/web/index.html';
  } else
  if(pathname !== '/index.html' ){
    pathname = '/web'+pathname;
  }

  if(pathname === '/web/createTable') {
    var query = querystring.parse(url.parse(req.url).query);
    console.log(query);
    var json = util.createTable(query.cols, query.rows, query.start);
    json = JSON.stringify(json);
    console.log(json);
    res.writeHead(200, {'Content-Type':'application/json'});
    res.write(json);
    res.end();
  } else {
    fs.readFile(pathname.substr(1), function (err, data) {
      if(err) {
        console.log(err);
        res.writeHead(404, {'Content-Type':'text/html'});
      } else {
        if(pathname.indexOf('.css') > 0) {
          res.writeHead(200, {'Content-Type':'text/css'});
        } else
        if(pathname.indexOf('.js') > 0) {
          res.writeHead(200, {'Content-Type':'application/javascript'});
        } else {
          res.writeHead(200, {'Content-Type':'text/html'});
        }
        res.write(data.toString());
      }
      res.end()
    });

  }
}).listen(port);

  console.log("NodeJs server listening at %s", port);
