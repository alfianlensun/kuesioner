import React, { Component } from 'react'
import { StatusBar, View, Text, Image,TouchableOpacity, ActivityIndicator, ScrollView, Modal } from 'react-native'
import TextInputLogin from '../components/textinput/TextInputLogin'
import { screenHeightPercent } from '../helpers/HelpersLayout'
import Feather from 'react-native-vector-icons/Feather'
import Foundation from 'react-native-vector-icons/Foundation'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CardMenu from '../components/cards/CardMenu'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { FlatList } from 'react-native-gesture-handler'
import { getKuesionerDetail,deleteKuesionerDetail } from '../services/Service'

export default class ListKuesionerDetail extends Component{
    constructor(props){
        super(props)
        this.state = {
            listKuesionerDetail: [],
            modal: false,
            selectedKuesionerDetail: null,
            loader: false
        }
    }

    componentDidMount(){
        this.focus = this.props.navigation.addListener('focus', () => {
            this.getListKuesioner()    
        })
    }

    componentWillUnmount(){
        this.focus()
    }

    getListKuesioner = async () => {
        try{
            const {data} = await getKuesionerDetail(this.props.route.params.id_mst_kuesioner);
            this.setState({
                listKuesionerDetail: data
            })
        } catch(err){
            console.log('err', err)
        }
    }

    delete = async () => {
        try {
            const {success} = await deleteKuesionerDetail({
                idMstKuesionerDetail: this.state.selectedKuesionerDetail.id_mst_kuesioner_detail,
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
                    <View
                        style={{
                            paddingLeft: 20,
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: 'NeoSansBold',
                                fontSize: 16,
                                color: '#fff'
                            }}
                        >
                            Detail Kuesioner
                        </Text>
                        <Text
                            style={{
                                marginTop: 5,
                                fontFamily: 'NeoSans',
                                fontSize: 12,
                                color: '#fff'
                            }}
                        >
                            {this.props.route.params.nama_kuesioner}
                        </Text>
                    </View>
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
                        keyExtractor={(item) => item.id_mst_kuesioner_detail.toString()}
                        data={this.state.listKuesionerDetail}
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
                                >Belum ada pertanyaan di kuesioner ini</Text>  
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
                                    >{item.pertanyaan}</Text>  
                                </View>
                                <TouchableOpacity
                                    style={{
                                        height: 40,
                                        width: 40,
                                        marginRight: 10,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 20,
                                        backgroundColor: '#883997'
                                    }}
                                    onPress={() => {this.props.navigation.push('TambahDetailKuesioner', {
                                        ...item
                                    })}}
                                >
                                    <Ionicons name="md-open-outline" size={20} color={'#fff'}/>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        height: 40,
                                        width: 40,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 20,
                                        backgroundColor: '#af4448'
                                    }}
                                    onPress={() => {
                                        this.setState({
                                            selectedKuesionerDetail: item,
                                            modal: true
                                        })
                                    }}
                                >
                                    <Ionicons name="trash" size={20} color={'#fff'}/>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => this.props.navigation.push('TambahDetailKuesioner', {
                        ...this.props.route.params
                    })}
                    style={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        height: 60,
                        width: 60,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 30,
                        backgroundColor: '#b085f5'
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
                        >Apakah anda yakin ingin menghapus {this.state.selectedKuesionerDetail !== null && this.state.selectedKuesionerDetail.pertanyaan} ? </Text>  
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