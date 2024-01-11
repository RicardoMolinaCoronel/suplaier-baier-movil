import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import StyledText from "../../styles/StyledText";
import { StatusBar } from "expo-status-bar";
import Search_Input from "../../components/SearchInput";
import Search_Logic from "../logics/Search_Logic";
import Icon from "react-native-ico-material-design";
import Cargar_Categorias from "../../components/CargarCategorias";
import OfertaItem from "../components/OfertaItem";
import theme from "../../theme";
import OfertasDataProvider from "../../hooks/OfertasDataProvider";
const SearchProveedorPage = () => {
  const { ofertasBusqueda, getOfertasTodos, getOfertasPorCategoria } =
    Search_Logic();
  const [showEmptyArray, setShowEmptyArray] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState();

  const handleSearch = async (searchText) => {
    if (categoriaSeleccionada && categoriaSeleccionada.IdCatProducto) {
      await getOfertasPorCategoria(
        searchText,
        categoriaSeleccionada.IdCatProducto
      );
    } else {
      await getOfertasTodos(searchText);
    }
  };

  useEffect(() => {
    setShowEmptyArray(ofertasBusqueda.length === 0);
  }, [ofertasBusqueda]);

  useEffect(() => {
    getOfertasTodos("");
  }, []);

  const onCategoriaSelect = (categoria) => {
    setCategoriaSeleccionada(categoria);
    handleSearch("");
  };

  return (
    <View style={styles.container}>
      <OfertasDataProvider>
        <FlatList
          ListHeaderComponent={
            <>
              <View style={styles.busquedaContainer}>
                <View style={styles.topContainer}>
                  <Icon
                    name="keyboard-right-arrow-button"
                    width={20}
                    height={20}
                  />
                  <StyledText
                    fontWeight="bold"
                    fontSize="subtitle"
                    style={styles.textBusqueda}
                  >
                    Búsqueda
                  </StyledText>
                </View>
                <Search_Input onSearch={handleSearch} />
                <Cargar_Categorias onSelectCategoria={onCategoriaSelect} />
                {showEmptyArray && (
                  <Text style={styles.textNothing}>
                    No hay productos con ese nombre
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
      </OfertasDataProvider>
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
    color: "purple",
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
