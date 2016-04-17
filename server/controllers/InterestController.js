var service = require('../service/InterestService');


//GET - Return all interest in DB
exports.getAllInterests = function(req, res) {

  console.log('GET /interests');
  
  service.getInterest(function(err,response) {
    if(err) {
      return res.status(500).json({ success: false, data: err});
    }

    return res.json(response);
  });
};

//POST - Insert a new Interest in db
exports.saveInterest = function(req, res) {
  console.log('POST /users');

  service.saveInterest(req, function(err,response) {
    if(err) {
      return res.status(500).json({ success: false, data: err});
    }

    return res.json(response);
  });
};
