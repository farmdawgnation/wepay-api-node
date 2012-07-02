/* WePay API for Node.js
 * (c)2012 Matt Farmer
 * Release without warranty under the terms of the
 * Apache License. For more details, see the LICENSE
 * file at the root of this project.
*/
var MutableInstancePrototype = {
  save: function(callback) {
    if (this[this.id_field]) {
      this.modify(callback);
    } else {
      this.create(callback);
    }
  },

  create: function(callback) {
    var WePay = require('../wepay');

    WePay.execute("/" + this.resource_name + "/create", this.values(), this.token_object, function(data, response) {
      callback(JSON.parse(data));
    });
  },

  modify: function(callback) {
    var WePay = require('../wepay');

    WePay.execute("/" + this.resource_name + "/modify", this.values(), this.token_object, function(data, response) {
      data = JSON.parse(data);

      if (data.error) {
        callback(data);
      } else {
        callback(new this.constructor(this.token_object, data));
      }
    });
  },

  //TODO
  delete: function(callback) {
    var WePay = require('../wepay');

    WePay.execute("/" + this.resource_name + "/delete", {}, this.token_object, function(data, response) {
      callback(JSON.parse(data));
    });
  },

  values: function() {
    var returnValues = {};

    for(key in this) {
      if (! (this[key] instanceof Function) && key != "token_object" && key != "parent" && key != "resource_name" && key != "id_field") {
        returnValues[key] = this[key];
      }
    }

    return returnValues;
  }
}

module.exports = MutableInstancePrototype;
