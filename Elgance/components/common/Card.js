import React, { Component } from 'react';
import { Image, ScrollView } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

export default class CardImageExample extends Component {
  constructor(props) {
    super(props)
  }
  _handleTitle() {
    if(this.props.tab !== 'Bookmark' || this.props.tab !== 'Recent Salon') {
      return `Go get your ${this.props.tab} done ...`
    }
    else {
      return this.props.tab
    }
  }
  render() {
    return (
      <Card style={{ marginBottom: 30, marginTop: 30, marginRight: 20, marginLeft: 20, flex: 1 }}>
        <CardItem style={{ justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center', fontFamily: 'niagara', fontSize: 30 }}>{this._handleTitle()}</Text>
        </CardItem>
        <CardItem style={{ flex: 1, marginLeft: 3, marginRight: 3 }}>
          {this.props.children}
        </CardItem>
      </Card>
    );
  }
}

