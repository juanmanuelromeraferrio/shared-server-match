var dao = require('../dao/UserDao');
var utils = require('../utils/Utils');
var BadRequest = require("../error/BadRequest");
var NotFound = require("../error/NotFound");

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

    //Valido Request
    var user = req.body.user;
    if (typeof user == 'undefined')
    {
      callback(new BadRequest("Invalid User"));
      return;
    }

    dao.saveUser(user, function(err,response) {
      if(err) {
        callback(err);
      } else {
        callback(response);
      }
    });
  };

  exports.updateUser = function(req,callback) {

    var id = req.params.id;

    //Valido Request
    var user = req.body.user;
    if (typeof user == 'undefined')
    {
      callback(new BadRequest("Invalid User"));
      return;
    }

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

  var userID = req.params.id;
  var photo = req.body.photo;

  if (typeof photo == 'undefined')
  {
    callback(new BadRequest("Invalid Photo"));
  }

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