/* WePay API for Node.js
 * (c)2012 Matt Farmer
 * Release without warranty under the terms of the
 * Apache License. For more details, see the LICENSE
 * file at the root of this project.
*/
var UserInstance = require('../models/UserInstance');

var User = {
  get: function(token_object, callback) {
    var WePay = require('../wepay');

    WePay.execute('/user', undefined, token_object, function(data, response) {
      data = JSON.parse(data);

      if (data.error) {
        callback(data);
      } else {
        // Unlike other instances, UserInstance doesn't keep track of a token.
        callback(new UserInstance(data));
      }
    });
  }
};

module.exports = User;
