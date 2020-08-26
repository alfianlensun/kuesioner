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
                    backgroundColor: '#280680',
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
                    color: '#000'
                }}
            >
                {props.label}
            </Text>
        </TouchableOpacity>
    )
}