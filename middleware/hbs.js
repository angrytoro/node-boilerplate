var hbs = require('hbs');
var path = require('path');
var fs = require('fs');
var logger = require('../utils/log')('error');
var menuConfig = require('../config').menuConfig;

hbs.registerPartials(path.join(__dirname, '../views/partials'));

var blocks = {};

hbs.registerHelper('extend', function (name, context) {
  var block = blocks[name];
  if (!block) {
    block = blocks[name] = [];
  }

  block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
});

hbs.registerHelper('block', function (name) {
  var val = (blocks[name] || []).join('\n');

  // clear the block
  blocks[name] = [];
  return val;
});

hbs.registerHelper('json', function (obj) {
  return JSON.stringify(obj);
});

hbs.registerHelper('or', function (trueValue, falseValue, context) {
  return trueValue ? trueValue : falseValue;
});

module.exports = function (app) {
  hbs.localsAsTemplateData(app);

  return function (req, res, next) {
    app.locals.req_ = req;
    next();
  };
};