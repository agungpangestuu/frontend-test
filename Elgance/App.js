import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { StackNavigator } from 'react-navigation'
import { Container, Header, Content, Button, Icon, Text } from 'native-base';

import store from './components/store'
import SignScreen from './components/SignScreen'
import LoginScreen from './components/LoginScreen'
import SignUpScreen from './components/SignUpScreen'
import MainPage from './components/MainPage'
import SearchScreen from './components/SearchScreen'
import DetailScreen from './components/DetailListScreen'
import RecentScreen from './components/RecentScreen'
import ProfileScreen from './components/ProfileScreen'
// import CameraScreen from './components/OpenCamera'
const Apps = StackNavigator({
  Home: {
    screen: SignScreen,
    navigationOptions: {
      header: null
    }
  },
  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      header: null
    }
  },
  SignUpScreen: {
    screen: SignUpScreen,
    navigationOptions: {
      header: null
    }
  },
  MainPage: {
    screen: MainPage,
    navigationOptions : {
      header: null 
    }
  },
  SearchScreen: {
    screen: SearchScreen,
    navigationOptions: {
      header: null
    }
  },
  DetailScreen: {
    screen: DetailScreen,
    navigationOptions: {
      header: null
    }
  },
  RecentScreen: {
    screen: RecentScreen,
    navigationOptions: {
      header: null
    }
  },
  ProfileScreen : {
    screen: ProfileScreen,
    navigationOptions: {
      header: null
    }
  }
})

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Apps />
      </Provider>
    );
  }
}