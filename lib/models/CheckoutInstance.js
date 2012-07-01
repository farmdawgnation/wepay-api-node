/* WePay API for Node.js
 * (c)2012 Matt Farmer
 * Release without warranty under the terms of the
 * Apache License. For more details, see the LICENSE
 * file at the root of this project.
*/
var CreatableInstancePrototype = require('./CreatableInstancePrototype');

var CheckoutInstance = function(params) {
  //TODO
}
CheckoutInstance.prototype = CreatableInstancePrototype;
CheckoutInstance.prototype.parent = CreatableInstancePrototype;

CheckoutInstance.prototype.cancel = function(cancel_reason, callback) {
  //TODO
}

CheckoutInstance.prototype.refund = function(refund_reason, callback) {
  //TODO
}

CheckoutInstance.prototype.capture = function(callback) {
  //TODO
}

module.exports = CheckoutInstance;
