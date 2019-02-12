import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
 } from 'react-native';

 import Images from '../Assets/images';

 import {
   TouchableImage,
   TextField
 } from '../Common';

import { Navbar } from 'navbar-native';
import { Hoshi } from 'react-native-textinput-effects/lib';

const window = Dimensions.get('window');
const dismissKeyboard = require('dismissKeyboard');

export default class ProfileScene extends Component {
  render() {
    return (
      <Image style={styles.backgroundImage} source={Images.bg_profile}>
      <Image style={styles.gradient} source={Images.bg_profile_gradient}>

        <Navbar
          title={"My Profile"}
          bgColor={"transparent"}
          theme={"dark"}
          left={{
              icon: "ios-menu",
              onPress: () => this.props.navigator.push({name: "SettingsScene"})
            }}
          right={[{
            icon: "ios-camera"
          },{
            icon: "ios-create",
          }]}
        />
        <TouchableWithoutFeedback onPress={()=> dismissKeyboard()}>
        <View style={styles.container}>
          <View style={styles.emptyContainer}></View>
          <NameTitle name={(this.props.store.getState().service == "facebook") ?
            this.props.store.getState().user_data.first_name :
            "NGHT App"}
             age={21} />
          <LoginInfo name={'NGHT APP'} />
          <AboutMe />
          <SaveChanges />
        </View>
        </TouchableWithoutFeedback>
      </Image>
      </Image>
    );
  }
}

class NameTitle extends Component {
  render() {
    return(
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{this.props.name}</Text>
        <Text style={styles.age}>{this.props.age}</Text>
      </View>
    );
  }
}

class LoginInfo extends Component {
  render() {
    return(
      <View style={styles.loginContainer}>
        <View style={styles.loginSubContainer}>
          <Text style={styles.subTitle}>Username</Text>
          <Hoshi
          style={styles.textEntry}
          label={'New Name'}
          onChangeText={(name) => this.setState({name})}
          autoCorrect={false}
          borderColor={'#ffffff'}
           />
        </View>
        <View style={styles.loginSubContainer}>
          <Text style={styles.subTitle}>Password</Text>
          <Hoshi
          style={styles.textEntry}
          label={'New Password'}
          onChangeText={(pass) => this.setState({pass})}
          autoCorrect={false}
          secureTextEntry={true}
          borderColor={'#ffffff'}
           />
        </View>
      </View>
    );
  }
}

class AboutMe extends Component {
  render() {
    return(
      <View style={styles.aboutContainer}>
        <Text style={styles.subTitle}>About You{'\n'}</Text>
        <TextField />
      </View>
    );
  }
}

class SaveChanges extends Component {
  _saveChanges() {

  }

  render() {
    return(
      <View style={styles.saveContainer}>
        <TouchableImage
          img={Images.save_changes_button}
          imgStyle={styles.socialButton}
          onPressFunc={() => this._saveChanges()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  emptyContainer: {
    flex: 2.5
  },
  outerDiv: {
    //backgroundColor: 'black',
    //flex: 1,
  },
  backgroundImage: {
   flex: 1,
   // remove width and height to override fixed static size
   width: null,
   height: null,
   resizeMode: 'cover',
 },
 gradient: {
  flex: 1,
  // remove width and height to override fixed static size
  width: null,
  height: null,
  resizeMode: 'cover',
},
 socialButton: {
   width: window.width - 125,
   height: 45,
 },
 titleContainer: {
   flex: 0.5,
   flexDirection: 'row',
   justifyContent: 'flex-start',
   margin: 20
 },
 title: {
   color: 'white',
   fontFamily: 'Montserrat-Bold_0',
   fontSize: 30,
 },
 age: {
   color: 'orange',
   fontFamily: 'Montserrat-Light_0',
   justifyContent: 'space-around',
   fontSize: 15,
 },
 loginContainer: {
   flex: 0.75,
   //flexDirection: 'row',
   //justifyContent: 'center',
   margin: 20,
   flexDirection: 'row',
 },
 subTitle: {
   fontFamily: 'Montserrat-Regular',
   fontSize: 15,
   color: 'white',
 },
 textEntry: {

 },
 loginSubContainer: {
   flex: 1,
   margin: 5
 },
 aboutContainer: {
   flex: 1.5,
   margin: 20,
   //borderRadius: 5, Seems to make app unstable
   //borderColor: 'white'
 },
 saveContainer: {
   flexDirection: 'row',
   justifyContent: 'center',
   margin: 15
 },
});
