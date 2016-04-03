var express = require('express');
var path = require('path');
var pg = require('pg');
var dbConnection = require(path.join(__dirname, '../', '../', 'config'));


//GET - Return all interest in DB
exports.getAllInterests = function(req, res) {

  console.log('GET /interests');
  
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
        var query = client.query("select category,value FROM interest ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
          results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
          done();

          var response = {
            "interests": "" ,
            "metadata": {
              "version": "0.1",
              "count": 3
            }
          }

          response.interests = results;
          return res.json(response);
        });


      });
  };


  //POST - Insert a new Interest in db
exports.saveInterest = function(req, res) {
  console.log('POST /users');

    var interest = req.body.interest;
    if (typeof interest == 'undefined')
    {
        return res.sendStatus(400);
    }

    // Grab data from http request
    var data = {category: interest.category , value: interest.value}
    // Get a Postgres client from the connection pool
    pg.connect(dbConnection, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

      client.query("INSERT INTO interest(category, value) values($1, $2) RETURNING id", [data.category, data.value], function(err, result) {
          done();
          if (err) {
           console.log(err);
           return res.status(500).json({ success: false, data: err});
         } else {
          console.log('Interest inserted with id: ' + result.rows[0].id);
          return res.sendStatus(200);
        }
      });
      });
  };
