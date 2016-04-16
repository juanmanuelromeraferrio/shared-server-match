var dao = require('../dao/InterestDao');
var utils = require('../utils/Utils');
var BadRequest = require("../error/BadRequest");

/*
 * Retrieves an List of Interest
 * @param {Function} callback  The function to call when retrieval is complete.
 */
 exports.getInterest = function(callback) {

 	dao.getInterest(function(err,response) {
 		if(err) {
 			callback(err);
 		} else {
 			response.metadata = utils.getMetadata();
 			callback(null, response);
 		}
 	});
 };


/**
 * Save Interest 
 * @param {Request} Request
 * @param {Function} callback  The function to call when retrieval is complete.
 */
 exports.saveInterest = function(req,callback) {

  	//Valido Request
  	var interest = req.body.interest;
  	if (typeof interest == 'undefined')
  	{
  		callback(new BadRequest("Invalid Interest"));
  		return;
  	}

  	var interest = {category: interest.category , value: interest.value}

  	dao.saveInterest(interest, function(err,response) {
  		if(err) {
  			callback(err);
  		} else {
  			callback(null);
  		}


  	});
  };