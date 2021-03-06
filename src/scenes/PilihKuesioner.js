import React, { Component } from 'react'
import { StatusBar, FlatList,View, Text, Image,TouchableOpacity, ActivityIndicator, ScrollView, Modal, Alert } from 'react-native'
import TextInputLogin from '../components/textinput/TextInputLogin'
import { screenHeightPercent } from '../helpers/HelpersLayout'
import Feather from 'react-native-vector-icons/Feather'
import Foundation from 'react-native-vector-icons/Foundation'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CardMenu from '../components/cards/CardMenu'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { getKuesionerMahasiswa, deleteKuesioner, getDosen, getSemester, getMataKuliah, getMataKuliahById } from '../services/Service'
import AsyncStorage from '@react-native-community/async-storage'

export default class PilihKuesioner extends Component{
    constructor(props){
        super(props)
        this.state = {
            loader: false,
            loaderKuesioner: false,
            loaderSemester: false,
            loaderMataKuliah: false,
            loaderDosen: false,
            selectedKuesioner: null,
            modal: false,
            modalSelect: false,
            selectedKuesioner: null,
            selectedSemester: null,
            selectedMataKuliah: null,
            selectedDosen: null,
            selectType: 0,
            listKuesioner: [],
            listDosen: [],
            listSemester: [],
            listMataKuliah: []
        }
    }

    componentDidMount(){
        this.focus = this.props.navigation.addListener('focus', () => {
            this.getListKuesioner()
        })
        this.getListKuesioner()
        this.getListDosen()
        this.getListSemester()
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
            const user = JSON.parse(await AsyncStorage.getItem('AuthUser'))
            const {data} = await getKuesionerMahasiswa(user.id_mst_mahasiswa);
            console.log(data)
            this.setState({
                listKuesioner: data
            })
        } catch(err){
            console.log('err', err)
        }
    }

    getListMataKuliah = async () => {
        try{
            const {data} = await getMataKuliah();
            console.log(data)
            this.setState({
                listMataKuliah: data
            })
        } catch(err){
            console.log('err', err)
        }
    }

    getListSemester = async () => {
        try{
            const {data} = await getSemester();
            console.log('semester', data)
            this.setState({
                listSemester: data
            })
        } catch(err){
            console.log('err', err)
        }
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
                                >{item.nama_kuesioner}</Text>  
                            </View>
                            {/* <AntDesign name="user" size={20} color={'#fff'}/> */}
                        </TouchableOpacity>
                    )}
                />
            }
            
        </View>)
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
            >Pilih Dosen</Text>  
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
                            >Belum ada data dosen</Text>  
                        </View>
                    )}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    selectedDosen: item,
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
                                >{item.nama_dosen}</Text>  
                            </View>
                            {/* <AntDesign name="user" size={20} color={'#fff'}/> */}
                        </TouchableOpacity>
                    )}
                />
            }
            
        </View>)
    }
    renderSelectMataKuliah = () => {
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
            >Pilih mata kuliah</Text>  
            {this.state.loaderMataKuliah ? 
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
                    >Mengambil data mata kuliah</Text>  
                    <ActivityIndicator size={20} color={'#000'} style={{marginLeft:5}}/>
                </View> : 
                <FlatList
                    style={{
                        flex: 1
                    }}
                    keyExtractor={(item) => item.id_mst_mata_kuliah.toString()}
                    data={this.state.listMataKuliah}
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
                            >Belum ada mata kuliah</Text>  
                        </View>
                    )}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({
                                    selectedMataKuliah: item,
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
                                >{item.nama_mata_kuliah}</Text>  
                            </View>
                            {/* <AntDesign name="user" size={20} color={'#fff'}/> */}
                        </TouchableOpacity>
                    )}
                />
            }
            
        </View>)
    }
    renderSelectSemester = () => {
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
                            onPress={async () => {
                                try{
                                    const {data} = await getMataKuliahById(item.id_mst_semester);
                                    this.setState({
                                        listMataKuliah: data,
                                        selectedSemester: item,
                                        modalSelect:false
                                    })
                                } catch(err){
                                    console.log('err', err)
                                }
                                
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
                        Form Pengisian Kuesioner
                    </Text>
                </View>
                <View
                    style={{
                        marginTop: 20,
                        width: '100%',
                        paddingHorizontal: 20,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                selectType: 1,
                                modalSelect: true
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
                </View>
                <View
                    style={{
                        marginTop: 20,
                        width: '100%',
                        paddingHorizontal: 20,
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
                        >{this.state.selectedSemester !== null ? '* '+this.state.selectedSemester.nama_semester : 'Semester Berapa..??'}</Text>  
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
                        marginTop: 20,
                        width: '100%',
                        paddingHorizontal: 20,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                selectType: 3,
                                modalSelect: true
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
                        >{this.state.selectedMataKuliah !== null ? '* '+this.state.selectedMataKuliah.nama_mata_kuliah : 'Mata kuliah apa..??'}</Text>  
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
                        marginTop: 20,
                        width: '100%',
                        paddingHorizontal: 20,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                selectType: 2,
                                modalSelect: true
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
                        marginTop: 20,
                        width: '100%',
                        paddingHorizontal: 20,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            try {
                                if (this.state.selectedDosen === null) throw new Error('Lengkapi form terlebih dahulu')
                                if (this.state.selectedKuesioner === null) throw new Error('Lengkapi form terlebih dahulu')
                                if (this.state.selectedMataKuliah === null) throw new Error('Lengkapi form terlebih dahulu')
                                if (this.state.selectedSemester === null) throw new Error('Lengkapi form terlebih dahulu')
                                this.props.navigation.push('IsiKuesioner', {
                                    dosen: this.state.selectedDosen,
                                    kuesioner: this.state.selectedKuesioner,
                                    semester: this.state.selectedSemester,
                                    mataKuliah: this.state.selectedMataKuliah,
                                })
                            } catch(err){
                                Alert.alert(err.message)  
                            }
                        }}
                        style={{
                            width: '100%',
                            height: 50,
                            borderRadius: 10,
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
                            >Isi Kuesioner</Text>  
                    </TouchableOpacity>
                </View>
                <Modal
                    visible={this.state.modalSelect}
                    statusBarTranslucent
                    animationType="slide"
                    onRequestClose={() => this.setState({
                        modalSelect: false
                    })}
                    transparent
                >
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                modalSelect: false
                            })
                        }}
                        style={{
                            flex: 1,
                            backgroundColor: 'rgba(0,0,0,.4)'
                        }}
                    >

                    </TouchableOpacity>
                    <View
                        style={{
                            flex: 1
                        }}
                    >
                        {this.state.selectType == 1 ? this.renderSelectKuesioner() : 
                            (this.state.selectType == 2 ? this.renderSelectDosen() : 
                                (this.state.selectType == 3 ? this.renderSelectMataKuliah() : 
                                    (this.state.selectType == 4 && this.renderSelectSemester())
                                )
                            )
                        }
                    </View>
                </Modal>
            </View>
        )
    }
}