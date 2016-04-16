var path = require('path');
var pg = require('pg');
var dbConnection = require(path.join(__dirname, '../', '../', 'config'));

/**
 * Retrieves an List of Interest
 * @param {Function} callback  The function to call when retrieval is complete.
 */
 exports.getInterest = function(callback) {
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
          }

          response.interests = results;
          callback(null, response);
        });
      });
  };


/**
 * Save Interest 
 * @param {Interest} Interest to Persist
 * @param {Function} callback  The function to call when retrieval is complete.
 */
 exports.saveInterest = function(interest,callback) {
  pg.connect(dbConnection, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          callback(err);
          return;
        }

        client.query("INSERT INTO interest(category, value) values($1, $2) RETURNING id", [interest.category, interest.value], function(err, result) {
          done();
          if (err) {
           console.log(err);
           callback(err);
         } else {
          console.log('Interest inserted with id: ' + result.rows[0].id);
          callback(null);
        }
      });
      });

};