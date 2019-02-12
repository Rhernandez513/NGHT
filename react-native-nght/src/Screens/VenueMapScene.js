import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Image
} from 'react-native';

import Images from '../Assets/images';

import { Navbar } from 'navbar-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { venueSelect } from '../Actions/Actions';

const customStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "weight": 1.5
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#263c3f"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6b9a76"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#38414e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#212a37"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9ca5b3"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#1f2835"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#f3d19c"
      }
    ]
  },
  {
    "featureType": "road.local",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2f3948"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#515c6d"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  }
];

export default class VenueMapScene extends Component {
    constructor(props) {
        super(props);
    }

    _selectedMarker = ''

    _markerPressed(event) {
        coords = [event.nativeEvent.coordinate.latitude,
                    event.nativeEvent.coordinate.longitude]
        selectedMarker = 'll' + coords[0] + coords[1]

        if (selectedMarker == this._selectedMarker) {
            for (idx=0; idx<this.props.store.getState().venueInfo.length; idx++) {
                venue = this.props.store.getState().venueInfo[idx];

                if ('ll' + venue.location.latitude + venue.location.longitude == selectedMarker) {
                    this._selectedMarker = '';
                    venue.id = selectedMarker;
                    this.props.store.dispatch(venueSelect(venue));
                    this.props.navigator.push({name: 'ReserveScene', store: this.props.store});
                    break;
                }
            }
        }
        this._selectedMarker = selectedMarker
    }

    render() {
        latitude = 0
        longitude = 0

        if (this.props.store.getState().venue != undefined) {
            // get last visited location
            latitude = this.props.store.getState().venue.location.latitude;
            longitude = this.props.store.getState().venue.location.longitude;
        } else {
            latitude = this.props.store.getState().venueInfo[0].location.latitude;
            longitude = this.props.store.getState().venueInfo[0].location.longitude;
        }
        return (
            <View style={styles.outerDiv}>
            <Navbar
              title={"Map View"}
              left={{
                icon: "ios-arrow-back",
                onPress: () => this.props.navigator.pop()
              }}
              right={{ }}
            />
                <MapView
                    provider={PROVIDER_GOOGLE}
                    customMapStyle={customStyle}
                    style={styles.map}
                    //showsUserLocation={true}
                    region={{
                      latitude: latitude,
                      longitude: longitude,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}
                    >
                    {this.props.store.getState().venueInfo.map(venue => (
                        <MapView.Marker
                            coordinate={venue.location}
                            onPress={(event) => this._markerPressed(event)}
                            title={venue.name}
                            description={venue.address}
                            key={venue.address}
                        >
                          <Image style={styles.marker}
                            source={Images.location} />
                        </MapView.Marker>
                    ))}
                </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  map: {
      ...StyleSheet.absoluteFillObject,
  },
  outerDiv: {
    backgroundColor: 'black',
    flex: 1,
  },
  marker: {
    height: 30,
    width: 25
  }
});
