import React, { Component } from 'react';
import {
    Text,
    TouchableHighlight,
} from 'react-native';

/*
  Touchable Text can take in as props:
    text={}
    textStyle={}
    onPressFunc={}

    Ex.
    <TouchableText
      text={'example text'}
      textStyle={styles.defaultText}
      onPressFunc={()=> this._navigate()}
    />
*/

export default class TouchableText extends Component {
  render() {
    return(
      <TouchableHighlight onPress={this.props.onPressFunc}>
          <Text
            style={this.props.textStyle}>
            {this.props.text}
          </Text>
      </TouchableHighlight>
    );
  }
}
