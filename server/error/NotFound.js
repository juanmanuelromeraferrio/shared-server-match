var sys = require('util'),

NotFound = function(message) {
    this.status = 500;
    this.message = message;
};

sys.inherits(NotFound, Error);

module.exports = NotFound;