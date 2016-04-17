var chai = require('chai');
var expect = chai.expect;
var jsonValidator = require('../../server/utils/JsonValidator');

describe('JsonValidator', function() {

	it('isPhotoValid() - Json OK should return true', function() {
		var jsonPhoto = {photo: "base_64"};
		expect(jsonValidator.isPhotoValid(jsonPhoto)).to.equal(true);
	});

	it('isPhotoValid() - Json FAIL should return false', function() {
		var jsonPhoto = {foto: "base_64"};
		expect(jsonValidator.isPhotoValid(jsonPhoto)).to.equal(false);
	});

	it('isPhotoValid() - Json FAIL should return false', function() {
		var jsonPhoto = {photo: "base_64", hola: "base_64"};
		expect(jsonValidator.isPhotoValid(jsonPhoto)).to.equal(false);
	});

	it('isInterestValid() - Json OK should return true', function() {
		var jsonInterest = {interest: {category: "music / band", value: "Los Piojos"}};
		expect(jsonValidator.isInterestValid(jsonInterest)).to.equal(true);
	});

	it('isInterestValid() - Json FAIL should return false', function() {
		var jsonInterest = {intereses: {category: "music / band", value: "Los Piojos"}};
		expect(jsonValidator.isInterestValid(jsonInterest)).to.equal(false);
	});

	it('isInterestValid() - Json FAIL should return false', function() {
		var jsonInterest = {interest: {categoria: "music / band", value: "Los Piojos"}};
		expect(jsonValidator.isInterestValid(jsonInterest)).to.equal(false);
	});

	it('isInterestValid() - Json FAIL should return false', function() {
		var jsonInterest = {interest: {category: "music / band", value: "Los Piojos", otros: "LP"}};
		expect(jsonValidator.isInterestValid(jsonInterest)).to.equal(false);
	});

	it('isUserValid() - Json OK should return true', function() {
		var jsonUser = {user: {name: "Juan", alias: "kumaaa", email: "kumaaa", photo: "kumaaa",interests: [{category: "music / band", value: "Los Piojos", otros: "LP"}], location:{latitude: "212",longitude:"212"}}};
		expect(jsonValidator.isUserValid(jsonUser)).to.equal(true);
	});

	it('isUserValid() - Json OK should return true', function() {
		var jsonUser = {user: {name: "Juan", alias: "kumaaa", email: "kumaaa",interests: [{category: "music / band", value: "Los Piojos", otros: "LP"}],location:{latitude: "212",longitude:"212"}}};
		expect(jsonValidator.isUserValid(jsonUser)).to.equal(true);
	});

	it('isUserValid() - Json FAIL should return false', function() {
		var jsonUser = {usuario: {name: "Juan", alias: "kumaaa", email: "kumaaa", photo: "kumaaa",interests: [{category: "music / band", value: "Los Piojos", otros: "LP"}],location:{latitude: "212",longitude:"212"}}};
		expect(jsonValidator.isUserValid(jsonUser)).to.equal(false);
	});

	it('isUserValid() - Json FAIL should return false', function() {
		var jsonUser = {user: {nombre: "Juan", alias: "kumaaa", email: "kumaaa", photo: "kumaaa",interests: [{category: "music / band", value: "Los Piojos", otros: "LP"}],location:{latitude: "212",longitude:"212"}}};
		expect(jsonValidator.isUserValid(jsonUser)).to.equal(false);
	});

});