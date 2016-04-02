var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var methodOverride  = require("method-override");
var pg = require('pg');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());


// Import Controllers
var usersCtrl = require('./controllers/users');

//Example Route
var router = express.Router();
router.get('/', function(req, res) {
  res.send("Hello world!");
});
app.use(router);

// API routes
var api = express.Router();

api.route('/users')
  .get(usersCtrl.getAllUsers);

app.use('/', api);

// Start server
app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});

