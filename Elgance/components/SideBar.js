import React, { Component } from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions
} from "react-native";
import { Tabs, Tab, Content, List, ListItem } from "native-base";
import Collapsible from "react-native-collapsible-header";

export default class SideBar extends Component {
  handleLoginButton() {
    // this.props.closeDrawer()
    this.props.navigator({ routeName: "SearchScreen", key: "Login1" })
  }
  render() {
    console.log(this.props);
    return (
      <Content style={{ backgroundColor: "white" }}>
        <ImageBackground
          style={styles.headerImage}
          source={{
            uri: "https://i.ytimg.com/vi/aYkSqv6GziI/maxresdefault.jpg"
          }}
          resizeMode={"cover"}
        />
        <List>
          <ListItem>
            <Text style={{ fontWeight: "bold" }}>Beranda</Text>
          </ListItem>
          <ListItem>
            <TouchableOpacity
              onPress={() =>
                this.props.navigator({
                  routeName: "SearchScreen",
                  key: "Login1"
                })
              }
            >
              <Text>Login</Text>
            </TouchableOpacity>
          </ListItem>
          <ListItem
            onPress={() =>
              this.handleLoginButton()
            }
          >
            <Text>Sign Up</Text>
          </ListItem>
        </List>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 150,
    padding: 0,
    marginBottom: 5
  },
  headerImage: {
    height: 150,
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "space-between"
  }
});
