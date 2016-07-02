// this token is from a practice account on Questrade
var token = {
	"access_token": "H8Fxeqy-sa3NAPnEZQG1iBiKPCS3iANJ0",
	"api_server": "https://api08.iq.questrade.com/",
	"expires_in": 1800,
	"refresh_token": "DpIA1SbO6GGe3cGLgdFJyARvtYje320Y0",
	"token_type": "Bearer"
}

var brokerage = require('../lib');
var quest = new brokerage('questrade', token);

var connected = function () {
	console.log('PASS');
};
var notConnected = function (error) {
	console.log('FAIL', error)
}
quest.test(connected, notConnected);
quest.user.id(console.log)