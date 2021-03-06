exports = module.exports = request;

var timeoutInterval = require('./config').timeoutInterval;

var rest = require('rest'),
	defaultRequest = require('rest/interceptor/defaultRequest'),
	errorCode = require('rest/interceptor/errorCode'),
	mime = require('rest/interceptor/mime'),
	pathPrefix = require('rest/interceptor/pathPrefix'),
	timeout = require('rest/interceptor/timeout'),
	responseTime = require('rest-interceptor-responsetime'),
	subpath = require('./interceptor/subpath');

function request(options) {

	var headers = {};
	if (options.authHeaderName) headers[options.authHeaderName] = options.tokenPrefix + ' ' + options.token;

	var restClientTemplate = rest.wrap(mime)
		.wrap(errorCode)
		.wrap(pathPrefix, {
			prefix: options.pathPrefix
		})
		.wrap(defaultRequest, {
			headers: headers,
			mixin: {
				provider: options.provider
			}
		})
		.wrap(timeout, {
			timeout: timeoutInterval
		})
		.wrap(responseTime)
		.wrap(subpath);

	return {
		get: function (path) {
			var options = {
				path: path
			};
			if (arguments.length == 2) options.entity = arguments[1];
			return restClientTemplate(options);
		},
		post: function (path, entity) {
			return restClientTemplate({
				method: 'POST',
				entity: entity,
				path: path
			});
		}
	};
};