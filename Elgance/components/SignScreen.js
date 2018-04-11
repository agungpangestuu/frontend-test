import React, { Component } from 'react';
import { connect } from 'react-redux';
import {StyleSheet, AsyncStorage, ImageBackground, View, Alert} from 'react-native';
import {Container, Header, Content, Item, Input, Icon, Button, Text, Spinner} from 'native-base'; 

import { getAllCategory } from "./store/actions"

export class componentName extends Component {
  constructor(){
    super()
    this.state = {
      isLoading: true
    }
  }
  componentWillMount() {
    // this.props.setAllCategory().then(result => {
      AsyncStorage.getItem('token').then(result => {
        if(result){
          const { navigate } = this.props.navigation
          navigate({routeName: 'MainPage', key: 'MainPage1'})
  
        } else {
          this.setState({isLoading: false})
        }
      }).catch(err => {
          console.log(err)
          this.setState({isLoading: false})
      })
      this.setState({isLoading: false})
    // }).catch(err => {
    //   console.log(err)
    // })
   
}
  render() {
      const { navigate } = this.props.navigation

      { if (!this.state.isLoading) {
        return (
          <View  style={styles.backgroundImage}>
         
            <View
              style={{
                backgroundColor: 'white',
                flex: 1,
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{fontWeight: 'bold', fontSize: 50, marginBottom: 30}}>Login</Text>
                <Button rounded light onPress={() => navigate("SignUpScreen")} style={{alignSelf: 'center', width: 250,marginBottom: 20, justifyContent: 'center', alignContent: 'center'}}>
                <Text style={{textAlign: 'center', color: 'green'}}>SIGN UP</Text>
              </Button>
             
              <Button rounded onPress={() => navigate({routeName: "LoginScreen", key: 'LoginScren1'})} style={{alignSelf: 'center', width: 250,marginBottom: 30, justifyContent: 'center', alignContent: 'center'}}>
                <Text style={{color: 'white'}}>SIGN IN</Text>
            </Button>
            </View>
          </View>
        );
      } else {
        return (
          <Container style={{flex: 1,alignContent: 'center', justifyContent: 'center',}}>
          <Content >
            <Spinner color="blue" style={{alignSelf: 'center'}}/>
          </Content>
        </Container>
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
  
    setAllCategory: () => dispatch(getAllCategory())
  
});

export default connect(mapStateToProps, mapDispatchToProps)(componentName)
