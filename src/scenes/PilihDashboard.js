import React, { Component } from 'react'
import { StatusBar, FlatList,View, Text, Image,TouchableOpacity, ActivityIndicator, ScrollView, Modal, Alert } from 'react-native'
import TextInputLogin from '../components/textinput/TextInputLogin'
import { screenHeightPercent } from '../helpers/HelpersLayout'
import Feather from 'react-native-vector-icons/Feather'
import Foundation from 'react-native-vector-icons/Foundation'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CardMenu from '../components/cards/CardMenu'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { getKuesionerMahasiswa, deleteKuesioner, getDosen, getKuesionerDetail, getKuesionerDiIsi } from '../services/Service'
import AsyncStorage from '@react-native-community/async-storage'

export default class PilihDashboard extends Component{
    constructor(props){
        super(props)
        this.state = {
            loader: false,
            loaderKuesioner: false,
            loaderKuesionerDetail: false,
            loaderDosen: false,
            selectedKuesioner: null,
            selectedKuesionerDetail: null,
            selectedDosen: null,
            modal: false,
            listKuesionerDiisi: [],
            listKuesioner: [],
            listKuesionerDetail: [],
            listDosen: [],
        }
    }

    componentDidMount(){
        this.focus = this.props.navigation.addListener('focus', () => {
            // this.getListKuesioner()
            this.getListKuesionerDiisi()
        })
        this.getListKuesionerDiisi()
        // this.getListKuesioner()
        // this.getListDosen()
    }

    componentWillUnmount(){
        this.focus()
    }

