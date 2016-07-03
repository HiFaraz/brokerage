// this token is from a practice account on Questrade
var token = {
	"access_token": "jL4gA5gj25JrSVgAyvrKvfDE1y2gEZde0",
	"api_server": "https://api08.iq.questrade.com/",
	"expires_in": 1800,
	"refresh_token": "JgQwKLsoMmAAYxPrbwnm_wEbTOOi_1mh0",
	"token_type": "Bearer"
}

var brokerage = require('../lib');
var broker = new brokerage('questrade', token);

var connected = function () {
	console.log('PASS Connection to broker API established');
	broker.time().then(function (datetime) {
		console.log('TIME', datetime);
	}).catch(genericFailure);
	broker.user().then(function (id) {
		console.log('USER', id);
	}).catch(genericFailure)
	broker.accounts().then(function (accounts) {
		console.log('ACCOUNTS', accounts);
	}).catch(genericFailure);
	broker.findSymbols('microsoft').then(function (symbols) {
		console.log('SYMBOLS', symbols);
	}).catch(genericFailure);
	broker.symbol(27426).then(function (symbol) {
		console.log('MICROSOFT', symbol);
	}).then().catch(genericFailure);
	broker.quotes(2067121).then(function (symbol) {
		console.log('QUOTE', symbol);
	}).catch(genericFailure);
};

broker.test().then(connected).catch(genericFailure);

function genericFailure(error) {
	console.error('FAIL', error);
}
