exports = module.exports = provider;

var rest = require('rest'),
	defaultRequest = require('rest/interceptor/defaultRequest'),
	errorCode = require('rest/interceptor/errorCode'),
	mime = require('rest/interceptor/mime'),
	pathPrefix = require('rest/interceptor/pathPrefix');

function provider(token) {
	var client = rest.wrap(mime)
		.wrap(errorCode)
		.wrap(pathPrefix, {
			prefix: token.api_server
		})
		.wrap(defaultRequest, {
			headers: {
				'Authorization': token.token_type + ' ' + token.access_token
			}
		});

	var accounts = function (successCallback, errorCallback) {
		client('v1/accounts').then(
			function (response) {
				if (successCallback) successCallback(response.entity.accounts);
			},
			function (response) {
				if (errorCallback) errorCallback(response.entity.message);
			}
		);
	};

	var test = function (successCallback, errorCallback) {
		client('v1/time').then(
			function (response) {
				if (successCallback) successCallback();
			},
			function (response) {
				if (errorCallback) errorCallback(response.entity.message);
			}
		);
	};

	var user = function (successCallback, errorCallback) {
		client('v1/accounts').then(
			function (response) {
				if (successCallback) successCallback(response.entity.userId);
			},
			function (response) {
				if (errorCallback) errorCallback(response.entity.message);
			}
		);
	};

	return {
		accounts: accounts,
		test: test,
		user: user
	};
};