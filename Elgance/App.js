import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { StackNavigator } from 'react-navigation'
import { Container, Header, Content, Button, Icon, Text } from 'native-base';

import store from './components/store'
import MainPage from './components/MainPage'
import SearchScreen from './components/SearchScreen'
import DetailScreen from './components/ImagePicker'
// import CameraScreen from './components/OpenCamera'
const Apps = StackNavigator({
  Home: {
    screen: MainPage,
    navigationOptions: {
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
      headerTitle: 'Episode Detail',
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