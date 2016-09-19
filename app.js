var express = require('express');
var compression = require('compression');
var path = require('path');
var favicon = require('serve-favicon');
var session = require('express-session');
var flash = require('connect-flash');
var RedisStore = require('connect-redis')(session);
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var log4js = require('log4js');

var config = require('./config');
var middleware = require('./middleware');
var logger = require('./utils/log')('error');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(require('./middleware/hbs')(app));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
log4js.configure(config.log4js);
app.use(log4js.connectLogger(log4js.getLogger("access"), {
  level: log4js.levels.INFO
}));

app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  store: new RedisStore({
    host: 'localhost',
    // db: 'user_session',
    port: '6379'
  }),
  cookie: {
    maxAge: 7200000
  },
  // name: 'session', //default connect.sid
  resave: false,
  saveUninitialized: true,
  secret: 'ZoKWeYjQfEoy5S8h'
}));
app.use(flash());

// app.use(middleware.auth);

require('./routes')(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    logger.error(err);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  logger.error(err);
  if (req.accepts(['json', 'text', 'html']) === 'json' || req.method.toUpperCase() != 'GET') {
    res.json({
      success: false,
      msg: error.message
    })
  } else {
    res.render('error', {
      message: err.message,
      error: {}
    });
  }
});

module.exports = app;
