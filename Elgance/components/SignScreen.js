import React, { Component } from 'react';
import { connect } from 'react-redux';
import {StyleSheet, AsyncStorage, ImageBackground, View, Alert, BackHandler} from 'react-native';
import {Container, Header, Content, Item, Input, Icon, Button, Text, Spinner} from 'native-base'; 
import { NavigationActions } from 'react-navigation'

import { getAllCategory, login_user } from "./store/actions"

export class componentName extends Component {
  constructor(){
    super()
    this.state = {
      isLoading: true
    }
    this.handleBackButtonClick = this._handleBackButtonClick.bind(this)
  }
  componentDidMount() {
      AsyncStorage.getItem('credential').then(result => {
        if(result){
          // const { NavigationActions } = this.props.navigation
          const credential = JSON.parse(result)
          let obj = {
            username: credential.username,
            password: credential.password
          }
          this.props.postLogin_state(obj).then(resultLogin => {
            this.props.setAllCategory().then(result => {
            // navigate({routeName: 'MainPage', key: 'MainPage1'})
              const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({ routeName: 'MainPage' }),
                ],
              });
              this.props.navigation.dispatch(resetAction);
            
            }).catch(err => {
              console.log(err)
            })
          }).catch(err => this.setState({isLoading: false}))
          
        } else {
          this.setState({isLoading: false})
        }
      }).catch(err => {
          console.log(err)
          Alert.alert(err)
          this.setState({isLoading: false})
      })
      
   
  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);    
  }
  _handleBackButtonClick() {
    this.props.navigation.goBack(null);
    Alert.alert(
      '',
      'Apakah anda ingin keluar dari aplikasi ini ?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => BackHandler.exitApp() },
      ],
      { cancelable: false }
    )
    return true;
  } 
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick)
  }
  handleRouteNavigationSignIn() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'LoginScreen' }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }
  handleRouteNavigationSignUp() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'SignUpScreen' }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }
  render() {
      const { navigate } = this.props.navigation
      console.log(this.state.isLoading)
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
                <Button rounded light onPress={() => this.handleRouteNavigationSignUp()} style={{alignSelf: 'center', width: 250,marginBottom: 20, justifyContent: 'center', alignContent: 'center'}}>
                <Text style={{textAlign: 'center', color: 'green'}}>SIGN UP</Text>
              </Button>
             
              <Button rounded onPress={() => this.handleRouteNavigationSignIn()} style={{alignSelf: 'center', width: 250,marginBottom: 30, justifyContent: 'center', alignContent: 'center'}}>
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
  
})

const mapDispatchToProps = (dispatch) => ({
  postLogin_state: obj => dispatch(login_user(obj)),
  setAllCategory: () => dispatch(getAllCategory())
  
});

export default connect(mapStateToProps, mapDispatchToProps)(componentName)
