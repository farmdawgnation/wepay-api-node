/* WePay API for Node.js
 * (c)2012 Matt Farmer
 * Release without warranty under the terms of the
 * Apache License. For more details, see the LICENSE
 * file at the root of this project.
*/
var CheckoutInstance = require('../models/CheckoutInstance');

var Checkout = {
  get: function(checkout_id, callback) {
    //TODO
  },

  find: function(search_params, callback) {
    //TODO
  },

  create: function(params) {
    return new CheckoutInstance(params);
  }
};

module.exports = Checkout;
