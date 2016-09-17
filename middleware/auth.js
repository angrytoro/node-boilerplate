
module.exports = function (req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    if (req.accepts(['json', 'text', 'html']) === 'json' || req.method.toUpperCase() != 'GET') {
      res.json({
        success: false,
        msg: 'please login'
      });
    } else {
      res.redirect('/login');
    }
  }
}