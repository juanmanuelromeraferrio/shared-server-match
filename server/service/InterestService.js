var dao = require('../dao/InterestDao');
var utils = require('../utils/Utils');
var jsonValidator = require('../utils/JsonValidator');
var BadRequest = require("../error/BadRequest");
var NotFound = require("../error/NotFound");

/*
 * Retrieves an List of Interest
 * @param {Function} callback  The function to call when retrieval is complete.
 */
exports.getInterest = function(callback) {

  dao.getInterest(function(err, response) {
    if (err) {
      callback(err);
    } else {
      response.metadata = utils.getMetadata(response.interests.length);
      callback(null, response);
    }
  });
};


/**
 * Save Interest 
 * @param {Request} Request
 * @param {Function} callback  The function to call when retrieval is complete.
 */
exports.saveInterest = function(req, callback) {

  var isValid = jsonValidator.isInterestValid(req.body);

  if (!isValid) {
    callback(new BadRequest("Invalid interest's json format"));
    return;
  }

  var interest = {
    category: req.body.interest.category,
    value: req.body.interest.value
  }
  var self = this;
  self.existsInterest(interest, function(err, exists, response) {
    if (err) {
      callback(err);
    } else if (exists) {
      callback(new BadRequest("Interest " + JSON.stringify(response) + " already exists."));
    } else {
      dao.saveInterest(interest, function(err, response) {
        if (err) {
          callback(err);
        } else {
          callback(null);
        }
      });
    }
  });
};

/**
 * Exists Interest 
 * @param {Interest} interests  The Interests to see if exists.
 * @param {Function} callback  The function to call when retrieval is complete.
 */
exports.existsInterests = function(interests, callback) {
  var interestsNotFound = [];
  var error = null;
  var j = 0;
  var self = this;

  if(interests.length == 0)
  {
    callback(null, true, null);
    return;
  }

  for (i = 0; i < interests.length; i++) {
    var interest = interests[i];
    self.existsInterest(interest, function(err, exists, response) {
      j++;
      if (err) {
        error = err;
      } else if (!exists) {
        interestsNotFound.push(response);
      }
      //Termino de Consular todos los Intereses
      if (j == interests.length) {
        if (error) {
          callback(error);
        } else if (interestsNotFound.length == 0) {
          callback(null, true, null);
        } else {
          callback(null, exists, new NotFound("NotFound Interests: " + JSON.stringify(interestsNotFound)));
        }
      }
    });
  }
};

exports.existsInterest = function(interest, callback) {

  var isValid = jsonValidator.isSimpleInterestValid(interest);

  if (!isValid) {
    callback(new BadRequest("Invalid interest's json format"));
    return;
  }

  dao.existsInterest(interest, function(err, exists) {
    if (err) {
      callback(err);
    } else {
      callback(null, exists, interest);
    }
  });
}