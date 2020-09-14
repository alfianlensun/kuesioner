import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'


export default function CardMenu({onPress,...props}){
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                width: 100,
                height: 100,
                alignItems: 'center',
                borderRadius: 10,
            }}
        >
            <View
                style={{
                    backgroundColor: '#00227b',
                    width: 50,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 25,
                }}
            >
                {props.icon}
            </View>
            <Text
                style={{
                    fontFamily: 'NeoSans',
                    fontSize: 12,
                    marginTop: 10,
                    color: '#fff'
                }}
            >
                {props.label}
            </Text>
        </TouchableOpacity>
    )
}