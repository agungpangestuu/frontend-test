import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Modal, AsyncStorage, TouchableOpacity, ImageBackground, StatusBar, StyleSheet, Text, View, BackHandler, Alert, TouchableHighlight} from 'react-native';
import Call from 'react-native-phone-call'
import {Button, Container, Content, H3, Badge, Icon, Item, Input} from 'native-base'
import {CirclesLoader, TextLoader} from 'react-native-indicator'
import {Rating} from 'react-native-elements'
import Collapsible from 'react-native-collapsible-header'
import axios from 'axios'
import { AirbnbRating } from "react-native-ratings";

// import {fetch_one_episode} from '../stores/episodeAction'
import {postBookmark, postRecent} from './store/actions'

// var { height, width } = Dimensions.get("window");

class DetailScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bookmark: false,
      beenHere: false,
      showAlert: false,
      itemId: 0,
      distric: null,
      isLoading: true,
      modalVisible: false,
      rate: null,
      star: false,
      lat: null,
      long: null
    }
    this.handleBackAndroid = this._handleBackAndroid.bind(this)
  }
  componentWillMount() {
    let {params} = this.props.navigation.state
    // this.props.fetchOne(params.id)
    console.log('ini detail props list ',this.props)

    const { location } = this.props.detailList

    if(location && location.hasOwnProperty('coordinates')){
      this.setState({lat: location.coordinates[1], long: location.coordinates[0]})
    }
    else{
      this.setState({lat: this.props.getLocation.lat, long: this.props.getLocation.long})
    }
    let bookmark = this.props.getData.bookmark.filter(item => item.salon._id === params)
    let beenHere = this.props.getData.recent.filter(element => element.salon._id === params)

    if(bookmark.length > 0){
      this.setState({bookmark: true})
    } else if (beenHere.length > 0) {
      this.setState({beenHere: true})
    }

    if(this.props.detailList.review.length > 0 ) {

    }
    else {
      this.setState({rate: '0.0'})
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackAndroid);
    
    // if (location && location.hasOwnProperty('coordinates')) {
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.lat},${this.state.long}&key=AIzaSyAjWOHPrXscmVtlGBYIsi6ZrvF8ZYydteI`)
      .then(({data}) => {
        console.log(data)
        data.results.forEach(item => {
          console.log(item.types)
          if(item.types.includes("administrative_area_level_2") || item.types.includes("administrative_area_level_3")){
            console.log('masuk')
            this.setState({
              distric: item.formatted_address,
              isLoading: false
            })
          }
          else {
            this.setState({
              distric: '',
              isLoading: false
            })
          }
        })
      })
      .catch(err => {
        this.setState({
          distric: '',
          isLoading: false
        })
        console.log(err)
      })
    // }
    // else {
    //   this.setState({
    //     distric: '',
    //     isLoading: false
    //   })
    // }
  }

  _handleBackAndroid() {
    this.props.navigation.goBack();
    return true;
  } 

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackAndroid)
  }

  handleBookmark() {
    const {state} = this.props.navigation
    if(this.state.bookmark) {
      this.setState({bookmark: false}, this.props.bookmarkPost(this.props.getData.id, state.params)) 
    } else {
      this.setState({bookmark: true}, this.props.bookmarkPost(this.props.getData.id, state.params)) 
    }
  }

  handleRecent() {
    const {state} = this.props.navigation
    
      this.setState({beenHere: true}, this.props.recentPost(this.props.getData.id, state.params))

  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  handlePress(item) {
    let arg = {
      number: this.props.detailList.phone,
      prompt: false
    }
    switch (item.id) {
      case 1: arg.number ? Call(arg).catch(console.error) : (
        Alert.alert(
          'Mohon maaf',
          'kami tidak menyediakan nomor untuk salon ini ',
          [
            {text: 'OK', onPress: () => BackHandler.exitApp() },
          ],
          { cancelable: false }
        )
      )
        break;
      case 2: this.setModalVisible(true)
        break;
      case 3: Alert.alert(
        '',
        (this.state.bookmark) ? 'Apakah anda ingin menghapus bookmark salon ini ?' : 'Apakah anda ingin bookmark salon ini ?',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => this.handleBookmark() },
        ],
        { cancelable: false }
      )
        break;
      case 5: (this.state.beenHere) ? '' : Alert.alert(
        '',
        'Apakah anda yakin telah ke salon ini ?',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => this.handleRecent() },
        ],
        { cancelable: false }
      )
        break;
    }
    
    
  }

  renderIcon(item) {
    if(item.id === 3 ) {
      return (
        <View style={{flex: 1, flexDirection: 'column', alignContent: 'center', alignItems: 'center', justifyContent: 'space-around'}}>
          <TouchableOpacity onPress={() => this.handlePress(item)} style={{flex: 1, flexDirection: 'column', alignContent: 'center', alignItems: 'center', justifyContent: 'space-around'}}>
            <Icon style={this.state.bookmark ? {color: 'white'} : {color: '#D28496'}} name={item.icon} />
            <Text style={item.text.length > 8 ? {marginLeft :10, textAlign: 'center',marginRight: 10, color: '#D28496'}: {alignItems: 'center', color: '#D28496'}}>{item.text}</Text>
          </TouchableOpacity>
        </View>
      )
    }
    else if(item.id === 5) {
      return (
        <View style={{flex: 1, flexDirection: 'column', alignContent: 'center', alignItems: 'center', justifyContent: 'space-around'}}>
          <TouchableOpacity onPress={() => this.handlePress(item)} style={{flex: 1, flexDirection: 'column', alignContent: 'center', alignItems: 'center', justifyContent: 'space-around'}}>
            <Icon style={this.state.beenHere ? {color: 'white'} : {color: '#D28496'}} name={item.icon} />
            <Text style={item.text.length > 8 ? {marginLeft :10, textAlign: 'center',marginRight: 10, color: '#D28496'}: {alignItems: 'center', color: '#D28496'}}>{item.text}</Text>
          </TouchableOpacity>
        </View>
      )
    }
    else {
      return (
        <View style={{flex: 1, flexDirection: 'column', alignContent: 'center', alignItems: 'center', justifyContent: 'space-around'}}>
          <TouchableOpacity onPress={() => this.handlePress(item)} style={{flex: 1, flexDirection: 'column', alignContent: 'center', alignItems: 'center', justifyContent: 'space-around'}}>
            <Icon style={{color: '#D28496'}} name={item.icon} />
            <Text style={item.text.length > 8 ? {marginLeft :10, textAlign: 'center',marginRight: 10, color: '#D28496'}: {alignItems: 'center', color: '#D28496'}}>{item.text}</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  ratingCompleted(rating) {
    console.log("Rating is: " + rating)
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
        id: 2,
        icon : 'ios-star',
        text : 'Add Review'
      },
      {
        id: 3,
        icon : 'ios-bookmark',
        text : 'Bookmark'
      },
      {
        id: 4,
        icon : 'ios-camera',
        text : 'Add Photo'
      },
      {
        id: 5,
        icon : 'ios-woman',
        text : 'Been Here'
      },
    ]
    const detailList = this.props.detailList
    const {showAlert} = this.state;
    
    return (!this.state.isLoading && this.state.distric != null ? (
      !detailList.address ?
        (
          <Container>
            <Collapsible
              min={100}
              max={150}
              backgroundColor="#000000"
              renderHeader={(
                <ImageBackground style={styles.headerImage} source={{uri: detailList.images}} resizeMode={'contain'}>
                  <StatusBar barStyle="light-content" backgroundColor="black"/>
                  <Button style={styles.goBack} transparent onPress={() => this.props.navigation.goBack()}>
                    <Icon style={styles.iconGoBack} name="ios-arrow-round-back"/>
                  </Button>
                  
                </ImageBackground>
              )}
              renderContent={
                <Content style={{margin: 20, flex: 1}}>
                  <Text style={{fontSize: 30,alignSelf: 'center', fontFamily: 'niagara', color: 'black'}}>{detailList.name}</Text>
                  <Text style={{fontSize: 20,alignSelf: 'center', fontFamily: 'niagara', color: 'black', marginBottom: 10}}>{this.state.distric}</Text>
                  <View style={styles.displayFlex}>
                  <Rating
                    imageSize={20}
                    readonly
                    startingValue={rating}
                  />
                  </View>
                  <View style={[styles.displayFlex, {marginTop: 10}]}>
                    {dataButton.map(item => {
                      return (
                        this.renderIcon(item)
                      )
                    })}
                  </View>
                  <View style={{ borderBottomWidth: 1.5, borderBottomColor: '#D28496', marginBottom: 20, marginTop: 20 }}/>
                  <H3>INFO</H3>
                  <Text>{detailList.address}</Text>
                  
                  <Text></Text>
                  <View style={styles.line}/>
                  <H3>SERVICE</H3>
                  <Text>{detailList.service}</Text>
                  <View style={[styles.line,{marginTop: 30}]}/>
                  
                </Content>
              }
            />
          </Container>
        ) : (
          <Container>
            <Collapsible
              min={100}
              max={150}
              backgroundColor="#000000"
              renderHeader={(
                <ImageBackground style={styles.headerImage} source={{uri: detailList.images}} resizeMode={'contain'}>
                  <StatusBar barStyle="light-content" backgroundColor="black"/>
                  <Button style={styles.goBack} transparent onPress={() => this.props.navigation.goBack()}>
                    <Icon style={styles.iconGoBack} name="ios-arrow-round-back"/>
                  </Button>
                  
                </ImageBackground>
              )}
              renderContent={
                <Content style={{margin: 20, flex: 1}}>
                  <Text style={{fontSize: 30,alignSelf: 'center', fontFamily: 'niagara', color: 'black'}}>{detailList.name}</Text>
                  <Text style={{fontSize: 20,alignSelf: 'center', fontFamily: 'niagara', color: 'black', marginBottom: 10}}>{this.state.distric}</Text>
                  <View style={styles.displayFlex}>
                    <Text>───────── </Text>
                    <Badge style={{ backgroundColor: '#D28496', alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ color: 'white',alignSelf: 'center' }}>{this.state.rate}</Text>
                    </Badge>
                    <Text> ─────────</Text>
                  </View>
                  <View style={[styles.displayFlex, {marginTop: 10}]}>
                    {dataButton.map(item => {
                      return (
                        this.renderIcon(item)
                      )
                    })}
                  </View>
                  <View style={{ borderBottomWidth: 1.5, borderBottomColor: '#D28496', marginBottom: 20, marginTop: 20 }}/>
                  <H3>INFO</H3>
                  <Text>{detailList.address}</Text>
                  <View style={styles.line}/>
                  <H3>SERVICE</H3>
                  <Text>{detailList.service}</Text>
                  <View style={[styles.line,{marginTop: 30}]}/>
                  
                </Content>
              }
            />

            {/* modal*/}
              <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.modalVisible}
                presentationStyle={'formSheet'}
                onRequestClose={() => {
                  alert('Modal has been closed.');
                }}>
                <View style={{flex:1,marginTop: 22}}>
                  <View>
                    <Text>Hello World!</Text>
                    <AirbnbRating
                      count={5}
                      reviews={["Bad", "OK", "Good", "Very Good","Amazing"]}
                      defaultRating={5}
                      size={50}
                    />
                    <Item>
                      <Input placeholder="Underline Textbox" />
                    </Item>
                    <TouchableOpacity
                      onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                      }}>
                      <Text>Hide Modal</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            {/* end modal */}

          </Container>
        )
      ) : (
        <View style={{flex: 1,alignContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
          <CirclesLoader color='#D28496' />
          <TextLoader text="Loading" />
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
  detailList: state.detailList,
  getData: state.login,
  getLocation: state.location
})

const mapDispatchToProps = (dispatch) => ({
  // fetchOne: (id) => dispatch(fetch_one_episode(id))
  bookmarkPost: (userId, salonId) => { dispatch(postBookmark(userId, salonId))},
  recentPost: (userId, salonId) => { dispatch(postRecent(userId, salonId))},
  postLogin_state: obj => dispatch(login_user(obj))
})


export default connect(mapStateToProps, mapDispatchToProps)(DetailScreen)