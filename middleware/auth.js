var request = require('request');
var parseString = require('xml2js').parseString;
var omit = require('lodash/omit');

var config = require('../config');
var utils = require('../utils');


function getCas() {
  return config.cas;
}

function validateLogin(req, res, next) {
  next();
};

function login(req, res, next) {
  next();
}


module.exports = function (req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else if (req.query.ticket) { //ST-7162-NuD1q27V0A90Wl7YPrm5
    validateLogin(req, res, next);
  } else {
    if (req.accepts(['json', 'text', 'html']) === 'json' || req.method.toUpperCase() != 'GET') {
      res.json({
        success: false,
        msg: 'please login'
      });
    } else {
      login(req, res, next);
    }
  }
}