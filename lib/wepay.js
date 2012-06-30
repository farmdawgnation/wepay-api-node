/* WePay API for Node.js
 * (c)2012 Matt Farmer
 * Release without warranty under the terms of the
 * Apache License. For more details, see the LICENSE
 * file at the root of this project.
*/
var WePay = (function() {
  /**
   * The release number of wepay-node, for internal use.
  **/
  var release = "0.1.0";

  /**
   * The Client ID that uniquely identifies our application.
  **/
  var client_id = null;

  /**
   * The Client Secret we can use to request OAuth access tokens.
  **/
  var client_secret = null;

  /**
   * The current environment that we're using.
  **/
  var environment = null;

  /**
   * The OAuth redirect URI
  **/
  var oauth_redirect_uri = "";

  /**
   * The User Agent that will be displayed for requests to WePay.
  **/
  var user_agent = "wepay-node " + release;

  /**
   * API endpoints bases
  **/
  var endpoints = {
    stage: {
      oauth: "https://stage.wepay.com",
      api: "https://stage.wepayapi.com"
    },
    prod: {
      oauth: "https://wepay.com",
      api: "https://stage.wepayapi.com"
    }
  };

  /**
   * The current API version indicator we're using.
  **/
  var api_version = "v2";

  /**
   * Generate a resource URL based on the desired action.
  **/
  function resourceUrlFor(resource, oauth) {
    if (! environment)
      throw "The environment hasn't been properly specified.";

    var callType = (oauth) ? "oauth" : "api",
        baseUrl = endpoints[environment][callType];

    return baseUrl + "/" + api_version + resource;
  }

  return {
    /**
     * Initilize the WePay connection with all the required
     * parameters to start an OAuth sequence.
    **/
    init: function(init_environment, init_client_id, init_client_secret, init_oauth_redirect_uri) {
      environment = init_environment;
      client_id = init_client_id;
      client_secret = init_client_secret;
      oauth_redirect_uri = init_oauth_redirect_uri;
    },

    /**
     * Generate and return the authorize URL for the user
     * to hit to grant access to the application for the
     * requested permissions.
    **/
    authorizeUrl: function(scope) {
      return resourceUrlFor("/oauth2/authorize", true) + "?client_id=" + client_id
        + "&redirect_uri=" + encodeURIComponent(oauth_redirect_uri)
        + "&scope=" + encodeURIComponent(scope);
    },

    /**
     * Retrieve the access token for the user based on
     * the code provided.
    **/
    retrieveToken: function(code, callback) {
      //TODO
    },

    /**
     * Execute an action against the WePay API.
    **/
    execute: function(action, request_json, access_token) {
      //TODO
    }
  }
})();

module.exports = WePay
