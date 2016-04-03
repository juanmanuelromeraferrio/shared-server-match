var pg = require('pg');
var path = require('path');
var dbConnection = require(path.join(__dirname, '../', '../', 'config'));

console.log(dbConnection);

var client = new pg.Client(dbConnection);
client.connect();

var query = client.query('CREATE TABLE users(id SERIAL PRIMARY KEY, data JSONB, insert_time timestamp, update_time timestamp)');
query.on('end', function() { client.end(); });