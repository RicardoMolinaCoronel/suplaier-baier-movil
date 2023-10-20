import { React } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import AppRouter from './src/router/AppRouter.jsx';
import theme from './src/theme.js';

const Main = () =>{
    return (
        <SafeAreaView style={styles.containerSafe}>
          <AppRouter/>
          </SafeAreaView>             
      );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    containerSafe: {
      flex: 1,
      backgroundColor: theme.colors.purple,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    }
  });

export default Main
