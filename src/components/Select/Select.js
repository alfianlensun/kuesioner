import React, { Component } from 'react'
import { View, Text } from 'react-native'

export default class Select extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <View
                style={{
                    width: '100%',
                }}
            >
                <Text
                    style={{
                        paddingLeft: 10,
                        fontFamily: 'NeoSansBold',
                        fontSize: 16,
                        color: '#fff'
                    }}
                >
                    Daftar Kuesioner
                </Text>
            </View>
        )
    }
}