import React, { Component } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  Dimensions
} from 'react-native';

import Images from '../Assets/images';

import {
    acctSignOut,
} from '../Actions/Actions';

import TouchableImage from './TouchableImage';

import AwesomeCardIOView from '../Stripe/AwesomeCardIOView';

const window = Dimensions.get('window');

export default class Menu extends Component {
  _logout() {
    this.props.store.dispatch(acctSignOut('email'));
    this.props.navigator.immediatelyResetRouteStack([{name: "LoginScene"}]);
    }

    render() {
        return (
          <ScrollView style={styles.container}>
            <View style={styles.centerContainer}>

              <TouchableImage
                img={Images.menu_home}
                onPressFunc={() => this.props.navigator.push({name: "HomeScene"})}
                imgStyle={styles.menuIcons}/>
              <TouchableImage
                img={Images.menu_profile}
                onPressFunc={() => this.props.navigator.push({name: "ProfileScene"})}
                imgStyle={styles.menuIcons}/>
              <TouchableImage
                img={Images.menu_friend}
                onPressFunc={() => this.props.navigator.push({name: "FriendScene"})}
                imgStyle={styles.menuIcons}/>
              <TouchableImage
                img={Images.menu_orders}
                imgStyle={styles.menuIcons}/>

              <AwesomeCardIOView />

              <TouchableImage
                img={Images.menu_settings}
                onPressFunc={() => this.props.navigator.push({name: "SettingsScene"})}
                imgStyle={styles.menuIcons}/>

              <TouchableImage
                img={Images.menu_logout}
                onPressFunc={() => this._logout()}
                imgStyle={styles.menuIcons}/>

            </View>
          </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#2D3E50',
  },
  centerContainer: {
    alignItems: 'center'
  },
  menuIcons: {
    width: window.width * 0.25,
    height: window.height * 0.15,
    margin: 20,
  }
});
