var Validator = require('jsonschema').Validator;
var v = new Validator();

 // Interest
 var interestSchema = {
 	"id": "/SimpleInterest",
 	"type": "object",
 	"properties": {
 		"interest": {
 			"category": {"type": "string"},
 			"value": {"type": "string"},
 			"required": ["category", "value"]
 		}
 	},
 	"required": ["interest"]
 };

 // Photo
 var photoSchema = {
 	"id": "/SimplePhoto",
 	"type": "object",
 	"properties": {
 		"photo": {"type": "string"}
 	},
 	"required": ["photo"]
 };

  // Location
  var locationSchema = {
  	"id": "/SimpleLocation",
  	"type": "object",
  	"properties": {
  		"latitude": {"type": "string"},
  		"longitude": {"type": "string"}
  	},
  	"required": ["latitude","longitude"]
  };

  var userSchema = {
  	"id": "/SimpleUser",
  	"type": "object",
  	"properties": {
  		"user": {
  			"name": {"type": "string"},
  			"alias": {"type": "string"},
  			"email": {"type": "string"},
  			"photo": {"type": "string"},
  			"interests": {"type": "array", "items": { "type": "object", "properties": { "category": {"type": "string"}, "value": {"type": "string"}},"required": ["category", "value"]}},
  			"location": {"$ref": "/SimpleLocation"},
  			"required": ["name", "alias", "email", "interests", "location"]
  		}
  	},
  	"required": ["user"]
  };


  v.addSchema(interestSchema, '/SimpleInterest');
  v.addSchema(photoSchema, '/SimplePhoto');
  v.addSchema(userSchema, '/SimpleUser');
  v.addSchema(locationSchema, '/SimpleLocation');

  exports.isInterestValid = function(req) {
  	var valid = v.validate(req, interestSchema);
  	return valid.errors.length == 0;
  }

  exports.isPhotoValid = function(req) {
  	var valid = v.validate(req, photoSchema);
  	return valid.errors.length == 0;
  }

  exports.isUserValid = function(req) {
  	var valid = v.validate(req, userSchema);
  	return valid.errors.length == 0;
  }