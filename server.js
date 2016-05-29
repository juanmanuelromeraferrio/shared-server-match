var express = require("express");
var cors = require("cors");
var path = require("path");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(methodOverride());
app.use(cors());

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

// Import Controllers
var usersCtrl = require('./server/controllers/UserController');
var interestCtrl = require('./server/controllers/InterestController');

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.get('/', function(req, res, next) {
	res.send("Shared Server Match Api Restful");
});

app.get('/users', function(req, res, next) {
	usersCtrl.getAllUsers(req, res);
});

app.post('/users', function(req, res, next) {
	usersCtrl.saveUser(req, res);
});

app.get('/users/:id', function(req, res, next) {
	usersCtrl.getUser(req, res);
});

app.put('/users/:id', function(req, res, next) {
	usersCtrl.updateUser(req, res);
});

app.delete('/users/:id', function(req, res, next) {
	usersCtrl.deleteUser(req, res);
});

app.put('/users/:id/photo', function(req, res, next) {
	usersCtrl.updatePhoto(req, res);
});

app.get('/interests', function(req, res, next) {
	interestCtrl.getAllInterests(req, res);
});

app.post('/interests', function(req, res, next) {
	interestCtrl.saveInterest(req, res);
});


// Start server
app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});
