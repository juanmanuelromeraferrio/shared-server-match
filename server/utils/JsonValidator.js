var Validator = require('jsonschema').Validator;
var v = new Validator();

// Interest
var interestSchema = {
  "id": "/CompleteInterest",
  "type": "object",
  "properties": {
    "interest": {
      "$ref": "/SimpleInterest"
    }
  },
  "maxProperties": 1,
  "required": ["interest"]
};

var interestSimpleSchema = {
  "id": "/SimpleInterest",
  "type": "object",
  "properties": {
    "category": {
      "type": "string"
    },
    "value": {
      "type": "string"
    }
  },
  "maxProperties": 2,
  "required": ["category", "value"]
};

// Photo
var photoSchema = {
  "id": "/SimplePhoto",
  "type": "object",
  "properties": {
    "photo": {
      "type": "string"
    }
  },
  "maxProperties": 1,
  "required": ["photo"]
};

// Location
var locationSchema = {
  "id": "/SimpleLocation",
  "type": "object",
  "properties": {
    "latitude": {
      "type": "string"
    },
    "longitude": {
      "type": "string"
    }
  },
  "maxProperties": 2,
  "required": ["latitude", "longitude"]
};

var userSchema = {
  "id": "/SimpleUser",
  "type": "object",
  "properties": {
    "user": {
      "name": {
        "type": "string"
      },
      "alias": {
        "type": "string"
      },
      "email": {
        "type": "string"
      },
      "photo": {
        "type": "string"
      },
      "interests": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "$ref": "/SimpleInterest"
          }
        }
      },
      "location": {
        "$ref": "/SimpleLocation"
      },
      "maxProperties": 6,
      "required": ["name", "alias", "email", "interests", "location"]
    }
  },
  "maxProperties": 1,
  "required": ["user"]
};


v.addSchema(interestSchema, '/CompleteInterest');
v.addSchema(interestSimpleSchema, '/SimpleInterest');
v.addSchema(photoSchema, '/SimplePhoto');
v.addSchema(userSchema, '/SimpleUser');
v.addSchema(locationSchema, '/SimpleLocation');

exports.isInterestValid = function(req) {
  var valid = v.validate(req, interestSchema);
  return valid.errors.length == 0;
}

exports.isSimpleInterestValid = function(req) {
  var valid = v.validate(req, interestSimpleSchema);
  return valid.errors.length == 0;
}

exports.isPhotoValid = function(req) {
  var valid = v.validate(req, photoSchema);
  return valid.errors.length == 0;
}

exports.isUserValid = function(req) {
  var valid = v.validate(req, userSchema);
  if (valid.errors.length == 0) {
    var valid = v.validate(req.user.location, locationSchema);
    return valid.errors.length == 0;
  }

  return false;
}