var express = require('express');
var path = require('path');
var pg = require('pg');
var dbConnection = require(path.join(__dirname, '../', '../', 'config'));


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
