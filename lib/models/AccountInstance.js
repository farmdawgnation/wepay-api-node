/* WePay API for Node.js
 * (c)2012 Matt Farmer
 * Release without warranty under the terms of the
 * Apache License. For more details, see the LICENSE
 * file at the root of this project.
*/
var MutableInstancePrototype = require('./MutableInstancePrototype');

var AccountInstance = function(params) {
  //TODO
}
AccountInstance.prototype = MutableInstancePrototype;
AccountInstance.prototype.parent = MutableInstancePrototype;

AccountInstance.prototype.balance = function(callback) {
  //TODO
}

AccountInstance.prototype.getTax = function(callback) {
  //TODO
}

AccountInstance.prototype.setTax = function(taxes, callback) {
  //TODO
}

module.exports = AccountInstance;
