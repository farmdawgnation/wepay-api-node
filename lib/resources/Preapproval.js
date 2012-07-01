/* WePay API for Node.js
 * (c)2012 Matt Farmer
 * Release without warranty under the terms of the
 * Apache License. For more details, see the LICENSE
 * file at the root of this project.
*/
var PreapprovalInstance = require('../models/PreapprovalInstance');

var Preapproval = {
  get: function(preapproval_id, callback) {
    //TODO
  },

  find: function(search_params, callback) {
    //TODO
  },

  create: function(params) {
    return new PreapprovalInstance(params);
  }
};

module.exports = Preapproval;
