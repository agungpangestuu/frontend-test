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
    this.closeDrawer = this._closeDrawer.bind(this)
  }
  componentDidMount() {
    StatusBarManager.setColor(processColor("#ff0000"), false);
    // this.props.setAllCategory().then(resultAll => {
      this.setState({isLoading: false})
    // }).catch(err => {
    //     console.log(err)
    //   })
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

  _closeDrawer() {
    this._drawer._root.close()
  };
  openDrawer() {
    this._drawer._root.open()
  };

  handleRoute(pushRoute) {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: pushRoute}),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Drawer
        ref={(ref) => { this._drawer = ref; }}
        content={<SideBar navigator={ navigate } dispatch={this.props.navigation.dispatch} closeDrawer={this.closeDrawer} />}
        onClose={() => this._closeDrawer()} >

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
            <Button transparent onPress={() => navigate({routeName: "SearchScreen", key: 'screenSearch1'})}>
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
        {(this.state.isLoading && this.props.getSearch) ? (
          <View style={{flex: 1,alignContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
            <Spinner color="blue" style={{alignSelf: 'center'}}/>
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
  setAllCategory: () => dispatch(getAllCategory()),
  locationActions : (loc) => dispatch(LocationUser(loc))  
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)