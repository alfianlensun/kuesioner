import React, { Component } from 'react'

import {
    View,
    Text,
    StatusBar,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import {PieChart} from "react-native-chart-kit";
import { getKuesionerChart } from '../services/Service';
import Ionicons from 'react-native-vector-icons/Ionicons'


export default class HasilKuesioner extends Component{
    constructor(props){
        super(props)
        this.state = {
            chartData: []
        }
    }

    async componentDidMount(){
        this.getDataChart()        
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
                </View>
                <View
                    style={{
                        width: '100%',
                        paddingHorizontal: 20,
                        alignItems: 'center'
                    }}
                >
                    
                </View>
            </View>
        )
    }
}