# brokerage

Connect to brokerage APIs with one interface

**NOTE: this is a pre-production version, and the module interfaces and functionality are not stable yet.**

```javascript
var brokerage = require('brokerage');
var broker = new brokerage('questrade', token);

// The following return a Promise:
broker.accounts();
broker.findsymbols(description);
broker.test();
broker.time();
broker.quotes(id);
broker.quotes([id1,id2,...]);
broker.symbols(id);
broker.symbols([id1,id2,...]);
broker.user();
```

## 1. Installation

```bash
$ npm install brokerage
```

## 2. Brokerages

`brokerage` aims to support all major brokerage APIs.

### 2.1 Help prioritize work

Help us decide which API to support next by voting [here](https://github.com/HiFaraz/brokerage/issues/2).

### 2.2 List of API providers

Name|Status|Discussion
---|---|---
Questrade|in progress|[Github issue](https://github.com/HiFaraz/brokerage/issues/1)	
E*TRADE|not started|
Interactive Brokers|not started|
TD Ameritrade|not started|
Firstrade|not started|
TradeKing|not started|
