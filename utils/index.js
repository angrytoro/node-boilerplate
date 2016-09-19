var crypto = require('crypto');
module.exports = {
  hashPassword: function (password) {
    var md5 = crypto.createHash('md5');
    md5.update(password);
    return md5.digest('hex');
  }
};