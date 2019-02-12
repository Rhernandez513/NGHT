import React, { Component } from 'react';
import {
    Image,
    TouchableHighlight,
    StyleSheet,
    Text,
    View
} from 'react-native';

/*
  IconwText can take in as props:
  icon={}
  text={}
  onPressFunc={}

  Ex.
  <IconwText
  icon={require('icon.png')}
  text={'1234 N. street road'}
  onPressFunc={() => redirect()}
  />
*/

export default class IconwText extends Component {
  render() {
    return(
      <TouchableHighlight onPress={this.props.onPressFunc}>
        <View style={styles.container}>

          {/* Icon */}
          <Image style={styles.icon}
            source={this.props.icon}/>

          {/* Text */}
          <Text style={styles.text}>
            {this.props.text}
          </Text>

        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  text: {
    fontFamily: 'Montserrat-Thin',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 15,
  },
  icon: {
    height: 22,
    width: 18,
    marginRight: 10
  }
});
