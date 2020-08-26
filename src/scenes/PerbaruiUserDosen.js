import React, { Component } from 'react'
import { StatusBar, View, Text, Image,TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
import TextInputC from '../components/textinput/TextInputC'
import { screenHeightPercent } from '../helpers/HelpersLayout'
import Feather from 'react-native-vector-icons/Feather'
import Foundation from 'react-native-vector-icons/Foundation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CardMenu from '../components/cards/CardMenu'
import { createMahasiswa, perbaruiMahasiswa, perbaruiDosen } from '../services/Service'

export default class PerbaruiUserDosen extends Component{
    constructor(props){
        console.log(props.route.params)
        super(props)
        this.state = {
            loader: false,
            error: '',
            namaDosen: props.route.params.nama_dosen,
            nip: props.route.params.nip.toString(),
            password: ''
        }
    }

    perbarui = async () => {
        try {
            let data = {
                id_mst_dosen: this.props.route.params.id_mst_dosen,
                id_mst_auth: this.props.route.params.id_mst_auth,
                namaDosen: this.state.namaDosen,
                nip: this.state.nip,
            }
            
            this.setState({
                loader: true
            })

            for (const key of Object.keys(data)){
                if (data[key].length == 0){
                    throw new Error('Lengkapi form terlebih dahulu')
                }
            }
            data.password = this.state.password
            const {success} = await perbaruiDosen(data)
            
            this.setState({
                loader: false
            }, () => {
                this.props.navigation.replace('ListUser')
            })
        } catch(err){
            this.setState({
                loader: false,
                error: err.message
            })
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
                        Perbarui Data Mahasiswa
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
                            value={this.state.namaDosen}
                            placeholder={'Nama Dosen'}
                            onChange={(text) => {
                                this.setState({
                                    namaDosen: text
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
                        <TextInputC
                            value={this.state.nip}
                            placeholder={'NIP'}
                            keyboardType={'numeric'}
                            onChange={(text) => {
                                this.setState({
                                    nip: text
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
                        <TextInputC
                            value={this.state.password}
                            placeholder={'* Kosongkan jika tidak di ubah'}
                            secureTextEntry
                            onChange={(text) => {
                                this.setState({
                                    password: text
                                })
                            }}
                        />
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
                            onPress={this.perbarui}
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
                                    Perbarui
                                </Text>   
                            }
                        </TouchableOpacity>
                    </View>                    

                </View>
            </View>
        )
    }
}