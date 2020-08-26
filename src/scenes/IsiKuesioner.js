import React, { Component } from 'react'
import { StatusBar, View, Text, Image,TouchableOpacity, ActivityIndicator, ScrollView, FlatList } from 'react-native'
import TextInputLogin from '../components/textinput/TextInputLogin'
import { screenHeightPercent } from '../helpers/HelpersLayout'
import Feather from 'react-native-vector-icons/Feather'
import Foundation from 'react-native-vector-icons/Foundation'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CardMenu from '../components/cards/CardMenu'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {Rating,AirbnbRating} from 'react-native-ratings'
import { getKuesionerDetail, createJawabanKuesioner } from '../services/Service'
import Select from '../components/Select/Select'
import AsyncStorage from '@react-native-community/async-storage'
export default class IsiKuesioner extends Component{
    constructor(props){
        super(props)
        this.state = {
            loader: false,
            loaderSave: false,
            listPertanyaan: [],
            listJawaban: {},
            rating: 5,
        }
    }

    

    componentDidMount(){
        this.focus = this.props.navigation.addListener('focus', () => {
            this.getListPertanyaan()  
        })
        this.getListPertanyaan()
    }

    componentWillUnmount(){
        this.focus()
    }

    getListPertanyaan = async () => {
        try{
            const {data} = await getKuesionerDetail(this.props.route.params.id_mst_kuesioner);
            let jawaban = {}
            for (const item of data){
                jawaban[item.id_mst_kuesioner_detail] = {
                    value: 0
                }
            }
            this.setState({
                listPertanyaan: data,
                listJawaban: jawaban
            })
        } catch(err){
            console.log('err', err)
        }
    }

    onRate = (item, value) => {
        let listJawaban = {...this.state.listJawaban}
        listJawaban[item.id_mst_kuesioner_detail].value = value
        this.setState({
            listJawaban
        })
    }

    save = async () => {
        try {
            this.setState({
                loaderSave: true
            })
            const user = await AsyncStorage.getItem('AuthUser');
            const jawaban = Object.keys(this.state.listJawaban).map((key) => ({
                id_mst_kuesioner_detail: key,
                value: this.state.listJawaban[key].value
            }))
            await createJawabanKuesioner({
                header: this.props.route.params,
                user: JSON.parse(user),
                jawaban
            })
            this.setState({
                loaderSave: false
            }, () => {
                this.props.navigation.replace('PilihKuesioner')
            })
        } catch(err){
            setTimeout(() => {
                this.save()
            },4000)
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
                        Isi Kuesioner
                    </Text>
                </View>
                <View
                    style={{
                        flex: 1  ,
                        paddingHorizontal: 20,
                        paddingTop: 20,
                    }}
                >
                    <FlatList
                        style={{
                            flex: 1
                        }}
                        keyExtractor={(item) => item.id_mst_kuesioner_detail.toString()}
                        data={this.state.listPertanyaan}
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
                                    marginTop: 20,
                                    width: '100%',
                                    borderRadius: 20,
                                    paddingHorizontal: 20,
                                    paddingVertical: 10,
                                    backgroundColor: '#fff'
                                }}
                            >
                                <Text
                                    style={{
                                        width: '100%',
                                        fontFamily: 'NeoSans',
                                        textAlign: 'center',
                                        fontSize: 14,
                                        lineHeight: 20,
                                        color: '#000'
                                    }}
                                >
                                    {item.pertanyaan}
                                </Text>
                                <AirbnbRating
                                    count={5}
                                    reviewSize={16}
                                    reviews={["Kurang", 'Cukup', 'Cukup Baik', 'Baik', 'Sangat Baik']}
                                    defaultRating={this.state.listJawaban[item.id_mst_kuesioner_detail].value}
                                    starStyle={{
                                        marginHorizontal: 10,
                                        backgroundColor: '#320b8610',
                                        borderRadius: 50,
                                    }}
                                    onFinishRating={(value) => {
                                        this.onRate(item,value)
                                    }}
                                    starContainerStyle={{
                                        fontSize: 10,
                                        width: '100%',
                                    }}
                                    size={20}
                                    selectedColor={'#280680'}
                                    reviewColor={'#000'}
                                />
                            </View>
                        )}
                    />
                </View>
                <TouchableOpacity
                    onPress={this.save}
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
                    {this.state.loaderSave ? 
                        <ActivityIndicator size={20} color={'#fff'}/> : 
                        <Ionicons name="save" size={30} color={'#fff'}/>
                    }
                    
                </TouchableOpacity>
            </View>
        )
    }
}