var sys = require('sys'),

BadRequest = function(message) {
    this.status = 400;
    this.message = message;
};

sys.inherits(BadRequest, Error);

module.exports = BadRequest;