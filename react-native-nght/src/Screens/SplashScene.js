import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Dimensions
} from 'react-native';

// This is correct syntax but causes a navigator warning
//import { appInit } from '../Actions/Actions'
import appInit from '../Actions/Actions'
import { TouchableImage } from '../Common';

import Images from '../Assets/images';

const window = Dimensions.get('window');

export default class SplashScene extends Component {
  async _load_stuff() {
      if (this.props.store != null && this.props.store.getState().navigator != null) {
        return;
      }

      while (true) {
          if (this.props.store != null) break;
          setTimeout(() => {}, 50)
      }
      if (this.props.store.getState().navigator != null) return;
      this.props.store.dispatch(appInit(/*{navigator: this.props.navigator}*/))

      while (true) {
          if (this.props.store.getState().navigator != null) break;
          setTimeout(() => {}, 50)
      }
      //alert('state loaded')
      //this._navigate()  // auto advance when async
  }
  _navigate() {
      //alert('2'+this.props.store)
      //alert(this.props.store.getState().navigator)
      if (this.props.store.getState().loggedIn == 'false') {
          this.props./*store.getState().*/navigator.push({name: "LoginScene"});
      } else {
          this.props./*store.getState().*/navigator.immediatelyResetRouteStack([{name: "HomeScene"}]);
      }
  }

  render() {
      // <insert a delay or check to make sure store is ready for use>
      this._load_stuff();  // make async for auto-advance
      //alert('13' + this.props.store.getState().navigator)
      //alert('8'+this.props.store.venueInfo) // should be same as #7
      return (
        <Image style={styles.backgroundImage} source={Images.bg_splash}>
          <TouchableImage
            img={Images.logo_splash}
            onPressFunc={() => this._navigate()}
            imgStyle={styles.splashLogo}/>
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
   alignItems: 'center',
  },
  splashLogo: {
  //flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  marginTop: 100,
  width: window.width * 0.65,
  height: window.height * 0.4,
  }
});
