import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native'
import { TabNavigator } from "react-navigation";
import { Container,Content, Header, Item, Input, Icon, Body, Right, Left, Button, Title } from 'native-base';

var { height, width } = Dimensions.get("window");

export default class SearchBarExample extends Component {
  constructor(props){
    super(props)
    this.state = {
      location: '',
      latitude: null,
      longitude: null,
      error:null,
      locationInBanten: [
        {
          id: 1,
          distance: "7 km",
          text: "Serpong Utara"
        },
        {
          id: 2,
          distance: "5 km",
          text: "Cibodas"
        },
        {
          id: 3,
          distance: "10 km",
          text: "Serpong"
        },
        {
          id: 2,
          distance: "5 km",
          text: "Cibodas"
        },
        {
          id: 3,
          distance: "10 km",
          text: "Serpong"
        },
        {
          id: 2,
          distance: "5 km",
          text: "Cibodas"
        },
        {
          id: 3,
          distance: "10 km",
          text: "Serpong"
        },
      ]
    }
  }
  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("wokeeey");
        console.log(position);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
    );
  }
  
  render() {
    return (
      <Container>
        <Header hasTabs
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
            <Title style={{ marginLeft: 20,fontFamily: "niagara"}}>Select Location</Title>
            
          </Body>
          
        </Header>
        <Content style={{backgroundColor: 'white'}}>
        <View style={styles.containerSearch}>
          <Item regular style={styles.inputSearch}>
            <Input placeholder='Regular Textbox' placeholderTextColor='white' style={styles.textBox} />
          </Item>
        </View>
        <View style={styles.container}>
          <Icon name="ios-locate-outline" style={{ fontSize: 30, color: "red" }}/>
          <Text style={styles.title}> Detect my location</Text>
        </View>
        <View style={{marginTop: 20}}>
         <Text style={styles.headerLocation}>Location In Banten</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row', marginLeft: 10, marginRight: 10, flexWrap: "wrap"}}>
       { this.state.locationInBanten.map(item => {
         return ( <View style={styles.location}>
            <Text>{item.text}</Text>
            <Text>{item.distance}</Text>
          </View>
         )
        })}
          
        </View>
        <View style={{flex: 1, marginTop: 30}}>
          <Text style={styles.headerLocation}>Recent Locations</Text>
          <View style={{flex: 1,flexDirection: 'row',marginTop: 10 }}>
            <Icon name="ios-pin" style={{alignSelf: 'center',marginLeft: 25, marginRight: 10, fontSize: 20}} />
            <Text style={{fontSize: 17, alignSelf: 'center'}}>Cilegon</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row', marginTop: 10 }}>
            <Icon name="ios-pin" style={{alignSelf: 'center',marginLeft: 25, marginRight: 10, fontSize: 20}} />
            <Text style={{fontSize: 17, alignSelf: 'center'}}>Serpong</Text>
          </View>
        </View>
        </Content>

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
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
  },
  title: {
    fontSize: 15,
    fontWeight: '100',
    fontFamily: 'roboto',
  },
  activeTitle: {
    color: 'red',
  },
  containerSearch: {
    height: 50,
    backgroundColor: '#D28496'
  },
  inputSearch: {
    height: 25,
    marginLeft: 20,
    marginRight:20
  },
  textBox: {
    marginTop: 5,
    fontFamily: 'niagara',
    color: 'white'
  },
  location: {
    borderWidth: 2,
    borderColor: '#000',
    marginLeft: 10,
    marginVertical: 0,
    marginTop: 20,
    alignItems: 'center',
    width: width/3-20,
    height: 50
  },
  headerLocation: {
    fontSize: 20,
    fontFamily: 'roboto',
    marginLeft: 5
  }
});