import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableWithoutFeedback,
    KeyboardAvoidingView
} from 'react-native';

import Images from '../Assets/images';

import { Hoshi } from 'react-native-textinput-effects/lib';
import {
  TouchableText,
  TouchableImage
} from '../Common';

import {
    acctSignUp
} from '../Actions/Actions';

var hasher = require('../Scripts/SaltHashPass');

const window = Dimensions.get('window');
const dismissKeyboard = require('dismissKeyboard');

export default class SignupScene extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      form: {
        fullName: "",
        email: "",
        pass: ""
      }
    }
  }

  _emailValidation() {
      //preprocess for valid email and good password
      data = hasher.saltHashPass(this.state.form.pass);
      this.props.store.dispatch(acctSignUp({
         name: this.state.form.fullName,
         address: this.state.form.email,
         salt: data.salt,
         passwordHash: data.passwordHash
      }));
      //alert("thank you for signing up, " + this.state.form.fullName);
      this.props./*store.getState().*/navigator.push({name: "LoginScene"})
  }

    render() {
      const { fullName, email, pass } = this.state.form
        return (
          <Image style={styles.backgroundImage} source={Images.bg_signup}>
            <KeyboardAvoidingView behavior='position'>
            <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
            <View style={styles.defaultContainer}>

                {/*  Welcome / Logo */}
                <View>
                  <Text style={styles.defaulttext}>WELCOME</Text>
                  <Image style={styles.loginLogo} source={Images.logo}/>
                </View>

              {/*  Sign-Up Form */}
              <View style={styles.InputContainer}>
                <Hoshi
                  style={styles.login}
                  label={'Name'}
                  onChangeText={(fullName) => this.setState({ form: {fullName: fullName} })}
                  autoCorrect={false}
                  borderColor={'#ffffff'}
                  returnKeyType={'next'}
                  autoCapitalize={'words'}
                />
                <Hoshi
                  style={styles.login}
                  label={'E-mail'}
                  onChangeText={(email) => this.setState({ form: {email: email} })}
                  autoCorrect={false}
                  borderColor={'#ffffff'}
                  returnKeyType={'next'}
                  keyboardType={'email-address'}
                  autoCapitalize={'none'}
                />
                <Hoshi
                  style={styles.login}
                  label={'Password'}
                  onChangeText={(pass) => this.setState({ form: {pass: pass} })}
                  autoCorrect={false}
                  borderColor={'#ffffff'}
                  secureTextEntry={true}
                  returnKeyType={'go'}
                  autoCapitalize={'none'}
                />
              </View>

              {/*  Sign-Up Button */}
              <View>
                <TouchableImage
                  img={Images.signup_button}
                  imgStyle={styles.socialButton}
                  onPressFunc={() => this._emailValidation()}
                />
              </View>

              {/*  TOS Text */}
              <View>
                <Text style={styles.tosText}>
                  By signing up, you agree to the Terms of Service and Privacy Policity.
                </Text>
              </View>

              {/*  Log-in Prompt */}
              <View>
                <TouchableText
                  text={'Already have an account? Sign in here!'}
                  textStyle={styles.fadedText}
                  onPressFunc={() => this.props.navigator.push({name: "LoginScene"})}
                />
              </View>

              </View>
            </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
          </Image>
        );
    }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
   // remove width and height to override fixed static size
   width: null,
   height: null,
   resizeMode: 'cover',
 },
 defaultContainer: {
   alignItems: 'center',
   flexDirection: 'column',
 },
 defaulttext: {
   fontSize: 20,
   height: 50,
   textAlign: 'center',
   margin: 15,
   color: 'white',
   fontFamily: 'Montserrat-Regular'
 },
 loginLogo: {
   //flex: 1,
   alignItems: 'center',
   flexDirection: 'row',
   width: 200,
   height: 200,
   padding: 20,
   margin: -60
 },
 InputContainer: {
   width: window.width - 100,
   padding: 25
 },
 login: {
   justifyContent: 'center',
   padding: 10,
 },
 tosText: {
   fontSize: 10,
   height: 30,
   textAlign: 'center',
   margin: 10,
   color: 'gray',
   fontFamily: 'Montserrat-Regular',
   marginTop: -10
 },
 socialButton: {
   //flex: 1,
   flexDirection: 'column',
   width: window.width - 125,
   height: 40,
   margin: 20,
   justifyContent: 'space-between'
 },
 fadedText: {
   fontSize: 15,
   height: 30,
   textAlign: 'center',
   margin: 20,
   color: 'gray',
   fontFamily: 'Montserrat-Regular'
 },
});
