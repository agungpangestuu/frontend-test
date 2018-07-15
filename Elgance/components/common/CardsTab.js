import React, { Component } from 'react';
import { Image, Dimensions, View, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { connect } from "react-redux"

import CardBox from "./Card";
import { getDetail } from '../store/actions'
var { height, width } = Dimensions.get("window");

class CardImageExample extends Component {
  constructor(props) {
    super(props)
  }

  async getDetailList(data) {
    await this.props.getDetail(data)
  }

  _handlePress(detail, id) {
    let data = {
      id: id,
      lat: this.props.getLocation.lat,
      long: this.props.getLocation.long
    }
    this.getDetailList(data).then(result => {
      const { navigate } = this.props.navigation
      navigate({ routeName: "DetailScreen", key: 'DetailScreen1', params: id })
    }).catch(e => console.log(e))
  }
  renderIfLocationDetect() {
    return (
      <TouchableOpacity onPress={() => { this._handlePress(item, item._id) }}>
        <Card style={{ height: 250, width: width / 3 + 15, flex: 0, flexGrow: 1 }}>
          <CardItem cardBody style={{ backgroundColor: '#D28496' }}>
            <Image source={{ uri: ( item.images && item.images.length > 0 ) ? item.images : 'https://www.gumtree.com/static/1/resources/assets/rwd/images/orphans/a37b37d99e7cef805f354d47.noimage_thumbnail.png' }} style={{ height: 100, flex: 1, flexGrow: 1, width: null }} resizeMode={'contain'} />
          </CardItem>
          <CardItem style={{ flex: 1, flexDirection: 'column' }}>
            <Text style={{ textAlign: 'center', fontFamily: "niagara", marginBottom: 10 }}>{item.name}</Text>
            <Text style={{ textAlign: 'center', fontFamily: "niagara" }}>{item.location[0].address}</Text>
          </CardItem>
        </Card>
      </TouchableOpacity>
    )
  }
  render() {
    let data = this.props.data
    console.log('ini props tab', this.props.navigation)
    {
      if (data) {
        return (

          <CardBox tab={this.props.tab}>
            <View style={{ flexWrap: 'wrap', flex: 1, flexDirection: 'row' }}>

              {data.map(item => {
                  return (
                    <TouchableOpacity onPress={() => { this._handlePress(item, item._id) }}>
                      <Card style={{ height: 250, width: width / 3 + 15, flex: 0, flexGrow: 1 }}>
                        <CardItem cardBody style={{ backgroundColor: '#D28496' }}>
                          <Image source={{ uri: ( item.images && item.images.length > 0 ) ? item.images : 'https://www.gumtree.com/static/1/resources/assets/rwd/images/orphans/a37b37d99e7cef805f354d47.noimage_thumbnail.png' }} style={{ height: 100, flex: 1, flexGrow: 1, width: null }} resizeMode={'contain'} />
                        </CardItem>
                        <CardItem style={{ flex: 1, flexDirection: 'column' }}>
                          <Text style={{ textAlign: 'center', fontFamily: "niagara", marginBottom: 10 }}>{item.name}</Text>
                          <Text style={{ textAlign: 'center', fontFamily: "niagara" }}>{item.address}</Text>
                        </CardItem>
                      </Card>
                    </TouchableOpacity>
                  )
              })}
            </View>
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
  getDirect: state.mainPage.directLocation,
  getLocation: state.location
})

const mapDispatchToProps = (dispatch) => {
  return {
    getDetail: (data) => dispatch(getDetail(data.id, data.lat, data.long))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CardImageExample)