import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Image, StyleSheet, BackHandler, AsyncStorage, ImageBackground, View, Alert, TouchableOpacity, Dimensions} from 'react-native';
import {Container, Header, Content, Item, Input, Icon, Button, Text, Spinner, Card, CardItem} from 'native-base';
import axios from 'axios' 
import { NavigationActions } from "react-navigation"


import { getAllCategory, login_user, DetailList } from "./store/actions"
import CardBox from "./common/Card";
var { height, width } = Dimensions.get("window");

export class RecentScreen extends Component {
  constructor(){
    super()
    this.state = {
      isLoading: true,
      data: [],
    }
    this.handleBackButtonClick = this._handleBackButtonClick.bind(this)
  }
  componentDidMount() {

  }
  _handleBackButtonClick() {
    this.props.navigation.goBack();    
  }
 componentWillMount() {
  BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);  
  const { state } = this.props.navigation
  AsyncStorage.getItem('credential').then(result => {
    result = JSON.parse(result)
    let objUser = {
      username: result.username,
      password: result.password
    }
    
    this.props.postLogin_state(objUser).then(sukses => {
      if(state.params === 'Bookmark'){
        this.setState({data: sukses.bookmark, isLoading: false})
      }else {
        this.setState({data: sukses.recent, isLoading: false})
      }
    }).catch(err => console.log(err))

  }).catch(err => {
    console.log(err)
  })
 }

 componentWillUnmount() {
  BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick)
}

 _handlePress(data, id) {
  this.props.setDetail(data)
  const { navigate } = this.props.navigation
  navigate({ routeName: "DetailScreen", key: 'DetailScreen1', params: id })
}

  render() {
      const { state } = this.props.navigation
      { if (!this.state.isLoading && this.state.data && this.state.data.length > 0) {
        return (
          <Container>
            <Content>
              <CardBox tab={state.params}>
                <View style={{ flexWrap: 'wrap', flex: 1, flexDirection: 'row' }}>

                  {this.state.data.map(item => {
                      return (
                        <TouchableOpacity onPress={() => { this._handlePress(item, item.salon._id) }}>
                          <Card style={{ height: 250, width: width / 3 + 15, flex: 0, flexGrow: 1 }}>
                            <CardItem cardBody style={{ backgroundColor: '#D28496' }}>
                              <Image source={{ uri: item.salon.images.length > 0 ? item.salon.images : 'https://www.gumtree.com/static/1/resources/assets/rwd/images/orphans/a37b37d99e7cef805f354d47.noimage_thumbnail.png' }} style={{ height: 100, flex: 1, flexGrow: 1, width: null }} resizeMode={'contain'} />
                            </CardItem>
                            <CardItem style={{ flex: 1, flexDirection: 'column' }}>
                              <Text style={{ textAlign: 'center', fontFamily: "niagara", marginBottom: 10 }}>{item.salon.name}</Text>
                              <Text style={{ textAlign: 'center', fontFamily: "niagara" }}>{item.salon.contact}</Text>
                            </CardItem>
                          </Card>
                        </TouchableOpacity>
                      )
                  })}
                </View>
              </CardBox>
            </Content>
          </Container>
        );
      } else if(this.state.data.length === 0){
        return (
          <CardBox tab={state.params} />
        )
      }else {
        return (
          <View style={{flex: 1,alignContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
            <Spinner color="blue" style={{alignSelf: 'center'}}/>
          </View>
        )
      }
    }
    
    }
  }
  
  const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      width: null,
      height: null,
      backgroundColor: 'rgba(0,0,0,0)',
    },
    container: {
      flex: 1,
      width: null,
      height: null,
      backgroundColor: 'rgba(0,0,0,0)',
    },
  
    text: {
      textAlign: 'center',
      color: 'white',
      backgroundColor: 'rgba(0,0,0,0)',
      fontSize: 32,
    },
  });
  


const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = (dispatch) => ({
  postLogin_state: obj => dispatch(login_user(obj)),
  setAllCategory: () => dispatch(getAllCategory()),
  setDetail: (data) => { dispatch(DetailList(data)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(RecentScreen)
