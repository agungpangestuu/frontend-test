import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Dimensions, StyleSheet, Text, TouchableOpacity, BackHandler } from 'react-native'
import { TabNavigator } from "react-navigation";
import { Container,Content, Header, Item, Input, Icon, Body, Right, Left, Button, Title, Spinner } from 'native-base';
import axios from 'axios'
import { NavigationActions } from "react-navigation"

import {locationInBanten} from './locationInBanten'
import SeacrhInput from './AutoCompleteSearch';
import { getLocations, DirectLocation, getNearest, LocationUser } from "./store/actions"

var { height, width } = Dimensions.get("window");

class SearchBarExample extends Component {
  constructor(props){
    super(props)
    this.state = {
      location: '',
      latitude: null,
      longitude: null,
      error:null,
      distance: null,
      isLoading: true,
      loadingPress: false
    }
    this.handleBackAndroid = this._handleBackAndroid.bind(this)
  }
  componentDidMount(){
    var count = 0
    locationInBanten.forEach( (item, index) => {
        count = count + 1
        let origin = {
            lat: this.state.latitude || this.props.getLocation.lat,
            long: this.state.longitude || this.props.getLocation.long
          }
          let dest = {
            lat: item.lat,
            long: item.long
          }
          axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.lat},${origin.long}&destinations=${dest.lat},${dest.long}&key=AIzaSyAjWOHPrXscmVtlGBYIsi6ZrvF8ZYydteI`)
          .then(({data}) => {
            console.log(data)
            item.locat = data.rows[0].elements[0].distance.text
          })
          .catch(err => console.log(err))
    })
    if (count === locationInBanten.length) {
      this.setState({
        error: null,
        distance: locationInBanten,
        isLoading: false
      });
    }

    
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: this.props.getLocation.lat,
          longitude: this.props.getLocation.long,
        });      
      },
      (error) => {
        this.setState({ error: error.message })
        console.log(error)
      },
      { enableHighAccuracy: false, timeout: 50000, maximumAge: 1000 }
    );
    BackHandler.addEventListener('hardwareBackPress', this.handleBackAndroid);
  }

  _handleBackAndroid() {
    this.props.navigation.goBack()
    return true;
  } 

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackAndroid)
  }

  _handleOnpressLocation(item) {
    console.log('ini item ', item)

    this.setState({isLoading: true})
    this.props.postDirectLocation(item.text)
    this.props.locationActions({lat: item.lat, long: item.long})
    this.props.getNearest(item.lat, item.long).then(result => {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'MainPage' }),
        ],
      });
      this.props.navigation.dispatch(resetAction);
    }).catch(err => console.log(err))
  }

  _handleOnpressDetectLocation(){
    this.setState({isLoading: true})
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.latitude},${this.state.longitude}&sensor=false&key=AIzaSyAjWOHPrXscmVtlGBYIsi6ZrvF8ZYydteI`)
    .then(({data}) => {
      data.results.forEach(item => {
        if(item.types.includes("administrative_area_level_2") || item.types.includes("administrative_area_level_3")){
          this.props.postDirectLocation(item.formatted_address) 
        }
      })
    })
    .catch(err => console.log(err))   
   
    this.props.getNearest(this.state.latitude, this.state.longitude).then(result => {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'MainPage' }),
        ],
      });
      this.props.navigation.dispatch(resetAction);
    }).catch(err => console.log(err))
    
  }
  
  render() {
    { 
      if (!this.state.isLoading) {
        return (
          <Container>
            <Header hasTabs
              androidStatusBarColor="#D28496"
              style={{ backgroundColor: "#D28496", marginLeft: 0}}
            >
              <Left>
                <Button transparent IconLeft IconRight onPress={() => this.props.navigation.goBack()}>
                  <Icon name="ios-close" style={{ marginLeft: 10, fontSize: 30, color: "white", }} />
                </Button>
              </Left>
              <Body
                style={{
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                  flex:1,
                  flexGrow: 2,
                  flexShrink: 1,
                  marginRight: 30
                }}
              >
                <Title style={{ fontFamily: "niagara", fontSize: 30}}>Select Location</Title>
                
              </Body>
              
            </Header>
            <Content style={{backgroundColor: 'white'}}>
            
            <SeacrhInput locationActions={this.props.locationActions} navigate={this.props.navigation.navigate} getNearest={this.props.getNearest}/>
            <TouchableOpacity onPress={() => this._handleOnpressDetectLocation()}>
              <View style={styles.container}>
                <Icon name="ios-locate-outline" style={{ fontSize: 30, color: "red" }}/>
                <Text style={styles.title}> Detect my location</Text>
              </View>
            </TouchableOpacity>
            <View style={{marginTop: 20}}>
              <Text style={styles.headerLocation}>Location In Banten</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row', marginLeft: 10, marginRight: 10, flexWrap: "wrap"}}>
            {this.state.distance.map(item => {
              return ( 
                <TouchableOpacity onPress={(item) => this._handleOnpressLocation(item)}>
                <View style={styles.location}>
                  <Text>{item.text}</Text>
                  <Text>{item.locat}</Text>
                </View>
                </TouchableOpacity>
              )
            })}
              
            </View>
            <View style={{flex: 1, marginTop: 30}}>
              <Text style={styles.headerLocation}>Recent Locations</Text>
              <View style={{flex: 1,flexDirection: 'row',marginTop: 10 }}>
                <Icon name="ios-pin" style={{alignSelf: 'center',marginLeft: 25, marginRight: 10, fontSize: 20}} />
                <Text style={{fontSize: 17, alignSelf: 'center'}}>Cilegon</Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row', marginTop: 10 }}>
                <Icon name="ios-pin" style={{alignSelf: 'center',marginLeft: 25, marginRight: 10, fontSize: 20}} />
                <Text style={{fontSize: 17, alignSelf: 'center'}}>Serpong</Text>
              </View>
            </View>
            </Content>
          </Container>
        );
      } 

      else {
        if(this.state.loadingPress) {
          return (
            <View style={{flex: 1,alignContent: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(52, 52, 52, 0.8)'}}>
                <Spinner color="blue" style={{alignSelf: 'center'}}/>
            </View>
          );
        } else {
          return (
            <View style={{flex: 1,alignContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
                <Spinner color="blue" style={{alignSelf: 'center'}}/>
            </View>
          );
        }
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: '#000',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
  },
  title: {
    fontSize: 15,
    fontWeight: '100',
    fontFamily: 'roboto',
  },
  activeTitle: {
    color: 'red',
  },
  containerSearch: {
    height: 50,
    backgroundColor: '#D28496',
    flex: 1
  },
  inputSearch: {
    height: 25,
    marginLeft: 20,
    marginRight:20
  },
  textBox: {
    marginTop: 5,
    fontFamily: 'niagara',
    color: 'white'
  },
  location: {
    borderWidth: 2,
    borderColor: '#000',
    marginLeft: 10,
    marginVertical: 0,
    marginTop: 20,
    alignItems: 'center',
    width: width/3-20,
    height: 50
  },
  headerLocation: {
    fontSize: 20,
    fontFamily: 'roboto',
    marginLeft: 5
  }
});

const mapStateToProps = (state) => ({
  getLocation: state.location
})

const mapDispatchToProps = (dispatch) => ({
  actionGetLocation: (origin, dest) => { dispatch(getLocations(origin, dest)) },
  postDirectLocation: (data) => dispatch(DirectLocation(data)),
  getNearest: (lat, long) => dispatch(getNearest(lat, long)),
  locationActions : (loc) => dispatch(LocationUser(loc))   
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBarExample)