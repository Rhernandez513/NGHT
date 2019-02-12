import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';

import Images from '../Assets/images';

import {
  List,
  ListItem
} from 'react-native-elements';

import { Navbar } from 'navbar-native';

const dismissKeyboard = require('dismissKeyboard');

// import { DATA_INTERFACE } 'interfaces/redisInterface.js';

// Hardcoded for now*
const list = [
  {
    name: 'Alex Chan',
    avatar: Images.logo_bg,
  },{
    name: 'Andrew Phillips',
    avatar: Images.logo_bg,
  },{
    name: 'Christopher Hernandez',
    avatar: Images.logo_bg,
  },{
    name: 'Joaquin Davalos',
    avatar: Images.logo_bg,
  },{
    name: 'Jose Samaniego',
    avatar: Images.logo_bg,
  },{
    name: 'Juan Ortiz',
    avatar: Images.logo_bg,
  },{
    name: 'Manuel Ortiz',
    avatar: Images.logo_bg,
  },{
    name: 'Ramel Mesinovic',
    avatar: Images.logo_bg,
  },{
    name: 'Robert Hernandez',
    avatar: Images.logo_bg,
  },{
    name: 'Friend_01',
    avatar: Images.logo_bg,
  },{
    name: 'Friend_02',
    avatar: Images.logo_bg,
  },{
    name: 'Friend_03',
    avatar: Images.logo_bg,
  }
]

export default class FriendScene extends Component {
  render() {
    return(
      <Image style={styles.backgroundImage} source={Images.bg_login}>
      <View style={styles.outerDiv}>
      <Navbar
        title={"Friends List"}
        left={{
          icon: "ios-arrow-back",
          onPress: () => this.props.navigator.pop()
        }}
        right={{ }}
      />
      </View>
      <ScrollView keyboardDismissMode={'on-drag'}>
        <List>
        {
          list.map((l, i) => (
            <ListItem
              roundAvatar
              avatar={l.avatar}
              key={i}
              title={l.name}
              hideChevron={true}
              badge={{
                value: 'Attending Irelands!',
                badgeTextStyle: styles.badgeText,
                badgeContainerStyle: styles.badgeContainer
              }}
            />
          ))
        }
        </List>
      </ScrollView>
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
 outerDiv: {
   marginBottom: -19
 },
 container: {
   flex: 1,
 },
 badgeText: {
   color: 'orange',
   fontFamily: 'Montserrat-Regular',
   fontSize: 10
 },
 badgeContainer: {
   marginTop: 5,
   flexDirection: 'row',
   flex: 1,
   backgroundColor: 'transparent'

 }
});
