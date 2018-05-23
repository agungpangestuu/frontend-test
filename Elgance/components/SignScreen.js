import React, { Component } from 'react';
import { connect } from 'react-redux';
import {StyleSheet, AsyncStorage, ImageBackground, View, Alert} from 'react-native';
import {Container, Header, Content, Item, Input, Icon, Button, Text, Spinner} from 'native-base'; 
import { NavigationActions } from "react-navigation"

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
    }
    // this.handleScreen = this._handleScreen.bind(this)
    
  }

  componentWillMount() {
    AsyncStorage.getItem('credential').then(result => {
      if(result){
        const { navigate } = this.props.navigation
        const credential = JSON.parse(result)
        let obj = {
          username: credential.username,
          password: credential.password
        }
        this.props.postLogin_state(obj).then(resultLogin => {
          console.log(resultLogin)
          this.setState({alreadyWillMount: true})
        }).catch(err => console.log(err))
        
      } else {
        console.log('masuk else')
        this.setState({isLoading: false})
      }
    }).catch(err => {
      this.setState({isLoading: false})      
    })
  }
 
 componentDidMount() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log('masuk sini')
      let loc = {
        lat : position.coords.latitude,
        long : position.coords.longitude
      }
      this.props.locationActions(loc)
      this.setState({alreadyDidMount: true})      
    },
    (error) => {
      this.setState({ error: error.message })
      console.log(error)
    },
    { enableHighAccuracy: false, timeout: 20000, maximumAge: 0 }
  );
 }
 componentDidUpdate() {
   if(this.state.alreadyDidMount && this.state.alreadyWillMount) {

    this.props.getNearest(this.props.getLocation.lat, this.props.getLocation.long).then(result => {
     console.log(result)
     const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'MainPage' }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
    }).catch(err => console.log(err))
   
   }
 }

  render() {
      const { navigate } = this.props.navigation
      console.log(this.state)
      { if (!this.state.isLoading) {
        return (
          <View  style={styles.backgroundImage}>
            <View
              style={{
                backgroundColor: 'white',
                flex: 1,
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{fontWeight: 'bold', fontSize: 50, marginBottom: 30}}>Login</Text>
                <Button rounded light onPress={() => navigate("SignUpScreen")} style={{alignSelf: 'center', width: 250,marginBottom: 20, justifyContent: 'center', alignContent: 'center'}}>
                <Text style={{textAlign: 'center', color: 'green'}}>SIGN UP</Text>
              </Button>
             
              <Button rounded onPress={() => navigate({routeName: "LoginScreen", key: 'LoginScren1'})} style={{alignSelf: 'center', width: 250,marginBottom: 30, justifyContent: 'center', alignContent: 'center'}}>
                <Text style={{color: 'white'}}>SIGN IN</Text>
            </Button>
            </View>
          </View>
        );
      } else {
        return (
          <View style={{flex: 1,alignContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
            <Spinner color="blue" style={{alignSelf: 'center'}}/>
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
      backgroundColor: 'rgba(0,0,0,0)',
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
