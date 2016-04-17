var pg = require('pg');
var path = require('path');
var dbConnection = require(path.join(__dirname, '../', '../', 'config'));

console.log(dbConnection);

var client = new pg.Client(dbConnection);
client.connect();

var query = client.query('CREATE TABLE interest(id SERIAL PRIMARY KEY, category text, value text)');
query.on('end', function() { client.end(); });