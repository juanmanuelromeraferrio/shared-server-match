var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var methodOverride  = require("method-override");
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());


// Import Controllers
var usersCtrl = require('./server/controllers/users');

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
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
