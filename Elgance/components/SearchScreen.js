import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native'
import { Container, Header, Item, Input, Icon, Button, Title } from 'native-base';

var { height, width } = Dimensions.get("window");

export default class SearchBarExample extends Component {
  render() {
    return (
      <Container>
        <Header style={{justifyContent: 'center',alignItems: 'center'}}>
         <Title >Select Location</Title>
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