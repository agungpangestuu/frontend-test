import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, AsyncStorage, ImageBackground, View, TouchableOpacity, Alert } from 'react-native';
import { Container, Header, Left, Content, Item, Input, Icon, Button, Text } from 'native-base';

import { login_user } from "./store/actions"

class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: null,
            password: null
        }
    }
    
    _focusNextField(nextField) {
        this.refs[nextField]._root.focus()
    }

    handleSubmit(e) {
        e.preventDefault()
        const { navigate } = this.props.navigation

        let LoginEvent = {
            username: this.state.username,
            password: this.state.password
        }

        this.props.postLogin_state(LoginEvent).then(result => {
            navigate({routeName: 'MainPage', key: 'MainPage1'})
        }).catch(err => {
            Alert.alert('Please Fill The Blank')
        })
        
    }

    handleUsernameChange(e) {
        console.log(e.target)
        this.setState({ username: e.target.value })
    }
    handlePasswordChange(e) {   
        this.setState({ password: e.target.value })
    }
    render() {
        return (
            <View style={styles.backgroundImage}>
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
                        <Text style={{ fontWeight: 'bold', fontSize: 50, marginBottom: 30 }}>Login</Text>

                        <Item style={{ marginLeft: 35, marginRight: 35, marginBottom: 20, borderBottomColor: 'white', borderBottomWidth: 2 }}>
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

                        <Item style={{ marginLeft: 35, marginRight: 35, marginBottom: 60, borderBottomColor: 'white', borderBottomWidth: 2 }}>
                            <Icon active name="ios-lock" />
                            <Input placeholder="Password"
                                ref="password"
                                onSubmitEditing={() => this._focusNextField('username')}
                                returnKeyType={"next"}
                                blurOnSubmit={false}
                                placeholder="Password"
                                onChangeText={password => this.setState({ password: password })}
                                value={this.state.password}
                            />
                        </Item>
                        <Button rounded light onPress={(e) => this.handleSubmit(e)} style={{ alignSelf: 'center', width: 250, marginBottom: 20, justifyContent: 'center', alignContent: 'center' }}>
                            <Text style={{ textAlign: 'center' }}>Sign In</Text>
                        </Button>
                        <Text style={{ marginBottom: 20 }}>Or</Text>
                        <Button rounded info style={{ alignSelf: 'center', width: 250, marginBottom: 30, justifyContent: 'center', alignContent: 'center' }}>
                            <Icon active name="logo-facebook" />
                            <Text style={{ textAlign: 'center' }}>Sign In With Facebook</Text>
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
    getLogin: state.login 
  })
  
  const mapDispatchToProps = (dispatch) => {
    return {
        postLogin_state: obj => dispatch(login_user(obj))
    }
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Login)