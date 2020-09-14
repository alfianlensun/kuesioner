import React, { Component } from 'react'
import { View, Text, TouchableOpacity, FlatList, Modal } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { getMahasiswa,deleteMahasiswa } from '../../services/Service'
export default class TabListMahasiswa extends Component{
    constructor(props){
        super(props)
        this.state = {
            listMahasiswa: [],
            selectedMahasiswa: null,
            modal: false
        }
    }

    componentDidMount(){
        this.getListMahasiswa()
    }

    getListMahasiswa = async () => {
        try {
            const {data} = await getMahasiswa()
            this.setState({
                listMahasiswa: data
            })
        } catch(err){
            console.log(err)
        }
    }

    delete = async () => {
        try {
            const {success} = await deleteMahasiswa({
                id_mst_mahasiswa: this.state.selectedMahasiswa.id_mst_mahasiswa,
                id_mst_auth: this.state.selectedMahasiswa.id_mst_auth
            })
            this.getListMahasiswa()
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
                    paddingTop: 10,
                }}
            >
                <FlatList
                    style={{
                        flex: 1
                    }}
                    keyExtractor={(item) => item.id_mst_mahasiswa.toString()}
                    data={this.state.listMahasiswa}
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
                            <View
                                style={{
                                    flex: 1
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: 'NeoSansBold',
                                        fontSize: 16,
                                        color: '#fff'
                                    }}
                                >{item.nama_mahasiswa}</Text>  
                                <Text
                                    style={{
                                        marginTop: 5,
                                        fontFamily: 'NeoSans',
                                        fontSize: 11,
                                        color: '#fff'
                                    }}
                                >NIM : {item.nim}</Text>  
                            </View>
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
                                onPress={() => {this.props.navigation.push('PerbaruiUserMahasiswa', {
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
                                        selectedMahasiswa: item,
                                        modal: true
                                    })
                                }}
                            >
                                <Ionicons name="trash" size={20} color={'#af4448'}/>
                            </TouchableOpacity>
                        </View>
                    )}
                />
                <TouchableOpacity
                    onPress={() => this.props.navigation.push('TambahUserMahasiswa')}
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
                        >Apakah anda yakin ingin menghapus {this.state.selectedMahasiswa !== null && this.state.selectedMahasiswa.nama_mahasiswa} ? </Text>  
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