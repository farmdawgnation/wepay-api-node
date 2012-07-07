/* WePay API for Node.js
 * (c)2012 Matt Farmer
 * Release without warranty under the terms of the
 * Apache License. For more details, see the LICENSE
 * file at the root of this project.
*/
var CreatableInstancePrototype = require('./CreatableInstancePrototype');

var WithdrawalInstance = function(token_object, params) {
  // Populate the token.
  // Because passing it to every method is stupid.
  if (! token_object)
    throw "A token object is required to create an Withdrawal instance.";

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
WithdrawalInstance.prototype = CreatableInstancePrototype;
WithdrawalInstance.prototype.parent = CreatableInstancePrototype;
WithdrawalInstance.prototype.resource_name = "withdrawal";
WithdrawalInstance.prototype.id_field = "withdrawal_id";

module.exports = WithdrawalInstance;
