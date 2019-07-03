import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Loginscreen from "./Screen/loginscreen";
import Homescreen from "./Screen/homescreen";

export default class App extends React.Component {    

  handleNotification() {
    console.log("Got notifications")
  }  
async componentDidMount() {
  Notifications.addListener(this.handleNotification);
  this.props.navigation.navigate('Home')
}

static navigationOptions = { header: null };

    render() {
        return <AppContainer />;
    }
}

const RootStack = createStackNavigator(
    {
      Login: Loginscreen,
      Home: Homescreen
    },
    {
      initialRouteName: 'Login',
    }
  );
  
const AppContainer = createAppContainer(RootStack);

  const styles = StyleSheet.create({
    backgroundColor:{
      backgroundColor:'#1AF73F',
      flex:1,
      width:null,
      height:null,
      justifyContent:'center',
      alignItems:'center'
    },
  });