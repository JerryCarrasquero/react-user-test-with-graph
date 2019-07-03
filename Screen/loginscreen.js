import React from 'react';
import { StyleSheet, Text, View, Image,Dimensions,TouchableOpacity} from 'react-native';
import logo from "../assets/reactlogo.png"
import { TextInput } from 'react-native-gesture-handler';
import {Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AsyncStorage} from 'react-native';
import logo2 from "../assets/descarga.jpg"
import { ImagePicker } from 'expo';


const {width:WIDTH} =Dimensions.get('window')
export default class Loginscreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props)
    this.state = {
      username:'username',
      Password:'password', 
      showpass:true,
      avatarSource:logo,
      logoavailable:false 
    }
  }
  showpass= () => {
    this.setState(previousState => (
      { showpass: !previousState.showpass }
    ))
    console.log(this.state.showpass);
  }
  getimage= () =>{
    console.log("get image fired");
    
  }
  cameraroll= async () =>{
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 4]
    });
    console.log(result);
    if (!result.cancelled) {
      this.setState({
        avatarSource: result.uri,
        logoavailable: true
      });
    try {
      await AsyncStorage.setItem('imageval','true');
      await AsyncStorage.setItem('avatar',result.uri);
      //this.setState.avatarSource=logo2;
      console.log("saved")
    }  catch (error) {
      console.log(error)
      // Error saving data
      }
    }
  }
  logindata = () =>{
    fetch('http://reactest.orgfree.com/hellophp/authtest.php', {
    method: 'POST',
    body: JSON.stringify({
      username: this.state.username,
      pasword: this.state.Password,
      photoavailable:this.state.logoavailable
    }),
  }).then((response) => response.json())
  .then((responseJson) => {
    console.log(responseJson.succes);
    if (responseJson.succes==false){
      alert(responseJson.result);
    }else{
      this.props.navigation.navigate('Home')
    }
  })
  .catch((error) => {
    console.error(error);
  });;
  }
  retrieveData = async () => {
    console.log("fired");
    try {
      const value = await AsyncStorage.getItem('imageval');
      if (value !== null) {
      // We have data!!
        this.setState({logoavailable:true})
        const value2 = await AsyncStorage.getItem('avatar');
        this.setState({avatarSource:value2})
      }else {
        this.setState.logoavailable=false
        console.log("false")
      }
    } catch (error) {
    this.error;
    console.log(this.error)
    }
  };
  componentWillMount(){  
    this.retrieveData()
  }
  render() {
    return (
      
      <View style={styles.backgroundColor}>
        <View style={styles.logocontainer}>
          <Avatar 
          rounded 
          source={this.state.logoavailable==false? logo : {uri: this.state.avatarSource }} 
          showEditButton
          onEditPress={this.cameraroll}
          size="xlarge"></Avatar>
          <Text style={styles.logotext}>React Test</Text>
        </View>
        <View style={styles.inputcontainer}>
          <Icon name={"user"} style={styles.iconinput} size={28} color="#FFFFFF"></Icon>
          <TextInput style={styles.input}
            onChangeText={(username) => this.setState({username})}
            placeholder="Usuario"
            placeholderTextColor='#FFFFFF'
            underlineColorAndroid='transparent'
          />
        </View>
        <View style={styles.inputcontainer}>
        <Icon name={"lock"} style={styles.iconinput} size={28} color="#FFFFFF"></Icon>
          <TextInput style={styles.input} 
            placeholder="Password"
            onChangeText={(Password) => this.setState({Password})}
            secureTextEntry={this.state.showpass}
            placeholderTextColor='#FFFFFF'
            underlineColorAndroid='transparent'
          />
          <TouchableOpacity style={styles.iconeye} onPress={this.showpass}>
            <Icon name={"eye"} size={26} color="#FFFFFF"></Icon>
          </TouchableOpacity >
        </View>
        <TouchableOpacity style={styles.btnlogin} onPress={this.logindata}>
            <Text style={styles.text}>Login</Text>
          </TouchableOpacity >
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text:{
    color:"#FFFFFF",
    fontSize:20,
    fontWeight:'500',
  },
  backgroundColor:{
    backgroundColor:'#5C7DE9',
    flex:1,
    width:null,
    height:null,
    justifyContent:'center',
    alignItems:'center'
  },
  logocontainer:{ 
    alignItems:'center'
  },
  logo:{
    width:135,
    height:120
  },
  logotext:{
    color:"#FFFFFF",
    fontSize:20,
    fontWeight:'500',
    marginTop:10,
  },
  input:{
    width: WIDTH-55,
    height:45,
    borderRadius:25,
    fontSize:16,
    paddingLeft:45,
    backgroundColor:"rgba(255,255,255,0.35)",
    color:'#FFFFFF',
    marginHorizontal:25
  },
  iconinput:{
    position:"absolute",
    top:8,
    left: WIDTH-320
  },
  iconeye:{
    position:"absolute",
    top:8,
    right: WIDTH-320
  },
  inputcontainer:{
    marginTop:10
  },
  btnlogin:{
    width: WIDTH-55,
    height:45,
    borderRadius:25,
    fontSize:16,
    backgroundColor:"#FF9933",
    marginTop:20,
    justifyContent:'center',
    alignItems:'center'
  }
});