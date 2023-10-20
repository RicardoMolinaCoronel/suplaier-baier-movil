import React from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import Constants from 'expo-constants'
import StyledText from '../../styles/StyledText'
import theme from '../../theme.js'
import Icon from 'react-native-ico-material-design';

import { Link } from 'react-router-native'
import { useLocation } from "react-router-native";
const NavBarTab = ({active,children,to}) => {
    return(

<Link to={to} style={styles.iconBehave}>
    {children}
</Link>

    )
}
const NavigationBar = () => {
    let location = useLocation();
    const iconHeight = 26;
    const iconWidth = 26;
return (
    <View style={styles.container}>
        <View style={styles.navBar}> 
        <NavBarTab active to='/proveedor/home/ofertas'><Icon name="bookmark-button-1" height={iconHeight} width={iconWidth} color={ location.pathname=='/proveedor/home/ofertas' ? theme.colors.lightblue : theme.bottomBar.iconPrimary}/></NavBarTab>
        <NavBarTab active to='/proveedor/home/search'><Icon name="searching-magnifying-glass" height={iconHeight} width={iconWidth} color={location.pathname=='/proveedor/home/search' ? theme.colors.lightblue : theme.bottomBar.iconPrimary}/></NavBarTab>
        <NavBarTab active to='/proveedor/home/notifications'><Icon name="notifications-button" height={iconHeight} width={iconWidth} color={location.pathname=='/proveedor/home/notifications' ? theme.colors.lightblue : theme.bottomBar.iconPrimary}/></NavBarTab>
        </View>
    </View>
)

}
const styles = StyleSheet.create({
    container:{
        position:"absolute" ,
        alignItems: 'center',
        bottom:0,
      },
  
      navBar: {
        flexDirection:'row',
        backgroundColor: theme.bottomBar.secondary,
        width:'100%' ,
        justifyContent: 'space-evenly'
      },

      iconBehave: {
        padding:14
      }
})
export default NavigationBar