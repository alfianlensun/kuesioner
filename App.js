import React, { Component } from 'react'
import {createStackNavigator, CardStyleInterpolators, TransitionPresets} from '@react-navigation/stack';
import Login from './src/scenes/Login';
import { NavigationContainer } from '@react-navigation/native';
import MainMenu from './src/scenes/MainMenu';
import ListUser from './src/scenes/ListUser';
import ListKusioner from './src/scenes/ListKuesioner';
import TambahKuesioner from './src/scenes/TambahKuesioner';
import TambahDetailKuesioner from './src/scenes/TambahDetailKuesioner';
import TambahUserDosen from './src/scenes/TambahUserDosen';
import TambahUserMahasiswa from './src/scenes/TambahUserMahasiswa';
import PerbaruiUserDosen from './src/scenes/PerbaruiUserDosen';
import PerbaruiUserMahasiswa from './src/scenes/PerbaruiUserMahasiswa';
import ListKuesionerDetail from './src/scenes/ListKuesionerDetail';
import PilihKuesioner from './src/scenes/PilihKuesioner';
import IsiKuesioner from './src/scenes/IsiKuesioner';
import Dashboard from './src/scenes/Dashboard';
import HasilKuesioner from './src/scenes/HasilKuesioner';
import PilihDashboard from './src/scenes/PilihDashboard';
import ListSemester from './src/scenes/ListSemester';
import ListMataKuliah from './src/scenes/ListMataKuliah';
import TambahSemester from './src/scenes/TambahSemester';
import TambahMataKuliah from './src/scenes/TambahMataKuliah';

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
					<Stack.Screen name="ListUser" component={ListUser}/>
					<Stack.Screen name="ListKuesioner" component={ListKusioner}/>
					<Stack.Screen name="ListKuesionerDetail" component={ListKuesionerDetail}/>
					<Stack.Screen name="TambahKuesioner" component={TambahKuesioner}/>
					<Stack.Screen name="TambahDetailKuesioner" component={TambahDetailKuesioner}/>
					<Stack.Screen name="TambahUserDosen" component={TambahUserDosen}/>
					<Stack.Screen name="TambahUserMahasiswa" component={TambahUserMahasiswa}/>
					<Stack.Screen name="PerbaruiUserDosen" component={PerbaruiUserDosen}/>
					<Stack.Screen name="PerbaruiUserMahasiswa" component={PerbaruiUserMahasiswa}/>
					<Stack.Screen name="PilihKuesioner" component={PilihKuesioner}/>
					<Stack.Screen name="IsiKuesioner" component={IsiKuesioner}/>
					<Stack.Screen name="Dashboard" component={Dashboard}/>
					<Stack.Screen name="HasilKuesioner" component={HasilKuesioner}/>
					<Stack.Screen name="PilihDashboard" component={PilihDashboard}/>
					<Stack.Screen name="ListSemester" component={ListSemester}/>
					<Stack.Screen name="ListMataKuliah" component={ListMataKuliah}/>
					<Stack.Screen name="TambahSemester" component={TambahSemester}/>
					<Stack.Screen name="TambahMataKuliah" component={TambahMataKuliah}/>
				</Stack.Navigator>
			</NavigationContainer>
		  )
	  }
}