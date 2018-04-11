import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Dimensions } from "react-native";
import { Tabs, Tab, Text, Content, Spinner } from "native-base";

import CardBox from "./common/CardsTab";
var { height, width } = Dimensions.get("window");

export default class TabScreen extends Component {
  constructor(){
    super()
    this.state= {
      Hair: null,
      Eyelashes: null,
      Bridal: null,
      Nails: null,
      Brow: null,
      isloading: true
    }
  }
  componentDidMount(){
    console.log('ini props',this.props.allCategory)
    if(this.props.allCategory){
      console.log('asuuuu')
      var count  = 0
      this.props.allCategory.forEach((element, index) => {
        count= count + 1
        switch (element.category) {
          case 'Hair': this.setState({Hair: element.data})
            break;
          case 'Eyelashes': this.setState({Eyelashes: element.data})
            break;
          case 'Bridal': this.setState({Bridal: element.data})
            break;
          case 'Nails': this.setState({Nails: element.data})
           break;
           case 'Brow': this.setState({Brow: element.data})
           break;
        }
        if(count == this.props.allCategory.lenght) {
          this.setState({isLoading: false})
        }
      });
    }
    
  }
  componentDidUpdate(){

  }
  
  _handleAllCategory(category) {

  }

  render() {
    { if(!this.state.isLoading) {
      return (
        <Tabs initialPage={0} tabContainerStyle={{ elevation: 0 }}>
          <Tab
            heading="HAIR"
            style={{ backgroundColor: "#E7B3BF", flex: 1,}}
            tabStyle={{ backgroundColor: "#E7B3BF" }}
            activeTabStyle={{ backgroundColor: "#E7B3BF", fontFamily: "niagara" }}
            activeTextStyle={{ fontFamily: "niagara", fontWeight: "normal" }}
            textStyle={{ color: "white", fontFamily: "niagara" }}
          >
          <Content style={{flex: 1}}>
            <CardBox tab="Hair" data={this.state.Hair? this.state.Hair : this.props.allCategory}/>
          </Content>
          </Tab>
          <Tab
            heading="EYELASHES"
            style={{ backgroundColor: "#E7B3BF", flex: 1,}}
            tabStyle={{ backgroundColor: "#E7B3BF" }}
            activeTabStyle={{ backgroundColor: "#E7B3BF" }}
            activeTextStyle={{ fontWeight: "normal", fontFamily: "niagara" }}
            textStyle={{ color: "white", fontFamily: "niagara" }}
          >
          <Content style={{flex: 1}}>
            <CardBox tab="Eyelashes" data={this.state.Eyelashes}/>
          </Content>
            
          </Tab>
          <Tab
            heading="BRIDAL"
            style={{ backgroundColor: "#E7B3BF", flex: 1,}}
            tabStyle={{ backgroundColor: "#E7B3BF" }}
            activeTabStyle={{ backgroundColor: "#E7B3BF" }}
            activeTextStyle={{ fontWeight: "normal", fontFamily: "niagara" }}
            textStyle={{ color: "white", fontFamily: "niagara" }}
          >
            <Content style={{flex: 1}}>
              <CardBox tab="Bridal" data={this.state.Bridal}/>
            </Content>
          </Tab>
          <Tab
            heading="NAIL"
            style={{ backgroundColor: "#E7B3BF", flex: 1,}}
            tabStyle={{ backgroundColor: "#E7B3BF" }}
            activeTabStyle={{ backgroundColor: "#E7B3BF" }}
            activeTextStyle={{ fontWeight: "normal", fontFamily: "niagara" }}
            textStyle={{ color: "white", fontFamily: "niagara" }}
          >
            <Content style={{flex: 1}}>
              <CardBox tab="Nail"  data={this.state.Nails}/>
            </Content>
          </Tab>
          <Tab
            heading="BROW"
            style={{ backgroundColor: "#E7B3BF", flex: 1,}}
            tabStyle={{ backgroundColor: "#E7B3BF" }}
            activeTabStyle={{ backgroundColor: "#E7B3BF" }}
            activeTextStyle={{ fontWeight: "normal", fontFamily: "niagara" }}
            textStyle={{ color: "white", fontFamily: "niagara" }}
          >
            <Content style={{flex: 1}}>
              <CardBox tab="Brow"  data={this.state.Brow} />
            </Content>
          </Tab>
        </Tabs>
      );
    } else {
      return (
        <Container style={{flex: 1,alignContent: 'center', justifyContent: 'center',}}>
          <Content>
            <Spinner color="blue" style={{alignSelf: 'center'}}/>
          </Content>
        </Container>
      );
    }
  }
    
  }
}

