/* WePay API for Node.js
 * (c)2012 Matt Farmer
 * Release without warranty under the terms of the
 * Apache License. For more details, see the LICENSE
 * file at the root of this project.
*/
var AccountInstance = require('../models/AccountInstance');

var Account = {
  get: function(account_id, token_object, callback) {
    var WePay = require('../wepay');

    WePay.execute('/account', {'account_id': account_id}, token_object, function(data, response) {
      data = JSON.parse(data);

      if (data.error) {
        callback(data);
      } else {
        callback(new AccountInstance(token_object, data));
      }
    });
  },

  find: function(search_params, token_object, callback) {
    var WePay = require('../wepay');

    WePay.execute('/account/find', search_params, token_object, function(data, response) {
      data = JSON.parse(data);

      if (data.error) {
        callback(data);
      } else {
        var findResults = data.map(function(element) {
          return new AccountInstance(token_object, element);
        });

        callback(findResults);
      }
    });
  },

  create: function(token_object, params) {
    return new AccountInstance(token_object, params);
  }
};

module.exports = Account;
