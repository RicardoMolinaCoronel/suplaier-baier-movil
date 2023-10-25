import {React} from 'react'
import { Routes, Route, } from 'react-router-native'
import MyProfile from '../pages/MyProfile'

const ProfileRoutes = () => {
    return(
        <Routes>
          <Route path='information' element={<MyProfile/>}/>
        </Routes>
    )
}
export default ProfileRoutes