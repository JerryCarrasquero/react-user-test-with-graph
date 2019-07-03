import React from 'react';
import { StyleSheet, Text, View,ScrollView,Image,Dimensions,TouchableOpacity,Linking} from 'react-native';
import Publicidad from  "../assets/publicidad.png"
import {Avatar} from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AsyncStorage} from 'react-native';
import logo2 from "../assets/descarga.jpg"
import { Table, Row, Rows } from 'react-native-table-component';
import PureChart from 'react-native-pure-chart';
import {Constants, Notifications, Permissions} from 'expo';

const {width:WIDTH} =Dimensions.get('window')
export default class Homescreen extends React.Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
          avatarSource:null,  
          tableHead: ['Meses', 'Monto'],
          tableData: [
            ['Enero', '1000'],
            ['Febrero', '1065.05'],
            ['Marzo', '1134.05'],
            ['Abril', '1208.12'],
            ['Mayo', '1285.708'],
            ['Junio', '1370.408'],
            ['Julio', '1459.553'],
            ['Agosto', '1554.497'],
            ['Septiembre', '1665.617'],
            ['Octubre', '1763.315'],
            ['Noviembre', '1878.019'],
            ['Diciembre', '2000']
          ]
        }
    }
    

 sampleData = [
    {x: 'Enero', y: 1065.05},
    {x: 'Febrero', y: 1065.05},
    {x: 'Marzo', y: 1134.05},
    {x: 'Abril', y: 1208.12},
    {x: 'Mayo', y: 1285.708},
    {x: 'Junio', y: 1370.408},
    {x: 'Julio', y: 1459.553},
    {x: 'Agosto', y: 1554.497},
    {x: 'Septiembre', y: 1665.617},
    {x: 'Octubre', y: 1763.315},
    {x: 'Noviembre', y: 1878.019},
    {x: 'Diciembre', y: 2000}
    ]   
    retrieveData = async () => {
        console.log("fired");
        try {
            const value2 = await AsyncStorage.getItem('avatar');
            this.setState({avatarSource:value2})
        } catch (error) {
        this.error;
        console.log(this.error)
        }
      };
    onSubmit =  () => {
    console.log("Noti request fired");
    const localNotification = {
        title: 'Nuevas informacion',
        body: 'Click aqui'
        };
    
    const schedulingOptions = {
        time: (new Date()).getTime() + 10000,
        }
        console.log(schedulingOptions)
        Notifications.scheduleLocalNotificationAsync(
            localNotification, schedulingOptions
        );
    }
    handleNotification() {
        console.log("Got notifications")
    }
    async componentWillMount(){
        console.log("this mounted")
        this.retrieveData()
        let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);

        if (Constants.isDevice && result.status === 'granted') {
            console.log('Notification permissions granted.')
        }
      Notifications.addListener(this.handleNotification);
      this.onSubmit();       
    console.log("this mounted");
    }
    openlink= () =>{
        console.log('fired')
        Linking.openURL('https://fiverr.com/s2/46c0a706bb').catch((err) => console.error('An error occurred', err));        
    }
    render() {
        return(
            <View style={styles.backgroundColor}>
                  <ScrollView style={[styles.Container,styles.Scrollstyle]}>
                    <View style={[styles.Conten]}>
                    <Avatar 
                     rounded 
                     source={{uri: this.state.avatarSource }}
                     size="xlarge"></Avatar>
                    </View>
                    <View style={styles.ContentContainer}>
                        <View style={styles.box}>
                            <Text style={styles.text}>Balance</Text>
                            <TextInput editable={false} style={styles.input}>2000</TextInput>
                        </View>
                        <View style={styles.box}>
                            <Text  style={styles.text}>Movimiento</Text>
                            <TextInput editable={false} style={styles.input}>1000</TextInput>
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.text}>Tiempo</Text>
                            <TextInput  editable={false} style={styles.input}>  12</TextInput>
                        </View>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.text}>%</Text>
                        <TextInput editable={false} style={styles.input}>0.3%</TextInput>
                    </View>
                    <View style={styles.graph}>
                         <PureChart data={this.sampleData} type='line' />
                    </View>
                    <View style={styles.container2}>
                    <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                        <Row data={this.state.tableHead} style={styles.head} textStyle={styles.textt2}/>
                        <Rows data={this.state.tableData} style={styles.rows}textStyle={styles.textt}/>
                    </Table>
                </View>

                  </ScrollView>
                  <View style={[styles.Container,styles.Publicicontainer]}>
                    <TouchableOpacity onPress={this.openlink}>
                      <Image style={styles.publicidadimage} source={Publicidad}></Image>
                    </TouchableOpacity>
                  </View>
            </View>
        );
    }
}
  const styles = StyleSheet.create({
    backgroundColor:{
      backgroundColor:'#5C7DE9',
      flex:1,
      flexDirection:"column",
      width:null,
      height:null,
    },
    Container:{
      flex:1,
    },
    Conten:{
        marginTop:30,
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    Scrollstyle:{
        flex:0.7,
    },
    Publicicontainer:{
        flex:0.3,
        backgroundColor:'#3D5DC4',
        justifyContent:'center',
        alignItems:'center'
    },
    publicidadimage:{
        flex: 1,
        aspectRatio: 1.2, 
        resizeMode: 'contain',
    },
    ContentContainer:{
        flex:1,
        flexDirection:'row'
    },
    box:{
        justifyContent:'center',
        alignItems:'center',
        flex:1
    },
    text:{
        color:"#FFFFFF",
        fontSize:20,
        fontWeight:'500',
        marginTop:10,
    },
    input:{
        height:45,
        width:65,
        borderRadius:25,
        fontSize:16,
        paddingLeft:15,
        backgroundColor:"rgba(255,255,255,0.35)",
        color:'#FFFFFF',
        marginHorizontal:25
    },
    container2: { 
        flex: 1, 
        padding: 16, 
        paddingTop: 30,
        borderRadius:25,
    },
    head: { 
        height: 40, 
        backgroundColor: '#3D5DC4' 
    },
    textt: { 
        margin: 6 
    },
    textt2: { 
        color:"#FFFFFF",
        margin: 6 
    },
    graph:{
        marginTop:10,
        marginLeft:20,
        marginRight:20,
        borderRadius:25,
    },
    rows:{
        backgroundColor: '#f1f8ff' 
    }

  });