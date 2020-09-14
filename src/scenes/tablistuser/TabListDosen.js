import React, { Component } from 'react'
import { View, Text, TouchableOpacity, FlatList, Modal } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { getDosen, deleteDosen } from '../../services/Service'
export default class TabListDosen extends Component{
    constructor(props){
        super(props)
        this.state = {
            listDosen: [],
            selectedDosen: null,
            modal: false
        }
    }

    componentDidMount(){
        this.getListDosen()
    }

    getListDosen = async () => {
        try {
            const {data} = await getDosen()
            console.log(data)
            this.setState({
                listDosen: data
            })
        } catch(err){
            console.log(err)
        }
    }

    delete = async () => {
        try {
            const {success} = await deleteDosen({
                id_mst_dosen: this.state.selectedDosen.id_mst_dosen,
                id_mst_auth: this.state.selectedDosen.id_mst_auth
            })
            this.getListDosen()
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
                    keyExtractor={(item) => item.id_mst_dosen.toString()}
                    data={this.state.listDosen}
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
                                >{item.nama_dosen}</Text>  
                                <Text
                                    style={{
                                        marginTop: 5,
                                        fontFamily: 'NeoSans',
                                        fontSize: 11,
                                        color: '#fff'
                                    }}
                                >NIP : {item.nip}</Text>  
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
                                onPress={() => {this.props.navigation.push('PerbaruiUserDosen', {
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
                                        selectedDosen: item,
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
                    onPress={() => this.props.navigation.push('TambahUserDosen')}
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
                        >Apakah anda yakin ingin menghapus {this.state.selectedDosen !== null && this.state.selectedDosen.nama_dosen} ? </Text>  
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