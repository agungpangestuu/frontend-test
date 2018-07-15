import React, { Component } from 'react';
import { connect } from 'react-redux';
import {StyleSheet, AsyncStorage, RefreshControl, View, Alert, ScrollView, PermissionsAndroid} from 'react-native';
import {Icon, Button, Text} from 'native-base'; 
import { NavigationActions } from "react-navigation"
import {CirclesLoader, TextLoader} from 'react-native-indicator'
import Permissions from 'react-native-permissions'

import { getAllCategory, login_user, getNearest, LocationUser } from "./store/actions"

export class componentName extends Component {
  constructor(props){
    super(props)
    this.state = {
      isLoading: true,
      longitude: null,
      latitude: null, 
      alreadyDidMount : false,
      alreadyWillMount: false,
      error : false,
      alreadyLogin: false,
      refreshing: false,
      locationPermission: null
    }
    // this.handleScreen = this._handleScreen.bind(this)
    
  }

  componentWillMount() {
    this._getCredentialLogin()
  }

  componentDidMount() {
    this._getLocation()
  }

  componentDidUpdate() {
    this._changeScreen()
  }
  
  _getCredentialLogin() {
    AsyncStorage.getItem('credential').then(result => {
      console.log(result)
      if(result){
        const { navigate } = this.props.navigation
        const credential = JSON.parse(result)
        let obj = {
          username: credential.username,
          password: credential.password
        }
        this.props.postLogin_state(obj).then(resultLogin => {
          console.log(resultLogin)
          this.props.setAllCategory().then(resultAll => {
            this.setState({alreadyWillMount: true, alreadyLogin : true})
          })
          .catch(err => {
            console.log(err)
          })
          
        }).catch(err => console.log(err))
        
      } else {
        console.log('masuk else')
        this.setState({isLoading: false})
      }
    }).catch(err => {
      this.setState({isLoading: false})      
    })
  }
  _getLocation() {
    Permissions.check('location').then(response => {
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      console.log(response)
      this.setState({ locationPermission: response })
    })
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let loc = {
          lat : position.coords.latitude,
          long : position.coords.longitude
        }
        this.props.locationActions(loc)
        this.setState({alreadyDidMount: true, refreshing: false})      
      },
      (error) => {
        this.setState({ error: error.message, refreshing: false })
        console.log(error)
      },
      { enableHighAccuracy: false, timeout: 5000}
    );
  }
  _changeScreen() {
    if(this.state.alreadyDidMount && this.state.alreadyWillMount) {

      // this.props.getNearest(this.props.getLocation.lat, this.props.getLocation.long).then(result => {
      //  console.log(result)
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'MainPage' }),
        ],
      });
      this.props.navigation.dispatch(resetAction);
      // }).catch(err => console.log(err))
    
    }
  }
  _request = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Cool Photo App Camera Permission',
          'message': 'Cool Photo App needs access to your camera ' +
                     'so you can take awesome pictures.'
        }
      )
      if (granted) {
        console.log("You can use the camera")
        this._getLocation()
        return granted
      } else {
        console.log("Camera permission denied")
        this.setState({refreshing: false})
        return granted
      }
    } catch (err) {
      console.warn(err)
    }
  }

  _requestPermission = async () => {
    let request = await this._request()
    console.log(request)
    // Permissions.request('location').then(response => {
    //   console.log(response)
    //   Permissions.openSettings()
    //   // Returns once the user has chosen to 'allow' or to 'not allow' access
    //   // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
    //   this.setState({ locationPermission: response })
    //   this._getLocation()
    // })
  }

  _alertForPhotosPermission() {
    Alert.alert(
      'Can we access your GPS?',
      'We need access so you can set your location',
      [
        {
          text: 'No way',
          onPress: () => this.setState({refreshing: !this.state.refreshing}),
          style: 'cancel',
        },
        // this.state.locationPermission == 'undetermined'
          { text: 'OK', onPress: () => this._requestPermission() }
          // : { text: 'Open Settings', onPress: Permissions.openSettings },
      ],
    )
  }

  _onRefresh() {
    this.setState({refreshing: true})
    if (!this.state.alreadyDidMount) {
      this._alertForPhotosPermission()
    }
    if (!this.state.alreadyWillMount) {
      this._getCredentialLogin()
    }  
  }

  render() {
      const { navigate } = this.props.navigation
      console.log(this.state)
      { if (!this.state.isLoading && !this.state.alreadyLogin) {
        return (
          <View  style={styles.backgroundImage}>
            <View
              style={{
                backgroundColor: '#D28496',
                flex: 1,
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{fontWeight: 'bold', fontSize: 50, marginBottom: 30, color: 'black'}}>Login</Text>
                <Button rounded light onPress={() => navigate("SignUpScreen")} style={{alignSelf: 'center', width: 250,marginBottom: 20, justifyContent: 'center', alignContent: 'center'}}>
                <Text style={{textAlign: 'center', color: 'black'}}>SIGN UP</Text>
              </Button>
             
              <Button rounded onPress={() => navigate({routeName: "LoginScreen", key: 'LoginScren1'})} style={{alignSelf: 'center', width: 250,marginBottom: 30, justifyContent: 'center', alignContent: 'center'}}>
                <Text style={{color: 'white'}}>SIGN IN</Text>
            </Button>
            </View>
          </View>
        );
      } else if (this.state.error && this.state.alreadyLogin) {
          return (
            <View style={{flex: 1,alignContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
            <ScrollView contentContainerStyle={{flex: 1,alignContent: 'center', justifyContent: 'center', alignItems: 'center'}}
              refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
              />}
            >
              <View style={{flex: 1,alignContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
                <Icon style={{color: 'red', fontSize: 50}} name='ios-information-circle-outline' />
                <Text>Error Your Internet or Gps Offline</Text>
                <Text>Please Turn On !!</Text>
                <Text>And Pull Screen for Refresh</Text>
              </View>
            </ScrollView>
            </View>
          )
      } else {
        return (
          <View style={{flex: 1,alignContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
            <CirclesLoader color='#D28496' />
            <TextLoader text="Loading" />
          </View>
        )
      }
    }
    
    }
  }
  
  const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      width: null,
      height: null,
      backgroundColor: '#D28496',
    },
    container: {
      flex: 1,
      width: null,
      height: null,
      backgroundColor: 'rgba(0,0,0,0)',
    },
  
    text: {
      textAlign: 'center',
      color: 'white',
      backgroundColor: 'rgba(0,0,0,0)',
      fontSize: 32,
    },
  });
  

const mapStateToProps = (state) => ({
  getLocation : state.location,
})

const mapDispatchToProps = (dispatch) => ({
  postLogin_state: obj => dispatch(login_user(obj)),
  setAllCategory: () => dispatch(getAllCategory()),
  getNearest: (lat, long) => dispatch(getNearest(lat, long)),
  locationActions : (loc) => dispatch(LocationUser(loc))
});

export default connect(mapStateToProps, mapDispatchToProps)(componentName)
