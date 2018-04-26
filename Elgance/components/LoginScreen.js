import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, AsyncStorage, ImageBackground, View, TouchableOpacity, Alert, Keyboard } from 'react-native';
import { Container, Header, Left, Content, Item, Input, Icon, Button, Text, Spinner } from 'native-base';

import { login_user, getAllCategory } from "./store/actions"

class Login extends Component {
    constructor() {
        super()
        this.state = {
            username: null,
            password: null,
            error: false,
            isLoading: false
        }
    }
    
    _focusNextField(nextField) {
        this.refs[nextField]._root.focus()
    }
    componentDidMount() {
        this.props.setAllCategory().then(result => {
            console.log(result)
          }).catch(err => {
            console.log(err)
          })
    }

    handleSubmit(e) {
        e.preventDefault()
        this.setState({isLoading: true})
        const { navigate } = this.props.navigation

        let LoginEvent = {
            username: this.state.username,
            password: this.state.password
        }
        Keyboard.dismiss()
        this.props.postLogin_state(LoginEvent).then(result => {
            console.log('ini result : ',result)
            this.props.setAllCategory().then(result => {
                navigate({routeName: 'MainPage', key: 'MainPage1'})
              }).catch(err => {
                console.log(err)
              })
           
        }).catch(err => {
            this.setState({error: true, isLoading: false},
            Keyboard.dismiss())
            Alert.alert('Please Fill The Blank')
        })
        
    }

    handleLoadingAfterSubmit() {
            return (
                  <Spinner color="blue" style={{alignSelf: 'center'}}/>
              )
    }
    handleNotLoadingAfterSubmit(){
        return (
            <Button rounded light onPress={(e) => this.handleSubmit(e)} style={{ alignSelf: 'center', width: 250, marginBottom: 20, justifyContent: 'center', alignContent: 'center' }}>
                <Text style={{ textAlign: 'center' }}>Sign In</Text>
            </Button>
        )
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
                    <View
                        style={{
                            backgroundColor: 'white',
                            flex: 1,
                            alignContent: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Text style={{ fontWeight: 'bold', fontSize: 50, marginBottom: 30 }}>Login</Text>

                        <Item error={this.state.error ? true : false} style={this.state.error ? styles.error : { marginLeft: 35, marginRight: 35, marginBottom: 20, borderBottomColor: 'black', borderBottomWidth: 2 }}>
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

                        <Item error={this.state.error} style={this.state.error ? styles.error : { marginLeft: 35, marginRight: 35, marginBottom: 60, borderBottomColor: 'black', borderBottomWidth: 2 }}>
                            <Icon active name="ios-lock" />
                            <Input placeholder="Password" secureTextEntry={true}
                                ref="password"
                                onSubmitEditing={() => this._focusNextField('username')}
                                returnKeyType={"next"}
                                blurOnSubmit={false}
                                placeholder="Password"
                                onChangeText={password => this.setState({ password: password })}
                                value={this.state.password}
                            />
                        </Item>
                        {this.state.isLoading ?(this.handleLoadingAfterSubmit()) : (this.handleNotLoadingAfterSubmit()) }
                        <Text style={{ marginBottom: 20 }}>Or</Text>
                        <Button rounded info style={{ alignSelf: 'center', width: 250, marginBottom: 30, justifyContent: 'center', alignContent: 'center' }}>
                            <Icon active name="logo-facebook" />
                            <Text style={{ textAlign: 'center' }}>Sign In With Facebook</Text>
                        </Button>
                    </View>
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
    error: {
        marginLeft: 35,
        marginRight: 35,
        marginBottom: 60,
        borderBottomColor: 'red',
        borderBottomWidth: 2
    }
});

const mapStateToProps = (state) => ({
    getLogin: state.login 
  })
  
  const mapDispatchToProps = (dispatch) => {
    return {
        postLogin_state: obj => dispatch(login_user(obj)),
        setAllCategory: () => dispatch(getAllCategory())
    }
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Login)