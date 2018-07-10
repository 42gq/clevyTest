// Load HTTP module
var http = require("http");
// var express = require('express');
// var router = express.Router();

// // Create HTTP server and listen on port 8000 for requests
// http.createServer(function(request, response) {

//    // Set the response HTTP header with HTTP status and Content type
//    response.writeHead(200, {'Content-Type': 'text/plain'});
   
//    // Send the response body "Hello World"
   
//     response."../index.html");
//     response.end();})
//     .listen(8000);
// // Print URL for accessing server
// console.log('Server running at http://127.0.0.1:8000/');

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.set('port', (process.env.PORT || 8000));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
var router = express.Router();
var path = require('path');

app.set('view engine', 'html');
// customizing the behavior of router.param()
router.param(function(param, option) {
  return function (req, res, next, val) {
    if (val == option) {
      next();
    }
    else {
      res.sendStatus(403);
    }
  }
});

// route to trigger the capture
router.get('/', function (req, res) {
    res.render(path.join(__dirname + '/index.html'));
    // res.send('OK');
});

// route to trigger the capture
router.get('/user/:id', function (req, res) {
  res.send('OK');
});

app.use(router);

app.listen(8000, function () {
  console.log('Ready');
});