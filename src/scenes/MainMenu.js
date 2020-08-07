import React, { Component } from 'react'
import { StatusBar, View, Text, Image,TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
import TextInputLogin from '../components/textinput/TextInputLogin'
import { screenHeightPercent } from '../helpers/HelpersLayout'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'

export default class MainMenu extends Component{
    constructor(props){
        super(props)
        this.state = {
            loader: false
        }
    }
    render(){
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#7f9cf5'
                }}
            >
                <StatusBar translucent backgroundColor="transparent" barStyle="light-content"/>
                <View
                    style={{
                        width: '100%',
                        paddingTop: screenHeightPercent(4),
                        paddingHorizontal: 20,
                    }}
                >
                    <View
                        style={{
                            paddingVertical: 10,
                            flexDirection: 'row'
                        }}
                    >
                        <View
                            style={{
                                flex: 1
                            }}
                        >
                            <Text
                                style={{
                                    marginTop: 10,
                                    fontFamily: 'NeoSansBold',
                                    fontSize: 16,
                                    color: '#fff'
                                }}
                            >
                                Hallo, 
                            </Text>
                            <Text
                                style={{
                                    marginTop: 10,
                                    fontFamily: 'NeoSansBold',
                                    fontSize: 16,
                                    color: '#fff'
                                }}
                            >
                                Eudora.
                            </Text>
                            <Text
                                style={{
                                    marginTop: 10,
                                    fontFamily: 'NeoSans',
                                    fontSize: 13,
                                    color: '#fff'
                                }}
                            >
                                Mahasiswa
                            </Text>
                        </View>
                        <View>
                            
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        flex: 1,
                        paddingTop: 40
                    }}
                >
                    <TouchableOpacity
                        style={{
                            height: 80,
                            width: 80,
                            position: 'absolute',
                            top: 0, 
                            right: 10,
                            zIndex: 2,
                            backgroundColor:'#7f9cf5',
                            borderRadius: 40,
                            borderWidth: 2,
                            borderColor: '#fff',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Feather name="user" size={25} color="#fff"/>
                    </TouchableOpacity>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: '#fff',
                            borderTopLeftRadius: 30,
                            paddingTop: 20,
                            paddingHorizontal: 20
                        }}
                    >
                        <View
                            style={{
                                width: '100%',
                                paddingVertical: 10,
                                paddingHorizontal: 10,
                                borderRadius: 20,
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: "#7f9cf5"
                            }}
                        >
                            <View
                                style={{
                                    height: 50,
                                    width: 50,
                                    borderRadius: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#667eea'
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: 'NeoSansBold',
                                        fontSize: 25,
                                        color: '#fff'
                                    }}
                                >
                                    5 
                                </Text>
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    paddingLeft: 10
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: 'NeoSansBold',
                                        fontSize: 14,
                                        color: '#fff'
                                    }}
                                >
                                    Kuesioner Di Isi
                                </Text>
                                <Text
                                    style={{
                                        marginTop: 5,
                                        fontFamily: 'NeoSans',
                                        fontSize: 14,
                                        color: '#fff'
                                    }}
                                >
                                    Kamu telah mengisi 5 kuesioner
                                </Text>
                            </View>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                paddingTop: 20,
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: 'NeoSansBold',
                                    fontSize: 14,
                                    color: '#333'
                                }}
                            >
                                Daftar Kuesioner Belum Di Isi
                            </Text>
                            <View
                                style={{
                                    marginTop: 10,
                                    width: '100%',
                                    paddingVertical: 10,
                                    paddingHorizontal: 10,
                                    borderRadius: 20,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    backgroundColor: "#7f9cf5"
                                }}
                            >
                                <View
                                    style={{
                                        height: 50,
                                        width: 50,
                                        borderRadius: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#667eea'
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: 'NeoSansBold',
                                            fontSize: 25,
                                            color: '#fff'
                                        }}
                                    >
                                        <Feather name='list' size={20} color={'#fff'} />
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                        paddingLeft: 10
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: 'NeoSansBold',
                                            fontSize: 14,
                                            color: '#fff'
                                        }}
                                    >
                                        Kuesioner A
                                    </Text>
                                    <Text
                                        style={{
                                            marginTop: 5,
                                            fontFamily: 'NeoSans',
                                            fontSize: 13,
                                            color: '#fff'
                                        }}
                                    >
                                        20 Agustus 2020
                                    </Text>
                                </View>
                            </View>
                            
                        </View>
                    </View>
                    
                </View>
            </View>
        )
    }
}