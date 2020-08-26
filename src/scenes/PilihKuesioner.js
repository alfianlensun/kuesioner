import React, { Component } from 'react'
import { StatusBar, FlatList,View, Text, Image,TouchableOpacity, ActivityIndicator, ScrollView, Modal, Alert } from 'react-native'
import TextInputLogin from '../components/textinput/TextInputLogin'
import { screenHeightPercent } from '../helpers/HelpersLayout'
import Feather from 'react-native-vector-icons/Feather'
import Foundation from 'react-native-vector-icons/Foundation'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CardMenu from '../components/cards/CardMenu'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { getKuesionerMahasiswa, deleteKuesioner, getDosen } from '../services/Service'
import AsyncStorage from '@react-native-community/async-storage'

export default class PilihKuesioner extends Component{
    constructor(props){
        super(props)
        this.state = {
            loader: false,
            loaderDosen: false,
            selectedKuesioner: null,
            modal: false,
            listKuesioner: [],
            listDosen: [],
        }
    }

    componentDidMount(){
        this.focus = this.props.navigation.addListener('focus', () => {
            this.getListKuesioner()
        })
        this.getListDosen()
    }

    componentWillUnmount(){
        this.focus()
    }


    getListDosen = async () => {
        try{
            this.setState({
                loaderDosen: true
            })
            const {data} = await getDosen();
            this.setState({
                listDosen: data,
                loaderDosen: false
            })
        } catch(err){
            setTimeout(() => {
                this.getListDosen()
            }, 4000);
        }
    }
    getListKuesioner = async () => {
        try{
            const user = await AsyncStorage.getItem('AuthUser')
            const {data} = await getKuesionerMahasiswa(user.id_mst_mahasiswa);
            this.setState({
                listKuesioner: data
            })
        } catch(err){
            console.log('err', err)
        }
    }

    delete = async () => {
        try {
            const {success} = await deleteKuesioner({
                idMstKuesioner: this.state.selectedKuesioner.id_mst_kuesioner,
            })
            this.getListKuesioner()
            this.setState({
                modal: false
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
                    backgroundColor: '#320b86',
                    paddingTop: screenHeightPercent(4)+20,
                }}
            >
                <StatusBar translucent backgroundColor="transparent" barStyle="light-content"/>
                <View
                    style={{
                        width: '100%',
                        paddingHorizontal: 20,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                >
                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            backgroundColor: '#fff',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Ionicons name="arrow-back" size={20} color={'#000'}/>
                    </TouchableOpacity>
                    <Text
                        style={{
                            paddingLeft: 10,
                            fontFamily: 'NeoSansBold',
                            fontSize: 16,
                            color: '#fff'
                        }}
                    >
                        Daftar Kuesioner
                    </Text>
                </View>
                <View
                    style={{
                        flex: 1,
                        paddingTop: 20,
                        paddingHorizontal: 20
                    }}
                >
                    <FlatList
                        style={{
                            flex: 1
                        }}
                        keyExtractor={(item) => item.id_mst_kuesioner.toString()}
                        data={this.state.listKuesioner}
                        ListEmptyComponent={() => (
                            <View
                                style={{
                                    flex: 1,
                                    alignItems: 'center'
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: 'NeoSansBold',
                                        fontSize: 14,
                                        lineHeight: 20,
                                        color: '#fff'
                                    }}
                                >Belum ada kuesioner</Text>  
                            </View>
                        )}
                        renderItem={({item}) => (
                            <TouchableOpacity
                                onPress={() => {
                                    if (item.fillStatus){
                                        Alert.alert("Kuesioner ini sudah pernah di isi")
                                    } else {
                                        this.setState({
                                            modal: true,
                                            selectedKuesioner: item
                                        })
                                    }
                                }}
                                style={{
                                    marginTop: 10,
                                    width: '100%',
                                    paddingHorizontal: 20,
                                    borderRadius: 5,
                                    alignItems: 'center',
                                    paddingVertical: 10,
                                    flexDirection: 'row',
                                    backgroundColor: '#fff'
                                }}
                            >
                                <View
                                    style={{
                                        flex: 1,
                                        paddingRight: 5,
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: 'NeoSansBold',
                                            fontSize: 14,
                                            lineHeight: 20,
                                            color: '#000'
                                        }}
                                    >{item.nama_kuesioner}</Text>  
                                </View>
                                <AntDesign name={item.fillStatus ? 'checkcircle' : 'edit'} size={20} color={item.fillStatus ? '#255d00' : '#000'}/>
                            </TouchableOpacity>
                        )}
                    />
                </View>
                <Modal
                    animationType={'slide'}
                    statusBarTranslucent
                    visible={this.state.modal}
                    transparent={true}
                >
                    <TouchableOpacity
                        onPress={() => this.setState({
                            modal: false
                        })}
                        style={{
                            backgroundColor: 'rgba(0,0,0,.4)',
                            flex: 1
                        }}
                    >

                    </TouchableOpacity>
                    <View
                        style={{
                            flex: 1,
                            paddingHorizontal: 20,
                            paddingVertical: 20,
                            backgroundColor: '#fff'
                        }}
                    >
                        <Text
                            style={{
                                marginTop: 5,
                                fontFamily: 'NeoSansBold',
                                fontSize: 16,
                                color: '#000'
                            }}
                        >Pilih dosen terlebih dahulu</Text>  
                        {this.state.loaderDosen ? 
                            <View
                                style={{
                                    width: '100%',
                                    height: 50,
                                    marginTop: 20,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row'
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: 'NeoSans',
                                        fontSize: 14,
                                        color: '#000'
                                    }}
                                >Mengambil data dosen</Text>  
                                <ActivityIndicator size={20} color={'#000'} style={{marginLeft:5}}/>
                            </View> : 
                            <FlatList
                                style={{
                                    flex: 1
                                }}
                                keyExtractor={(item) => item.id_mst_dosen.toString()}
                                data={this.state.listDosen}
                                ListEmptyComponent={() => (
                                    <View
                                        style={{
                                            flex: 1,
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Text
                                            style={{
                                                marginTop: 30,
                                                fontFamily: 'NeoSans',
                                                fontSize: 14,
                                                lineHeight: 20,
                                                color: '#000'
                                            }}
                                        >Belum ada dosen terdaftar</Text>  
                                    </View>
                                )}
                                renderItem={({item}) => (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({
                                                modal:false
                                            }, () => {
                                                this.props.navigation.replace('IsiKuesioner', {
                                                    ...this.state.selectedKuesioner,
                                                    ...item
                                                })
                                            })
                                        }}
                                        style={{
                                            marginTop: 10,
                                            width: '100%',
                                            paddingHorizontal: 20,
                                            borderRadius: 5,
                                            alignItems: 'center',
                                            paddingVertical: 20,
                                            flexDirection: 'row',
                                            backgroundColor: '#320b86'
                                        }}
                                    >
                                        <View
                                            style={{
                                                flex: 1,
                                                paddingRight: 5,
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontFamily: 'NeoSansBold',
                                                    fontSize: 14,
                                                    lineHeight: 20,
                                                    color: '#fff'
                                                }}
                                            >{item.nama_dosen}</Text>  
                                        </View>
                                        <AntDesign name="user" size={20} color={'#fff'}/>
                                    </TouchableOpacity>
                                )}
                            />
                        }
                        
                    </View>
                </Modal>
            </View>
        )
    }
}