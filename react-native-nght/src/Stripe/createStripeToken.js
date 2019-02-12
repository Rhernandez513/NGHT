"use strict";

var stripe_url = 'https://api.stripe.com/v1/'
var secret_key = 'sk_test_diRYx81syFcpws0yXYNVgXvc'

// This Token should be attached to a customer object later on then store on our
// server because these tokens are ONE USE ONLY
//
// It should be mapped to the following customer object fields
//
// token.card.id -> customer.sources.data.id
module.exports.createCardToken = function (cardNumber, expMonth, expYear, cvc) {
  var cardDetails = {
    "card[number]": cardNumber,
    "card[exp_month]": expMonth,
    "card[exp_year]": expYear,
    "card[cvc]": cvc
  };

  var formBody = [];
  for (var property in cardDetails) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(cardDetails[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  return fetch(stripe_url + 'tokens', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + secret_key
    },
    body: formBody
  });
};
