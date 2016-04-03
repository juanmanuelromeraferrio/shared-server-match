var express = require('express');
var path = require('path');
var pg = require('pg');
var dbConnection = require(path.join(__dirname, '../', '../', 'config'));


//GET - Return all users in DB
exports.getAllUsers = function(req, res) {

	console.log('GET /users');
	
	var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(dbConnection, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("select id, data FROM users ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
          var response = row.data;
          response.id = row.id;
          results.push(response);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
          done();
          return res.json(results);
        });


      });
  };

//POST - Insert a new User in db
exports.saveUser = function(req, res) {
  console.log('POST /users');


    // Grab data from http request
    var data = {data: req.body, insert_time: new Date().toISOString()};

    console.log(data);

    // Get a Postgres client from the connection pool
    pg.connect(dbConnection, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

      client.query("INSERT INTO users(data, insert_time) values($1, $2) RETURNING id", [data.data, data.insert_time], function(err, result) {
          done();
          if (err) {
           console.log(err);
           return res.status(500).json({ success: false, data: err});
         } else {
          console.log('User inserted with id: ' + result.rows[0].id);
          return res.sendStatus(200);
        }
      });
      });
  };