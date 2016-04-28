/**
 * Retrieves Metadata
 */
exports.getMetadata = function(size) {
	var data = {
		version: "0.1",
		count: size
	};

	return data;
};


exports.isNormalInteger = function(number) {
  return /^(0|[1-9]\d*)$/.test(number);
}