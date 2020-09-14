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
import {perbaruiKuesionerDetail, createKuesionerDetail} from '../services/Service'

export default class TambahDetailKuesioner extends Component{
    constructor(props){
        super(props)
        this.state = {
            loader: false,
            idMstKuesioner: props.route.params.id_mst_kuesioner,
            pertanyaan: this.props.route.params !== undefined && this.props.route.params.id_mst_kuesioner_detail !== undefined ? props.route.params.pertanyaan : '',
            error: ''
        }
    }

    tambah = async () => {
        try {
            const data = {
                idMstKuesioner: this.state.idMstKuesioner,
                pertanyaan: this.state.pertanyaan,
            }
            this.setState({
                loader: true
            })

            for (const key of Object.keys(data)){
                if (data[key].length == 0){
                    throw new Error('Lengkapi form terlebih dahulu')
                }
            }
            
            const {success} = await createKuesionerDetail(data)
            
            this.setState({
                loader: false
            }, () => {
                this.props.navigation.goBack()
            })
        } catch(err){
            
            this.setState({
                loader: false,
                error: err.message !== undefined ? err.message : ''
            })
        }
    }

    update = async () => {
        try {
            const datapost = {
                idMstKuesionerDetail: this.props.route.params.id_mst_kuesioner_detail,
                pertanyaan: this.state.pertanyaan,
            }
            this.setState({
                loader: true
            })

            for (const key of Object.keys(datapost)){
                if (datapost[key].length == 0){
                    throw new Error('Lengkapi form terlebih dahulu')
                }
            }
            
            const {success, data} = await perbaruiKuesionerDetail(datapost)
            this.setState({
                loader: false
            }, () => {
                this.props.navigation.goBack()
            })
        } catch(err){
            console.log(err)
            // this.setState({
            //     loader: false,
            //     error: err.message
            // })
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
                        {this.props.route.params !== undefined && this.props.route.params.id_mst_kuesioner_detail !== undefined ? 'Perbarui' : 'Tambah'} Detail Kuesioner
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
                        value={this.state.pertanyaan}
                        placeholder={'Pertanyaan'}
                        onChange={(text) => {
                            this.setState({
                                pertanyaan: text
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
                                backgroundColor: "#3f50b5",
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onPress={this.props.route.params !== undefined && this.props.route.params.id_mst_kuesioner_detail !== undefined ? this.update : this.tambah}
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
                                    {this.props.route.params !== undefined && this.props.route.params.id_mst_kuesioner_detail !== undefined ? 'Perbarui' : 'Tambah'}
                                </Text>   
                            }
                        </TouchableOpacity>
                    </View>    
                </View>
            </View>
        )
    }
}