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
            const {data} = await getKuesionerDetail(this.props.route.params.kuesioner.id_mst_kuesioner);
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
                        Isi Kuesioner
                    </Text>
                </View>
                <View
                    style={{
                        flex: 1  ,
                        paddingHorizontal: 20,
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
                                    paddingTop: 20,
                                    alignItems: 'center'
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: 'NeoSansBold',
                                        fontSize: 14,
                                        lineHeight: 20,
                                        color: '#000'
                                    }}
                                >Belum ada pertanyaan di kuesioner ini</Text>  
                            </View>
                        )}
                        renderItem={({item}) => (
                            <View
                                style={{
                                    marginTop: 20,
                                    width: '100%',
                                    borderRadius: 10,
                                    paddingHorizontal: 20,
                                    paddingVertical: 10,
                                    backgroundColor: '#3f50b5'
                                }}
                            >
                                <Text
                                    style={{
                                        width: '100%',
                                        fontFamily: 'NeoSans',
                                        textAlign: 'center',
                                        fontSize: 14,
                                        lineHeight: 20,
                                        color: '#fff'
                                    }}
                                >
                                    {item.pertanyaan}
                                </Text>
                                <AirbnbRating
                                    count={5}
                                    reviewSize={16}
                                    reviews={["Sangat Kurang", 'Kurang', 'Sedang', 'Baik', 'Sangat Baik']}
                                    defaultRating={this.state.listJawaban[item.id_mst_kuesioner_detail].value}
                                    starStyle={{
                                        marginHorizontal: 10,
                                        backgroundColor: '#eee',
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
                                    selectedColor={'#66bb6a'}
                                    reviewColor={'#fff'}
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
                        backgroundColor: '#3f50b5'
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