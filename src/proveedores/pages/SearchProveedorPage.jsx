import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import StyledText from "../../styles/StyledText";
import { StatusBar } from "expo-status-bar";
import Search_Input from '../components/Search_Input';
import Search_Logic from '../logics/Search_Logic';
import Icon from "react-native-ico-material-design";
import theme from "../../theme";
import Cargar_Categorias from '../components/Cargar_Categorias';
import { apiUrl } from '../../../apiUrl';
import {useEffect, useState} from 'react'
import OfertaItem from "../components/OfertaItem";
const SearchProveedorPage = () => {
  const { ofertasBusqueda, getOfertasTodos } = Search_Logic();
  const [showEmptyArray, setShowEmptyArray] = useState(false);

  const handleSearch = async (searchText) => {
 // Actualiza los resultados en Search_Logic usando la función getOfertasTodos
  getOfertasTodos(searchText);

 // Verifica si la búsqueda está vacía o tiene resultados
  setShowEmptyArray(ofertasBusqueda.length === 0);
    };
  useEffect(() => {
    // Cuando el componente se monta, carga las ofertas iniciales
    getOfertasTodos('');
  }, []);
  return (
    <ScrollView style={styles.container}>
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
      <Search_Input onSearch={(text) => handleSearch(text)} />
      <Cargar_Categorias></Cargar_Categorias>
      {/* Muestra los resultados de la búsqueda */}
      {showEmptyArray && (
        
          <Text style={styles.textNothing} >
            No hay productos con ese nombre
          </Text>
        )}
           {
         <FlatList
         style={styles.flatListContainer}
         data={ofertasBusqueda}
         renderItem={({ item: oferta }) => <OfertaItem {...oferta} />}
       />
      } 
       
    </View>
      
    <StatusBar style="light" />
    <View style={styles.spaceBorder} />

  </ScrollView>
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
    marginTop: 10,
    marginBottom: 10,
  },
  spaceBorder: {
      marginTop: 45,
  },
  textNothing: {
    fontSize: 18,
    marginTop: 45,
    color: 'purple',
  },
  flatListContainer: {},
  vacioContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    marginTop: 15,
  },
});

export default SearchProveedorPage;
