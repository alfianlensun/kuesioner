import React, { Component } from 'react'
import { StatusBar, FlatList,View, Text, Image,TouchableOpacity, ActivityIndicator, ScrollView, Modal } from 'react-native'
import TextInputLogin from '../components/textinput/TextInputLogin'
import { screenHeightPercent } from '../helpers/HelpersLayout'
import Feather from 'react-native-vector-icons/Feather'
import Foundation from 'react-native-vector-icons/Foundation'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CardMenu from '../components/cards/CardMenu'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { getKuesioner, deleteKuesioner } from '../services/Service'

export default class ListKusioner extends Component{
    constructor(props){
        super(props)
        this.state = {
            loader: false,
            selectedKuesioner: null,
            modal: false,
            listKuesioner: []
        }
    }

    componentDidMount(){
        this.focus = this.props.navigation.addListener('focus', () => {
            this.getListKuesioner()
        })
        this.getListKuesioner()
    }

    componentWillUnmount(){
        this.focus()
    }

    getListKuesioner = async () => {
        try{
            const {data} = await getKuesioner();
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
                    backgroundColor: '#fff',
                    paddingTop: screenHeightPercent(4)+20,
                }}
            >
                <StatusBar translucent backgroundColor="transparent" barStyle="dark-content"/>
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
                        <Ionicons name="chevron-back" size={25} color={'#000'}/>
                    </TouchableOpacity>
                    <Text
                        style={{
                            paddingLeft: 10,
                            fontFamily: 'NeoSansBold',
                            fontSize: 16,
                            color: '#000'
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
                                        color: '#000'
                                    }}
                                >Belum ada kuesioner</Text>  
                            </View>
                        )}
                        renderItem={({item}) => (
                            <View
                                style={{
                                    marginTop: 10,
                                    width: '100%',
                                    paddingHorizontal: 20,
                                    borderRadius: 5,
                                    alignItems: 'center',
                                    paddingVertical: 10,
                                    flexDirection: 'row',
                                    backgroundColor: '#3f50b5'
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.push('ListKuesionerDetail', {
                                            ...item
                                        })
                                    }}
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
                                    >{item.nama_kuesioner}</Text>  
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        height: 40,
                                        width: 40,
                                        marginRight: 10,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 20,
                                        backgroundColor: '#fff'
                                    }}
                                    onPress={() => {this.props.navigation.push('TambahKuesioner', {
                                        ...item
                                    })}}
                                >
                                    <Ionicons name="md-open-outline" size={20} color={'#000'}/>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        height: 40,
                                        width: 40,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 20,
                                        backgroundColor: '#fff'
                                    }}
                                    onPress={() => {
                                        this.setState({
                                            selectedKuesioner: item,
                                            modal: true
                                        })
                                    }}
                                >
                                    <Ionicons name="trash" size={20} color={'#af4448'}/>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => this.props.navigation.push('TambahKuesioner')}
                    style={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        height: 60,
                        width: 60,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 30,
                        backgroundColor: '#3f50b5'
                    }}
                >
                    <Ionicons name="add" size={40} color={'#fff'}/>
                </TouchableOpacity>
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
                        >Konfirmasi !</Text>  
                        <Text
                            style={{
                                marginTop: 10,
                                fontFamily: 'NeoSans',
                                fontSize: 14,
                                color: '#000'
                            }}
                        >Apakah anda yakin ingin menghapus {this.state.selectedKuesioner !== null && this.state.selectedKuesioner.nama_kuesioner} ? </Text>  
                        <View
                            style={{
                                marginTop: 20,
                                flexDirection: 'row'
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => this.setState({
                                    modal: false
                                })}
                                style={{
                                    flex:1 ,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 10,
                                    marginRight: 10,
                                    backgroundColor: '#320b86',
                                    height: 50,
                                }}
                            >
                                <Text
                                    style={{
                                        marginTop: 5,
                                        fontFamily: 'NeoSansBold',
                                        fontSize: 16,
                                        color: '#fff'
                                    }}
                                >Batal</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this.delete}
                                style={{
                                    flex:1 ,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 10,
                                    marginLeft: 10,
                                    backgroundColor: '#320b86',
                                    height: 50,
                                }}
                            >
                                <Text
                                    style={{
                                        marginTop: 5,
                                        fontFamily: 'NeoSansBold',
                                        fontSize: 16,
                                        color: '#fff'
                                    }}
                                >Ya</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}