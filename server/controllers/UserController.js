var service = require('../service/UserService');

//GET - Return all users in DB
exports.getAllUsers = function(req, res) {

	console.log('GET /users');

  service.getUsers(function(err,response) {
    if(err) {
      return res.status(500).json({ success: false, data: err});
    }
    return res.json(response);
  });
};


//GET User by ID
exports.getUser = function(req, res) {

  console.log('GET /users/' + req.params.id);

  service.getUser(req.params.id, function(err,response) {
    if(err) {
      return res.status(500).json({ success: false, data: err});
    }
    return res.json(response);
  });
};

//POST - Insert a new User in db
exports.saveUser = function(req, res) {
  console.log('POST /users');

  service.saveUser(req, function(err,response) {
    if(err) {
      return res.status(500).json({ success: false, data: err});
    }
    return res.json(response);
  });
};

//PUT - Update an user in db
exports.updateUser = function(req, res) {
  console.log('PUT /users/' + req.params.id);

  service.updateUser(req, function(err,response) {
    if(err) {
      return res.status(500).json({ success: false, data: err});
    }
    return res.sendStatus(200);
  });
};

//DELETE - DELETE an user in db
exports.deleteUser = function(req, res) {
  console.log('DELETE /users/' + req.params.id);
  service.deleteUser(req.params.id, function(err,response) {
    if(err) {
      return res.status(500).json({ success: false, data: err});
    }
    return res.sendStatus(200);
  });
};

//PUT - Update Photo
exports.updatePhoto = function(req, res) {
  console.log('PUT /users/'+ req.params.id + '/photo');
  service.updatePhoto(req, function(err,response) {
    if(err) {
      return res.status(500).json({ success: false, data: err});
    }
    return res.sendStatus(200);
  });
};