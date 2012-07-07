/* WePay API for Node.js
 * (c)2012 Matt Farmer
 * Release without warranty under the terms of the
 * Apache License. For more details, see the LICENSE
 * file at the root of this project.
*/
var UserInstance = function(params) {
  // Populate any params passed in.
  if (params && ! params instanceof Object)
    throw "Parameters passed to an instance constructor must be an object or undefined.";

  if (params){
    for (key in params) {
      this[key] = params[key];
    }
  }
}

module.exports = UserInstance;
