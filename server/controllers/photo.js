var express = require('express');
var path = require('path');
var pg = require('pg');
var dbConnection = require(path.join(__dirname, '../', '../', 'config'));


//GET - Return all interest in DB
exports.updatePhoto = function(req, res) {

  console.log('PUT /users/'+ req.params.id + '/photo');

  var photo = req.body.photo;
  if (typeof photo == 'undefined')
  {
      return res.sendStatus(400);
  }
  
  var parameters = {id: req.params.id, photo: photo}
  var user = [];

    // Get a Postgres client from the connection pool
    pg.connect(dbConnection, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("select data FROM users WHERE ID = $1 " , [parameters.id]);

        // Stream results back one row at a time
        query.on('row', function(row) {
          user.push(row.data);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
          if(user.length == 0){
              done();
              return res.status(500).json({ success: false, data: 'Usuario inexistente'});
          } else {

            var data = user[0];
            data.photo = parameters.photo;

            client.query("UPDATE users SET data = $1, update_time = $2 WHERE id = $3 RETURNING id", [data, new Date().toISOString(), parameters.id], function(err, result) {
            done();
                  if (err) {
                   console.log(err);
                   return res.status(500).json({ success: false, data: err});
                 } else {

                  if(result.rows.length == 0){
                     return res.status(500).json({ success: false, data: 'Usuario inexistente'});
                  } else {
                     console.log('User photo update with id: ' + result.rows[0].id);
                     return res.sendStatus(200);
                  }
                }
            });
          }


        });


      });

};