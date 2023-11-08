import { View, Text, StyleSheet } from "react-native";
import StyledText from "../../styles/StyledText";
import { StatusBar } from "expo-status-bar";
import Search_Input from '../components/Search_Input';
import Search_Logic from '../logics/Search_Logic';
import Icon from "react-native-ico-material-design";
import theme from "../../theme";
import Cargar_Categorias from '../components/Cargar_Categorias';
import { apiUrl } from '../../../apiUrl';
import {useEffect, useState} from 'react'
const SearchProveedorPage = () => {
  const { ofertasBusqueda, getOfertasTodos } = Search_Logic();
  const [showEmptyArray, setShowEmptyArray] = useState(false);

  const handleSearch = async (searchText) => {
    const resp = await fetch(`${apiUrl}/ofertaByProducto?q=${searchText}`);
    const data = await resp.json();
    const { rows: ofertas } = data || {};

    if (ofertas) {
      // Filtra las ofertas que cumplan con ciertas condiciones
      const filteredOfertas = ofertas.filter((oferta) => oferta.IdEstadosOferta === 1);

      // Actualiza los resultados en Search_Logic
      getOfertasTodos(filteredOfertas);
    }
    if (ofertas.length === 0) {
      setShowEmptyArray(true);
    } else {
      setShowEmptyArray(false);
      // Filtra y actualiza los resultados
    }
  };
  useEffect(() => {
    // Cuando el componente se monta, carga las ofertas iniciales
    getOfertasTodos('');
  }, []);
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
      <Search_Input onSearch={handleSearch} />
      <Cargar_Categorias></Cargar_Categorias>
      {/* Muestra los resultados de la búsqueda */}
    {ofertasBusqueda.map((result) => (
        <Text>{result.idOferta}{result.Oferta}</Text>
      ))} 
      {showEmptyArray && (
        
          <Text style={styles.textNothing} >
            No hay productos con ese nombre
          </Text>
        )}
    </View>
      
    <StatusBar style="light" />
    <View style={styles.spaceBorder} />

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
  }
});

export default SearchProveedorPage;
