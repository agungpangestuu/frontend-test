import React, { Component } from 'react';
import { View } from 'react-native'
import { Container,Title, Header, Card, CardItem, Left, Body, Right, Content, Button, Icon, Text, Tab, Tabs } from 'native-base';
import {NativeModules, processColor } from 'react-native';

import CardBox from './common/Card'
const { StatusBarManager } = NativeModules
export default class FooterTabsIconTextExample extends Component {
    componentDidMount() {
        StatusBarManager.setColor(processColor('#ff0000'), false);
      }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header hasTabs androidStatusBarColor="#D28496" style={{backgroundColor: '#D28496'}}>
            <Left style={{flex: 1}}>
                <Button transparent>
                    <Icon name='menu' />
                </Button>
            </Left>
            <Body style={{flex: 1, flexDirection: 'row',justifyContent: 'center',alignItems: 'center',}} >
                <Button transparent >
                    <Icon name='ios-pin'  style={{fontSize: 30, color: 'white'}} />
                </Button>  
                 <Title style={{fontFamily: 'niagara',}}>Cilegon</Title>
                <Button transparent >
                  <Icon name='ios-arrow-down-outline' style={{fontSize: 30, color: 'white'}}/>
                </Button>              
            </Body>
            <Right style={{flex: 1}}>
                <Button transparent onPress={() => navigate("SearchScreen")}>
                    <Icon name='search' />
                </Button>
            </Right>
        </Header>
        <Tabs initialPage={0} >
          <Tab heading="HAIR" style={{backgroundColor: '#E7B3BF'}} tabStyle={{backgroundColor: '#E7B3BF'}} activeTabStyle={{backgroundColor: '#E7B3BF'}} textStyle={{color: 'white'}}>
            <CardBox />
          </Tab>
          <Tab heading="EYELEICHES" tabStyle={{backgroundColor: '#E7B3BF'}} activeTabStyle={{backgroundColor: '#E7B3BF'}} textStyle={{color: 'white'}}>
            <CardBox />
          </Tab>
          <Tab heading="BRIDAL" tabStyle={{backgroundColor: '#E7B3BF'}} activeTabStyle={{backgroundColor: '#E7B3BF'}} textStyle={{color: 'white'}}>
            <Text style={{fontFamily: 'niagara',}}>Apps</Text>
          </Tab>
          <Tab heading="NAIL" tabStyle={{backgroundColor: '#E7B3BF'}} activeTabStyle={{backgroundColor: '#E7B3BF'}} textStyle={{color: 'white'}}>
            <Text>Apps</Text>
          </Tab>
          <Tab heading="TAB2" tabStyle={{backgroundColor: '#E7B3BF'}} activeTabStyle={{backgroundColor: '#E7B3BF'}} textStyle={{color: 'white'}}>
            <Text>Apps</Text>
          </Tab>
        </Tabs>
        
      </Container>
    );
  }
}