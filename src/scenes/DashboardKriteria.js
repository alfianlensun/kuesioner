import React, { Component } from 'react'

import {
    View,
    Text,
    StatusBar,
    Dimensions,
    TouchableOpacity,
    Modal,
    ActivityIndicator,
    ScrollView
} from 'react-native'
import {PieChart, LineChart} from "react-native-chart-kit";
import { getKuesionerChart, getDosen, getKuesioner, getKuesionerDetail, getKuesionerKriteria, getKuesionerMahasiswa } from '../services/Service';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { DataTable } from 'react-native-paper';
import { Table, Row, Rows } from 'react-native-table-component';

export default class DashboardKriteria extends Component{
    constructor(props){
        super(props)
        this.state = {
            idMstKuesioner: 1,
            loaderKuesioner: false,
            loaderKuesionerDetail: false,
            listKuesioner: [],
            listKuesionerDetail: [],
            modalPilihKuesioner: false,
            modalPilihKuesionerDetail: false,
            selectedKuesioner: null,
            selectedKuesionerDetail: null,
            chartData: null,
            tableDataKriteria: [],
            tableDataKeterangan: []
        }
    }

    async componentDidMount(){
        // this.getListKuesioner().then((id_mst_kuesioner) => {
        //     this.getDataChart(id_mst_kuesioner)      
        // }).catch(err => {

        // })
          
    }

    getListKuesioner = async () => {
        try{
            this.setState({
                loaderKuesioner: true
            })
            const {data} = await getKuesioner();
            this.setState({
                loaderKuesioner: false,
                listKuesioner: data
            })

            if (data.length > 0){
                return data[0].id_mst_kuesioner
            } else {
                return 0
            }
        } catch(err){
            throw new Error(err)
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

    getDataChart = async (id_mst_kuesioner_detail = '') => {
        try {
            const {data} = await getKuesionerKriteria(id_mst_kuesioner_detail)
            if (data.length > 0){
                let labels = []
                let dataset = []
                let i = 1
                for (const k of data){
                    labels.push(i)
                    dataset.push(k.persentase)
                    i++
                }
                const chartData = {
                    labels,
                    datasets: [
                    {
                        data: dataset,
                    }
                    ]
                };
                this.setState({
                    chartData,
                    tableDataKriteria: data.map((item, idx) => [idx+1, item.persentase+'%']),
                    tableDataKeterangan: data.map((item, idx) => [idx+1, item.namaDosen])
                })
            }
            
        } catch(err){
            console.log(err)
        }
    }
    render(){
        console.log(this.state.chartData)
        return(
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    paddingTop: 30
                }}
            >
                <StatusBar translucent barStyle="dark-content" backgroundColor="transparent"/>
                <View
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingTop: 20,
                        paddingHorizontal: 20
                    }}                
                >
                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            backgroundColor: '#eee',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Ionicons name="chevron-back" size={20} color={'#000'}/>
                    </TouchableOpacity>
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'flex-end',
                            justifyContent: 'center'
                        }}
                    >
                        
                    </View>
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                        flex: 1
                    }}
                >
                    <View
                        style={{
                            width: '100%',
                            paddingHorizontal: 20,
                            alignItems: 'center'
                        }}
                    >
                        <Text
                            style={{
                                width: '100%',
                                textAlign: 'left',
                                marginTop: 20,
                                marginBottom: 10,
                                fontFamily: 'NeoSansBold',
                                fontSize: 13,
                                color: '#000'
                            }}
                        >
                            Chart Hasil Jawaban Kuesioner
                        </Text>
                            <View
                                style={{
                                    width: '100%'
                                }}
                            >
                            
                                <TouchableOpacity
                                    style={{
                                        width: '100%',
                                        height: 50,
                                        backgroundColor: this.state.selectedKuesioner !== null ? '#320b86' : '#eee',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingHorizontal: 20,
                                        marginVertical: 10,
                                        lineHeight: 20,
                                    }}
                                    onPress={() => {
                                        this.setState({
                                            modalPilihKuesioner: true
                                        }, () => {
                                            this.getListKuesioner();
                                        })
                                    }}
                                >
                                    <Text
                                        style={{
                                            flex: 1,
                                            textAlign: 'left',
                                            fontFamily: 'NeoSansBold',
                                            fontSize: 13,
                                            color: this.state.selectedKuesioner !== null ?'#fff':  '#000'
                                        }}
                                    >
                                        {this.state.selectedKuesioner !== null ? this.state.selectedKuesioner.nama_kuesioner : 'Pilih kuesioner'}
                                    </Text>
                                    {this.state.loaderKuesioner ? 
                                        <ActivityIndicator size={20} color={this.state.selectedKuesioner !== null ? '#fff' : '#000'}/>
                                        : 
                                        <Ionicons name={'md-chevron-down-outline'} size={20} color={this.state.selectedKuesioner !== null ? '#fff' : '#000'}/>
                                    }
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        width: '100%',
                                        // height: 50,
                                        paddingVertical: 15,
                                        backgroundColor: this.state.selectedKuesionerDetail !== null ? '#320b86' : '#eee',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingHorizontal: 20,
                                        marginBottom: 10,
                                    }}
                                    onPress={() => {
                                        this.setState({
                                            modalPilihKuesionerDetail: true
                                        }, () => {
                                            this.getListKuesionerDetail();
                                        })
                                    }}
                                >
                                    <Text
                                        style={{
                                            flex: 1,
                                            textAlign: 'left',
                                            fontFamily: 'NeoSansBold',
                                            fontSize: 13,
                                            lineHeight: 20,
                                            color: this.state.selectedKuesionerDetail !== null ?'#fff':  '#000'
                                        }}
                                    >
                                        {this.state.selectedKuesionerDetail !== null ? this.state.selectedKuesionerDetail.pertanyaan : 'Pilih pertanyaan'}
                                    </Text>
                                    {this.state.loaderKuesionerDetail ? 
                                        <ActivityIndicator size={20} color={this.state.selectedKuesionerDetail !== null ? '#fff' : '#000'}/>
                                        : 
                                        <Ionicons name={'md-chevron-down-outline'} size={20} color={this.state.selectedKuesionerDetail !== null ? '#fff' : '#000'}/>
                                    }
                                </TouchableOpacity>
                                {this.state.chartData !== null ? 
                                <View
                                    style={{
                                        width: '100%',
                                        paddingBottom: 10,
                                        alignItems: 'center',
                                        borderRadius: 10,
                                        position: 'relative'
                                    }}
                                >   
                                    <View
                                        style={{
                                            width: '100%',
                                            marginTop: 10,
                                            marginBottom: 20
                                        }}
                                    >
                                        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                                            <Row data={['Dosen', 'Persentase']} style={{ height: 40, backgroundColor: '#f1f8ff' }} textStyle={{}}/>
                                            <Rows data={this.state.tableDataKriteria} textStyle={{}}/>
                                        </Table>
                                    </View>
                                    <LineChart
                                        data={this.state.chartData}
                                        width={Dimensions.get("window").width-40}
                                        height={300}
                                        yAxisInterval={1}
                                        verticalLabelRotation={10}
                                        chartConfig={{
                                            backgroundColor: "#320b86",
                                            backgroundGradientFrom: "#320b86",
                                            backgroundGradientTo: "#320b86",
                                            decimalPlaces: 2, // optional, defaults to 2dp
                                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                            style: {
                                                borderRadius: 16
                                            }
                                        }}
                                        bezier
                                        style={{
                                            marginVertical: 8,
                                            borderRadius: 16
                                        }}
                                    />
                                     <View
                                        style={{
                                            width: '100%',
                                            marginTop: 10,
                                            marginBottom: 20
                                        }}
                                    >
                                        <Text
                                            style={{
                                                flex: 1,
                                                textAlign: 'left',
                                                fontFamily: 'NeoSansBold',
                                                fontSize: 13,
                                                color: '#000'
                                            }}
                                        >Keterangan</Text>
                                        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                                            <Row data={['No', 'Nama Dosen']} style={{ height: 40, alignItems: 'center',backgroundColor: '#f1f8ff' }} textStyle={{}}/>
                                            <Rows data={this.state.tableDataKeterangan} textStyle={{}}/>
                                        </Table>
                                    </View>
                                    {/* <PieChart
                                        data={this.state.chartData}
                                        width={Dimensions.get("window").width-90}
                                        height={140}
                                        chartConfig={{
                                            backgroundColor: '#fff',
                                            backgroundGradientFrom: "#fff",
                                            backgroundGradientTo: "#fff",
                                            decimalPlaces: 2, // optional, defaults to 2dp
                                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                            style: {
                                                borderRadius: 16
                                            }
                                        }}
                                        accessor="nilai"
                                        backgroundColor="transparent"
                                        absolute
                                    /> */}
                                </View>
                                 : 
                                    <View
                                        style={{
                                            width: '100%',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Text
                                            style={{
                                                marginTop: 50,
                                                fontFamily: 'NeoSansBold',
                                                fontSize: 13,
                                                lineHeight: 20,
                                                color: '#000'
                                            }}
                                        >
                                            {this.state.selectedKuesionerDetail !== null ? 'Belum ada kuesioner di input' : 'Pilih kuesioner dan pertanyaan terlebih dahulu'}
                                        </Text>
                                    </View>
                                }
                            </View>
                    </View>
                </ScrollView>
                <Modal
                    animationType={'slide'}
                    statusBarTranslucent
                    visible={this.state.modalPilihKuesioner}
                    transparent={true}
                >
                    <TouchableOpacity
                        onPress={() => this.setState({
                            modalPilihKuesioner: false
                        })}
                        style={{
                            backgroundColor: 'rgba(0,0,0,.4)',
                            flex: 1
                        }}
                    >

                    </TouchableOpacity>
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
                        >Kuesioner apa..?</Text>  
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
                                                modalPilihKuesioner: false,
                                                selectedKuesioner: item
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
                        
                    </View>
                </Modal>
                <Modal
                    animationType={'slide'}
                    statusBarTranslucent
                    visible={this.state.modalPilihKuesionerDetail}
                    transparent={true}
                >
                    <TouchableOpacity
                        onPress={() => this.setState({
                            modalPilihKuesionerDetail: false
                        })}
                        style={{
                            backgroundColor: 'rgba(0,0,0,.4)',
                            flex: 1
                        }}
                    >

                    </TouchableOpacity>
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
                        >Pertanyaan apa..?</Text>  
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
                                >Mengambil data kuesioner</Text>  
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
                                                modalPilihKuesionerDetail: false,
                                                selectedKuesionerDetail: item
                                            }, () => {
                                                this.getDataChart(item.id_mst_kuesioner_detail)
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
                        
                    </View>
                </Modal>
            </View>
        )
    }
}