exports = module.exports = brokerage;

var methods = require('./methods');

function brokerage(providerName, token) {
	this.provider = require('./providers/' + providerName)(token);
};

methods.forEach(function (method) {
	brokerage.prototype[method] = function () {
		return this.provider[method].apply(this, arguments);
	};
});