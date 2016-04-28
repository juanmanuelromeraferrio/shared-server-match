var config = require('../../package.json');

/**
 * Retrieves Metadata
 */
exports.getMetadata = function(size) {
	var data = {
		version: config.version,
		count: size
	};

	return data;
};


exports.isNormalInteger = function(number) {
  return /^(0|[1-9]\d*)$/.test(number);
}