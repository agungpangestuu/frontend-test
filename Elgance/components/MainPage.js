import React, { Component } from "react";
import { connect } from "react-redux"
import { View, Dimensions, NativeModules, processColor, BackHandler, Platform, Alert } from "react-native";
import {
  Container,
  Title,
  Header,
  Card,
  CardItem,
  Left,
  Body,
  Right,
  Content,
  Button,
  Icon,
  Text,
  Drawer,
  Spinner
} from "native-base";
import { NavigationActions } from 'react-navigation'

import Tabs from "./TabScreen";
import SideBar from './SideBar';
import {getAllCategory, getNearest, LocationUser} from './store/actions'

var { height, width } = Dimensions.get("window");
const { StatusBarManager } = NativeModules;
const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'MainPage'})
  ]
})

class MainPage extends Component {
  constructor(){
    super()
    this.state = {
      allCategory : null,
      isLoading: true
    }
    this.handleBackButtonClick = this._handleBackButtonClick.bind(this)
  }
  componentDidMount() {
    StatusBarManager.setColor(processColor("#ff0000"), false);
    console.log('muncul did')
  }
  componentWillMount() {
    console.log('muncul will')
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    console.log(this.props.getLocation)
    this.props.getNear(this.props.getLocation.lat, this.props.getLocation.long).then(result => {
      this.setState({isLoading: false})
    }).catch(err => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let loc = {
            lat : position.coords.latitude,
            long : position.coords.longitude
          }
          this.props.locationActions(loc)
          this.props.getNear(loc.lat, loc.long).then(result => {
            this.setState({isLoading: false})
          }).catch(err => console.log(err))

        },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
      );
    })
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

  closeDrawer() {
    this._drawer._root.close()
  };
  openDrawer() {
    this._drawer._root.open()
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Drawer
        ref={(ref) => { this._drawer = ref; }}
        content={<SideBar navigator={ navigate } dispatch={this.props.navigation.dispatch} closeDrawer={this.closeDrawer} />}
        onClose={() => this.closeDrawer()} >

      <Container>
        <Header
          hasTabs
          androidStatusBarColor="#D28496"
          style={{ backgroundColor: "#D28496" }}
        >
          <Left style={{ flex: 1 }}>
            <Button transparent onPress={() => this.openDrawer()}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Button transparent>
              <Icon name="ios-pin" style={{ fontSize: 30, color: "white" }} />
            </Button>
            <Title style={{ fontFamily: "niagara" }}>{this.props.getDirect ? this.props.getDirect : 'Select Location'}</Title>
            <Button transparent>
              <Icon
                name="ios-arrow-down-outline"
                style={{ fontSize: 30, color: "white" }}
                
              />
            </Button>
          </Body>
          <Right style={{ flex: 1 }}>
            <Button transparent onPress={() => navigate({routeName: "SearchScreen", key: 'screenSearch1'})}>
              <Icon name="search" />
            </Button>
          </Right>
        </Header>
        {this.state.isLoading ? (
          <View>
          <Spinner />
          </View>
        ) : (
          <Tabs navigation={this.props.navigation} />
        )}
        
      </Container>
      </Drawer>
    );
  }
}

const mapStateToProps = (state) => ({
  getDirect: state.mainPage.directLocation,
  getAllCategory: state.allCategory,
  getSearch: state.search,
  getLocation: state.location
})

const mapDispatchToProps = (dispatch) => ({
  getNear: (lat, long) => dispatch(getNearest(lat, long)),
  locationActions : (loc) => dispatch(LocationUser(loc))  
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)