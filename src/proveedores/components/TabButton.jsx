import {Image, Text, TouchableOpacity, View} from "react-native";
import { Navigate, useNavigate } from 'react-router-native'
import React from "react";
import theme from '../../theme.js'
import Icon from 'react-native-ico-material-design';



export const TabButton =({currentTab, setCurrentTab, text, icon} )=>{
    const iconHeight = 26;
    const iconWidth = 26;
    const navigate = useNavigate();
    return (

        <TouchableOpacity onPress={() => {
            setCurrentTab(text)
            switch (text) {
                case 'Inicio':
                    navigate("/", {
                        replace: true,
                      });
                      
                  break;
                case 'Perfil':
                    navigate("/proveedor/profile", {
                        replace: true,
                      });
                    break;
                case 'Órdenes':                  
                  console.log('Ordenes');
                  break;
                default:
              }

        }}>
            <View style={{
                flexDirection: "row",
                alignItems: 'center',
                paddingVertical: 8,
                backgroundColor: currentTab == text ? 'white' : 'transparent',
                paddingLeft: 13,
                paddingRight: 35,
                borderRadius: 8,
                marginTop: 15
            }}>

                {/*<Image source={icon} style={{
                    width: 25, height: 25,
                    tintColor: currentTab == text ? "#5359D1" : "white"
                }}></Image>*/}
                {/* <Icon
                    name={icon} color={currentTab == text ? "#5359D1" : "white"} /> */}
                <Icon name={icon} height={iconHeight} width={iconWidth} color={currentTab == text ? theme.colors.purple : theme.bottomBar.iconPrimary}/>
                <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    paddingLeft: 15,
                    color: currentTab == text ? theme.colors.purple : "white"
                }}>{text}</Text>

            </View>
        </TouchableOpacity>
    );
}