"use strict";

var stripe_url = 'https://api.stripe.com/v1/'
var secret_key = 'sk_test_diRYx81syFcpws0yXYNVgXvc'

// Identifier should likely be email address
//
// Should return a customer object with the field "id" that is important! It is
// used to uniquely identify said customer and retreive the same customer object
// from the Stripe API
module.exports.createCustomer = function (customerIdentifier) {
  var customerDetails= {
    "customer[description]": customerIdentifier
  };

  var formBody = [];
  for (var property in customerDetails) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(customerDetails[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  return fetch(stripe_url + 'customers', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + secret_key
    },
    body: formBody
  });
};
