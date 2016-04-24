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