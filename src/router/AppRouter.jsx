import {React} from 'react'
import { Routes, Route, Navigate } from 'react-router-native'
import StyledText from '../styles/StyledText.jsx'
import { StatusBar } from 'expo-status-bar';
import {View} from 'react-native'
import PrivateRoutes from './PrivateRoutes.jsx';
import PublicRoutes from './PublicRoutes.jsx';
import MainProveedor from '../proveedores/routes/MainProveedor.jsx';

const AppRouter = () => {
    // return(
    //     <Routes>
    //     <Route path='/' element={<View>
    //       <StyledText fontWeight="bold"> HOME</StyledText>
    //       <StatusBar style="light" />  
    //       </View>}/>
    //       <Route path='/proveedor/search' element={          <View>
    //       <StyledText fontWeight="bold"> SEARCH</StyledText>
    //       <StatusBar style="light" />
    //       <Navigate to="/proveedor/search"/>  
    //       </View>}/>
    //       <Route path='/proveedor/notifications' element={          <View>
    //       <StyledText fontWeight="bold"> NOTIFICATIONS</StyledText>
    //       <StatusBar style="light" />  
    //       </View>}/>
    //     </Routes>
    // )

    const getRoutesByTypeOfUser = (tipo) => {
      switch (tipo) {
        case "comprador":
          return          <View>
            <StyledText fontWeight="bold"> COMPRADOR</StyledText>
            <StatusBar style="light" />
            <Navigate to="/proveedor/search"/>  
            </View>;
        case "proveedor":    
            return <MainProveedor/>;
      }
    }
  
    return (
      <>
        <Routes>
          <Route path="/login" element={
            <PublicRoutes>
              <View>
            <StyledText fontWeight="bold"> COMPRADOR</StyledText>
            <StatusBar style="light" />
            <Navigate to="/proveedor/search"/>  
            </View>
            </PublicRoutes>
          }/>
          <Route path="/signup" element={
            <PublicRoutes>
              <View>
            <StyledText fontWeight="bold"> COMPRADOR</StyledText>
            <StatusBar style="light" />
            <Navigate to="/proveedor/search"/>  
            </View>
            </PublicRoutes>
          }/>
          <Route path="/signup_comprador" element={
            <PublicRoutes>
              <View>
            <StyledText fontWeight="bold"> COMPRADOR</StyledText>
            <StatusBar style="light" />
            <Navigate to="/proveedor/search"/>  
            </View>
            </PublicRoutes>
          }/>
          <Route path="/signup_proveedor" element={
            <PublicRoutes>
              <View>
            <StyledText fontWeight="bold"> COMPRADOR</StyledText>
            <StatusBar style="light" />
            <Navigate to="/proveedor/search"/>  
            </View>
            </PublicRoutes>
          }/>
          <Route path="/terminos_y_condiciones" element={
            <PublicRoutes>
             <View>
            <StyledText fontWeight="bold"> COMPRADOR</StyledText>
            <StatusBar style="light" />
            <Navigate to="/proveedor/search"/>  
            </View>
            </PublicRoutes>
          }/>
                  <Route path="/sesion_expirada" element={
            <PublicRoutes>
              <View>
            <StyledText fontWeight="bold"> COMPRADOR</StyledText>
            <StatusBar style="light" />
            <Navigate to="/proveedor/search"/>  
            </View>
            </PublicRoutes>
          }/>
          {/* <Route path="/*" element={
            <PrivateRoutes>
              {getRoutesByTypeOfUser("proveedor")}
            </PrivateRoutes>
          }/> */}
          <Route path="/*" element={
            <MainProveedor/>
          }/> 

        </Routes>
      </>
    )
}
export default AppRouter