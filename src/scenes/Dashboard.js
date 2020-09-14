import React, { Component } from 'react'

import {
    View,
    Text,
    StatusBar,
    Dimensions,
    TouchableOpacity,
    Modal,
    ActivityIndicator
} from 'react-native'
import {PieChart} from "react-native-chart-kit";
import { getKuesionerChart, getDosen, getKuesioner, getKuesionerDetail } from '../services/Service';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { FlatList } from 'react-native-gesture-handler';

const ChartOption = {
    1: {
        name: "Sangat Kurang",
        color: "#81c784",
        legendFontColor: "#fff",
        legendFontFamily: 'NeoSansBold',
        legendFontSize: 12
    },
    2: {
        name: "Kurang",
        color: "#9ccc65",
        legendFontColor: "#fff",
        legendFontFamily: 'NeoSansBold',
        legendFontSize: 12
    },
    3: {
        name: "Sedang",
        color: "#2196f3",
        legendFontColor: "#fff",
        legendFontFamily: 'NeoSansBold',
        legendFontSize: 12
    },
    4: {
        name: "Baik",
        color: "#ffc107",
        legendFontColor: "#fff",
        legendFontFamily: 'NeoSansBold',
        legendFontSize: 12
    },
    5: {
        name: "Sangat Baik",
        color: "#66bb6a",
        legendFontColor: "#fff",
        legendFontFamily: 'NeoSansBold',
        legendFontSize: 12
    }
}

export default class Dashboard extends Component{
    constructor(props){
        super(props)
        this.state = {
            loaderKuesioner: false,
            listKuesioner: [],
            modalPilihKuesioner: false,
            selectedKuesioner: null,
            chartData: []
        }
    }

    async componentDidMount(){
        this.getDataChart(this.props.route.params.pertanyaan.id_mst_kuesioner_detail)        
    }

    getListPertanyaan = async () => {
        
        try{
            this.setState({
                loaderKuesioner: true
            })
            const {data} = await getKuesionerDetail(this.props.route.params.kuesioner.id_mst_kuesioner);
            this.setState({
                modalPilihKuesioner: true,
                listKuesioner: data,
                loaderKuesioner: false
            })
        } catch(err){
            console.log(err)
            setTimeout(() => {
                this.getListPertanyaan()
            }, 4000);
        }
    }

    getDataChart = async (idpertanyaan = '') => {
        try {
            const {data} = await getKuesionerChart(this.props.route.params.dosen.id_mst_dosen, this.props.route.params.kuesioner.id_mst_kuesioner, idpertanyaan)
            const datafilter = data.filter((d) => d.nilai != 0)
            const chartData = datafilter.map(item => {
                return {
                    score: item.nilai,
                    nilai: parseInt(item.total),
                    ...ChartOption[item.nilai]
                }
            })
            this.setState({
                chartData
            })
        } catch(err){
            console.log(err)
        }
    }
    render(){
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
                        <TouchableOpacity
                            onPress={() => {
                                this.getListPertanyaan();
                            }}
                        >
                            {this.state.loaderKuesioner ? 
                                <ActivityIndicator size={20} color={'#000'}/>
                                : 
                                <Text
                                    style={{
                                        width: '100%',
                                        textAlign: 'left',
                                        fontFamily: 'NeoSansBold',
                                        fontSize: 13,
                                        color: '#000'
                                    }}
                                >
                                    Pilih Pertanyaan
                                </Text>
                            }
                        </TouchableOpacity>
                    </View>
                </View>
                <View
                    style={{
                        width: '100%',
                        paddingHorizontal: 20,
                        alignItems: 'center'
                    }}
                >
                    
                    {this.state.chartData.length > 0 ? 
                        <View
                            style={{
                                width: '100%'
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
                                    width: '100%',
                                    backgroundColor: '#3f50b5',
                                    paddingBottom: 10,
                                    alignItems: 'center',
                                    borderRadius: 10,
                                    position: 'relative'
                                }}
                            >
                                <PieChart
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
                                />
                            </View>
                            <Text
                                style={{
                                    marginTop: 20,
                                    width: '100%',
                                    textAlign: 'left',
                                    fontFamily: 'NeoSansBold',
                                    fontSize: 13,
                                    color: '#000'
                                }}
                            >
                                Keterangan Hasil Kuesioner
                            </Text>
                            <View
                                style={{
                                    marginTop: 10,
                                    width: '100%',
                                    backgroundColor: '#3f50b5',
                                    alignItems: 'center',
                                    borderRadius: 10,
                                    paddingVertical: 10,
                                    paddingHorizontal: 10,
                                    position: 'relative'
                                }}
                            >
                                {this.state.chartData.map((item, idx) => {
                                    console.log('item '+item.nilai, item)
                                    return <TouchableOpacity
                                    key={idx}
                                    style={{
                                            marginTop: idx === 0 ? 0 : 10,
                                            width: '100%',
                                            backgroundColor: '#fff',
                                            height: 40,
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                            borderRadius: 10,
                                            paddingHorizontal: 10,
                                            paddingVertical: 20,
                                        }}
                                    >
                                        <View
                                            style={{
                                                backgroundColor: ChartOption[item.score].color,
                                                width: 20,
                                                borderRadius: 10,
                                                height: 20
                                            }}
                                        >
                                            
                                        </View>
                                        <Text
                                            style={{
                                                fontFamily: 'NeoSansBold',
                                                fontSize: 13,
                                                paddingLeft: 20,
                                                color: '#000'
                                            }}
                                        >
                                            {ChartOption[item.score].name}
                                        </Text>
                                        <View
                                            style={{
                                                alignItems: 'flex-end',
                                                flex: 1
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontFamily: 'NeoSansBold',
                                                    fontSize: 13,
                                                    paddingLeft: 20,
                                                    color: '#000'
                                                }}
                                            >
                                                {item.nilai} Mahasiswa
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                })}
                            </View>
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
                                    color: '#000'
                                }}
                            >
                                Belum ada kuesioner di input
                            </Text>
                        </View>
                    }
                </View>
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
                        >Pertanyaan apa..?</Text>  
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
                                >Mengambil data dosen</Text>  
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