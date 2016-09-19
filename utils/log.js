var log4js = require('log4js');
var errorLogger = log4js.getLogger('error');
var logger = {
    error: errorLogger
};

module.exports = function(level) {
    return logger[level];
};
