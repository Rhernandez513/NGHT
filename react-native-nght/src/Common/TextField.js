import React, { Component } from 'react';
import {
    TextInput,
} from 'react-native';

/*
  TextField can take in as props:
    (Inherits from TextInput)

    Creates a multi-line text field to type into.
*/

export default class TextField extends Component {
  state = {
      text: 'This is a description.',
      height: 50
   }

   onTextChange(event) {
     const { contentSize, text } = event.nativeEvent;

     this.setState({
        text: text,
        height: contentSize.height > 100 ? 100 : contentSize.height
     });
   }

  render() {
    return(
      <TextInput
        multiline={true}
        style={{
          height: this.state.height,
          fontFamily: 'Montserrat-ExtraLight',
          fontSize: 12,
          color: 'gray',
        }}
        onChange={this.onTextChange.bind(this)}
        value={this.state.text}
      />
    );
  }
}
