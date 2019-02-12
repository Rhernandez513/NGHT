import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  TextInput,
  ListView,
  AsyncStorage,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native';

import Images from '../Assets/images';

import { Navbar } from 'navbar-native';

const dismissKeyboard = require('dismissKeyboard');
const window = Dimensions.get('window');

let __navigator = null;

export default class HomeScene extends Component {
  _Profile() {
    this.props./*store.getState().*/navigator.push({name: "ProfileScene"});
  }

  render() {
    return (
      <Image source={Images.bg_home} style={styles.backgroundImage}>
      <View style={styles.container}>
      <View style={styles.outerDiv}>
        <Navbar
          title={"Welcome"}
          left={{ }}
          right={{
            icon: "ios-search",
            onPress: () => this.props.navigator.push({name: "VenueMapScene"})
          }}
        />
      </View>
        <View style={styles.home}>
          <HomeImageRow textL={'Bars'} textR={'Pubs'} imgL={Images.club_01} imgR={Images.club_02}/>
          <HomeImageRow textL={'Jazz Clubs'} textR={'Social'} imgL={Images.club_03} imgR={Images.club_04}/>
          <HomeImageRow textL={'Night Clubs'} textR={'Other'} imgL={Images.club_05} imgR={Images.club_06}/>
        </View>
      </View>
      </Image>
      );
  }
}

class HomeImageRow extends Component {
  render() {
    return(
      <View style={styles.homeSects}>

      <TouchableOpacity>
        <Image source={this.props.imgL}
          style={styles.homeImages}
        >
        <Text style={styles.subText}>{this.props.textL}</Text>
        </Image>
      </TouchableOpacity>

      <TouchableOpacity>
        <Image source={this.props.imgR}
          style={styles.homeImages}
        >
        <Text style={styles.subText}>{this.props.textR}</Text>
        </Image>
      </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#000000',
  },
  backgroundImage: {
    flex: 1,
   // remove width and height to override fixed static size
   width: null,
   height: null,
   resizeMode: 'cover',
 },
  outerDiv: {
    //backgroundColor: 'black',
  },
  home: {
    flex: 1,
    flexDirection: 'column'
  },
  homeSects: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    margin: 20,
  },
  homeImages: {
    width: window.width / 2.5,
    height: window.height / 4,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  subText: {
    fontSize: 15,
    height: 30,
    color: 'white',
    fontFamily: 'Montserrat-Bold_0'
  }
});
