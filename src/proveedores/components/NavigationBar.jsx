import React from 'react'
import {View, StyleSheet} from 'react-native'
import Constants from 'expo-constants'
import StyledText from '../../styles/StyledText'
import theme from '../../theme.js'
import Icon from 'react-native-ico-material-design';

import { Link } from 'react-router-native'

const NavBarTab = ({active,children,to}) => {
    return(
<Link to={to} style={styles.iconBehave}>
    {children}
</Link>
    )

}
const NavigationBar = () => {
    const iconHeight = 26;
    const iconWidth = 26;
return (
    <View style={styles.container}>
        <View style={styles.navBar}> 
        <NavBarTab active to='/'><Icon name="home-button" height={iconHeight} width={iconWidth} color={theme.bottomBar.iconPrimary}/></NavBarTab>
        <NavBarTab active to='/proveedor/search'><Icon name="searching-magnifying-glass" height={iconHeight} width={iconWidth} color={theme.bottomBar.iconPrimary}/></NavBarTab>
        <NavBarTab active to='/proveedor/notifications'><Icon name="notifications-button" height={iconHeight} width={iconWidth} color={theme.bottomBar.iconPrimary}/></NavBarTab>
        </View>
    </View>
)

}
const styles = StyleSheet.create({
    container:{
        position:'absolute',
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