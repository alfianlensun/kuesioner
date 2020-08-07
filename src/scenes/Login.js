import React, { Component } from 'react'
import { StatusBar, View, Text, Image,TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
import TextInputLogin from '../components/textinput/TextInputLogin'


export default class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            loader: false
        }
    }
    
    login = () => {
        try {
            this.setState({
                loader: true
            })      
            setTimeout(() => {
                this.setState({
                    loader: false
                })      
                this.props.navigation.push('MainMenu')
            }, 500);
        } catch(err){
            console.log(err)
        }
    }
    render(){
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#63b3ed',
                    paddingTop: 100,
                }}
            >

                <StatusBar translucent backgroundColor="transparent" barStyle="light-content"/>
                <ScrollView
                    style={{
                        flex: 1
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
                                color: '#fff'
                            }}
                        >
                            Selamat Datang,
                        </Text>
                        <Text
                            style={{
                                marginTop: 5,
                                fontFamily: 'NeoSansBold',
                                fontSize: 20,
                                color: '#fff'
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
                                color: '#fff'
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
                            securet
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
                                    backgroundColor: "#3182ce",
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                onPress={this.login}
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
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    borderRadius: 30,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                onPress={this.login}
                            >
                                <Text
                                    style={{
                                        fontFamily: 'NeoSansBold',
                                        fontSize: 16,
                                        color: '#fff'
                                    }}
                                >
                                    Mendaftar
                                </Text>   
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}