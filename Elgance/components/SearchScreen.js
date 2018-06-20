import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Dimensions, StyleSheet, Text, TouchableOpacity, BackHandler, NativeModules, processColor } from 'react-native'
// import { TabNavigator } from "react-navigation";
import { Container,Content, Header, Item, Input, Icon, Body, Right, Left, Button, Title } from 'native-base';
import {CirclesLoader, TextLoader} from 'react-native-indicator'
import axios from 'axios'
import { NavigationActions } from "react-navigation"

import {locationInBanten} from './locationInBanten'
import SeacrhInput from './AutoCompleteSearch';
import { getLocations, DirectLocation, getNearest, LocationUser, isLoading } from "./store/actions"

var { height, width } = Dimensions.get("window");
const { StatusBarManager } = NativeModules;

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
      loadingPress: false,
      did: false,
      will: false
    }
    this.handleBackAndroid = this._handleBackAndroid.bind(this)
    this.handleLoading = this._handleLoading.bind(this)
  }
  _getLocationInBanten(){
    var count = 0
    var result = []
    locationInBanten.forEach(async (item, index) => {
        count = count + 1
        let origin = {
            lat: this.state.latitude,
            long: this.state.longitude 
          }
          let dest = {
            lat: item.lat,
            long: item.long
          }
          
          console.log('ini orgin : ', origin)
          console.log('ini dest : ', dest)
          try {
            let fetch = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.lat},${origin.long}&destinations=${dest.lat},${dest.long}&key=AIzaSyAjWOHPrXscmVtlGBYIsi6ZrvF8ZYydteI`)
            // console.log('ini fetch : ',fetch)
            item.locat = fetch.data.rows[0].elements[0].distance.text
            return result.push(item)
          }
          catch(err){
            console.log(err)
          }
    })
    if (count === locationInBanten.length) {
      console.log('masuk')
      setTimeout(() => {
        this.setState({
          error: null,
          distance: result,
          isLoading: false,
        });
      }, 1000);
      
      console.log('ini location in banten : ', result)
      console.log(this.state)
      if(this.state.distance) {
        this.setState({did: true})
      }
    }
  }

  // componentDidUpdate() {
  //   console.log('update')
  //   console.log(this.state)
  //   if(this.state.longitude && this.state.latitude && !this.state.distance) {
  //     console.log('masuk')
  //     this._getLocationInBanten()
  //   }
  // }
  _setLocationSucces() {
    this.setState({did: true}) 
  }

  componentWillMount() {
    StatusBarManager.setColor(processColor("#ff0000"), false);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          will: true
        });
        this._getLocationInBanten()
        console.log(this.state)
      },
      (error) => {
        this.setState({ error: error.message })
        console.log(error)
      },
      { enableHighAccuracy: true, timeout: 5000}
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
    // this.props.locationActions({lat: item.lat, long: item.long})
    this.props.getNearest(item.lat, item.long).then(result => {

      console.log(result)
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'MainPage' }),
        ],
      });
      this.props.navigation.dispatch(resetAction);
    }).catch(err => this.setState({isLoading: true}))
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
  _handleLoading() {
    console.log(!this.state.isLoading && this.state.did && this.state.will)
    return !this.state.isLoading && this.state.did && this.state.will
  }
  
  render() {
    { 
      if (!this.state.isLoading && this.state.distance.length > 0 && this.state.will) {
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
            
            <SeacrhInput locationActions={this.props.locationActions} loadingAction={this.props.loadingAction}  postDirectLocation={this.props.postDirectLocation} navigate={this.props.navigation.navigate} getNearest={this.props.getNearest}/>
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
              console.log('ini item : ',item)
              return ( 
                <TouchableOpacity onPress={() => this._handleOnpressLocation(item)}>
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
        if(this.state.loadingPress || this.props.getLoading) {
          return (
            <View style={{flex: 1,alignContent: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(52, 52, 52, 0.8)'}}>
              <CirclesLoader color='#D28496' />
              <TextLoader text="Loading" />
            </View>
          );
        } else {
          return (
            <View style={{flex: 1,alignContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
              <CirclesLoader color='#D28496' />
              <TextLoader text="Loading" />
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
  getLocation: state.location,
  getLoading: state.isLoading
})

const mapDispatchToProps = (dispatch) => ({
  actionGetLocation: (origin, dest) => { dispatch(getLocations(origin, dest)) },
  postDirectLocation: (data) => dispatch(DirectLocation(data)),
  getNearest: (lat, long) => dispatch(getNearest(lat, long)),
  locationActions : (loc) => dispatch(LocationUser(loc)),
  loadingAction: (data) => dispatch(isLoading(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBarExample)