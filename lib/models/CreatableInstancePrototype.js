/* WePay API for Node.js
 * (c)2012 Matt Farmer
 * Release without warranty under the terms of the
 * Apache License. For more details, see the LICENSE
 * file at the root of this project.
*/
var CreatableInstancePrototype = {
  id_field: "",

  save: function(callback) {
    if (this[this.id_field]) {
      throw "Can't modify a CreatableInstance after creation."
    } else {
      this.create(callback);
    }
  },

  create: function(callback) {
    var WePay = require('../wepay');

    WePay.execute("/" + this.resource_name + "/create", this.values(), this.token_object, function(data, response) {
      callback(JSON.parse(data));
    });
  }
}

module.exports = CreatableInstancePrototype;
