var dao = require('../dao/UserDao');
var utils = require('../utils/Utils');
var BadRequest = require("../error/BadRequest");
var NotFound = require("../error/NotFound");
var jsonValidator = require('../utils/JsonValidator');

exports.getUsers = function(callback) {

  dao.getUsers(function(err,response) {
   if(err) {
    callback(err);
  } else {
    response.metadata = utils.getMetadata();
    callback(null, response);
  }
});

};


exports.getUser = function(userID,callback) {
  dao.getUser(userID,false,function(err,response) {
   if(err) {
    callback(err);
  } else if (response){
    response.metadata = utils.getMetadata();
    callback(null, response);
  } else {
    callback(new NotFound("Usuario Inexistente"));
  }
});
};

exports.saveUser = function(req,callback) {

  var isValid = jsonValidator.isUserValid(req.body);

  if(!isValid)
  {
    callback(new BadRequest("Invalid User"));
    return;
  }

  var user = req.body.user;
  dao.saveUser(user, function(err,response) {
    if(err) {
      callback(err);
    } else {
      callback(null,response);
    }
  });
};

exports.updateUser = function(req,callback) {

  var id = req.params.id;
  var isValid = jsonValidator.isUserValid(req.body);

  if(!isValid)
  {
    callback(new BadRequest("Invalid User"));
    return;
  }

  var user = req.body.user;
  dao.updateUser(id, user, function(err,response) {
    if(err) {
      callback(err);
    } else if (response) {
      callback(null,null);
    } else {
      callback(new NotFound("Usuario Inexistente"));
    }
  });
};

exports.deleteUser = function(userID,callback) {
  dao.deleteUser(userID,function(err,response) {
   if(err) {
    callback(err);
  } else if (response){
    callback(null,null);
  } else {
    callback(new NotFound("Usuario Inexistente"));
  }
});
};

exports.updatePhoto = function(req,callback) {

  var isValid = jsonValidator.isPhotoValid(req.body);
  console.log("udpdatePhotoValid " + isValid);

  if(!isValid)
  {
    callback(new BadRequest("Invalid Photo"));
    return;
  }

  var userID = req.params.id;
  var photo = req.body.photo;

  dao.getUser(userID,true,function(err,response) {
   if(err) {
    callback(err);
  } else if (response){
    
    var user = response.user;
    user.photo = photo;

    dao.updateUser(userID, user, function(err,response) {
      if(err) {
        callback(err);
      } else if (response) {
        callback(null,null);
      } else {
        callback(new NotFound("Usuario Inexistente"));
      }
    });
  } else {
    callback(new NotFound("Usuario Inexistente"));
  }
});
};