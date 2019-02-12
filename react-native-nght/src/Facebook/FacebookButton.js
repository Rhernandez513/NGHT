import React, { Component } from 'react';

import {
  StyleSheet,
  Dimensions,
} from 'react-native';

import { acctSignIn } from '../Actions/Actions';
import { FBLoginManager } from 'react-native-facebook-login';

import {
  TouchableImage
} from '../Common';

import Images from '../Assets/images';

const window = Dimensions.get('window');

export default class FaceBookButton extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user_data: {
        name: "",
        first_name: "",
        last_name: "",
        email: "",
        age_range: "",
        link: "",
        picture: "",
        gender: "",
        locale: "",
        timezone: ""
      },
      loggedIn: "",
      auth: "",
      service: ""
    };
  }

  /* Object returned
    permissions:{},
    token,
    token_expire_time,
    FBuserID

    profile: {
      id:"242200496243894",
      "name":"NghtApp",
      "email":"nghtmobileapp@gmail.com",
      "first_name":"Nght",
      "last_name":"App",
      "age_range":{"min":21},
      "link":"https:\/\/www.facebook.com\/app_scoped_user_id\/242200496243894\/",
      "picture":{
        "data":{
          "is_silhouette":true,
          "url":"https:\/\/scontent.xx.fbcdn.net\/v\/t1.0-1\/c15.0.50.50\/p50x50\/10354686_10150004552801856_220367501106153455_n.jpg?oh=f0d5b6e66b43161243882411a2d92d75&oe=59606E2F"
        }
      },
      "gender":"male",
      "locale":"en_US",
      "timezone":-5,
      "updated_time":"2016-10-15T15:48:02+0000",
      "verified":true
    }
  */

  _fetchUserInfo(userId, token) {
    var api = `https://graph.facebook.com/v2.3/${userId}?
    fields=name,email,first_name,last_name,age_range,link,picture,gender,locale,timezone&
    access_token=${token}`;

    fetch(api)
      .then((response) => response.json())
      .then((responseData) => {

        console.log(this.props.store.getState());

        this.props.store.dispatch(acctSignIn( {
          user_data: {
            name: responseData.name,
            first_name: responseData.first_name,
            last_name: responseData.last_name,
            email: responseData.email,
            age_range: responseData.age_range,
            link: responseData.link,
            picture: responseData.picture,
            gender: responseData.gender,
            locale: responseData.locale,
            timezone: responseData.timezone
          },
          loggedIn: "true",
          auth: "true",
          service: "facebook"
        }
        ));
      }).done();

      this.props.navigator.immediatelyResetRouteStack([{name: "HomeScene"}]);
  }

  _login() {

    FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Native);

    FBLoginManager.loginWithPermissions([
      "user_location","user_birthday","user_about_me","user_friends","email"],
    (error, data) => {
      if (!error) {
        console.log("Login data: ", data);
        var userId = data.credentials.userId;
        var token = data.credentials.token;

        this._fetchUserInfo(userId, token);

    } else {
      console.log("Error: ", error);
    }
    })
  }

  render() {
    return(
      <TouchableImage
        img={Images.facebook_button}
        imgStyle={styles.socialButton}
        onPressFunc={() => this._login()}
        />
    );
  }
}

const styles = StyleSheet.create({
 socialButton: {
   flexDirection: 'column',
   width: window.width - 125,
   height: 40,
   margin: 5,
   justifyContent: 'space-between'
 }
});
