import React, { Component } from "react";
import { View, Dimensions, NativeModules, processColor } from "react-native";
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
  Drawer
} from "native-base";

import Tabs from "./TabScreen";
import SideBar from './SideBar';

var { height, width } = Dimensions.get("window");
const { StatusBarManager } = NativeModules;

export default class FooterTabsIconTextExample extends Component {
  componentDidMount() {
    StatusBarManager.setColor(processColor("#ff0000"), false);
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
        content={<SideBar navigator={ navigate } closeDrawer={this.closeDrawer} />}
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
            <Title style={{ fontFamily: "niagara" }}>Cilegon</Title>
            <Button transparent>
              <Icon
                name="ios-arrow-down-outline"
                style={{ fontSize: 30, color: "white" }}
                onPress={() => navigate({routeName:"DetailScreen", key: 'screenDetail1'})}
              />
            </Button>
          </Body>
          <Right style={{ flex: 1 }}>
            <Button transparent onPress={() => navigate({routeName: "SearchScreen", key: 'screenSearch1'})}>
              <Icon name="search" />
            </Button>
          </Right>
        </Header>
        <Tabs />
      </Container>
      </Drawer>
    );
  }
}
