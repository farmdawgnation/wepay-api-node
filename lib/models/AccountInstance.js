/* WePay API for Node.js
 * (c)2012 Matt Farmer
 * Release without warranty under the terms of the
 * Apache License. For more details, see the LICENSE
 * file at the root of this project.
*/
var MutableInstancePrototype = require('./MutableInstancePrototype');

var AccountInstance = function(token_object, params) {
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
AccountInstance.prototype = MutableInstancePrototype;
AccountInstance.prototype.parent = MutableInstancePrototype;
AccountInstance.prototype.resource_name = "account";
AccountInstance.prototype.id_field = "account_id";

AccountInstance.prototype.balance = function(callback) {
  var WePay = require('../wepay');

  WePay.execute('/account/balance', {'account_id': this.account_id}, this.token_object, function(data, response) {
    callback(JSON.parse(data));
  });
}

AccountInstance.prototype.getTax = function(callback) {
  var WePay = require('../wepay');

  WePay.execute('/account/get_tax', {'account_id': this.account_id}, this.token_object, function(data, response) {
    callback(JSON.parse(data));
  });
}

AccountInstance.prototype.setTax = function(taxes, callback) {
  var WePay = require('../wepay');

  WePay.execute('/account/set_tax', {'account_id': this.account_id, 'taxes': taxes}, this.token_object, function(data, response) {
    callback(JSON.parse(data));
  });
}

module.exports = AccountInstance;
