import React, { Component } from 'react';
import {
    Image,
    TouchableHighlight,
} from 'react-native';

/*
  Touchable Image can take in as props:
    img={}
    imgStyle={}
    onPressFunc={}

    Ex.
    <TouchableImage
      img={require('image.png')}
      imgStyle={styles.container}
      onPressFunc={()=> this._navigate()}
    />
*/

export default class TouchableImage extends Component {
  render() {
    return(
      <TouchableHighlight onPress={this.props.onPressFunc}>
          <Image style={this.props.imgStyle}
            source={this.props.img}
          />
      </TouchableHighlight>
    );
  }
}
