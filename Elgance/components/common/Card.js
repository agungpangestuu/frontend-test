import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

export default class CardImageExample extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <Container>
      <Content>
        <Card style={{marginBottom: 30, marginTop: 30 ,marginRight: 20, marginLeft: 20, flex:1}}>
            <CardItem style={{justifyContent: 'center'}}>
                <Text style={{textAlign: 'center', fontFamily: 'niagara', fontSize: 30}}>Go get your {this.props.tab} done ...</Text>
            </CardItem>
            <CardItem style={{flex:1,marginLeft: 3, marginRight: 3}}>
               {this.props.children}
            </CardItem>
        </Card>
        </Content>
      </Container>
    );
  }
}

