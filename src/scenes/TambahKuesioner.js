import React, { Component } from 'react'
import { StatusBar, View, Text, Image,TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
import TextInputLogin from '../components/textinput/TextInputLogin'
import { screenHeightPercent } from '../helpers/HelpersLayout'
import Feather from 'react-native-vector-icons/Feather'
import Foundation from 'react-native-vector-icons/Foundation'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CardMenu from '../components/cards/CardMenu'
import Ionicons from 'react-native-vector-icons/Ionicons'
import TextInputC from '../components/textinput/TextInputC'
import {createKuesioner, perbaruiKuesioner} from '../services/Service'

export default class TambahKuesioner extends Component{
    constructor(props){
        super(props)
        this.state = {
            loader: false,
            namaKuesioner: props.route.params !== undefined ? props.route.params.nama_kuesioner : '',
            error: ''
        }
    }

    tambah = async () => {
        try {
            const datapost = {
                namaKuesioner: this.state.namaKuesioner,
            }
            this.setState({
                loader: true
            })

            for (const key of Object.keys(datapost)){
                if (datapost[key].length == 0){
                    throw new Error('Lengkapi form terlebih dahulu')
                }
            }
            
            const {success, data} = await createKuesioner(datapost)
            this.setState({
                loader: false
            }, () => {
                this.props.navigation.replace('ListKuesionerDetail', {
                    ...data
                })
            })
        } catch(err){
            this.setState({
                loader: false,
                error: err.message
            })
        }
    }

    update = async () => {
        try {
            const datapost = {
                idMstKuesioner: this.props.route.params.id_mst_kuesioner,
                namaKuesioner: this.state.namaKuesioner,
            }
            this.setState({
                loader: true
            })

            for (const key of Object.keys(datapost)){
                if (datapost[key].length == 0){
                    throw new Error('Lengkapi form terlebih dahulu')
                }
            }
            
            const {success, data} = await perbaruiKuesioner(datapost)
            this.setState({
                loader: false
            }, () => {
                this.props.navigation.replace('ListKuesioner')
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
                        {this.props.route.params !== undefined ? 'Perbarui' : 'Tambah'} Kuesioner
                    </Text>
                </View>
                <View
                    style={{
                        flex: 1,
                        paddingTop: 20,
                        paddingHorizontal: 20,
                    }}
                >
                    {this.state.error.length > 0 &&
                        <View
                            style={{
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
                    <TextInputC
                        value={this.state.namaKuesioner}
                        placeholder={'Nama Kuesiner'}
                        onChange={(text) => {
                            this.setState({
                                namaKuesioner: text
                            })
                        }}
                    />
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
                            onPress={this.props.route.params !== undefined ? this.update : this.tambah}
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
                                    {this.props.route.params !== undefined ? 'Perbarui' : 'Tambah'}
                                </Text>   
                            }
                        </TouchableOpacity>
                    </View>    
                </View>
            </View>
        )
    }
}