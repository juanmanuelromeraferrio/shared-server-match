var userService = require('../service/UserService');
var errorHandler = require('../utils/ErrorHandler');

//GET - Return all users in DB
exports.getAllUsers = function(req, res) {

	console.log('GET /users');

  userService.getUsers(function(err,response) {
    if(err) {
      return errorHandler.throwError(res,err);
    }
    return res.json(response);
  });
};


//GET User by ID
exports.getUser = function(req, res) {

  console.log('GET /users/' + req.params.id);

  userService.getUser(req.params.id, function(err,response) {
    if(err) {
      return errorHandler.throwError(res,err);
    }
    return res.json(response);
  });
};

//POST - Insert a new User in db
exports.saveUser = function(req, res) {
  console.log('POST /users ' + JSON.stringify(req.body));
  userService.saveUser(req, function(err,response) {
    if(err) {
      return errorHandler.throwError(res,err);
    }
    return res.json(response);
  });
};

//PUT - Update an user in db
exports.updateUser = function(req, res) {
  console.log('PUT /users ' + JSON.stringify(req.body));

  userService.updateUser(req, function(err,response) {
    if(err) {
      return errorHandler.throwError(res,err);
    }
    return res.sendStatus(200);
  });
};

//DELETE - DELETE an user in db
exports.deleteUser = function(req, res) {
  console.log('DELETE /users/' + req.params.id);
  userService.deleteUser(req.params.id, function(err,response) {
    if(err) {
      return errorHandler.throwError(res,err);
    }
    return res.sendStatus(200);
  });
};

//PUT - Update Photo
exports.updatePhoto = function(req, res) {
  console.log('PUT /users/'+ req.params.id + '/photo');
  userService.updatePhoto(req, function(err,response) {
    if(err) {
      return errorHandler.throwError(res,err);
    }
    return res.sendStatus(200);
  });
};

//DELETE - deleteAll
exports.deleteAllUsers = function(req, res) {
  console.log('DELETE /users');
  userService.deleteAllUsers(function(err, response) {
    if (err) {
      return errorHandler.throwError(res, err);
    }
    return res.sendStatus(200);
  });
};