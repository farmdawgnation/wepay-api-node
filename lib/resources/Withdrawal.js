/* WePay API for Node.js
 * (c)2012 Matt Farmer
 * Release without warranty under the terms of the
 * Apache License. For more details, see the LICENSE
 * file at the root of this project.
*/
var WithdrawalInstance = require('../models/WithdrawalInstance');

var Withdrawal = {
  get: function(withdrawal_id, token_object, callback) {
    var WePay = require('../wepay');

    WePay.execute('/withdrawal', {'withdrawal_id': withdrawal_id}, token_object, function(data, response) {
      data = JSON.parse(data);

      if (data.error) {
        callback(data);
      } else {
        callback(new WithdrawalInstance(token_object, data));
      }
    });
  },

  find: function(search_params, token_object, callback) {
    var WePay = require('../wepay');

    WePay.execute('/withdrawal/find', search_params, token_object, function(data, response) {
      data = JSON.parse(data);

      if (data.error) {
        callback(data);
      } else {
        var findResults = data.map(function(element) {
          return new WithdrawalInstance(token_object, element);
        });

        callback(findResults);
      }
    });
  },

  create: function(params) {
    return new WithdrawalInstance(params);
  }
};

module.exports = Withdrawal;
