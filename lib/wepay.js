/* WePay API for Node.js
 * (c)2012 Matt Farmer
 * Release without warranty under the terms of the
 * Apache License. For more details, see the LICENSE
 * file at the root of this project.
*/
restler = require('restler');

var WePay = (function() {
  /**
   * The release number of wepay-node, for internal use.
  **/
  var release = "0.1.0";

  /**
   * Indicates whether or not this release is final. Set this to
   * true for final builds. If false, warnings will be generated.
  **/
  var release_final = false;

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
      oauth: "https://www.wepay.com",
      api: "https://www.wepayapi.com"
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

  /**
   * Generate the headers to be sent with a request.
  **/
  function generateRequestHeaders(token_object) {
    var headers = {'User-Agent': user_agent, 'Content-Type' : 'application/json'};

    if (token_object && token_object.access_token && token_object.token_type)
      headers['Authorization'] = token_object.token_type + " " + token_object.access_token;

    return headers;
  }

  // If this isn't an actual release, output a warning to the
  // console about using experimental code.
  if (! release_final) {
   console.error("[wepay-node] WARNING: The copy of wepay-node you're using is experimental.");
   console.error("[wepay-node] It may be broken or behave very unexpectedly. Don't use it in production.");
  }

  return {
    /**
     * Resource objects that are available to the client application.
    **/
    Account: require('./resources/Account'),
    App: require('./resources/App'),
    Checkout: require('./resources/Checkout'),
    Preapproval: require('./resources/Preapproval'),
    User: require('./resources/User'),
    Withdrawal: require('./resources/Withdrawal'),

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
      if (! scope)
        throw "You must specify some permissions to request."

      return resourceUrlFor("/oauth2/authorize", true) + "?client_id=" + client_id
        + "&redirect_uri=" + encodeURIComponent(oauth_redirect_uri)
        + "&scope=" + encodeURIComponent(scope);
    },

    /**
     * Retrieve the access token for the user based on
     * the code provided.
    **/
    retrieveToken: function(code, callback) {
      restler.post(resourceUrlFor('/oauth2/token', true), {
        data: JSON.stringify({
          "client_id": client_id,
          "redirect_uri": oauth_redirect_uri,
          "client_secret": client_secret,
          "code": code
        }),
        headers: generateRequestHeaders()
      }).on('complete', callback);
    },

    /**
     * Execute an action against the WePay API.
    **/
    execute: function(action, request_json, token_object, callback) {
      // Callback is always the last param, so if it is undefined, and token_object
      // is a function, then swap the two.
      if (! callback && token_object instanceof Function) {
        callback = token_object;
        token_object = undefined;
      }

      // If there is a request_json object, then we're using the POST HTTP method.
      // If not, this is a GET. (Their API isn't strictly restful, so that's fine.)
      var executionMethod = (request_json) ? "post" : "get";

      restler.request(resourceUrlFor(action), {
        method: executionMethod,
        data: JSON.stringify(request_json),
        headers: generateRequestHeaders(token_object)
      }).on('complete', callback);
    }
  }
})();

module.exports = WePay
