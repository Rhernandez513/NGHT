import React, { Component } from 'react';
import {
    Image,
    TouchableHighlight,
    StyleSheet,
    Text,
    View
} from 'react-native';

/*
  EventCalendar can take in as props:
  month={}
  date={}
  day={}

  Ex.
  <EventCalendar
  month={'DEC'}
  date={24}
  day={'SAT'}
  />
*/

export default class EventCalendar extends Component {
  render() {
    return(
      <View style={styles.container}>

        {/* Month */}
        <Text style={styles.time}>
          {this.props.month}
        </Text>

        {/* Date */}
        <Text style={styles.date}>
          {this.props.date}
        </Text>

        {/* Day of Week */}
        <Text style={styles.day}>
          {this.props.day}
        </Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: 15,
    marginRight: 15,
    backgroundColor: 'rgba(231, 235, 238, 0.5)',
    padding: 15
  },
  time: {
    fontFamily: 'Montserrat-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 25,
  },
  date: {
    fontFamily: 'Montserrat-Bold',
    color: 'rgba(255, 165, 0, 0.8)',
    fontSize: 25,
  },
  day: {
    fontFamily: 'Montserrat-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 25,
  }
});
