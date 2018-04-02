import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Dimensions } from "react-native";
import { Tabs, Tab, Text, Content } from "native-base";

import CardBox from "./common/Card";
var { height, width } = Dimensions.get("window");

export default class TabScreen extends Component {
  render() {
    return (
      <Tabs initialPage={0} tabContainerStyle={{ elevation: 0 }}>
        <Tab
          heading="HAIR"
          style={{ backgroundColor: "#E7B3BF", flex: 1,}}
          tabStyle={{ backgroundColor: "#E7B3BF" }}
          activeTabStyle={{ backgroundColor: "#E7B3BF", fontFamily: "niagara" }}
          activeTextStyle={{ fontFamily: "niagara", fontWeight: "normal" }}
          textStyle={{ color: "white", fontFamily: "niagara" }}
        >
        <Content style={{flex: 1}}>
          <CardBox />
        </Content>
        </Tab>
        <Tab
          heading="EYELEICHES"
          tabStyle={{ backgroundColor: "#E7B3BF" }}
          activeTabStyle={{ backgroundColor: "#E7B3BF" }}
          activeTextStyle={{ fontWeight: "normal", fontFamily: "niagara" }}
          textStyle={{ color: "white", fontFamily: "niagara" }}
        >
          <CardBox />
        </Tab>
        <Tab
          heading="BRIDAL"
          tabStyle={{ backgroundColor: "#E7B3BF" }}
          activeTabStyle={{ backgroundColor: "#E7B3BF" }}
          activeTextStyle={{ fontWeight: "normal", fontFamily: "niagara" }}
          textStyle={{ color: "white", fontFamily: "niagara" }}
        >
          <Text style={{ fontFamily: "niagara" }}>Apps</Text>
        </Tab>
        <Tab
          heading="NAIL"
          tabStyle={{ backgroundColor: "#E7B3BF" }}
          activeTabStyle={{ backgroundColor: "#E7B3BF" }}
          activeTextStyle={{ fontWeight: "normal", fontFamily: "niagara" }}
          textStyle={{ color: "white", fontFamily: "niagara" }}
        >
          <Text>Apps</Text>
        </Tab>
        <Tab
          heading="TAB2"
          tabStyle={{ backgroundColor: "#E7B3BF" }}
          activeTabStyle={{ backgroundColor: "#E7B3BF" }}
          activeTextStyle={{ fontWeight: "normal", fontFamily: "niagara" }}
          textStyle={{ color: "white", fontFamily: "niagara" }}
        >
          <Text>Apps</Text>
        </Tab>
      </Tabs>
    );
  }
}
