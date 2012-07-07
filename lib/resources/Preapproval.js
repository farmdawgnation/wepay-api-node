/* WePay API for Node.js
 * (c)2012 Matt Farmer
 * Release without warranty under the terms of the
 * Apache License. For more details, see the LICENSE
 * file at the root of this project.
*/
var PreapprovalInstance = require('../models/PreapprovalInstance');

var Preapproval = {
  get: function(preapproval_id, token_object, callback) {
    var WePay = require('../wepay');

    WePay.execute('/preapproval', {'preapproval_id': preapproval_id}, token_object, function(data, response) {
      data = JSON.parse(data);

      if (data.error) {
        callback(data);
      } else {
        callback(new PreapprovalInstance(token_object, data));
      }
    });
  },

  find: function(search_params, token_object, callback) {
    var WePay = require('../wepay');

    WePay.execute('/preapproval/find', search_params, token_object, function(data, response) {
      data = JSON.parse(data);

      if (data.error) {
        callback(data);
      } else {
        var findResults = data.map(function(element) {
          return new PreapprovalInstance(token_object, element);
        });

        callback(findResults);
      }
    });
  },

  create: function(token_object, params) {
    return new PreapprovalInstance(token_object, params);
  }
};

module.exports = Preapproval;
