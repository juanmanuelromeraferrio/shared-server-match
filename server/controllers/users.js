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

          var user = {
            'user': "" 
          }

          var response = row.data;
          response.id = row.id;

          user.user = response;

          results.push(user);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
          done();

          var response = {
            'users': "" ,
            "metadata": {
              "version": "0.1"
            }
          }

          response.users = results;
          return res.json(response);
        });


      });
  };


//GET User by ID
exports.getUser = function(req, res) {

  console.log('GET /users/' + req.params.id);
  
  var data = {id: req.params.id}
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
        var query = client.query("select id, data FROM users WHERE ID = $1 " , [data.id]);

        // Stream results back one row at a time
        query.on('row', function(row) {
          var response = row.data;
          response.id = row.id;
          results.push(response);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
          done();

          if(results.length == 0){
              return res.status(500).json({ success: false, data: 'Usuario inexistente'});
          } else {
              var response = {
              'user': "",
              "metadata": {
                "version": "0.1"
              }
            }

            response.user = results[0];
            return res.json(response);
          }


        });


      });
  };

  //POST - Insert a new User in db
exports.saveUser = function(req, res) {
  console.log('POST /users');

    var user = req.body.user;
    if (typeof user == 'undefined')
    {
        return res.sendStatus(400);
    }

    // Grab data from http request
    var data = {data: user, insert_time: new Date().toISOString()};
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

          var user = data.data;
          user.id = result.rows[0].id;

          var response = {
              'user': "",
              "metadata": {
                "version": "0.1"
          }
        }

          response.user = user;

          return res.json(response);
        }
      });
      });
  };

//PUT - Update an user in db
exports.updateUser = function(req, res) {
    console.log('PUT /users/' + req.params.id);

    var user = req.body.user;
    if (typeof user == 'undefined')
    {
        return res.sendStatus(400);
    }

    // Grab data from http request
    var data = {data: user, update_time: new Date().toISOString(), id: req.params.id};
    // Get a Postgres client from the connection pool
    pg.connect(dbConnection, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        client.query("UPDATE users SET data = $1, update_time = $2 WHERE id = $3 RETURNING id", [data.data, data.update_time, data.id], function(err, result) {
            done();
            if (err) {
             console.log(err);
             return res.status(500).json({ success: false, data: err});
           } else {

            if(result.rows.length == 0){
               return res.status(500).json({ success: false, data: 'Usuario inexistente'});
            } else {
               console.log('User update with id: ' + result.rows[0].id);
               return res.sendStatus(200);
            }
          }
        });
      });
  };

  //PUT - Update an user in db
exports.deleteUser = function(req, res) {
    console.log('DELETE /users/' + req.params.id);

    // Grab data from http request
    var data = {id: req.params.id};
    // Get a Postgres client from the connection pool
    pg.connect(dbConnection, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        client.query("DELETE FROM users WHERE id = $1 RETURNING id", [data.id], function(err, result) {
            done();
            if (err) {
             console.log(err);
             return res.status(500).json({ success: false, data: err});
           } else {
            
            if(result.rows.length == 0){
               return res.status(500).json({ success: false, data: 'Usuario inexistente'});
            } else {
               console.log('User delete with id: ' + result.rows[0].id);
               return res.sendStatus(200);
            }
          }
        });
      });
  };