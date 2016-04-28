var chai = require('chai');
var expect = chai.expect;
var utils = require('../../server/utils/Utils');

describe('Utils', function() {

	it('isNormalInteger(4) shoud return true', function() {
		expect(utils.isNormalInteger("4")).to.equal(true);
	});

	it('isNormalInteger(0) shoud return true', function() {
		expect(utils.isNormalInteger("0")).to.equal(true);
	});

	it('isNormalInteger(1902) shoud return true', function() {
		expect(utils.isNormalInteger("1902")).to.equal(true);
	});

	it('isNormalInteger(0489) shoud return false', function() {
		expect(utils.isNormalInteger("0489")).to.equal(false);
	});

	it('isNormalInteger(+1) shoud return false', function() {
		expect(utils.isNormalInteger("+1")).to.equal(false);
	});

	it('isNormalInteger(-673) shoud return false', function() {
		expect(utils.isNormalInteger("-673")).to.equal(false);
	});

	it('isNormalInteger(1.45) shoud return false', function() {
		expect(utils.isNormalInteger("1.45")).to.equal(false);
	});

	it('isNormalInteger(1 and 3 == 3) shoud return false', function() {
		expect(utils.isNormalInteger("1 and 3 == 3")).to.equal(false);
	});
});