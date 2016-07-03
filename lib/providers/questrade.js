exports = module.exports = provider;

function provider(token) {
	// BEGIN Provider specific code
	var requestOptions = {
		authHeaderName: "Authorization",
		pathPrefix: token.api_server,
		tokenPrefix: token.token_type,
		token: token.access_token
	};
	// END provider specific code

	var request = require('../request')(requestOptions),
		get = request.get,
		post = request.post;

	var interface = {};

	interface.accounts = function () {
		return new Promise(
			function (resolve, reject) {
				get('v1/accounts').then(function (response) {
					resolve(response.entity.accounts.map(accountAdapter));
				}, fail(reject));
			}
		)
	};

	interface.findSymbols = function (description) {
		return new Promise(
			function (resolve, reject) {
				get('v1/symbols/search?prefix=' + description).then(function (response) {
					resolve(response.entity.symbols.map(symbolAdapter).filter(function (symbol) {
						return symbol.isTradable; // TODO document this, only returns tradable securities
					}));
				}, fail(reject));
			}
		)
	};

	interface.symbol = function (id) {
		return new Promise(
			function (resolve, reject) {
				get('v1/symbols/' + id).then(function (response) {
					resolve(response.entity.symbols.map(symbolAdapter)[0]);
				}, fail(reject));
			}
		)
	};

	interface.test = function () {
		return new Promise(
			function (resolve, reject) {
				get('v1/time').then(resolve, fail(reject));
			}
		)
	};

	interface.time = function () {
		return new Promise(
			function (resolve, reject) {
				get('v1/time').then(function (response) {
					resolve(new Date(response.entity.time)); // TODO document that this is result is GMT+0
				}, fail(reject));
			}
		)
	};

	interface.user = function () {
		return new Promise(
			function (resolve, reject) {
				get('v1/accounts').then(function (response) {
					resolve(response.entity.userId);
				}, fail(reject));
			}
		)
	};

	return interface;
};

function fail(errorCallback) {
	return function (response) {
		if (errorCallback) {
			if (response.error) errorCallback(response.error.code);
			else if (response.entity) errorCallback(response.entity.message);
			else errorCallback('Unknown internal error');
		}
	}
};

function accountAdapter(account) {
	return {
		id: account.number,
		status: account.status,
		type: account.type
	};
}

function symbolAdapter(symbol) {
	symbol.id = symbol.symbolId;
	delete symbol.symbolId;
	symbol.type = symbol.securityType;
	delete symbol.securityType;
	return symbol;
}