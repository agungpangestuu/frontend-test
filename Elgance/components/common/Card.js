import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

import ChildCard from './HairTab'
export default class CardImageExample extends Component {
  render() {
    return (
      <Container>
   
        <Card style={{marginBottom: 30, marginTop: 30 ,marginRight: 20, marginLeft: 20}}>
            <CardItem header style={{alignContent: 'center',}}>
                <Text>NativeBase</Text>
            </CardItem>
            <CardItem>
               
                    <ChildCard />
               
            </CardItem>
        </Card>

      </Container>
    );
  }
}