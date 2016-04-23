/**
 * Retrieves Metadata
 */
 exports.getMetadata = function(size) {
 	console.log("size " + size);
 	var data = {
 		version: "0.1",
 		count: size
 	};

 	return data;
 };