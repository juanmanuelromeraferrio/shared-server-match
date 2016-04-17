var path = require('path');
var pg = require('pg');
var dbConnection = require(path.join(__dirname, '../', '../', 'config'));

/**
 * Retrieves an List of User
 * @param {Function} callback  The function to call when retrieval is complete.
 */
 exports.getUsers = function(callback) {
  var results = [];
    // Get a Postgres client from the connection pool
    pg.connect(dbConnection, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          callback(err);
          return;
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
            "users": "" ,
          }
          response.users = results;
          callback(null, response);
        });
      });
  };


/**
 * Get a user by ID
 * @param {String} userID  User ID.
 * @param {Boolean} onlyData
 * @param {Function} callback  The function to call when retrieval is complete.
 */
 exports.getUser = function(userID,onlyData,callback) {
     var results = [];
    // Get a Postgres client from the connection pool
    pg.connect(dbConnection, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          callback(err);
          return;
        }

        // SQL Query > Select Data
        var query = client.query("select id, data FROM users WHERE ID = $1 " , [userID]);

        // Stream results back one row at a time
        query.on('row', function(row) {
          var response = row.data;
          if(!onlyData)
          {
            response.id = row.id;
          }
          results.push(response);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
          done();

          if(results.length == 0){
            callback(null,null);
          } else {
            var response = {
              'user': ""
            }
            response.user = results[0];
            callback(null,response);
          }
        });
      });
  };

/**
 * Save User 
 * @param {User} User to Persist
 * @param {Function} callback  The function to call when retrieval is complete.
 */
 exports.saveUser = function(user,callback) {

  pg.connect(dbConnection, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          callback(err);
          return;
        }

        client.query("INSERT INTO users(data, insert_time) values($1, $2) RETURNING id", [user, new Date().toISOString()], function(err, result) {
          done();
          if (err) {
           console.log(err);
           callback(err);
         } else {
          console.log('User inserted with id: ' + result.rows[0].id);

          var userResponse = user;
          userResponse.id = result.rows[0].id;

          var response = {
            'user': ""
          }

          response.user = userResponse;
          callback(null,response);
        }
      });
      });
};


/**
 * Update User 
 * @param {String} userID
 * @param {User} User to update
 * @param {Function} callback  The function to call when retrieval is complete.
 */
 exports.updateUser = function(userID, user, callback) {

    // Get a Postgres client from the connection pool
    pg.connect(dbConnection, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          callback(err);
          return;
        }

        client.query("UPDATE users SET data = $1, update_time = $2 WHERE id = $3 RETURNING id", [user, new Date().toISOString(), userID], function(err, result) {
          done();
          if (err) {
           console.log(err);
           callback(err);
         } else {

          if(result.rows.length == 0){
            callback(null,null);
          } else {
           console.log('User update with id: ' + result.rows[0].id);
           callback(null, user);
         }
       }
     });
  });
};


/**
 * Delete User 
 * @param {String} userID 
 * @param {Function} callback  The function to call when retrieval is complete.
 */
 exports.deleteUser = function(userID, callback) {

    // Get a Postgres client from the connection pool
    pg.connect(dbConnection, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          callback(err);
          return;
        }

        client.query("DELETE FROM users WHERE id = $1 RETURNING id", [userID], function(err, result) {
          done();
          if (err) {
           console.log(err);
           callback(err);
         } else {

          if(result.rows.length == 0){
            callback(null,null);
         } else {
            console.log('User delete with id: ' + result.rows[0].id);
            callback(null,userID);
         }
       }
     });
      });
  };