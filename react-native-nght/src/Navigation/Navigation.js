import React, { Component } from 'react';
import {
    Navigator,
    Dimensions,
    BackAndroid,
    AsyncStorage
} from 'react-native';

import { Menu } from '../Common';
import SideMenu from 'react-native-side-menu';

import {
  SplashScene,
  HomeScene,
  ReserveScene,
  MenuScene,
  ProfileScene,
  SettingsScene,
  FriendScene,
  LoginScene,
  SignupScene,
  VenueMapScene
} from '../Screens';

import {
  getStoredState,
  createPersistor
} from 'redux-persist';

import ConfigureStore from '../Store/ConfigureStore';

let __navigator = null;
const store = ConfigureStore();
const persistConfig = { storage: AsyncStorage };
const window = Dimensions.get('window');

BackAndroid.addEventListener('hardwareBackPress', () => {
    if (__navigator && __navigator.getCurrentRoutes().length > 1) {
        __navigator.pop();
        return true;
    }
    return false;
});

getStoredState(persistConfig, (err, restoredState) => {
    const persistor = createPersistor(store, persistConfig);
});

export default class Navigation extends Component {

    renderScene(route, navigator) {
      const menu = <Menu navigator={navigator} store={store}/>;

      switch (route.name) {
        case "SplashScene":
            return <SplashScene navigator={navigator} store={store} />;
            break;
        case "LoginScene":
            return <LoginScene navigator={navigator} store={store} />;
            break;
        case "SignupScene":
            return <SignupScene navigator={navigator} store={store} />;
            break;
        case "HomeScene":
            return(<SideMenu menu={menu} openMenuOffset={window.width * .35} scrollsToTop={false}>
            <HomeScene navigator={navigator} store={store} />
            </SideMenu>);
            break;
        case "ProfileScene":
            return(<SideMenu menu={menu} openMenuOffset={window.width * .35} scrollsToTop={false}>
               <ProfileScene navigator={navigator} store={store} />
               </SideMenu>);
            break;
        case "VenueMapScene":
            return(<SideMenu menu={menu} openMenuOffset={window.width * .35} scrollsToTop={false}>
              <VenueMapScene navigator={navigator} store={store} />
              </SideMenu>);
            break;
        case "ReserveScene":
            return(<SideMenu menu={menu} openMenuOffset={window.width * .35} scrollsToTop={false}>
              <ReserveScene navigator={navigator} store={store} />
              </SideMenu>);
            break;
        case "MenuScene":
            return(<SideMenu menu={menu} openMenuOffset={window.width * .35} scrollsToTop={false}>
              <MenuScene navigator={navigator} store={store} />
              </SideMenu>);
            break;
        case "FriendScene":
            return(<SideMenu menu={menu} openMenuOffset={window.width * .35} scrollsToTop={false}>
              <FriendScene navigator={navigator} store={store} />
              </SideMenu>);
            break;
          case "SettingsScene":
              return <SettingsScene navigator={navigator} store={store} />;
              break;
      }
    }

    render() {
        return (
            <Navigator
              ref={(nav) => {__navigator = nav}}
              initialRoute={{name: 'SplashScene'}}
              renderScene={this.renderScene}
              configureScene={ () => { return Navigator.SceneConfigs.FadeAndroid; }}
            />
        );
    }
}
