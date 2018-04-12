import React, { Component } from 'react';
import { Image, Dimensions, View, TouchableOpacity  } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { connect } from "react-redux"

import CardBox from "./Card"; 
import { DetailList } from '../store/actions'
var { height, width } = Dimensions.get("window");

class CardImageExample extends Component {
  constructor(props){
    super(props)
  }

  _handlePress(data, id) {
    this.props.setDetail(data)
    const { navigate }  = this.props.navigation
    navigate({routeName: "DetailScreen", key: 'DetailScreen1', params: id})
  }
  render() {
    let data = this.props.data
    console.log('ini props tab',this.props.navigation)
    {
      if(data){
        return (
          <CardBox tab={this.props.tab}>
           
                <Container>
                  <View style={{flexWrap: 'wrap', flex: 1, flexDirection: 'row'}}>
                  {data.map(item  => {
                    console.log(item.salon.images)
                    if(item.salon.branch.length > 0) {
                      return (
                        <TouchableOpacity onPress={() => { this._handlePress(item, item.salon._id)} }>
                          <Card style={{height: 250 ,width: width/3+15, flex: 0, flexGrow: 1}}>
                            <CardItem cardBody>
                              <Image source={{uri: item.salon.images}} style={{height: 100, flex:1, flexGrow:1, width: null}} resizeMode={'contain'}/>
                            </CardItem>
                            <CardItem style={{flex:1, flexDirection: 'column'}}>
                              <Text style={{textAlign: 'center', fontFamily: "niagara", marginBottom: 10}}>{item.salon.name}</Text>
                              <Text style={{textAlign: 'center', fontFamily: "niagara"}}>{item.salon.branch[0].address}</Text>
                            </CardItem>
                          </Card>
                        </TouchableOpacity>
                      )
                    } else {
                      return (
                        <Content /> 
                      )
                    }
              
                  })}
                  </View>
                </Container>
            
          
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

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => {
  return {
    setDetail: (data) => { dispatch(DetailList(data)) }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CardImageExample)