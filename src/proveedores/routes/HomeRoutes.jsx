import {React} from 'react'
import { Routes, Route, } from 'react-router-native'
import StyledText from '../../styles/StyledText';
import { StatusBar } from 'expo-status-bar';
import {View, StyleSheet} from 'react-native'
import HomeProveedorPage from '../pages/HomeProveedorPage';
import SearchProveedorPage from '../pages/SearchProveedorPage';
import NotificationsProveedorPage from '../pages/NotificationsProveedorPage';
const HomeRoutes = () => {
    return(
        <Routes>
        <Route path='/proveedor/home/ofertas' element={<HomeProveedorPage/>}/>
          <Route path='/proveedor/home/search' element={<SearchProveedorPage/>}/>
          <Route path='/proveedor/home/notifications' element={<NotificationsProveedorPage/>}/>
        </Routes>
    )
}
export default HomeRoutes