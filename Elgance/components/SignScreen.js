import React, { Component } from 'react';
import { connect } from 'react-redux';
import {StyleSheet, AsyncStorage, ImageBackground, View, Alert} from 'react-native';
import {Container, Header, Content, Item, Input, Icon, Button, Text} from 'native-base'; 

export class componentName extends Component {
  componentDidMount() {
    AsyncStorage.getItem('token').then(result => {
      if(result){
        const { navigate } = this.props.navigation
        navigate({routeName: 'MainPage', key: 'MainPage1'})
      } 
    }).catch(err => {
        console.log(err)
    })
}
  render() {
      const { navigate } = this.props.navigation
    return (
        <View  style={styles.backgroundImage}>
        <ImageBackground
          style={styles.backgroundImage}
          source={{
            uri:
              'https://orig00.deviantart.net/3ea6/f/2013/204/7/5/anime_render_38_by_animerenderss-d6es9ok.png',
          }}
          resizeMode={'cover'}
        >
          <View
            style={{
              backgroundColor: 'rgba(104, 232, 106, 0.69)',
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
        </ImageBackground>
        </View>
      );
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

const mapDispatchToProps = {
  
};

export default connect(mapStateToProps, mapDispatchToProps)(componentName)
