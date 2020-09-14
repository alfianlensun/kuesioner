import React from 'react'
import {
    View,
    TextInput
} from 'react-native'

import Feather from 'react-native-vector-icons/Feather'
export default function TextInputLogin({...props}){
    return (
        <View
            style={{
                width: '100%',
                height: 50,
                borderRadius: 30,
                flexDirection: 'row',
                backgroundColor: "#eee",
                marginTop: 20,
                paddingHorizontal: 10,
            }}
        >
            <View
                style={{
                    height: 50,
                    width: 50,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Feather name={props.secureTextEntry ? 'lock' : 'user'} size={20} color={'#2c5282'}/>
            </View>
            <TextInput 
                style={{
                    flex: 1,
                    fontFamily: 'NeoSans',
                    fontSize: 14,
                    color: '#2c5282',
                }}
                secureTextEntry={props.secureTextEntry}
                selectionColor={'#2c5282'}
                placeholder={props.placeholder}
                placeholderTextColor={'#2b6cb0'}
                value={props.value}
                onChangeText={props.onChange}
            />
        </View>
    )
}