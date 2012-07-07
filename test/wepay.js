/* WePay API for Node.js
 * (c)2012 Matt Farmer
 * Release without warranty under the terms of the
 * Apache License. For more details, see the LICENSE
 * file at the root of this project.
*/
var vows = require('vows'),
    assert = require('assert');

vows.describe('WePay Singleton').addBatch({
  'With an uninitilized WePay object': {
    "topic": require('../lib/wepay'),

    "We can't generate an authorize URL": function(WePay) {
      assert.throws(function() { WePay.authorizeUrl("view_user") }, "The environment hasn't been properly specified.")
    },

    "We can't retrieve an OAuth Token": function(WePay) {
      assert.throws(function() { WePay.retrieveToken("abc123", function() {}) }, "The environment hasn't been properly specified.")
    },

    "We can't execute an action against the API": function(WePay) {
      assert.throws(function() { WePay.execute("/user", undefined, function() {}) }, "The environment hasn't been properly specified.")
    }
  }
}).exportTo(module);
