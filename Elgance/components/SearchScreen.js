import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { TabNavigator } from "react-navigation";
import { Container,Content, Header, Item, Input, Icon, Body, Right, Left, Button, Title, Spinner } from 'native-base';
import axios from 'axios'

import {data} from './locationInBanten'
import SeacrhInput from './AutoCompleteSearch';
import { getLocations, DirectLocation } from "./store/actions"

var { height, width } = Dimensions.get("window");

class SearchBarExample extends Component {
  constructor(props){
    super(props)
    this.state = {
      location: '',
      latitude: null,
      longitude: null,
      error:null,
      distance: null,
      isLoading: true
    }
  }
  componentDidMount(){
    console.log('did')
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let locat = data(position)
        console.log(locat)
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          distance: locat,
          isLoading: false
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
    );
    
  }

  _handleOnpressLocation(location) {
    this.props.postDirectLocation(location)
    this.props.navigation.goBack()
  }
  
  render() {
    {if (!this.state.isLoading) {
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
          
          <SeacrhInput/>
  
          <View style={styles.container}>
            <Icon name="ios-locate-outline" style={{ fontSize: 30, color: "red" }}/>
            <Text style={styles.title}> Detect my location</Text>
          </View>
          <View style={{marginTop: 20}}>
           <Text style={styles.headerLocation}>Location In Banten</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row', marginLeft: 10, marginRight: 10, flexWrap: "wrap"}}>
         {this.state.distance.map(item => {
           return ( 
            <TouchableOpacity onPress={() => this._handleOnpressLocation(item.text)}>
            <View style={styles.location}>
              <Text>{item.text}</Text>
              <Text>{item.locat}</Text>
            </View>
            </TouchableOpacity>
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
    } else {
      return (
        <Container style={{flex: 1,alignContent: 'center', justifyContent: 'center',}}>
          <Content >
            <Spinner color="blue" style={{alignSelf: 'center'}}/>
          </Content>
        </Container>
      );
    }
    }
    
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
    backgroundColor: '#D28496',
    flex: 1
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

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = (dispatch) => ({
  actionGetLocation: (origin, dest) => { dispatch(getLocations(origin, dest)) },
  postDirectLocation: (data) => dispatch(DirectLocation(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBarExample)