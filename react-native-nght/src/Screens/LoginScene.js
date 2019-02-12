import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    TouchableHighlight,
    TouchableWithoutFeedback,
    View,
    Text,
    Dimensions,
    Alert
} from 'react-native';

import Images from '../Assets/images';

import {
  TouchableText,
  TouchableImage
} from '../Common';

import FacebookButton from '../Facebook/FacebookButton';

import { Hoshi } from 'react-native-textinput-effects/lib';
import { acctSignIn } from '../Actions/Actions';

const window = Dimensions.get('window');
const dismissKeyboard = require('dismissKeyboard');

var hasher = require('../Scripts/SaltHashPass');

export default class LoginScene extends Component {
  _navigate() {
    if (!this.state.user || !this.state.pass || this.state.user == '' || this.state.pass == '') {
        Alert.alert('Error', 'Email or password not entered!')
        return;
    }

    try {
        authData = this.props.store.getState().email
    }
    catch(err) {
        Alert.alert('Todo', 'Fetch info from server or sth...')
        return;
    }

    if (authData.address == '' || !this.state.user == authData.address || !this._validPass(this.state.pass, authData.salt, authData.passwordHash)) {
        Alert.alert('Error', 'Invalid email or password entered!')
        return;
    }

    this.props.store.dispatch(acctSignIn({
      first_name: "",
      last_name: "",
      FBid: "",
      email: authData.address,
      picture:"",
      gender: "",
      locale: "",
      timezone: "",
      service: "email",
    }))
    this.props.navigator.immediatelyResetRouteStack([{name: "HomeScene"}])
  }

  _validPass(pass, salt, hash) {

      if (hasher.saltHashPass(pass, salt)['passwordHash'] == hash) {
          return true;
      }
      return false;
  }

  render() {
      return (
          <Image style={styles.backgroundImage} source={Images.bg_login}>
            <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
            <View style={styles.defaultContainer}>

                {/*  Welcome / Logo */}
                <View>
                  <Text style={styles.defaulttext}>WELCOME</Text>
                  <Image style={styles.loginLogo} source={Images.logo}/>
                </View>

                {/*  User and Password Input */}
                <View style={styles.InputContainer}>
                  <Hoshi
                    style={styles.login}
                    label={'E-mail'}
                    onChangeText={(user) => this.setState({user})}
                    autoCorrect={false}
                    borderColor={'#ffffff'}
                    returnKeyType={'next'}
                    keyboardType={'email-address'}
                    autoCapitalize={'none'}
                  />
                  <Hoshi
                    style={styles.login}
                    label={'Password'}
                    onChangeText={(pass) => this.setState({pass})}
                    secureTextEntry={true}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    borderColor={'#ffffff'}
                    returnKeyType={'go'}
                  />
                </View>

                {/*  Login Button */}
                <TouchableImage
                  img={Images.login_button}
                  onPressFunc={()=> this._navigate()}
                  imgStyle={styles.socialButton}
                  />

                {/*  Or */}
                <Text style={styles.fadedText}>Or</Text>

                {/*  Social Buttons */}
                <View>
                  <TouchableImage
                    img={Images.twitter_button}
                    imgStyle={styles.socialButton}
                    />
                  <TouchableImage
                    img={Images.google_button}
                    imgStyle={styles.socialButton}
                    />
                    <FacebookButton
                    navigator={this.props.navigator}
                    store={this.props.store}/>
                </View>

                {/*  Sign-Up Prompt */}
                <View>
                  <TouchableText
                    onPressFunc={() => this.props.navigator.push({name: "SignupScene"})}
                    text={' Dont have an account? Sign up here! '}
                    textStyle={styles.fadedText}/>
                </View>

              </View>
            </TouchableWithoutFeedback>
          </Image>
      );
  }
}

const styles = StyleSheet.create({
  defaultContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1
  },
  InputContainer: {
    width: window.width - 100,
    padding: 25
  },
  login: {
    justifyContent: 'center',
    padding: 10,
  },
  defaulttext: {
    fontSize: 20,
    height: 50,
    textAlign: 'center',
    margin: 10,
    color: 'white',
    fontFamily: 'Montserrat-Regular'
  },
  fadedText: {
    fontSize: 15,
    height: 30,
    textAlign: 'center',
    margin: 10,
    color: 'gray',
    fontFamily: 'Montserrat-Regular'
  },
  backgroundImage: {
    flex: 1,
   // remove width and height to override fixed static size
   width: null,
   height: null,
   resizeMode: 'cover',
 },
 loginLogo: {
   alignItems: 'center',
   flexDirection: 'row',
   width: 200,
   height: 200,
   padding: 20,
   margin: -60
 },
 socialButton: {
   flexDirection: 'column',
   width: window.width - 125,
   height: 40,
   margin: 5,
   justifyContent: 'space-between'
 }
});
