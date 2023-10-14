import { React } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import Icon from 'react-native-ico-material-design';
import  StyledText  from './src/styles/StyledText.jsx'

import NavigationBar from '../components/NavigationBar.jsx';
import AppProvBar from '../components/AppProvBar.jsx';
import theme from './src/theme.js'
import AppRouter from './src/router/AppRouter.jsx';
import { Routes, Route} from 'react-router-native'



const MainProveedor = () =>{
    return (
      
        <View style={styles.container}>
          <AppProvBar/>
          <NavigationBar/>
          <ProveedorRoutes/>
          </View>             
      );

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },

    navContainer:{
      position:'absolute',
      alignItems: 'center',
      bottom:0,
    },

    navBar: {
      flexDirection:'row',
      backgroundColor: theme.bottomBar.secondary,
      width:'90%' ,
      justifyContent: 'space-evenly'
    }
  });

export default MainProveedor
