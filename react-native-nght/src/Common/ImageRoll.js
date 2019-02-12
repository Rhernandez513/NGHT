import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    View,
    ScrollView,
} from 'react-native';

import TouchableImage from './TouchableImage';

/*
  ImageRoll can take in as props:
  list={}

  Ex.
  const array = [img.png, img2.png];

  <ImageRoll list={array} />
*/

export default class ImageRoll extends Component {
  render() {
    return(
      <View style={styles.container}>
      <ScrollView horizontal={true}>
      {
        this.props.list.map((l, i) => (
          <TouchableImage
            key={i}
            img={l.image}
            imgStyle={styles.image}
          />
        ))
      }
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    margin: 5,
    height: 50,
    width: 50,
  }
});
