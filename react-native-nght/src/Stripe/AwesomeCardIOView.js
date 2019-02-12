// var redis = require("./interfaces/redisInterface.js");

// Stripe API interaction object with testing key
var stripeTokenizer = require('./createStripeToken.js');

import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Image,
  Text,
  Platform,
  StyleSheet,
  Dimensions
} from 'react-native';

import Images from '../Assets/images';

import {
  TouchableImage
} from '../Common';

import {
  CardIOModule,
  CardIOUtilities
} from 'react-native-awesome-card-io';

const window = Dimensions.get('window');

export default class AwesomeCardIOView extends Component {

  componentWillMount() {
    if (Platform.OS === 'ios') {
      CardIOUtilities.preload();
    }
  }

  _scanCard() {
    CardIOModule
      .scanCard()
      .then(CreditCard => {
        // send to server?

        var USER_ACCOUNT_NUMBER = "SOME_GUID";

				var Payload =  {};

        Payload.USER_ACCOUNT_NUMBER = USER_ACCOUNT_NUMBER;

				Payload.cardType = CreditCard.cardType;
				Payload.cardNumber = CreditCard.cardNumber;
				// All numbers except last 4 obfuscated
				Payload.redactedCardNumber = CreditCard.redactedCardNumber;
				// Expiry month with january as 1 (may be 0 if expiry information was not requested).
				Payload.expiryMonth = CreditCard.expiryMonth;
				// May be 0 if expiry information was not requested
				Payload.expiryYear = CreditCard.expiryYear;
				Payload.cvv = CreditCard.cvv;
				// Format is country dependent.
				Payload.postalCode = CreditCard.postalCode;
				Payload.cardholderName = CreditCard.cardholderName;

				// stripe.customers.create({
				// 	description: Payload.cardholderName,
				// 	// source: "tok_194vGSGzMiyGMVT6nOQz0Ps6" // obtained with Stripe.js
				// }, function(err, customer) {
				// 	// asynchronously called
				// 	console.log("If the customer was successfully created, it should show here");
				// 	console.log(customer);
				// });

        var token = stripeTokenizer.createCardToken(Payload.cardNumber, Payload.expiryMonth, Payload.expiryYear, Payload.cvv);

        console.log("If we got the token back, it should shown here: ");
        console.log(token);
        alert(token);

      })
      .catch(() => {
        // the user cancelled
      alert("Registering Card Cancelled!");
      })
  }

  render() {
    return (
        <TouchableImage
          img={Images.menu_card}
          imgStyle={styles.menuIcons}
          onPressFunc={this._scanCard}
        />
    );
  }
}

const styles = StyleSheet.create({
  menuIcons: {
    width: window.width * 0.25,
    height: window.height * 0.1,
    margin: 20,
    //padding: 20
  }
});
