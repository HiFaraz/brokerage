// this token is from a practice account on Questrade
var token = {
	"access_token": "NQTD5kxZA7O-SqpPlaeWwQZulEcALsNf0",
	"api_server": "https://api08.iq.questrade.com/",
	"expires_in": 1800,
	"refresh_token": "ZFG-_zaA2p9X3gDZHn2jkgAh-KMkBCKv0",
	"token_type": "Bearer"
}

var brokerage = require('../lib');
var quest = new brokerage('questrade', token);

var connected = function () {
	console.log('PASS');
	quest.accounts().then(console.log).catch(console.log)
	quest.user().then(console.log).catch(console.log)
};
var notConnected = function (error) {
	console.log('FAIL', error)
}
quest.test().then(connected).catch(notConnected);