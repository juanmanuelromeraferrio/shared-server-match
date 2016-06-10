var dao = require('../dao/UserDao');
var utils = require('../utils/Utils');
var BadRequest = require("../error/BadRequest");
var NotFound = require("../error/NotFound");
var jsonValidator = require('../utils/JsonValidator');
var utils = require('../utils/Utils');
var interestService = require('../service/InterestService');

exports.getUsers = function(callback) {

  dao.getUsers(function(err, response) {
    if (err) {
      callback(err);
    } else {
      response.metadata = utils.getMetadata(response.users.length);
      callback(null, response);
    }
  });

};


exports.getUser = function(userID, callback) {

  var isUserValid = utils.isNormalInteger(userID);

  if (!isUserValid) {
    callback(new BadRequest("Invalid user ID"));
    return;
  }

  dao.getUser(userID, false, function(err, response) {
    if (err) {
      callback(err);
    } else if (response) {
      response.metadata = utils.getMetadata(1);
      callback(null, response);
    } else {
      callback(new NotFound("Usuario Inexistente"));
    }
  });
};

exports.getPhoto = function(userID, callback) {

  var isUserValid = utils.isNormalInteger(userID);

  if (!isUserValid) {
    callback(new BadRequest("Invalid user ID"));
    return;
  }

  dao.getUser(userID, false, function(err, response) {
    if (err) {
      callback(err);
    } else if (response) {
      var photoResponse = {
        "photo": "",
      }
      if (response.user.photo) {
        photoResponse.photo = response.user.photo;
      }
      callback(null, photoResponse);
    } else {
      callback(new NotFound("Usuario Inexistente"));
    }
  });
};

exports.saveUser = function(req, callback) {

  var isValid = jsonValidator.isUserValid(req.body);

  if (!isValid) {
    callback(new BadRequest("Invalid user's json format"));
    return;
  }

  //Check intests valid
  interestService.existsInterests(req.body.user.interests, function(err, exists, response) {
    if (err) {
      callback(err);
    } else if (!exists) {
      callback(response);
    } else {
      var user = req.body.user;
      dao.saveUser(user, function(err, response) {
        if (err) {
          callback(err);
        } else {
          callback(null, response);
        }
      });
    }
  });


};

exports.updateUser = function(req, callback) {

  var id = req.params.id;

  var isUserValid = utils.isNormalInteger(id);

  if (!isUserValid) {
    callback(new BadRequest("Invalid user ID"));
    return;
  }

  var isValid = jsonValidator.isUserValid(req.body);

  if (!isValid) {
    callback(new BadRequest("Invalid user's json format"));
    return;
  }

  //Check intests valid
  interestService.existsInterests(req.body.user.interests, function(err, exists, response) {
    if (err) {
      callback(err);
    } else if (!exists) {
      callback(response);
    } else {
      var user = req.body.user;
      dao.updateUser(id, user, function(err, response) {
        if (err) {
          callback(err);
        } else if (response) {
          callback(null, null);
        } else {
          callback(new NotFound("Usuario Inexistente"));
        }
      });
    }
  });
};

exports.deleteUser = function(userID, callback) {

  var isUserValid = utils.isNormalInteger(userID);

  if (!isUserValid) {
    callback(new BadRequest("Invalid user ID"));
    return;
  }

  dao.deleteUser(userID, function(err, response) {
    if (err) {
      callback(err);
    } else if (response) {
      callback(null, null);
    } else {
      callback(new NotFound("Usuario Inexistente"));
    }
  });
};

exports.updatePhoto = function(req, callback) {

  var userID = req.params.id;
  var isUserValid = utils.isNormalInteger(userID);

  if (!isUserValid) {
    callback(new BadRequest("Invalid user ID"));
    return;
  }

  var isValid = jsonValidator.isPhotoValid(req.body);
  console.log("udpdatePhotoValid " + isValid);

  if (!isValid) {
    callback(new BadRequest("Invalid photo's json format"));
    return;
  }

  var photo = req.body.photo;

  dao.getUser(userID, true, function(err, response) {
    if (err) {
      callback(err);
    } else if (response) {

      var user = response.user;
      user.photo = photo;

      dao.updateUser(userID, user, function(err, response) {
        if (err) {
          callback(err);
        } else if (response) {
          callback(null, null);
        } else {
          callback(new NotFound("Usuario Inexistente"));
        }
      });
    } else {
      callback(new NotFound("Usuario Inexistente"));
    }
  });
};

/*
 * Delete all users
 * @param {Function} callback  The function to call when retrieval is complete.
 */
exports.deleteAllUsers = function(callback) {
  dao.deleteAllUsers(function(err, response) {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
};