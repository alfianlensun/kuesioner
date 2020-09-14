import React, { Component } from 'react'
import { StatusBar, View, Text, Image,TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
import TextInputLogin from '../components/textinput/TextInputLogin'
import { screenHeightPercent, screenWidthPercent } from '../helpers/HelpersLayout'
import Feather from 'react-native-vector-icons/Feather'
import Foundation from 'react-native-vector-icons/Foundation'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CardMenu from '../components/cards/CardMenu'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TabListMahasiswa from './tablistuser/TabListMahasiswa'
import TabListDosen from './tablistuser/TabListDosen'


const Tab = createMaterialTopTabNavigator();
export default class ListUser extends Component{
    constructor(props){
        super(props)
        this.state = {
            loader: false
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
                        Daftar User
                    </Text>
                </View>
                <View
                    style={{
                        flex: 1,
                        paddingTop: 10,
                        paddingHorizontal: 10,
                    }}
                >
                    <Tab.Navigator
                        backBehavior="initialRoute"
                        removeClippedSubviews={Platform.OS == "android" ? true : false}
                        sceneContainerStyle={{
                            backgroundColor: 'transparent'
                        }}
                        initialRouteName="TabListMahasiswa"
                        tabBarOptions={{
                            activeTintColor: '#fff',
                            inactiveTintColor: '#000',
                            labelStyle: { 
                                fontSize: 12,
                                fontFamily: 'NeoSansBold',
                            },
                            showLabel: true,
                            style: { 
                                position: 'relative',
                                backgroundColor: 'transparent'
                            },
                            tabStyle:{
                                position: 'relative',
                                height: 70,
                            },
                            indicatorStyle: {
                                height: 40,
                                top: 16,
                                borderRadius: 30,
                                alignSelf: 'center',
                                position: "absolute",
                                backgroundColor: '#3f50b5',
                            },
                        }}
                        style={{
                            backgroundColor: 'transparent'
                        }}
                    >
                        <Tab.Screen
                            name="TabListMahasiswa"
                            component={TabListMahasiswa}
                            options={{ 
                                tabBarLabel: 'Mahasiswa',
                            }}
                        />
                        <Tab.Screen
                            name="TabListUser"
                            component={TabListDosen}
                            options={{ 
                                tabBarLabel: 'Dosen'
                            }}
                        />
                    </Tab.Navigator>
                </View>
            </View>
        )
    }
}