    getListKuesionerDiisi = async () => {
        try {
            const {data} = await getKuesionerDiIsi()
            this.setState({
                listKuesionerDiisi: data
            })
        } catch(err){
            console.log(err)
        }
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
            this.setState({
                loaderKuesioner: true
            })
            const user = JSON.parse(await AsyncStorage.getItem('AuthUser'))
            const {data} = await getKuesionerMahasiswa(user.id_mst_mahasiswa);
            this.setState({
                loaderKuesioner: false,
                listKuesioner: data
            })
        } catch(err){
            console.log('err', err)
        }
    }

    getListKuesionerDetail = async () => {
        try{
            if (this.state.selectedKuesioner === null ) throw new Error('Pilih kuesioner terlebih dahulu')
            this.setState({
                loaderKuesionerDetail: true
            })
            const {data} = await getKuesionerDetail(this.state.selectedKuesioner.id_mst_kuesioner);
            this.setState({
                selectType: 2,
                modal: true,
                loaderKuesionerDetail: false,
                listKuesionerDetail: data
            })
        } catch(err){
            this.setState({
                loaderKuesionerDetail: false,
            })
            Alert.alert(err.message)
        }
    }



    renderSelectDosen = () => {
        return (<View
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
            >Pilih dosen</Text>  
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
                                    modal:false,
                                    selectedDosen: item
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
            
        </View>)
    }

    renderSelectKuesioner = () => {
        return (<View
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
            >Pilih kuesioner</Text>  
            {this.state.loaderKuesioner ? 
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
                    >Mengambil data kuesioner</Text>  
                    <ActivityIndicator size={20} color={'#000'} style={{marginLeft:5}}/>
                </View> : 
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
                                    marginTop: 30,
                                    fontFamily: 'NeoSans',
                                    fontSize: 14,
                                    lineHeight: 20,
                                    color: '#000'
                                }}
                            >Belum ada kuesioner</Text>  
                        </View>
                    )}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    selectedKuesioner: item,
                                    modal:false
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
                                >{item.nama_kuesioner}</Text>  
                            </View>
                            {/* <AntDesign name="user" size={20} color={'#fff'}/> */}
                        </TouchableOpacity>
                    )}
                />
            }
            
        </View>)
    }

    renderSelectKuesionerDetail = () => {
        return (<View
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
            >Pilih Pertanyaan</Text>  
            {this.state.loaderKuesionerDetail ? 
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
                    >Mengambil data pertanyaan kuesioner</Text>  
                    <ActivityIndicator size={20} color={'#000'} style={{marginLeft:5}}/>
                </View> : 
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
                                    marginTop: 30,
                                    fontFamily: 'NeoSans',
                                    fontSize: 14,
                                    lineHeight: 20,
                                    color: '#000'
                                }}
                            >Belum ada pertanyaan di kuesioner ini</Text>  
                        </View>
                    )}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    selectedKuesionerDetail: item,
                                    modal:false
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
                                >{item.pertanyaan}</Text>  
                            </View>
                            {/* <AntDesign name="user" size={20} color={'#fff'}/> */}
                        </TouchableOpacity>
                    )}
                />
            }
            
        </View>)
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
                        paddingHorizontal: 10,
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
                        Form Dashboard
                    </Text>
                    <View
                        style={{
                            flex: 1,
                            paddingRight: 10,
                            alignItems: 'flex-end'
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => this.props.navigation.push('DashboardKriteria')}
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                backgroundColor: '#320b86',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <SimpleLineIcons name="graph" size={25} color={'#fff'}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    style={{
                        flex: 1
                    }}
                    contentContainerStyle={{
                        paddingHorizontal: 20
                    }}
                    keyExtractor={(item) => item.id_mst_dosen.toString()}
                    data={this.state.listKuesionerDiisi}
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
                            >Belum ada kuesioner diisi</Text>  
                        </View>
                    )}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.push('Dashboard', {
                                    dosen: {
                                        id_mst_dosen: item.id_mst_dosen,
                                        nama_dosen: item.nama_dosen
                                    },
                                    kuesioner: {
                                        id_mst_kuesioner: item.id_mst_kuesioner,
                                        nama_kuesioner: item.nama_kuesioner
                                    },
                                    pertanyaan: {
                                        id_mst_kuesioner_detail: item.id_mst_kuesioner_detail,
                                        pertanyaan: item.pertanyaan
                                    },
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
                                >{item.nama_kuesioner}</Text>  
                                <View
                                    style={{
                                        marginTop: 5,
                                        flex: 1,
                                        flexDirection: 'row'
                                    }}
                                >
                                    <View
                                        style={{
                                            width: '25%'
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontFamily: 'NeoSans',
                                                fontSize: 12,
                                                lineHeight: 20,
                                                color: '#fff'
                                            }}
                                        >{'Pertanyaan'}</Text> 
                                    </View>
                                    <View
                                        style={{
                                            flex: 1
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontFamily: 'NeoSans',
                                                fontSize: 12,
                                                lineHeight: 20,
                                                color: '#fff'
                                            }}
                                        >{': '+item.pertanyaan}</Text> 
                                    </View>
                                </View> 
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: 'row'
                                    }}
                                >
                                    <View
                                        style={{
                                            width: '25%'
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontFamily: 'NeoSans',
                                                fontSize: 12,
                                                lineHeight: 20,
                                                color: '#fff'
                                            }}
                                        >{'Dosen'}</Text> 
                                    </View>
                                    <View
                                        style={{
                                            flex: 1
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontFamily: 'NeoSans',
                                                fontSize: 12,
                                                lineHeight: 20,
                                                color: '#fff'
                                            }}
                                        >{': '+item.nama_dosen}</Text> 
                                    </View>
                                </View> 
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: 'row'
                                    }}
                                >
                                    <View
                                        style={{
                                            width: '25%'
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontFamily: 'NeoSans',
                                                fontSize: 12,
                                                lineHeight: 20,
                                                color: '#fff'
                                            }}
                                        >{'Mata Kuliah'}</Text> 
                                    </View>
                                    <View
                                        style={{
                                            flex: 1
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontFamily: 'NeoSans',
                                                fontSize: 12,
                                                lineHeight: 20,
                                                color: '#fff'
                                            }}
                                        >{': '+item.nama_mata_kuliah}</Text> 
                                    </View>
                                </View> 
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: 'row'
                                    }}
                                >
                                    <View
                                        style={{
                                            width: '25%'
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontFamily: 'NeoSans',
                                                fontSize: 12,
                                                lineHeight: 20,
                                                color: '#fff'
                                            }}
                                        >{'Semester'}</Text> 
                                    </View>
                                    <View
                                        style={{
                                            flex: 1
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontFamily: 'NeoSans',
                                                fontSize: 12,
                                                lineHeight: 20,
                                                color: '#fff'
                                            }}
                                        >{': '+item.nama_semester}</Text> 
                                    </View>
                                </View> 
                                
                            </View>
                            <Ionicons name="chevron-forward" size={20} color={'#fff'}/>
                        </TouchableOpacity>
                    )}
                />
            </View>
        )
    }
}

