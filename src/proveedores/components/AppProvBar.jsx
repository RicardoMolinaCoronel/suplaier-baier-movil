import React from 'react'
import {View, Image, StyleSheet, Pressable} from 'react-native'
import Constants from 'expo-constants'
import StyledText from '../../styles/StyledText'
import theme from '../../theme.js'
import Icon from 'react-native-ico-material-design';

const AppProvBar = () =>{
    const iconHeight = 26;
    const iconWidth = 26;
    return (
        <View style={styles.container}>
            <Pressable onPress={() => false} style={styles.iconBehave}>
            <Icon name="menu-button" height={iconHeight} width={iconWidth} color={theme.bottomBar.iconPrimary}/>
            </Pressable>
            <Pressable onPress={() => false} style={styles.iconBehave}>
            <Image style={styles.logoSize}
        source={require('../../../public/suplaier_horizontal_celeste.png')}
      /> 
            </Pressable>
            <Pressable onPress={() => false} style={styles.iconBehave}>
            <Image style={styles.profileImgSize}
        source={require('../../../public/user_icon.png')}
      /> 
            </Pressable>

            </View>
            )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        backgroundColor: theme.appBar.secondary,
        paddingTop: Constants.statusBarHeight+10,
        paddingBottom: 10,
        paddingLeft: 10
      },
    text:{
        color: theme.appBar.textPrimary,
    },
    iconBehave: {
        padding:14
      },
    logoSize:{
        width: 97.40,
        height: 33.77,
    },
    profileImgSize: {
        width: 26,
        height: 26,
    }
    
})

export default AppProvBar