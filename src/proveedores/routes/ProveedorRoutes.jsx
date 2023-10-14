import {React} from 'react'
import { Routes, Route } from 'react-router-native'
import StyledText from '../../styles/StyledText';
import { StatusBar } from 'expo-status-bar';
import {View, StyleSheet} from 'react-native'



const ProveedorRoutes = () => {
    return(
        <Routes>
        <Route path='/' element={<View>
          <StyledText fontWeight="bold"> HOME</StyledText>
          <StatusBar style="light" />  
          </View>}/>
          <Route path='/proveedor/search' element={          <View>
          <StyledText fontWeight="bold"> SEARCH</StyledText>
          <StatusBar style="light" />  
          </View>}/>
          <Route path='/proveedor/notifications' element={          <View>
          <StyledText fontWeight="bold"> NOTIFICATIONS</StyledText>
          <StatusBar style="light" />  
          </View>}/>
        </Routes>
    )
}
export default ProveedorRoutes