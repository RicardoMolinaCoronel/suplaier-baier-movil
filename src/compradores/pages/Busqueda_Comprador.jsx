import { View, Text, StyleSheet, FlatList } from "react-native";
import StyledText from "../../styles/StyledText";
import { StatusBar } from "expo-status-bar";
import Search_Input from '../../components/Search_Input';
import Search_Logic from '../logics/Search_Logic';
import Icon from "react-native-ico-material-design";
import theme from "../../theme";
import Cargar_Categorias from '../../components/Cargar_Categorias';
import {useEffect, useState} from 'react'
import OfertaItem from "../components/OfertaItem";
const Busqueda_Comprador = () => {
  const { ofertasBusqueda, getOfertasTodos } = Search_Logic();
  const [showEmptyArray, setShowEmptyArray] = useState(false);

  const handleSearch = async (searchText) => {
    // Actualiza los resultados en Search_Logic usando la función getOfertasTodos
    await getOfertasTodos(searchText);
  };

  useEffect(() => {
    // Actualiza showEmptyArray cuando ofertasBusqueda cambia
    setShowEmptyArray(ofertasBusqueda.length === 0);
  }, [ofertasBusqueda]);

  useEffect(() => {
    // Cuando el componente se monta, carga las ofertas iniciales
    getOfertasTodos('');
  }, []);

  return (
    
<FlatList
  style={styles.container}
  ListHeaderComponent={
    <>
      <View style={styles.busquedaContainer}>
        <View style={styles.topContainer}>
          <Icon name="keyboard-right-arrow-button" width={20} height={20} />
          <StyledText fontWeight="bold" fontSize="subtitle" style={styles.textBusqueda}>
            Búsqueda
          </StyledText>
        </View>
        <Search_Input onSearch={(text) => handleSearch(text)} />
        <Cargar_Categorias />
        {showEmptyArray && (
          <Text style={styles.textNothing}>
            No hay demandas disponibles con ese nombre
          </Text>
        )}
      </View>
      <StatusBar style="light" />
      <View style={styles.spaceBorder} />
    </>
  }
  data={ofertasBusqueda}
  renderItem={({ item: oferta }) => <OfertaItem {...oferta} />}
/>

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

export default Busqueda_Comprador;
