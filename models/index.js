var fs = require('fs');
var path = require('path');
var Sequelize = require("sequelize");
var dbConfig = require('../config').db;
var db = {};

var sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig.connect);

fs.readdirSync(__dirname)
.filter(function(file) {
  return (file.indexOf(".") !== 0) && (file !== "index.js");
})
.forEach(function(file) {
  var model = sequelize.import(path.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize.sync();

module.exports = db;