var pg = require('pg');
var path = require('path');
var dbConnection = require(path.join(__dirname, '../', '../', 'config'));

console.log(dbConnection);

var client = new pg.Client(dbConnection);
client.connect();
var query = client.query('CREATE TABLE users(id SERIAL PRIMARY KEY, text VARCHAR(1000) not null, isDelete BOOLEAN)');
query.on('end', function() { client.end(); });