import { View, StyleSheet, FlatList, Image } from "react-native";
import OfertaItem from "./OfertaItem";
import StyledText from "../../styles/StyledText";
import theme from "../../theme";
import ProgressBar from "react-native-progress/Bar";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../auth/context/AuthContext";
import { apiUrl } from "../../../apiUrl";
import useOfertas from "../hooks/useOfertas";

const OfertasList = () => {
  const { ofertasProv } = useOfertas();
  return (
    <FlatList
      style={styles.flatListContainer}
      data={ofertasProv}
      renderItem={({ item: oferta }) => <OfertaItem {...oferta} />}
    />
  );
};
const styles = StyleSheet.create({
  flatListContainer: {},
  ofertaContainer: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: theme.colors.lightGray2,
    marginBottom: 10,
    padding: 10,
  },
  textoImagenContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: 200,
    height: 200,
  },
  enOfertaContainer: {
    alignItems: "flex-start",
    flexDirection: "row",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 5,
  },
  progressBar: {
    marginRight: 50,
  },
  vigenciaContainer: {
    alignItems: "flex-start",
    flexDirection: "row",
    marginTop: 5,
  },
  estadoContainer: {
    backgroundColor: theme.colors.green,
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: "center",
  },
});
export default OfertasList;
