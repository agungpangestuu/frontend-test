import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Dimensions, TouchableOpacity, ImageBackground, StatusBar, StyleSheet, Text, View, BackHandler, Alert, TouchableHighlight} from 'react-native';
import Call from 'react-native-phone-call'
import {Button, Container, Content, H3, Badge, Icon, List, Textarea, ListItem, Thumbnail, Left, Body, Right} from 'native-base'
import {CirclesLoader, TextLoader} from 'react-native-indicator'
import {Rating} from 'react-native-elements'
import Collapsible from 'react-native-collapsible-header'
import axios from 'axios'
import { AirbnbRating } from "react-native-ratings";
import Modal from 'react-native-modal'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component'

// import {fetch_one_episode} from '../stores/episodeAction'
import {postBookmark, postRecent, postReview, getDetail} from './store/actions'

var { height, width } = Dimensions.get("window");

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
      long: null,
      service: [],
      review: {
        text: '',
        star: 1
      }
    }
    this.handleBackAndroid = this._handleBackAndroid.bind(this)
  }

  async getDetailList() {
    this.props.getDetail()
  }

  componentWillMount() {
    let {params} = this.props.navigation.state
    // this.props.fetchOne(params.id)
    const { location, lat, long, service } = this.props.detailList

    if(this.props.getDirect && lat && long){

      this.setState({lat: long, long: lat})
    }
    else if(location.length > 0){
      this.setState({lat: location[0].location.coordinates[1], long: location[0].location.coordinates[0]})
    }
    else {
      this.setState({lat: long, long: lat})
    }
    let bookmark = this.props.getData.bookmark.filter(item => item.salon._id === params)
    let beenHere = this.props.getData.recent.filter(element => element.salon._id === params)

    if(bookmark.length > 0){
      this.setState({bookmark: true})
    } else if (beenHere.length > 0) {
      this.setState({beenHere: true})
    }

    if(service) {
      let arrService = service.split(',')
      let arr = []
      let tempArr = []
      for (let i = 0; i <= arrService.length; i++) {
        if(arrService.length === i) {
          this.setState({service: arr})
        }
        if (tempArr.length === 3) {
          arr.push(tempArr)
          tempArr = []
        }
        tempArr.push(arrService[i])        
      }
      // this.setState({service: arrService})
    }

    if(this.props.detailList.review.length > 0 ) {
      let rate = this.countStar() / this.props.detailList.review.length
      if (rate % 1 !== 0) {
        rate = rate.toFixed(1)
      }
      this.setState({rate})
    }
    else {
      this.setState({rate: 0})
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackAndroid);
    
    // if (location && location.hasOwnProperty('coordinates')) {
      if(this.state.long && this.state.lat) {
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.lat},${this.state.long}&key=AIzaSyAjWOHPrXscmVtlGBYIsi6ZrvF8ZYydteI`)
        .then(({data}) => {
          let address, noaddress
          data.results.forEach(item => {
            if(item.types.includes("administrative_area_level_2") || item.types.includes("administrative_area_level_3")){
                return address = item.formatted_address
            }
            else {
              return noaddress = item.address_components[0].long_name
            }
          })
          address ? this.setState({
            distric: address,
            isLoading: false
          }) : this.setState({
            distric: noaddress,
            isLoading: false
          })
        })
        .catch(err => {
          this.setState({
            isLoading: false
          })
        })
      } else {



        this.setState({
          distric: this.props.detailList.address.split(' ').slice(0,3).join(' '),
          isLoading: false
        })
      }
    // }
    // else {
    //   this.setState({
    //     distric: '',
    //     isLoading: false
    //   })
    // }
  }

  countStar() {
    let count = 0
    this.props.detailList.review.forEach(item => count+=item.star)
    return count
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
    const { navigate, push } = this.props.navigation
    navigate({ routeName: "ReviewScreen", key: 'Review'})
    // this.setState({modalVisible: visible});
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
            {text: 'OK',},
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
  handleChangeTextArea(e) {
    let review = Object.assign({}, this.state.review)
    let value = e.target.value

    review.text = value

    this.setState({review})
  }

  handleSubmitModal() {
    let review ={ 
      salon_id: this.props.detailList._id,
      user_id: this.props,
      text: this.state.review.text,
      star: this.state.review.star
    }
    this.props.postReview(review)

    this.setModalVisible(!this.state.modalVisible)
  }

  _renderModalContent = () => (
    <View style={styles.modalContent}>
      <AirbnbRating
        count={5}
        reviews={["Bad", "OK", "Good", "Very Good","Amazing"]}
        defaultRating={5}
        size={50}
        onFinishRating={this.ratingCompleted}
      />
      <View style={{backgroundColor: 'red', width: width-80, height: height/4}}>
        <Textarea rowSpan={5} placeholder="Textarea asa" onChange={(e) => this.handleChangeTextArea(e)} />
      </View>
      <View style={{flexDirection: 'column', width: width-80, height: height/4, alignItems: 'center', justifyContent: 'center'}}> 
      <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Text style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1}}>test1</Text>
        <Text style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1}}>test</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          this.handleSubmitModal()
        }} style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <View style={styles.button}>
          <Text>Submit</Text>
        </View>
      </TouchableOpacity>
      </View>
      
    </View>
  )

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
      !this.props.getDirect ?
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
                    <Text>───────── </Text>
                    <Badge style={{ backgroundColor: '#D28496', alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ color: 'white',alignSelf: 'center' }}>{(this.state.rate % 1 === 0 ) ? `${this.state.rate}.0` : this.state.rate}</Text>
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
                  <Text>{(detailList.location.length > 0) ? detailList.location[0].address : detailList.address}</Text>
                  
                  <Text></Text>
                  <View style={styles.line}/>
                  <H3>SERVICE</H3>
                  {(!this.isLoading && this.state.service.length > 0 ) ? 
                  (<View style={styles.tablContainer}>
                    <Table>
                      <TableWrapper style={styles.wrapper}>
                        <Rows data={this.state.service} flexArr={[2, 2, 2]} style={styles.row} textStyle={styles.text}/>
                      </TableWrapper>
                    </Table>
                  </View> ):
                  (<View />) 
                  }
                  
                  <View style={[styles.line,{marginTop: 30}]}/>
                  {(!this.state.isLoading && this.props.detailList.review.length > 0) ? (this.reviewView()) : (<View/>)}
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
                      <Text style={{ color: 'white',alignSelf: 'center' }}>{(this.state.rate % 1 === 0 ) ? `${this.state.rate}.0` : this.state.rate}</Text>
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
                  {(!this.state.isLoading && this.state.service.length > 0 ) ? 
                  (<View style={styles.tablContainer}>
                    <Table>
                      <TableWrapper style={styles.wrapper}>
                        <Rows data={this.state.service} flexArr={[2, 2, 2]} style={styles.row} textStyle={styles.text}/>
                      </TableWrapper>
                    </Table>
                  </View> ):
                  (<View />) 
                  }
                  <View style={[styles.line,{marginTop: 30}]}/>
                  {(!this.state.isLoading && this.props.detailList.review.length > 0) ? (this.reviewView()) : (<View/>)}
                </Content>
              }
            />

            {/* modal*/}
            <Modal
              isVisible={this.state.modalVisible}
              onBackdropPress={() => this.setState({ modalVisible: false })}
            >
            {this._renderModalContent()}
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
  reviewView() {
    return (
      <View>
        <H3>Reviews</H3>
        <View>
          {this.props.detailList.review.reverse().map(item => {
            return ( 
                <List style={{backgroundColor: 'white'}}>
                  <ListItem thumbnail>
                    <Left>
                      <Thumbnail source={{ uri: 'data:image/png;base64,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' }} />
                    </Left>
                    <Body>
                      <Text>{item.user.fullname}</Text>
                      <Rating
                        imageSize={20}
                        readonly
                        startingValue={item.star}
                      />
                    </Body>
                  </ListItem>
                  <View style={{marginLeft: 30, marginTop: 30, marginRight: 30}}><Text note numberOfLines={2}>{(item.text) ? item.text : 'No comment'}</Text></View>
                  <View style={[styles.line,{marginTop: 30}]}/>
                </List>
            )
          })}
        </View>
        
      </View>
      
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
  },
  button: {
    backgroundColor: "lightblue",
    padding: 12,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0
  },
  scrollableModal: {
    height: 300
  },
  scrollableModalContent1: {
    height: 200,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center"
  },
  scrollableModalContent2: {
    height: 200,
    backgroundColor: "lightgreen",
    alignItems: "center",
    justifyContent: "center"
  },
  recentLocation: {
    marginLeft: 5,
    marginVertical: 0,
    marginTop: 30,
    marginBottom: 10,
    alignItems: 'center',
    width: width/3-20,
    height: 50
  },
  tablContainer: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  wrapper: { flexDirection: 'row' },
  row: {  height: 100  },
  text: { textAlign: 'center' }
});

const mapStateToProps = (state) => ({
  // episode: state.episodeReducer.episode
  detailList: state.detailList,
  getData: state.login,
  getDirect: state.mainPage.directLocation,
  getLocation: state.location

})

const mapDispatchToProps = (dispatch) => ({
  // fetchOne: (id) => dispatch(fetch_one_episode(id))
  bookmarkPost: (userId, salonId) => { dispatch(postBookmark(userId, salonId))},
  recentPost: (userId, salonId) => { dispatch(postRecent(userId, salonId))},
  postLogin_state: obj => dispatch(login_user(obj)),
  postReview: review => dispatch(postReview(review)),
  getDetail: data => dispatch(getDetail(data.id, data.lat, data.long))
})


export default connect(mapStateToProps, mapDispatchToProps)(DetailScreen)