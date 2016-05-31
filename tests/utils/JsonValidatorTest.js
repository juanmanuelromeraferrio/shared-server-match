var chai = require('chai');
var expect = chai.expect;
var jsonValidator = require('../../server/utils/JsonValidator');

describe('JsonValidator', function() {

	it('isPhotoValid() - Json OK should return true', function() {
		var jsonPhoto = {
			photo: "base_64"
		};
		expect(jsonValidator.isPhotoValid(jsonPhoto)).to.equal(true);
	});

	it('isPhotoValid() without photo - Json FAIL should return false', function() {
		var jsonPhoto = {
			foto: "base_64"
		};
		expect(jsonValidator.isPhotoValid(jsonPhoto)).to.equal(false);
	});

	it('isPhotoValid() - Json FAIL should return false', function() {
		var jsonPhoto = {
			photo: "base_64",
			hola: "base_64"
		};
		expect(jsonValidator.isPhotoValid(jsonPhoto)).to.equal(false);
	});

	it('isInterestValid() - Json OK should return true', function() {
		var jsonInterest = {
			interest: {
				category: "music / band",
				value: "Los Piojos"
			}
		};
		expect(jsonValidator.isInterestValid(jsonInterest)).to.equal(true);
	});

	it('isInterestValid() without interest - Json FAIL should return false', function() {
		var jsonInterest = {
			intereses: {
				category: "music / band",
				value: "Los Piojos"
			}
		};
		expect(jsonValidator.isInterestValid(jsonInterest)).to.equal(false);
	});

	it('isInterestValid() without category - Json FAIL should return false', function() {
		var jsonInterest = {
			interest: {
				categoria: "music / band",
				value: "Los Piojos"
			}
		};
		expect(jsonValidator.isInterestValid(jsonInterest)).to.equal(false);
	});

	it('isInterestValid() without value - Json FAIL should return false', function() {
		var jsonInterest = {
			interest: {
				category: "music / band",
				valor: "Los Piojos"
			}
		};
		expect(jsonValidator.isInterestValid(jsonInterest)).to.equal(false);
	});

	it('isInterestValid() with other properties - Json FAIL should return false', function() {
		var jsonInterest = {
			interest: {
				category: "music / band",
				value: "Los Piojos",
				otros: "LP"
			}
		};
		expect(jsonValidator.isInterestValid(jsonInterest)).to.equal(false);
	});

	it('isUserValid() with photo - Json OK should return true', function() {
		var jsonUser = {
			user: {
				name: "Juan",
				alias: "kumaaa",
				email: "kumaaa",
				sex: "Masculino",
				age: "28",
				photo: "kumaaa",
				interests: [{
					category: "music / band",
					value: "Los Piojos",
					otros: "LP"
				}],
				location: {
					latitude: "212",
					longitude: "212"
				}
			}
		};
		expect(jsonValidator.isUserValid(jsonUser)).to.equal(true);
	});

	it('isUserValid() without photo - Json OK should return true', function() {
		var jsonUser = {
			user: {
				name: "Juan",
				alias: "kumaaa",
				email: "kumaaa",
				email: "kumaaa",
				sex: "Masculino",
				age: "28",
				interests: [{
					category: "music / band",
					value: "Los Piojos",
					otros: "LP"
				}],
				location: {
					latitude: "212",
					longitude: "212"
				}
			}
		};
		expect(jsonValidator.isUserValid(jsonUser)).to.equal(true);
	});

	it('isUserValid() without user - Json FAIL should return false', function() {
		var jsonUser = {
			usuario: {
				name: "Juan",
				alias: "kumaaa",
				email: "kumaaa",
				photo: "kumaaa",
				interests: [{
					category: "music / band",
					value: "Los Piojos",
					otros: "LP"
				}],
				location: {
					latitude: "212",
					longitude: "212"
				}
			}
		};
		expect(jsonValidator.isUserValid(jsonUser)).to.equal(false);
	});

	it('isUserValid() without name - Json FAIL should return false', function() {
		var jsonUser = {
			user: {
				nombre: "Juan",
				alias: "kumaaa",
				email: "kumaaa",
				photo: "kumaaa",
				interests: [{
					category: "music / band",
					value: "Los Piojos",
					otros: "LP"
				}],
				location: {
					latitude: "212",
					longitude: "212"
				}
			}
		};
		expect(jsonValidator.isUserValid(jsonUser)).to.equal(false);
	});

	it('isUserValid() without alias - Json FAIL should return true', function() {
		var jsonUser = {
			user: {
				name: "Juan",
				aliasas: "kumaaa",
				email: "kumaaa",
				interests: [{
					category: "music / band",
					value: "Los Piojos",
					otros: "LP"
				}],
				location: {
					latitude: "212",
					longitude: "212"
				}
			}
		};
		expect(jsonValidator.isUserValid(jsonUser)).to.equal(false);
	});

	it('isUserValid() without email - Json FAIL should return true', function() {
		var jsonUser = {
			user: {
				name: "Juan",
				alias: "kumaaa",
				emaila: "kumaaa",
				interests: [{
					category: "music / band",
					value: "Los Piojos",
					otros: "LP"
				}],
				location: {
					latitude: "212",
					longitude: "212"
				}
			}
		};
		expect(jsonValidator.isUserValid(jsonUser)).to.equal(false);
	});

	it('isUserValid() without interests - Json FAIL should return true', function() {
		var jsonUser = {
			user: {
				name: "Juan",
				alias: "kumaaa",
				email: "kumaaa",
				intereses: [{
					category: "music / band",
					value: "Los Piojos",
					otros: "LP"
				}],
				location: {
					latitude: "212",
					longitude: "212"
				}
			}
		};
		expect(jsonValidator.isUserValid(jsonUser)).to.equal(false);
	});

	it('isUserValid() without location - Json FAIL should return true', function() {
		var jsonUser = {
			user: {
				name: "Juan",
				alias: "kumaaa",
				email: "kumaaa",
				interests: [{
					category: "music / band",
					value: "Los Piojos",
					otros: "LP"
				}],
				locations: {
					latitude: "212",
					longitude: "212"
				}
			}
		};
		expect(jsonValidator.isUserValid(jsonUser)).to.equal(false);
	});

	it('isUserValid() without latitude - Json FAIL should return false', function() {
		var jsonUser = {
			user: {
				name: "Juan",
				alias: "kumaaa",
				email: "kumaaa",
				photo: "kumaaa",
				interests: [{
					category: "music / band",
					value: "Los Piojos"
				}],
				location: {
					latitudes: "212",
					longitude: "212"
				}
			}
		};
		expect(jsonValidator.isUserValid(jsonUser)).to.equal(false);
	});

	it('isUserValid() without longitude - Json FAIL should return false', function() {
		var jsonUser = {
			user: {
				name: "Juan",
				alias: "kumaaa",
				email: "kumaaa",
				photo: "kumaaa",
				interests: [{
					category: "music / band",
					value: "Los Piojos"
				}],
				location: {
					latitude: "212",
					longs: "212"
				}
			}
		};
		expect(jsonValidator.isUserValid(jsonUser)).to.equal(false);
	});


	it('isUserValid() location with other properties - Json FAIL should return false', function() {
		var jsonUser = {
			user: {
				name: "Juan",
				alias: "kumaaa",
				email: "kumaaa",
				photo: "kumaaa",
				interests: [{
					category: "music / band",
					value: "Los Piojos"
				}],
				location: {
					latitude: "212",
					longitude: "212",
					otros: "asds"
				}
			}
		};
		expect(jsonValidator.isUserValid(jsonUser)).to.equal(false);
	});

});