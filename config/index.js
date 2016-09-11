var devConfig = require('./config.dev');
var prdConfig = require('./config.prd');
var log4jsConfig = require('./log.config');

var config = process.env.NODE_ENV === 'production'? prdConfig: devConfig;

config.log4js = log4jsConfig;

module.exports = config;