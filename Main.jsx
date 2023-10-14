import { React } from 'react';
import { StyleSheet, View } from 'react-native';
import AppRouter from './src/router/AppRouter.jsx';


const Main = () =>{
    return (
        <View style={styles.container}>
          <AppRouter/>
          </View>             
      );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    }
  });

export default Main
