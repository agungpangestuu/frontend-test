import React, { Component } from "react";
import { View, Image, Text, AsyncStorage } from "react-native";
import { Icon } from "native-base";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const getRecentLocation = async () => {
  let recentLocation = await AsyncStorage.getItem("recentLocation")
  if(recentLocation) {
    return JSON.parse(recentLocation)
  } else {
    return []
  }
}

export default class SearchBox extends Component {
  render() {
    return (
      <GooglePlacesAutocomplete
        placeholder="Search"
        minLength={2} // minimum length of text to search
        autoFocus={false}
        returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        listViewDisplayed="auto" // true/false/undefined
        fetchDetails={true}
        renderDescription={row => row.description} // custom description render
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          this.props.loadingAction(true)
          getRecentLocation().then(async (recentLocation) => {
            let dataRecent = {
              text: data.structured_formatting.secondary_text,
              lat: details.geometry.location.lat,
              long: details.geometry.location.lng
            }
            console.log(dataRecent)
            recentLocation.pop(dataRecent)
            let result = await AsyncStorage.setItem("recentLocation", JSON.stringify(recentLocation))
            console.log(result)
          })
          console.log(data, details.geometry.location);
          this.props.postDirectLocation(data.structured_formatting.secondary_text)
          this.props.locationActions(details.geometry.location)
          this.props.getNearest(details.geometry.location.lat, details.geometry.location.lng).then(result => {
            this.props.navigate({routeName: 'MainPage', key: 'MainPage1'})
          })
          .catch(err => {
            console.log(err)
          })
          
          
        }}
        getDefaultValue={() => ""}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: "AIzaSyAjWOHPrXscmVtlGBYIsi6ZrvF8ZYydteI",
          language: "en", // language of the results
          types: "geocode" // default: 'geocode'
        }}
        styles={{
          textInputContainer: {
            width: "100%",
            backgroundColor: '#D28496',
            marginTop: 0
          },
          description: {
            fontWeight: "bold"
          },
          predefinedPlacesDescription: {
            color: "#1faadb"
          }
        }}
        currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
        currentLocationLabel="Current location"
        nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={
          {
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }
        }
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: "distance",
          types: "food"
        }}
        filterReverseGeocodingByTypes={[
          "locality",
          "administrative_area_level_3"
        ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        //predefinedPlaces={[homePlace, workPlace]}
        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      />
    );
  }
}
