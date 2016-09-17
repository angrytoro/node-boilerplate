var express = require('express');
var router = express.Router();

var db = require('../models');
var utils = require('../utils');

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.post('/register', function(req, res, next) {
  db.User.create(req.query).then(function(user) {
    res.json({
      success: true,
      data: user
    });
  }).catch(function(error) {
    next(error);
  });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', function(req, res, next) {
  db.User.findOne({where: {
    email: req.query.email,
    password: utils.hashPassword(req.query.password)
  }})
  .then(function(user) {
    if(user) {
      req.session.user = user;
    } else {
      res.json({
        success: false,
        msg: 'email or password is wrong'
      });
    }
  }).catch(function(error) {
    next(error);
  });
});

module.exports = router;