{/* <View
                    style={{
                        flex: 1,
                        paddingTop: 20,
                        paddingHorizontal: 20
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                selectType: 1,
                                modal: true
                            })
                        }}
                        style={{
                            width: '100%',
                            height: 60,
                            borderRadius: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 20,
                            backgroundColor: '#3f50b5'
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: 'NeoSans',
                                fontSize: 14,
                                color: '#fff'
                            }}
                        >{this.state.selectedKuesioner !== null ? '* '+this.state.selectedKuesioner.nama_kuesioner : 'Kuesioner apa..??'}</Text>  
                        <View
                            style={{
                                flex: 1,
                                alignItems: 'flex-end'
                            }}
                        >
                            <Ionicons name="md-open-outline" size={20} color={'#fff'}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.getListKuesionerDetail()
                        }}
                        style={{
                            marginTop: 10,
                            width: '100%',
                            height: 60,
                            borderRadius: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 20,
                            backgroundColor: '#3f50b5'
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: 'NeoSans',
                                fontSize: 14,
                                color: '#fff'
                            }}
                            >{this.state.selectedKuesionerDetail !== null ? '* '+this.state.selectedKuesionerDetail.pertanyaan : 'Pertanyaan apa..??'}</Text>  
                        <View
                            style={{
                                flex: 1,
                                alignItems: 'flex-end'
                            }}
                        >
                            <Ionicons name="md-open-outline" size={20} color={'#fff'}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                modal: true,
                                selectType: 3
                            })
                        }}
                        style={{
                            marginTop: 10,
                            width: '100%',
                            height: 60,
                            borderRadius: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 20,
                            backgroundColor: '#3f50b5'
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: 'NeoSans',
                                fontSize: 14,
                                color: '#fff'
                            }}
                            >{this.state.selectedDosen !== null ? '* '+this.state.selectedDosen.nama_dosen : 'Dosen..??'}</Text>  
                        <View
                            style={{
                                flex: 1,
                                alignItems: 'flex-end'
                            }}
                        >
                            <Ionicons name="md-open-outline" size={20} color={'#fff'}/>
                        </View>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        width: '100%',
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            try {
                                if (this.state.selectedDosen === null) throw new Error('Lengkapi form terlebih dahulu')
                                if (this.state.selectedKuesioner === null) throw new Error('Lengkapi form terlebih dahulu')
                                if (this.state.selectedKuesionerDetail === null) throw new Error('Lengkapi form terlebih dahulu')
                                this.props.navigation.push('Dashboard', {
                                    dosen: this.state.selectedDosen,
                                    kuesioner: this.state.selectedKuesioner,
                                    pertanyaan: this.state.selectedKuesionerDetail,
                                })
                            } catch(err){
                                Alert.alert(err.message)  
                            }
                        }}
                        style={{
                            width: '100%',
                            height: 60,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: 20,
                            backgroundColor: '#3f50b5'
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: 'NeoSansBold',
                                fontSize: 14,
                                color: '#fff'
                            }}
                            >Lihat</Text>  
                    </TouchableOpacity>
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
                    {this.state.selectType == 1 ? this.renderSelectKuesioner() : 
                        (this.state.selectType == 2 ? this.renderSelectKuesionerDetail() : 
                            (this.state.selectType == 3 && this.renderSelectDosen())
                        )
                    }
                </Modal> */}