import React, { Component } from 'react'
import {createStackNavigator, CardStyleInterpolators, TransitionPresets} from '@react-navigation/stack';
import Login from './src/scenes/Login';
import { NavigationContainer } from '@react-navigation/native';
import MainMenu from './src/scenes/MainMenu';

const config = {
	animation: 'spring',
	config: {
		stiffness: 1000,
		damping: 500,
		mass: 3,
		overshootClamping: false,
		restDisplacementThreshold: 0.01,
		restSpeedThreshold: 0.01,
	},
};
const Stack = createStackNavigator()
export default class App extends Component{
	constructor(props){
		super(props)
		this.state = {
			initialRoute: 'Login'
		}
	}
  	render(){
		  return (
			<NavigationContainer
				ref={nav => this.navigator = nav}
			>
				<Stack.Navigator
					headerMode="none"
					screenOptions={{
					cardStyleInterpolator: 
					CardStyleInterpolators.forHorizontalIOS,
					transitionSpec: {
						open: config,
						close: config
					}
					}}
					animation="fade"
					initialRouteName={this.state.initialRoute}
				>
					<Stack.Screen name="Login" component={Login}/>
					<Stack.Screen name="MainMenu" component={MainMenu}/>
				</Stack.Navigator>
			</NavigationContainer>
		  )
	  }
}