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
                    backgroundColor: '#fff'
                }}
            >
                <Drawer
                    type="overlay"
                    tapToClose
                    negotiatePan={true}
                    panCloseMask={0.2}
                    openDrawerOffset={0.2}
                    side={'left'}
                    ref={(ref) => this._drawer = ref}
                    content={(
                        <View
                            style={[{
                                flex: 1,
                                backgroundColor: '#fff'
                            }, {
                                shadowColor: "rgba(255,255,255,.4)",
                                shadowOffset: {
                                    width: 1,
                                    height: 4,
                                },
                                zIndex: 2,
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
                                        borderWidth: 4,
                                        borderColor: '#00227b',
                                        width: 100,
                                        height: 100,
                                        justifyContent: "center",
                                        alignItems: 'center',
                                        backgroundColor: "#fff",
                                        borderRadius: 50
                                    }}
                                >
                                    <Feather name="user" size={40} color={'#222'}/>
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
                                            color: '#000'
                                        }}
                                    >
                                        {this.state.user !== null && this.state.user.nama_user }
                                    </Text>
                                    <Text
                                        style={{
                                            marginTop: 5,
                                            fontFamily: 'NeoSans',
                                            fontSize: 10,
                                            color: '#000'
                                        }}
                                    >
                                        {this.state.user !== null && (this.state.user.id_mst_tipe_user == 2 ? 'NIP - '+this.state.user.nip : (this.state.user.id_mst_tipe_user == 3 && 'NIM - '+this.state.user.nim)) }
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'flex-end',
                                    alignItems: 'center'
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
                                        borderRadius: 40,
                                        marginBottom: 20,
                                        backgroundColor: '#3f50b5'
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: 'NeoSansBold',
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
                    <StatusBar translucent backgroundColor="transparent" barStyle="dark-content"/>
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
                                    flex: 1,
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: 'NeoSans',
                                        fontSize: 14,
                                        color: '#000'
                                    }}
                                >
                                    Hey, 
                                </Text>
                                <Text
                                    style={{
                                        marginTop: 5,
                                        fontFamily: 'NeoSansBold',
                                        fontSize: 14,
                                        color: '#000'
                                    }}
                                >
                                    {this.state.user !== null && this.state.user.nama_user}
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => {this._drawer.open()}}
                                style={{
                                    width: 50,
                                    height: 50,
                                    justifyContent: "center",
                                    alignItems: 'center',
                                    backgroundColor: "#00227b",
                                    borderRadius: 25
                                }}
                            >
                                <Feather name="user" size={20} color={'#fff'}/>
                            </TouchableOpacity>
                            
                        </View>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            paddingHorizontal:20
                        }}
                    >
                        <Text
                            style={{
                                marginTop: 20,
                                fontFamily: 'NeoSansBold',
                                fontSize: 13,
                                color: '#000'
                            }}
                        >
                            Fitur Aplikasi Ini
                        </Text>
                        <View
                            style={[{
                                marginTop: 10,
                                width: '100%',
                                paddingHorizontal: 10,
                                backgroundColor: '#3f51b5',
                                borderRadius: 5 
                            }]}
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
                                {this.state.user !== null && this.state.user.id_mst_tipe_user === 1 &&
                                    <CardMenu 
                                        label={'Dashboard'}
                                        onPress={() => {
                                            this.props.navigation.push('PilihDashboard')
                                        }}
                                        icon={<AntDesign name="piechart" color={'#fff'} size={25}/>}
                                    />
                                }
                                {this.state.user !== null && this.state.user.id_mst_tipe_user === 1 &&
                                    <CardMenu 
                                        label={'Master Kuesioner'}
                                        onPress={() => {
                                            this.props.navigation.push('ListKuesioner')
                                        }}
                                        icon={<Foundation name="clipboard-pencil" color={'#fff'} size={25}/>}
                                    />
                                }
                                {this.state.user !== null && this.state.user.id_mst_tipe_user === 1 &&
                                    <CardMenu 
                                        label={'Master Semester'}
                                        onPress={() => {
                                            this.props.navigation.push('ListSemester')
                                        }}
                                        icon={<Foundation name="clipboard-pencil" color={'#fff'} size={25}/>}
                                    />
                                }
                                {this.state.user !== null && this.state.user.id_mst_tipe_user === 1 &&
                                    <CardMenu 
                                        label={'Master Mata Kuliah'}
                                        onPress={() => {
                                            this.props.navigation.push('ListMataKuliah')
                                        }}
                                        icon={<Foundation name="clipboard-pencil" color={'#fff'} size={25}/>}
                                    />
                                }
                                
                                {this.state.user !== null && this.state.user.id_mst_tipe_user === 1 &&
                                    <CardMenu 
                                        label={'Management User'}
                                        onPress={() => {
                                            this.props.navigation.navigate('ListUser')
                                        }}
                                        icon={<AntDesign name="adduser" color={'#fff'} size={25}/>}
                                    />
                                }
                                {this.state.user !== null && this.state.user.id_mst_tipe_user !== 1 &&
                                    <CardMenu 
                                        label={'Isi Kuesioner'}
                                        onPress={() => {
                                            this.props.navigation.push('PilihKuesioner')
                                        }}
                                        icon={<AntDesign name="plus" color={'#fff'} size={25}/>}
                                    />
                                }
                            </View>
                        </View>
                    </View>
                </Drawer>
            </View>
        )
    }
}