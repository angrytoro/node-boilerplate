var middleware = require('../middleware');

module.exports = function(app) {
 app.use(require('./auth')); 
 app.get('/', middleware.auth, function(req, res, next) {
   res.send('success');
 });
};