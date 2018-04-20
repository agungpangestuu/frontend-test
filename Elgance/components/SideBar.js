import React, { Component } from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
  AsyncStorage
} from "react-native";
import { connect } from "react-redux"
import { Tabs, Tab,Thumbnail, Content, List, ListItem } from "native-base";
import Collapsible from "react-native-collapsible-header";

class SideBar extends Component {
  handleLogoutButton() {
    // this.props.closeDrawer()
    AsyncStorage.removeItem('credential').then(result => {
      this.props.navigator({ routeName: "Home", key: "SignScreen1" })
    }).catch(err => console.log(err))
  }
  render() {
    console.log(this.props);
    return (
      <Content style={{ backgroundColor: "white" }}>
        <View style={{marginLeft: 10, marginTop: 20, marginBottom: 20, flex:1, flexDirection:'row'}}>
          <Thumbnail large source={{uri: 'data:image/png;base64,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'}} />
          <Text style={{alignItems: 'center', alignSelf:'center', marginLeft: 15}}>{this.props.getUser.username}</Text>        
        </View>
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
              <Text>Profile</Text>
            </TouchableOpacity>
          </ListItem>
          <ListItem>
            <TouchableOpacity
              onPress={() =>
                this.props.navigator({
                  routeName: "RecentScreen",
                  key: "Login1",
                  params: 'Bookmark'
                })
              }
            >
              <Text>Bookmark</Text>
            </TouchableOpacity>
          </ListItem>
          <ListItem>
            <TouchableOpacity
              onPress={() =>
                this.props.navigator({
                  routeName: "RecentScreen",
                  key: "Login2",
                  params: 'Recent Salon'
                })
              }
            >
              <Text>Recent Salon</Text>
            </TouchableOpacity>
          </ListItem>
          <ListItem
            onPress={() =>
              this.handleLogoutButton()
            }
          >
            <Text>Logout</Text>
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


const mapStateToProps = (state) => ({
  getUser: state.login,
})

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar)