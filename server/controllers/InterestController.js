var service = require('../service/InterestService');
var errorHandler = require('../utils/ErrorHandler');


//GET - Return all interest in DB
exports.getAllInterests = function(req, res) {

  console.log('GET /interest');
  
  service.getInterest(function(err,response) {
    if(err) {
      return errorHandler.throwError(res,err);
    }

    return res.json(response);
  });
};

//POST - Insert a new Interest in db
exports.saveInterest = function(req, res) {

console.log('POST /interest');

  service.saveInterest(req, function(err,response) {
    if(err) {
      return errorHandler.throwError(res,err);
    }

    return res.json(response);
  });
};
