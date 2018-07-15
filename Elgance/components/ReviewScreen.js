import React, { Component } from 'react';
import { Dimensions, BackHandler, View, Textarea, TextInput } from 'react-native'
import { Container, Header, Thumbnail, Left, Body, Icon, Text, Right, Button, List, ListItem, Toast } from "native-base";
import { AirbnbRating } from "react-native-ratings";
import {connect} from 'react-redux'
import { postReview, getDetail } from './store/actions'
// import { Button } from 'react-native-elements'

var { height, width } = Dimensions.get("window");


class Review extends Component {
    constructor(props) {
        super(props)
        this.state={
            review: '',
            star: 5
        }

        this.handleBackAndroid = this._handleBackAndroid.bind(this)
    }
    handleChangeTextArea(e) {
        this.setState({review: e})
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackAndroid);

    }

    async getDetailList() {
        let data = {
            id: this.props.detailList._id,
            lat: this.props.getLocation.lat,
            long: this.props.getLocation.long
        }
        return await this.props.getDetail(data)
    }

    _handleBackAndroid() {
        this.getDetailList().then(result  => {
            this.props.navigation.goBack();
        }).catch(e => console.log(e)) 
        return true;
    } 

    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackAndroid)
    }

    render() {
        return (
            <Container>
                <Header
                    androidStatusBarColor="#D28496"
                    style={{ backgroundColor: "#D28496" }}
                    >
                    <Left style={{flex: 1}}>
                        <Button transparent onPress={() => this.handleBackAndroid()}>
                        <Icon
                            name="ios-arrow-back-outline"
                            style={{ fontSize: 30, color: "white" }}
                        />
                        </Button>
                    </Left>
                    <Body style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Text style={{ fontFamily: "niagara", fontSize: 30, color: "white" }}>REVIEW SALON</Text>
                    </Body>
                    <Right style={{ flex: 1 }}>
                    </Right>
                    </Header>
                    <List style={{backgroundColor: 'white'}}>
                        <ListItem thumbnail>
                            <Left>
                            <Thumbnail source={{ uri: this.props.detailList.images }} style={{backgroundColor: 'black'}}/>
                            </Left>
                            <Body>
                            <Text>{this.props.detailList.name}</Text>
                            <Text note numberOfLines={2}>{this.props.detailList.address}</Text>
                            </Body>
                        </ListItem>
                    </List>
                    <AirbnbRating
                        count={5}
                        // reviews={["Bad", "OK", "Good", "Very Good","Amazing"]}
                        defaultRating={5}
                        size={50}
                        onFinishRating={(e) => this.ratingCompleted(e)}
                    />
                    <View style={{flex: 1}}>
                        <TextInput
                            {...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
                            editable = {true}
                            maxLength = {140}
                            multiline = {true}
                            numberOfLines = {4}
                            onChangeText={(e) => this.handleChangeTextArea(e)}
                            value={this.state.review}
                        />
                        <Button success style={{alignSelf: 'center'}} onPress={() => this.handleSubmit()}><Text> Submit </Text></Button>
                    </View>
            </Container>
        );
    }
    ratingCompleted(rating) {
        this.setState({star: rating})
    }
    handleSubmit() {
        let payload = {
            salon_id: this.props.detailList._id,
            star: this.state.star,
            comment: this.state.review,
            user_id: this.props.user.id
        }
        this.props.postReview(payload).then(result => {
            this.handleBackAndroid()
        }).catch(err => {
            Toast.show({
                text: "Silahkan Coba Lagi Nanti !",
                duration: 3000
              })
        })
    }
}

const mapStateToProps = (state) => ({
    detailList: state.detailList,
    user: state.login,
    getLocation: state.location
})

const mapDispatchToProps = (dispatch) => ({
    postReview : (comment) => dispatch(postReview(comment)),
    getDetail : (data) => dispatch(getDetail(data.id, data.lat, data.long))
})

export default connect(mapStateToProps, mapDispatchToProps)(Review);