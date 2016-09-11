module.exports = {
  "appenders": [{
    "type": "console"
  }, {
      "type": "dateFile",
      "filename": process.platform === 'win32' ? "log/access.log" : '/var/log/nodejs/access.log',
      "pattern": "-yyyy-MM-dd",
      "alwaysIncludePattern": true,
      "category": "access"
    }, {
      "type": "dateFile",
      "filename": process.platform === 'win32' ? "log/error.log" : '/var/log/nodejs/error.log',
      "pattern": "-yyyy-MM-dd",
      "alwaysIncludePattern": true,
      "category": "error"
    }],
  "replaceConsole": true
};