import React, { Component } from 'react'
import { StatusBar, View, Text, Image,TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
import TextInputLogin from '../components/textinput/TextInputLogin'
import { screenHeightPercent } from '../helpers/HelpersLayout'
import Feather from 'react-native-vector-icons/Feather'
import Foundation from 'react-native-vector-icons/Foundation'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CardMenu from '../components/cards/CardMenu'
import Drawer from 'react-native-drawer'
import MI from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-community/async-storage';
export default class MainMenu extends Component{
    constructor(props){
        super(props)
        this.state = {
            user: null,
            loader: false
        }
    }
    async componentDidMount(){
        try {
            const user = await AsyncStorage.getItem('AuthUser')
            this.setState({
                user: JSON.parse(user)
            })
        } catch(err){
            console.log(err)
        }
    }
    render(){
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#320b86'
                }}
            >
                <Drawer
                    type="overlay"
                    tapToClose
                    negotiatePan={true}
                    panCloseMask={0.2}
                    openDrawerOffset={0.2}
                    side={'right'}
                    ref={(ref) => this._drawer = ref}
                    content={(
                        <View
                            style={[{
                                flex: 1,
                                borderTopLeftRadius: 30,
                                backgroundColor: '#320b86'
                            }, {
                                shadowColor: "rgba(255,255,255,.4)",
                                shadowOffset: {
                                    width: 1,
                                    height: 4,
                                },
                                shadowOpacity: 0.2,
                                shadowRadius: 6.49,
                                elevation: 20,
                            }]}
                        >   
                            <View
                                style={{
                                    width: '100%',
                                    paddingTop: screenHeightPercent(10),
                                    alignItems: 'center'
                                }}
                            >
                                <View
                                    style={{
                                        borderWidth: 2,
                                        borderColor: '#fff',
                                        width: 100,
                                        height: 100,
                                        justifyContent: "center",
                                        alignItems: 'center',
                                        backgroundColor: "#9162e4",
                                        borderRadius: 50
                                    }}
                                >
                                    <Feather name="user" size={40} color={'#fff'}/>
                                </View>
                                <View
                                    style={{
                                        width: '100%',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Text
                                        style={{
                                            marginTop: 10,
                                            fontFamily: 'NeoSansBold',
                                            fontSize: 18,
                                            color: '#fff'
                                        }}
                                    >
                                        {this.state.user !== null && this.state.user.nama_user }
                                    </Text>
                                    <Text
                                        style={{
                                            marginTop: 5,
                                            fontFamily: 'NeoSans',
                                            fontSize: 13,
                                            color: '#fff'
                                        }}
                                    >
                                        {this.state.user !== null && (this.state.user.id_mst_tipe_user == 2 ? this.state.user.nip : (this.state.user.id_mst_tipe_user == 3 && this.state.user.nim)) }
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    paddingBottom: 20,
                                    justifyContent: 'flex-end',
                                    alignItems: 'flex-end'
                                }}
                            >
                                <TouchableOpacity
                                    onPress={async () => {
                                        try {
                                            await AsyncStorage.clear()
                                            this.props.navigation.replace('Login')
                                        } catch(err){
                                            console.log(err)
                                        }
                                    }}
                                    style={{
                                        width: '80%',
                                        paddingVertical: 20,
                                        paddingHorizontal: 20,
                                        borderTopLeftRadius: 10,
                                        borderBottomLeftRadius: 10,
                                        backgroundColor: '#b085f5'
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: 'NeoSans',
                                            fontSize: 14,
                                            color: '#fff'
                                        }}
                                    >
                                        Keluar Aplikasi
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    >
                    <StatusBar translucent backgroundColor="transparent" barStyle="light-content"/>
                    <View
                        style={{
                            width: '100%',
                            paddingTop: screenHeightPercent(4)+20,
                            paddingHorizontal: 20,
                        }}
                    >
                        <View
                            style={{
                                width: '100%',
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                        >
                            <View
                                style={{
                                    width: 50,
                                    height: 50,
                                    justifyContent: "center",
                                    alignItems: 'center',
                                    backgroundColor: "#9162e4",
                                    borderRadius: 25
                                }}
                            >
                                <Feather name="user" size={20} color={'#fff'}/>
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    paddingLeft: 10,
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: 'NeoSans',
                                        fontSize: 14,
                                        color: '#fff'
                                    }}
                                >
                                    Hey, 
                                </Text>
                                <Text
                                    style={{
                                        marginTop: 5,
                                        fontFamily: 'NeoSansBold',
                                        fontSize: 14,
                                        color: '#fff'
                                    }}
                                >
                                    {this.state.user !== null && this.state.user.nama_user}
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => {this._drawer.open()}}
                                style={{
                                    height: 40,
                                    width: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 20,
                                }}
                            >
                                <MI name="filter-list" size={30} color={'#fff'}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            paddingTop: 40,
                            paddingHorizontal:20
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: 'NeoSansBold',
                                fontSize: 14,
                                color: '#fff'
                            }}
                        >
                            Informasi Kuesioner
                        </Text>
                        <View
                            style={{
                                marginTop: 10,
                                width: '100%',
                                flexDirection: 'row'
                            }}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    paddingRight: 10
                                }}
                            >
                                <View
                                    style={{
                                        width: '100%',
                                        height: 80,
                                        borderRadius: 5,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: '#fff'
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: 'NeoSansBold',
                                            fontSize: 30,
                                            color: '#000'
                                        }}
                                    >
                                        5
                                    </Text>
                                    <Text
                                        style={{
                                            marginTop: 5,
                                            fontFamily: 'NeoSans',
                                            fontSize: 12,
                                            color: '#000'
                                        }}
                                    >
                                        Kuesioner Di Isi
                                    </Text>
                                </View>
                            </View>   
                            <View
                                style={{
                                    flex: 1,
                                    paddingLeft: 10
                                }}
                            >
                                <View
                                    style={{
                                        width: '100%',
                                        height: 80,
                                        borderRadius: 5,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: '#fff'
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: 'NeoSansBold',
                                            fontSize: 30,
                                            color: '#000'
                                        }}
                                    >
                                        5
                                    </Text>
                                    <Text
                                        style={{
                                            marginTop: 5,
                                            fontFamily: 'NeoSans',
                                            fontSize: 12,
                                            color: '#000'
                                        }}
                                    >
                                        Kuesioner Di Belum Isi
                                    </Text>
                                </View>
                                
                            </View>    
                        </View>
                        <Text
                            style={{
                                marginTop: 20,
                                fontFamily: 'NeoSansBold',
                                fontSize: 13,
                                color: '#fff'
                            }}
                        >
                            Fitur Aplikasi Ini
                        </Text>
                        <View
                            style={{
                                marginTop: 10,
                                width: '100%',
                                paddingHorizontal: 10,
                                paddingVertical: 10,
                                backgroundColor: '#fff',
                                borderRadius: 5 
                            }}
                        >
                            <View
                                style={{
                                    marginTop: 20,
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    flexDirection: 'row',
                                    flexWrap: 'wrap'
                                }}
                            >
                                <CardMenu 
                                    label={'Master Kuesioner'}
                                    onPress={() => {
                                        this.props.navigation.push('ListKuesioner')
                                    }}
                                    icon={<Foundation name="clipboard-pencil" color={'#fff'} size={25}/>}
                                />
                                <CardMenu 
                                    label={'Isi Kuesioner'}
                                    onPress={() => {
                                        this.props.navigation.push('PilihKuesioner')
                                    }}
                                    icon={<AntDesign name="plus" color={'#fff'} size={25}/>}
                                />
                                <CardMenu 
                                    label={'Management User'}
                                    onPress={() => {
                                        this.props.navigation.navigate('ListUser')
                                    }}
                                    icon={<AntDesign name="adduser" color={'#fff'} size={25}/>}
                                />
                            </View>
                        </View>
                    </View>
                </Drawer>
            </View>
        )
    }
}