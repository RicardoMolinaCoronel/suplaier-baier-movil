import { View, Text, StyleSheet } from "react-native";
import StyledText from "../../styles/StyledText";
import { StatusBar } from "expo-status-bar";
import Search_Input from '../components/Search_Input';
import Search_Logic from '../logics/Search_Logic';
import Icon from "react-native-ico-material-design";
import theme from "../../theme";
const SearchProveedorPage = () => {
  const { searchResults, performSearch } = Search_Logic();
  return (
    <View style={styles.container}>
    <View style={styles.busquedaContainer}>
      <View style={styles.topContainer}>
        <Icon name="keyboard-right-arrow-button" width={20} height={20} />
        <StyledText
          fontWeight="bold"
          fontSize="subtitle"
          style={styles.textBusqueda}
        >
          Búsqueda
        </StyledText>
      </View>
      <View style={styles.borderLine} />
    </View>
    <Search_Input onSearch={performSearch} />
      {/* Muestra los resultados de la búsqueda */}
      {searchResults.map((result) => (
        <Text key={result.id}>{result.title}</Text>
      ))}
    <View style={styles.spaceBorder} />
    <StatusBar style="light" />
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
    marginTop: 45,
  },
});
export default SearchProveedorPage;
