import React, {Component} from 'react';
import {StyleSheet, ImageBackground, View,TouchableOpacity, Alert} from 'react-native';
import {Container, Header,Left, Content, Item, Input, Icon, Button, Text} from 'native-base';

export default class BackgroundImage extends Component {
    constructor(){
        super()
        this.state = {
            username: null,
            password: null,
            fullname: null
        }
    }
    _focusNextField(nextField) {
        this.refs[nextField]._root.focus()
      }

    handleSubmit(e){
        e.preventDefault()
        Alert.alert(this.state.password, this.state.username)
    }

  render() {
    return (
        <View  style={styles.backgroundImage}>
        <Header>
            <Left>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Icon name="ios-arrow-back" />
            </TouchableOpacity>
            </Left>
        </Header> 
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
          <Text style={{fontWeight: 'bold', fontSize: 50, marginBottom: 30}}>Sign Up</Text>
            <Item style={{marginLeft: 35, marginRight: 35, marginBottom: 20, borderBottomColor: 'white', borderBottomWidth: 2}}>
                <Icon active name="ios-contact" />
                <Input placeholder="Fullname"
                    ref="fullname"
                    onSubmitEditing={() => this._focusNextField('username')}
                    returnKeyType={"next"}
                    blurOnSubmit={false}
                    onChangeText={fullname => this.setState({ fullname: fullname })}
                    value={this.state.fullname}
                />
            </Item>
            <Item style={{marginLeft: 35, marginRight: 35, marginBottom: 20, borderBottomColor: 'white', borderBottomWidth: 2}}>
                <Icon active name="ios-contact" />
                <Input placeholder="Username" 
                    ref="username"
                    onSubmitEditing={() => this._focusNextField('password')}
                    returnKeyType={"next"}
                    blurOnSubmit={false}
                    placeholder="Username"
                    onChangeText={username => this.setState({ username: username })}
                    value={this.state.username}
                />
            </Item>
            // Text input box with icon aligned to the right
            <Item style={{marginLeft: 35, marginRight: 35, marginBottom: 60, borderBottomColor: 'white', borderBottomWidth: 2}}>
                <Icon active name="ios-lock" />
                <Input placeholder="Password"
                    ref="password"
                    onSubmitEditing={() => this._focusNextField('fullname')}
                    returnKeyType={"next"}
                    blurOnSubmit={false}
                    placeholder="Password"
                    onChangeText={password => this.setState({ password: password })}
                    value={this.state.password}
                />
            </Item>
            <Button rounded light onPress={(e) => this.handleSubmit(e)} style={{alignSelf: 'center', width: 250,marginBottom: 20, justifyContent: 'center', alignContent: 'center'}}>
            <Text style={{textAlign: 'center'}}>Sign Up</Text>
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
