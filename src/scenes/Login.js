import React, { Component } from 'react'
import { StatusBar, View, Text, Image,TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
import TextInputLogin from '../components/textinput/TextInputLogin'
import AsyncStorage from '@react-native-community/async-storage';
import { loginService } from '../services/Service';

export default class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            error: '',
            loader: false
        }
    }

    // fungsi yang di load saat aplikasi di buka
    async componentDidMount(){
        try {
            // get user login
            const user = await AsyncStorage.getItem('AuthUser')
            
            // cek user login  atau tidak
            if (user !== null){
                this.props.navigation.replace("MainMenu")
            }
            
        } catch(err){
            
        }
    }
    
    submitLogin = async () => {
        try {
            this.setState({
                loader: true
            })      
            const {success, message, data} = await loginService({
                username: this.state.username,
                password: this.state.password,
            })

            if (success){
                await AsyncStorage.setItem('AuthUser', JSON.stringify(data))
                this.setState({
                    loader: false
                }, () => {
                    this.props.navigation.replace('MainMenu')
                })
            } else {
                throw new Error(message)
            }

            
        } catch(err){
            this.setState({
                error: err.message !== undefined ? err.message : 'Cant connect to server',
                loader: false
            })
        }
    }
    render(){
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    paddingTop: 100,
                }}
            >

                <StatusBar translucent backgroundColor="transparent" barStyle="dark-content"/>
                <ScrollView
                    style={{
                        flex: 1,
                    }}
                >
                    <View
                        style={{
                            width: '100%',
                            alignItems: 'center'
                        }}
                    >
                        <View
                            style={{
                                width: 150,
                                height: 150
                            }}
                        >
                            <Image 
                                style={{
                                    width: '100%',
                                    height: '100%'
                                }}
                                source={require('../../assets/background/loginimage.png')}
                            />
                        </View>
                    </View>
                    <View
                        style={{
                            paddingHorizontal: 20,
                            alignItems: 'flex-start'  
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: 'NeoSansBold',
                                fontSize: 20,
                                color: '#000'
                            }}
                        >
                            Selamat Datang,
                        </Text>
                        <Text
                            style={{
                                marginTop: 5,
                                fontFamily: 'NeoSansBold',
                                fontSize: 18,
                                color: '#000'
                            }}
                        >
                             Di Aplikasi Kuesioner!
                        </Text>
                        <Text
                            style={{
                                marginTop: 20,
                                fontFamily: 'NeoSans',
                                fontSize: 14,
                                lineHeight: 20,
                                color: '#000'
                            }}
                        >
                            Silahkan login untuk mulai mengisi kuesioner atau melihat hasil kuesioner
                        </Text>
                    </View>
                    <View
                        style={{
                            marginTop: 20,
                            width: '100%',
                            paddingHorizontal: 10
                        }}
                    >
                        {this.state.error.length > 0 &&
                            <Text
                                style={{
                                    fontFamily: 'NeoSansBold',
                                    fontSize: 14,
                                    paddingHorizontal: 10,
                                    lineHeight: 20,
                                    color: '#444'
                                }}
                            >
                                {this.state.error}
                            </Text>
                        }
                        <TextInputLogin
                            value={this.state.username}
                            placeholder={'Masukan NIP / NIM'}
                            onChange={(text) => {
                                this.setState({
                                    username: text
                                })
                            }}
                        />
                        <TextInputLogin
                            secureTextEntry={true}
                            value={this.state.password}
                            secureTextEntry
                            placeholder={'Masukan Password'}
                            onChange={(text) => {
                                this.setState({
                                    password: text
                                })
                            }}
                        />
                        <View
                            style={{
                                marginTop: 20,
                                height: 50,
                                flexDirection: 'row'
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    marginRight: 10,
                                    borderRadius: 30,
                                    backgroundColor: "#9a67ea",
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                onPress={this.submitLogin}
                            >
                                {this.state.loader ? 
                                    <ActivityIndicator size={25} color="#fff"/>
                                    : 
                                    <Text
                                        style={{
                                            fontFamily: 'NeoSansBold',
                                            fontSize: 15,
                                            color: '#fff'
                                        }}
                                    >
                                        Masuk
                                    </Text>   
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}