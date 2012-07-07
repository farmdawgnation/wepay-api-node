/* WePay API for Node.js
 * (c)2012 Matt Farmer
 * Release without warranty under the terms of the
 * Apache License. For more details, see the LICENSE
 * file at the root of this project.
*/
var CreatableInstancePrototype = require('./CreatableInstancePrototype');

var PreapprovalInstance = function(token_object, params) {
  // Populate the token.
  // Because passing it to every method is stupid.
  if (! token_object)
    throw "A token object is required to create an Preapproval instance.";

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
PreapprovalInstance.prototype = CreatableInstancePrototype;
PreapprovalInstance.prototype.parent = CreatableInstancePrototype;
PreapprovalInstance.prototype.resource_name = "preapproval";
PreapprovalInstance.prototype.id_field = "preapproval_id";

PreapprovalInstance.prototype.cancel = function(callback) {
  var WePay = require('../wepay');

  WePay.execute('/preapproval/cancel',
                {'preapproval_id': this.preapproval_id},
                this.token_object,
                function(data, response) {
                  callback(JSON.parse(data));
                });
}

module.exports = PreapprovalInstance;
