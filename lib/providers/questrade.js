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
					resolve(response.entity.accounts);
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

	interface.test = function () {
		return new Promise(
			function (resolve, reject) {
				get('v1/time').then(resolve, fail(reject));
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