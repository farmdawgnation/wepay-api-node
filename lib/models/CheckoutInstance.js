/* WePay API for Node.js
 * (c)2012 Matt Farmer
 * Release without warranty under the terms of the
 * Apache License. For more details, see the LICENSE
 * file at the root of this project.
*/
var CreatableInstancePrototype = require('./CreatableInstancePrototype');

var CheckoutInstance = function(params) {
  // Populate the token.
  // Because passing it to every method is stupid.
  if (! token_object)
    throw "A token object is required to create an Account instance.";

  this.token_object = token_object;

  // Populate any params passed in.
  if (params && ! params instanceof Object)
    throw "Parameters passed to an instance constructor must be an object or undefined.";

  if (params){
    for (key in params) {
      this[key] = params[key];
    }
  }
}
CheckoutInstance.prototype = CreatableInstancePrototype;
CheckoutInstance.prototype.parent = CreatableInstancePrototype;
CheckoutInstance.prototype.resource_name = "checkout";
CheckoutInstance.prototype.id_field = "checkout_id";

CheckoutInstance.prototype.cancel = function(cancel_reason, callback) {
  var WePay = require('../wepay');

  WePay.execute('/checkout/cancel',
                {'checkout_id': this.checkout_id, 'cancel_reason': cancel_reason},
                this.token_object,
                function(data, response) {
                  callback(JSON.parse(data));
                });
}

CheckoutInstance.prototype.refund = function(refund_reason, callback) {
  var WePay = require('../wepay');

  WePay.execute('/checkout/refund',
                {'checkout_id': this.checkout_id, 'refund_reason': refund_reason},
                this.token_object,
                function(data, response) {
                  callback(JSON.parse(data));
                });
}

CheckoutInstance.prototype.capture = function(callback) {
  var WePay = require('../wepay');

  WePay.execute('/checkout/capture',
                {'checkout_id': this.checkout_id},
                this.token_object,
                function(data, response) {
                  callback(JSON.parse(data));
                });
}

module.exports = CheckoutInstance;
