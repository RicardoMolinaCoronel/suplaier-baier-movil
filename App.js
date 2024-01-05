import { NativeRouter } from 'react-router-native';
import Main from './Main.jsx'
import { AuthProvider } from './src/auth/context/AuthProvider.jsx';
import { LogBox } from "react-native"

LogBox.ignoreAllLogs(true)
export default function App() {
  return <AuthProvider><NativeRouter><Main /></NativeRouter></AuthProvider>
}


