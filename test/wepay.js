/* WePay API for Node.js
 * (c)2012 Matt Farmer
 * Release without warranty under the terms of the
 * Apache License. For more details, see the LICENSE
 * file at the root of this project.
*/
var vows = require('vows'),
    assert = require('assert'),
    client_id = process.env.client_id,
    client_secret = process.env.client_secret,
    user_token = { user_id: process.env.token_user_id,
      access_token: process.env.token_access_token,
      token_type: process.env.token_token_type };

vows.describe('WePay Library')
  .addBatch({
    'An uninitialized singleton': {
      "topic": require('../lib/wepay'),

      "can't generate an authorize URL": function(WePay) {
        assert.throws(function() { WePay.authorizeUrl("view_user") }, "The environment hasn't been properly specified.")
      },

      "can't retrieve an OAuth Token": function(WePay) {
        assert.throws(function() { WePay.retrieveToken("abc123", function() {}) }, "The environment hasn't been properly specified.")
      },

      "can't execute an action against the API": function(WePay) {
        assert.throws(function() { WePay.execute("/user", undefined, function() {}) }, "The environment hasn't been properly specified.")
      }
    }
  })
  .addBatch({
    'An initialized singleton': {
      "topic": function() {
        var WePay = require("../lib/wepay");
        WePay.init('stage', client_id, client_secret, "http://mail.openstudy.com");
        return WePay;
      },

      "generates a string for authorizeUrl": function(WePay) {
        assert.equal(typeof(WePay.authorizeUrl("view_user")), 'string');
      },

      "returns access_denied with an invalid OAuth code": function(WePay) {
        WePay.retrieveToken("an_invalid_code_for_testing_wepay_node", function(data) {
          assert.equal(data.error, "access_denied")
        })
      },

      "can retrieve its own app information from WePay": function(WePay) {
        WePay.execute("/app", {client_id: client_id, client_secret: client_secret}, undefined, function(data, r) {
          assert.equal(data.client_id, client_id);
          assert.equal(data.client_secret, client_secret);
        });
      }
    }
  })
  .addBatch({
    "The App resoruce": {
      topic: require("../lib/wepay").App,

      "can retrieve the current App's information": function(App) {
        App.get(client_id, client_secret, function(data) {
          assert.equal(data.client_id, client_id);
          assert.equal(data.client_secret, client_secret);
        });
      }
    },

    "The Account resource" : {
      topic: require("../lib/wepay").Account,

      "returns access_denied on retrieval without token": function(Account) {
        Account.get(2, undefined, function(data) {
          assert.equal(data.error, "access_denied");
        });
      },

      "returns an array from Account.find": function(Account) {
        Account.find({}, user_token, function(data) {
          assert.instanceOf(data, Array);
        })
      }
    },
    "The Checkout resource" : {
      topic: require("../lib/wepay").Checkout,

      "returns access_denied on retrieval without token": function(Checkout) {
        Checkout.get(2, undefined, function(data) {
          assert.equal(data.error, "access_denied");
        });
      },

      "returns an array from Checkout.find": function(Checkout) {
        Checkout.find({}, user_token, function(data) {
          assert.instanceOf(data, Array);
        });
      }
    },
    "The Preapproval resource": {
      topic: require("../lib/wepay").Preapproval,

      "returns access_denied on retrieval without token": function(Preapproval) {
        Preapproval.get(2, undefined, function(data) {
          assert.equal(data.error, "access_denied");
        });
      },

      "returns an array from Preapproval.find": function(Preapproval) {
        Preapproval.find({}, user_token, function(data) {
          assert.instanceOf(data, Array);
        });
      }
    },
    "The User resource" : {
      topic: require("../lib/wepay").User,

      "retrieves a User instance": function(User) {
        var UserInstance = require("../lib/models/UserInstance");

        User.get(user_token, function(data) {
          assert.instanceOf(data, UserInstance);
        });
      }
    },
    "The Withdrawal resource" : {
      topic: require("../lib/wepay").Withdrawal,

      "returns access_denied on retrieval without token": function(Withdrawal) {
        Withdrawal.find(2, undefined, function(data) {
          assert.equal(data.error, "access_denied");
        });
      },

      "returns an array from Withdrawal.find": function(Withdrawal) {
        Withdrawal.find({}, user_token, function(data) {
          assert.instanceOf(data, Array);
        });
      }
    }
  })
  .exportTo(module);
