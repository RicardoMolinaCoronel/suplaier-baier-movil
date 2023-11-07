import React from 'react';
import { View, StyleSheet, FlatList} from 'react-native';
import StyledText from '../../styles/StyledText';
import Icon from 'react-native-ico-material-design';
import StatusBar from 'expo-status-bar';
import Search_Input from '../components/Search_Input';
import Search_Logic from '../logics/Search_Logic'; // Asegúrate de importar Search_Logic
import theme from "../../theme";

import Cargar_Categorias from '../components/Cargar_Categorias';
const SearchProveedorPage = () => {
  const { searchResults, performSearch } = Search_Logic(); // Utiliza Search_Logic aquí

  return (
    <View style={styles.container}>
      <View style={styles.busquedaContainer}>
        <View style={styles.topContainer}>
          <Icon name="keyboard-right-arrow-button" width={20} height={20} />
          <StyledText fontWeight="bold" fontSize="subtitle" style={styles.textBusqueda}>
            Búsqueda
          </StyledText>
        </View>
      </View>
      <Search_Input onSearch={performSearch} />
      {/* Muestra los resultados de la búsqueda */}
      {searchResults && searchResults.map((result) => (
          <StyledText key={result.id}>{result.title}</StyledText>
        ))}
      <View style={styles.spaceBorder} />
      <StatusBar style="light" />
      <Cargar_Categorias/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    flex: 1,
  },
  busquedaContainer: {},
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textBusqueda: {
    marginLeft: 5,
  },
  borderLine: {
    borderBottomColor: theme.colors.lightGray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 5,
    marginBottom: 10,
  },
  spaceBorder: {
    marginTop: 10,
  },
});
export default SearchProveedorPage;
