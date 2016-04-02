var express = require('express');
var path = require('path');
var pg = require('pg');
var dbConnection = require(path.join(__dirname, '../', '../', 'config'));


//GET - Return all users in DB
exports.getAllUsers = function(req, res) {

	console.log('GET /users');
	
	var results = [];

    // Grab data from http request
    var data = {text: req.body.text, complete: false};

    // Get a Postgres client from the connection pool
    pg.connect(dbConnection, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM users ORDER BY id ASC;");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });


    });
};