/* WePay API for Node.js
 * (c)2012 Matt Farmer
 * Release without warranty under the terms of the
 * Apache License. For more details, see the LICENSE
 * file at the root of this project.
*/
var App = {
  get: function(client_id, client_secret, callback) {
    var WePay = require('../wepay');

    WePay.execute('/app', {'client_id': client_id, 'client_secret': client_secret}, undefined, function(data, response) {
      callback(JSON.parse(data));
    });
  },

  modify: function(params, callback) {
    var WePay = require('../wepay');

    WePay.execute('/app/modify', params, undefined, function(data, response) {
      callback(JSON.parse(data));
    });
  }
};

module.exports = App;
