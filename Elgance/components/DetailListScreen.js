import React, {Component} from 'react';
import {connect} from 'react-redux'
import {ActivityIndicator, TouchableOpacity, ImageBackground, StatusBar, StyleSheet, Text, View,} from 'react-native';
import Call from 'react-native-phone-call'
import {Button, Container, Content, H3, Badge, Icon} from 'native-base'
import ImagePicker from 'react-native-image-picker'
import Collapsible from 'react-native-collapsible-header'
// import {fetch_one_episode} from '../stores/episodeAction'

class DetailScreen extends Component {
  componentDidMount() {
    // let {params} = this.props.navigation.state
    // this.props.fetchOne(params.id)
  }
  callNumber(id) {
    let arg = {
      number: '081282713295',
      prompt: false
    }
    switch (id) {
      case 1:Call(arg).catch(console.error)
        
        break;
    }
    
  }

  render() {
    const ep = {
      Poster: 'https://i.ytimg.com/vi/aYkSqv6GziI/maxresdefault.jpg',
      Ratings: '8.0',
      Title: 'testing image',
      Plot: 'asa ajsaj aksnaknsa nakdnka asjjanjdaj jasjnsjad asdnjasnas djajsdasd ajdbajsbdja dajbnjdbajd asdjbnajdas sjabjdasbjdbaj dajda sda asajba dasbdas dasbdas dbasunwjhebibrw asbauo beq eq ubasa bqobq badas ',
      Released: '2017'
    }
    const dataButton = [
      {
        id : 1,
        icon : 'ios-call',
        text : 'Call'
      },
      {
        icon : 'ios-star',
        text : 'Add Review'
      },
      {
        icon : 'ios-bookmark',
        text : 'Bookmark'
      },
      {
        icon : 'ios-camera',
        text : 'Add Photo'
      },
      {
        icon : 'ios-woman',
        text : 'Been Here'
      },
    ]
    const detailList = this.props.detailList
    return (
      ep ?
        (
          <Container>
            <Collapsible
              min={100}
              max={150}
              backgroundColor="#000000"
              renderHeader={(
                <ImageBackground style={styles.headerImage} source={{uri: detailList.salon.images}} resizeMode={'contain'}>
                  <StatusBar barStyle="light-content" backgroundColor="black"/>
                  <Button style={styles.goBack} transparent onPress={() => this.props.navigation.goBack()}>
                    <Icon style={styles.iconGoBack} name="ios-arrow-round-back"/>
                  </Button>
                  
                </ImageBackground>
              )}
              renderContent={
                <Content style={{margin: 20, flex: 1}}>
                  <Text style={{fontSize: 30,alignSelf: 'center', fontFamily: 'niagara', color: 'black'}}>{detailList.salon.name}</Text>
                  <Text style={{fontSize: 20,alignSelf: 'center', fontFamily: 'niagara', color: 'black'}}>serpong utara tanggerang</Text>
                  <View style={styles.displayFlex}>
                    <Text>───────── </Text>
                    <Badge style={{ backgroundColor: '#D28496', alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ color: 'white',alignSelf: 'center' }}>3.0</Text>
                    </Badge>
                    <Text> ─────────</Text>
                  </View>
                  <View style={styles.displayFlex}>
                    {dataButton.map(item => {
                      return (
                        <View style={{flex: 1, flexDirection: 'column', alignContent: 'center', alignItems: 'center', justifyContent: 'space-around'}}>
                          <TouchableOpacity onPress={() => this.callNumber(item.id)} style={{flex: 1, flexDirection: 'column', alignContent: 'center', alignItems: 'center', justifyContent: 'space-around'}}>
                            <Icon style={{ color: '#D28496' }} name={item.icon} />
                            <Text style={item.text.length > 8 ? {marginLeft :10, textAlign: 'center',marginRight: 10, color: '#D28496'}: {alignItems: 'center', color: '#D28496'}}>{item.text}</Text>
                          </TouchableOpacity>
                        </View>
                      )
                    })}
                  </View>
                  <View style={{ borderBottomWidth: 1.5, borderBottomColor: '#D28496', marginBottom: 20, marginTop: 20 }}/>
                  <H3>INFO</H3>
                  <Text>{detailList.salon.branch[0].address}</Text>
                  
                  <Text></Text>
                  <View style={styles.line}/>
                  <H3>Photo</H3>
                  
                  <View style={[styles.line,{marginTop: 30}]}/>
                  
                </Content>
              }
            />
          </Container>
        ) : (
          <View style={styles.container}>
            <ActivityIndicator style={{marginTop:50}}/>
          </View>
        )
    )
  }
}

const styles = StyleSheet.create({
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#d1dadf',
    marginBottom: 20,
    marginTop: 20
  },
  goBack: {
    marginTop: 20
  },
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  iconGoBack: {
    color: 'white',
    fontSize: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  header: {
    height: 200,
    padding: 0,
    marginBottom: 5
  },
  headerImage: {
    height: 80,
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  mainTitle: {
    color: 'white',
    fontSize: 45,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  headWrapper: {

    backgroundColor: 'yellow',
    flexDirection: 'row',
    alignItems: 'center',
  },
  subTitle: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold'
  },
  displayFlex: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const mapStateToProps = (state) => ({
  // episode: state.episodeReducer.episode
  detailList: state.detailList
})

const mapDispatchToProps = (dispatch) => ({
  // fetchOne: (id) => dispatch(fetch_one_episode(id))
})


export default connect(mapStateToProps, mapDispatchToProps)(DetailScreen)