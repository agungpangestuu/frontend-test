import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ImageBackground, View, TouchableOpacity, Alert } from 'react-native';
import { Container, Header, Left, Content, Item, Input, Icon, Button, Text } from 'native-base';

import { signup_user } from "./store/actions"
class SignUp extends Component {
    constructor() {
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

    handleSubmit(e) {
        e.preventDefault()
        const { navigate } = this.props.navigation

        let signUpData = {
            username: this.state.username,
            password: this.state.password,
            fullname: this.state.fullname
        }
        this.props.post_state(signUpData).then(result => {
            navigate({routeName: 'LoginScreen', key: 'LoginScreen1'})            
        }).catch(err => {
            Alert.alert('Please Fill The Blank')            
        })
        
        if (this.props.getSignUp){
        } else {
        }
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
                        <Text style={{ fontWeight: 'bold', fontSize: 50, marginBottom: 30 }}>Sign Up</Text>
                        <Item style={{ marginLeft: 35, marginRight: 35, marginBottom: 20, borderBottomColor: 'black', borderBottomWidth: 2 }}>
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
                        <Item style={{ marginLeft: 35, marginRight: 35, marginBottom: 20, borderBottomColor: 'black', borderBottomWidth: 2 }}>
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

                        <Item style={{ marginLeft: 35, marginRight: 35, marginBottom: 60, borderBottomColor: 'black', borderBottomWidth: 2 }}>
                            <Icon active name="ios-lock" />
                            <Input placeholder="Password" secureTextEntry={true}
                                ref="password"
                                onSubmitEditing={() => this._focusNextField('fullname')}
                                returnKeyType={"next"}
                                blurOnSubmit={false}
                                placeholder="Password"
                                onChangeText={password => this.setState({ password: password })}
                                value={this.state.password}
                            />
                        </Item>
                        <Button rounded light onPress={(e) => this.handleSubmit(e)} style={{ alignSelf: 'center', width: 250, marginBottom: 20, justifyContent: 'center', alignContent: 'center' }}>
                            <Text style={{ textAlign: 'center' }}>Sign Up</Text>
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
});

const mapStateToProps = (state) => ({
  getSignUp: state.signUp 
})

const mapDispatchToProps = (dispatch) => {
  return {
      post_state: obj => dispatch(signup_user(obj))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)