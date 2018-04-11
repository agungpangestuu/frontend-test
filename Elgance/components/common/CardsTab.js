import React, { Component } from 'react';
import { Image, Dimensions } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

import CardBox from "./Card";
var { height, width } = Dimensions.get("window");

export default class CardImageExample extends Component {
  render() {
    console.log(this.props.data)
    {
      if(this.props.data){
        return (
          <CardBox tab={this.props.tab}>
            {this.props.data.map(item  => {
             
              return (
                <Container>
                  <Content>
                    <Card>
                      <CardItem cardBody>
                        <Image source={{uri: 'https://i.ytimg.com/vi/aYkSqv6GziI/maxresdefault.jpg'}} style={{height: 100, width: width/2, flex: 1}}/>
                      </CardItem>
                      <CardItem>
                        <Left>
                          <Button transparent>
                            <Icon active name="thumbs-up" />
                            <Text>12 Likes</Text>
                          </Button>
                        </Left>
                        <Body>
                          <Button transparent>
                            <Icon active name="chatbubbles" />
                            <Text>4 Comments</Text>
                          </Button>
                        </Body>
                        
                      </CardItem>
                    </Card>
                  </Content>
                </Container>
              )
            })}
          
          </CardBox>
        );
      } else {
        return (
          <CardBox />
        )
      }
    }
    
  }
}