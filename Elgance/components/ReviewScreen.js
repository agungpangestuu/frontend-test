import React, { Component } from 'react';
import { Dimensions, BackHandler, View, Textarea, TouchableOpacity } from 'react-native'
import { Container, Header, Content, Left, Body, Button,Icon, Text, Right } from "native-base";
import { AirbnbRating } from "react-native-ratings";
import {connect} from 'react-redux'

var { height, width } = Dimensions.get("window");


class Review extends Component {
    constructor(props) {
        super(props)
        this.state={
            review: '',
            star: 1
        }

        this.handleBackAndroid = this._handleBackAndroid.bind(this)
    }
    handleChangeTextArea(e) {
        this.setState({review: e.target.value})
    }
    handleSubmit() {

    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackAndroid);

    }

    _handleBackAndroid() {
        this.props.navigation.goBack();
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
                        <Button transparent >
                        <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Text>REVIEW SALON</Text>
                    </Body>
                    <Right style={{ flex: 1 }}>
                    </Right>
                    </Header>
                    <AirbnbRating
                        count={5}
                        reviews={["Bad", "OK", "Good", "Very Good","Amazing"]}
                        defaultRating={5}
                        size={50}
                        onFinishRating={this.ratingCompleted}
                    />
                    <Content>
                        <Button>
                            <Text>test</Text>
                        </Button>
                    </Content>
                    <Content>
                        <Button>
                            <Text>test</Text>
                        </Button>
                    </Content>
            </Container>
        );
    }
    ratingCompleted(rating) {
        console.log('ini rating :', rating)
    }
}

const mapStateToProps = (state) => ({
})
  
const mapDispatchToProps = (dispatch) => ({

})
  

export default connect(mapStateToProps, mapDispatchToProps)(Review);