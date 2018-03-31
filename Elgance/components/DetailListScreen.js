import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native'
import { Container, Header, Item, Input, Icon, Body, Right, Left, Button, Title } from 'native-base';

var { height, width } = Dimensions.get("window");

export default class SearchBarExample extends Component {
  constructor(){
    super()
  }
  render() {
    return (
      <Container>
        <Header
          androidStatusBarColor="#D28496"
          style={{ backgroundColor: "#D28496" }}
        >
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="ios-close" style={{ fontSize: 30, color: "white" }} />
            </Button>
          </Left>
          <Body
            style={{
              justifyContent: "center"
            }}
          >
            <Title style={{ fontFamily: "niagara" }}>Cilegon</Title>
            
          </Body>
          
        </Header>
        <View>
          <View style={styles.container}>
            <Text style={[styles.title, this.props.isActive && styles.activeTitle]}>kasknss</Text>
          </View>
        </View>
        <View>
          <View style={styles.location}>
            <Text>{height}</Text>
          </View>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: '#000',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    alignItems: 'center'
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  activeTitle: {
    color: 'red',
  },
  location: {
    borderWidth: 2,
    borderColor: '#000',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    alignItems: 'center',
    width: width/3
  }
});