import React, { Component } from "react";
import { Dimensions } from "react-native";
import { Tabs, Tab, Content, Container } from "native-base";
import { connect } from "react-redux"
import {CirclesLoader, TextLoader} from 'react-native-indicator'

import CardBox from "./common/CardsTab";
var { height, width } = Dimensions.get("window");

class TabScreen extends Component {
  constructor(props){
    super(props)
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
    if(this.props.getSearch){
      var count  = 0
      this.props.getSearch.forEach((element, index) => {
        count= count + 1
        switch (element.name) {
          case 'Hair': return this.setState({Hair: element.salons})
            break;
          case "Eyelashes": return this.setState({Eyelashes: element.salons})
            break;
          case 'Bridal And Spa' || 'Bridal': return this.setState({Bridal: element.salons})
            break;
          case 'Nails': return this.setState({Nails: element.salons})
            break;
          case 'Brow': return this.setState({Brow: element.salons})
            break;
        }
      }
    );
      if(count === this.props.getSearch.length) {
        this.setState({isLoading: false})
      }
    }
  }
  
  render() {
    { if(!this.state.isLoading) {
      return (
        <Tabs initialPage={0} tabContainerStyle={{ elevation: 0 }}>
          <Tab
            heading="HAIR"
            style={{ backgroundColor: "#E7B3BF", flex: 1}}
            tabStyle={{ backgroundColor: "#E7B3BF" }}
            activeTabStyle={{ backgroundColor: "#E7B3BF", fontFamily: "niagara" }}
            activeTextStyle={{ fontFamily: "niagara", fontWeight: "normal" }}
            textStyle={{ color: "white", fontFamily: "niagara" }}
          >
          <Content style={{flex: 1}}>
            <CardBox tab="Hair" data={this.state.Hair? this.state.Hair : this.props.allCategory} navigation={this.props.navigation}/>
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
            <CardBox tab="Eyelashes" data={this.state.Eyelashes} navigation={this.props.navigation}/>
          </Content>
            
          </Tab>
          <Tab
            heading="BRIDAL AND SPA"
            style={{ backgroundColor: "#E7B3BF", flex: 1,}}
            tabStyle={{ backgroundColor: "#E7B3BF" }}
            activeTabStyle={{ backgroundColor: "#E7B3BF" }}
            activeTextStyle={{ fontWeight: "normal", fontFamily: "niagara" }}
            textStyle={{ color: "white", fontFamily: "niagara" }}
          >
            <Content style={{flex: 1}}>
              <CardBox tab="Bridal" data={this.state.Bridal} navigation={this.props.navigation} />
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
              <CardBox tab="Nail"  data={this.state.Nails} navigation={this.props.navigation} />
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
              <CardBox tab="Brow"  data={this.state.Brow} navigation={this.props.navigation}/>
            </Content>
          </Tab>
        </Tabs>
      )
    } else {
      return (
        <Container style={{flex: 1,alignContent: 'center', justifyContent: 'center',}}>
          <Content>
            <CirclesLoader color='#D28496' />
            <TextLoader text="Loading" />
          </Content>
        </Container>
      )
    }
  }
    
  }
}

const mapStateToProps = (state) => ({
  getAllCategory: state.allCategory,
  getSearch: state.search
})

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TabScreen)