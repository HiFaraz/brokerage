interceptor = require('rest/interceptor');
module.exports = interceptor({
	request: function (request, config, meta) {
		request.subpath = request.path
		return request;
	}
});