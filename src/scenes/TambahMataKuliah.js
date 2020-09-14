import React, { Component } from 'react'
import { StatusBar, View, Text, Image,TouchableOpacity, ActivityIndicator, ScrollView, Modal, FlatList } from 'react-native'
import TextInputC from '../components/textinput/TextInputC'
import { screenHeightPercent } from '../helpers/HelpersLayout'
import Feather from 'react-native-vector-icons/Feather'
import Foundation from 'react-native-vector-icons/Foundation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CardMenu from '../components/cards/CardMenu'
import { createMataKuliah, getSemester } from '../services/Service'

export default class TambahMataKuliah extends Component{
    constructor(props){
        super(props)
        this.state = {
            loader: false,
            error: '',
            namaMataKuliah: '',
            selectedSemester: null,
            idMstSemester: '',
            listSemester: [],
            loaderSemester: true,
            modalSelect: false
        }
    }

    componentDidMount(){
        this.getListSemester()
    }

    getListSemester = async () => {
        try{
            this.setState({
                loaderSemester: true
            })
            const {data} = await getSemester();
            this.setState({
                loaderSemester: false,
                listSemester: data
            })
        } catch(err){
            console.log('err', err)
        }
    }

    tambah = async () => {
        try {
            const data = {
                namaMataKuliah: this.state.namaMataKuliah,
                idMstSemester: this.state.idMstSemester
            }
            this.setState({
                loader: true
            })

            for (const key of Object.keys(data)){
                if (data[key].length == 0){
                    throw new Error('Lengkapi form terlebih dahulu')
                }
            }
            
            const {success} = await createMataKuliah(data)
            
            this.setState({
                loader: false
            }, () => {
                this.props.navigation.replace('ListMataKuliah')
            })
        } catch(err){
            console.log(err)
            this.setState({
                loader: false,
                // error: err.message
            })
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
                        <Ionicons name="arrow-back" size={20} color={'#000'}/>
                    </TouchableOpacity>
                    <Text
                        style={{
                            paddingLeft: 10,
                            fontFamily: 'NeoSansBold',
                            fontSize: 16,
                            color: '#000'
                        }}
                    >
                        Tambah Mata Kuliah
                    </Text>
                </View>
                {this.state.error.length > 0 &&
                    <View
                        style={{
                            marginTop: 20,
                            width: '100%',
                            paddingHorizontal: 20,
                            alignItems: 'center'
                        }}
                    >
                        <View
                            style={{
                                paddingHorizontal: 20,
                                paddingVertical: 10,
                                borderRadius: 20,
                                backgroundColor: '#ff77a9',
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                        >
                            <Ionicons name="warning-sharp" size={20} color={'#ffc1e3'}/>
                            <Text
                                style={{
                                    paddingLeft: 10,
                                    fontFamily: 'NeoSansBold',
                                    fontSize: 14,
                                    color: '#fff'
                                }}
                            >
                                {this.state.error}
                            </Text>   
                        </View>
                    </View>
                }
                <View
                    style={{
                        paddingHorizontal: 20,
                        width: '100%'
                    }}
                >
                    <View
                        style={{
                            marginTop: 5,
                            width: '100%'
                        }}
                    >
                        <TextInputC
                            value={this.state.namaMataKuliah}
                            placeholder={'Nama Mata Kuliah'}
                            onChange={(text) => {
                                this.setState({
                                    namaMataKuliah: text
                                })
                            }}
                        />
                    </View>
                    
                    <View
                        style={{
                            marginTop: 5,
                            width: '100%'
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    selectType: 4,
                                    modalSelect: true
                                })
                            }}
                            style={{
                                width: '100%',
                                height: 50,
                                borderRadius: 30,
                                flexDirection: 'row',
                                backgroundColor: "#eee",
                                marginTop: 20,
                                alignItems: 'center',
                                paddingHorizontal: 10,
                            }}
                        >
                            <Text
                                style={{
                                    flex: 1,
                                    fontFamily: 'NeoSans',
                                    fontSize: 14,
                                    color: '#2c5282',
                                }}
                            >{this.state.selectedSemester !== null ? this.state.selectedSemester.nama_semester : 'Pilih Semester'}</Text>  
                            <View
                                style={{
                                    flex: 1,
                                    paddingRight: 10,
                                    alignItems: 'flex-end'
                                }}
                            >
                                <Ionicons name="md-open-outline" size={20} color={'#2c5282'}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    
                    
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
                            onPress={this.tambah}
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
                                    Tambah
                                </Text>   
                            }
                        </TouchableOpacity>
                    </View>                    
                </View>
                <Modal
                    transparent
                    statusBarTranslucent
                    visible={this.state.modalSelect}
                    onRequestClose={() => {
                        this.setState({
                            modalSelect: false
                        })
                    }}

                >
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            backgroundColor: 'rgba(0,0,0,.4)'
                        }}
                    >

                    </TouchableOpacity>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: '#fff'
                        }}
                    >
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
                            >Pilih Semester</Text>  
                            {this.state.loaderSemester ? 
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
                                    >Mengambil data semester</Text>  
                                    <ActivityIndicator size={20} color={'#000'} style={{marginLeft:5}}/>
                                </View> : 
                                <FlatList
                                    style={{
                                        flex: 1
                                    }}
                                    keyExtractor={(item) => item.id_mst_semester.toString()}
                                    data={this.state.listSemester}
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
                                            >Belum ada semester</Text>  
                                        </View>
                                    )}
                                    renderItem={({item}) => (
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.setState({
                                                    idMstSemester: item.id_mst_semester,
                                                    selectedSemester: item,
                                                    modalSelect:false
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
                                                >{item.nama_semester}</Text>  
                                            </View>
                                            {/* <AntDesign name="user" size={20} color={'#fff'}/> */}
                                        </TouchableOpacity>
                                    )}
                                />
                            }
                            
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}