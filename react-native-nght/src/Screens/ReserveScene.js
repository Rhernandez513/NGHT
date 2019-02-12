import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import {
  TouchableImage,
  TouchableText,
  IconwText,
  EventCalendar,
  ImageRoll
} from '../Common';
import Images from '../Assets/images';
import { Navbar } from 'navbar-native';

var _venue = null
const images = [{
    image: Images.club_01
  },{
    image: Images.club_02
  },{
    image: Images.club_03
  },{
    image: Images.club_04
  },{
    image: Images.club_05
  },{
    image: Images.club_06
  },{
    image: Images.club_01
  },{
    image: Images.club_02
  },{
    image: Images.club_03
  },{
    image: Images.club_04
  },{
    image: Images.club_05
  },{
    image: Images.club_06
  },{
    image: Images.club_01
  },{
    image: Images.club_02
  },{
    image: Images.club_03
  },{
    image: Images.club_04
  },{
    image: Images.club_05
  },{
    image: Images.club_06
  },{
    image: Images.club_01
  },{
    image: Images.club_02
  },{
    image: Images.club_03
  },{
    image: Images.club_04
  },{
    image: Images.club_05
  },{
    image: Images.club_06
  }
];

export default class ReserveScene extends Component {
  render() {
      _venue = this.props.store.getState().venue;
    return (
      <Image source={Images.bg_home} style={styles.backgroundImage}>
        <View style={styles.outerDiv}>
            <Navbar
              title={"Make Reservation"}
              left={{
                icon: "ios-arrow-back",
                onPress: () => this.props.navigator.pop()
              }}
              right={{
                icon: "ios-book"
              }}
            />
            <View style={styles.innerDiv}>

              <Date
                eventTime={"9:30"}
                eventName={"NGHT Launch!"}
                isPM={true}
                month={'JAN'}
                date={24}
                day={'SAT'}
              />
              <VenueTitle navigator={this.props.navigator} store={this.props.store}/>
              <VenueInfo />

              <PhotoRoll list={images}/>

            </View>
        </View>
        </Image>
    );
  }
}

class Date extends Component {
  render() {
    return (
      <View style={styles.dateContainer}>

        <View style={styles.dateLeftContainer}>
          {/* Little Calendar Thing */}
          <EventCalendar
            month={this.props.month}
            date={this.props.date}
            day={this.props.day}
            />
        </View>

        <View style={styles.dateRightContainer}>
          {/* Event Name */}
          <Text style={styles.eventName}>
            {this.props.eventName}
          </Text>
          <View style={styles.timeContainer}>
            {/* Time Of Event */}
            <Text style={styles.time}>
              {this.props.eventTime}
            </Text>
            {/* AM / PM */}
            <Text style={styles.meridiem}>{this.props.isPM ? 'PM' : 'AM'}</Text>
          </View>
        </View>

      </View>
    );
  }
}

class VenueTitle extends Component {

  render() {
    return (
      <View style={styles.TitleContainer}>
      <View style={styles.titleLeftContainer}>
        {/* Venue Name */}
        <Text style={styles.VenueTitle}>
          {_venue.name}
        </Text>
      </View>
      <View style={styles.titleRightContainer}>
        {/* Get In Button */}
        <TouchableImage
          img={Images.getin_button}
          imgStyle={styles.getinButton}
          onPressFunc={() => this.props.navigator.push({name: 'MenuScene', store: this.props.store})}
        />
      </View>
      </View>
    );
  }
}

class VenueInfo extends Component {
  render() {
    return (
      <View style={styles.infoContainer}>
        <View style={styles.descContainer}>
          {/* Description */}
          <Text style={styles.desc}>
            {_venue.desc}
          </Text>
        </View>

        <View style={styles.venueInfoContainer}>
        {/* Address */}
        <IconwText
          text={_venue.address}
          icon={Images.location}
        />

        {/* Phone Number */}
        <IconwText
          text={_venue.phone}
          icon={Images.phone}
        />
        </View>

      </View>
    );
  }
}

class PhotoRoll extends Component {
  render() {
    var activeImage = 1;
    return (
      <View style={styles.photoRollContainer}>
        <View style={styles.rollTextcontainer}>
          <View style={styles.rollLeftContainer}>

            {/* Photos */}
            <Text style={styles.rollHeader}>Photos</Text>
            {/* Previous */}
            <TouchableText
              text={'Previous'}
              textStyle={styles.rollHighlight}
            />

          </View>
          <View style={styles.rollRightContainer}>
            {/* Total Image Number */}
            <Text style={styles.rollHeader}>{this.props.list.length}</Text>
            {/* Next */}
            <TouchableText
              text={'Next'}
              textStyle={styles.rollHighlight}
            />

          </View>
        </View>
        {/* Photo Viewer Component */}
        <View style={styles.PhotoContainer}>
          <ImageRoll
            list={this.props.list}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerDiv: {
    flex: 1,
  },
  innerDiv: {
    flex: 1,
    padding: 20,
  },
  backgroundImage: {
    flex: 1,
   // remove width and height to override fixed static size
   width: null,
   height: null,
   resizeMode: 'cover',
 },
  getinButton: {
    height: 40,
    width: 125
  },
  dateContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  dateLeftContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  dateRightContainer: {
    flexDirection: 'column',
    marginTop: 22
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: -8,
  },
  eventName: {
    fontFamily: 'Montserrat-Regular',
    color: 'white',
    fontSize: 30,
  },
  time: {
    color: 'white',
    fontFamily: 'Montserrat-Light_0',
    fontSize: 80
  },
  meridiem: {
    color: 'rgba(255, 165, 0, 0.9)',
    fontFamily: 'Montserrat-ExtraLight',
    fontSize: 15,
    paddingLeft: 5,
    paddingTop: 55
  },
  TitleContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 5
  },
  titleLeftContainer: {
    marginRight: 5,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  titleRightContainer: {
    marginLeft: 5,
    padding: 5,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  VenueTitle: {
    color: 'white',
    fontFamily: 'Montserrat-Bold_0',
    fontSize: 35,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    margin: 10,
    justifyContent: 'space-around'
  },
  venueInfoContainer: {
    justifyContent: 'space-between'
  },
  descContainer: {
    marginBottom: 10
  },
  desc: {
    fontFamily: 'Montserrat-ExtraLight',
    color: 'rgba(255, 255, 255, 0.95)',
    fontSize: 15
  },
  photoRollContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  rollTextcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rollLeftContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: 10,
    },
  rollRightContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: 10,
  },
  rollHeader: {
    fontFamily: 'Montserrat-Regular',
    color: 'white',
    fontSize: 23
  },
  rollHighlight: {
    fontFamily: 'Montserrat-ExtraLight',
    color: 'rgba(255, 255, 255, 0.95)',
    fontSize: 18
  },
  PhotoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
});
