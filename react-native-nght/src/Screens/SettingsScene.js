import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';

import Images from '../Assets/images';
import { Navbar } from 'navbar-native';

import {
  TouchableText,
} from '../Common';

export default class SettingsScene extends Component {
  _testOmnivoreApi() {
      // source: http://stackoverflow.com/questions/30061625/how-to-get-json-data-from-fetch-react-native
     fetch('http://api.omnivore.io/0.1/locations', {
         method: 'POST',
         headers: {
           'Api-Key': 'be57cdc328ca4e2a8d6bd2954cb7974e',
        }
        /*,
      body: JSON.stringify({
        password: this.state.password,
        email:this.state.email,
        name: this.state.firstname,
        last_name :this.state.last_name,
        mobile:this.state.mobile,
        ssn:"2222222"
      })*/
      }).then((response) => response.text())
        .then((responseData) => {alert('response text: '+responseData)
        }).done();
    }

  render() {
    return (
      <Image source={Images.bg_signup} style={styles.backgroundImage}>
        <View style={styles.outerDiv}>
          <Navbar
            title={"Settings"}
            left={{
                icon: "ios-arrow-back",
                onPress: () => this.props.navigator.pop()
              }}
          />
        <View style={styles.innerDiv}>
          <TouchableText
            text={'Test Omnivore API'}
            textStyle={styles.defaultText}
            onPressFunc={()=> this._testOmnivoreApi()}
          />
        </View>
        </View>
      </Image>
    );
  }
};

const styles = StyleSheet.create({
  outerDiv: {
    backgroundColor: 'black',
    flex: 1,
  },
  innerDiv: {
    justifyContent:'center',
  },
  backgroundImage: {
   flex: 1,
   // remove width and height to override fixed static size
   width: null,
   height: null,
   resizeMode: 'cover',
 },
 defaultText: {
   backgroundColor: 'white',
   color: 'black',
   fontFamily: 'Montserrat-Regular',
   fontSize: 30,
 }
});
