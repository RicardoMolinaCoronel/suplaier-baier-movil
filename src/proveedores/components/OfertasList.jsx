import { View, StyleSheet, FlatList } from "react-native";
import { useEffect } from "react";
import OfertaItem from "./OfertaItem";
import theme from "../../theme";
import StyledText from "../../styles/StyledText";
import { MaterialIcons } from "@expo/vector-icons";
import { useData } from "../../hooks/OfertasDataProvider";
const OfertasList = () => {
  // const { ofertasProv } = useOfertas();
  const { ofertasProv, getOfertasProv } = useData();
  const showEmptyArray = !!ofertasProv && ofertasProv?.length === 0;

  useEffect(() => {
    // Realiza la primera carga de datos al montar el componente principal
    getOfertasProv();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {showEmptyArray && (
        <View style={styles.vacioContainer}>
          <StyledText color="purple">No hay ofertas por el momento</StyledText>
          <MaterialIcons
            name="local-offer"
            size={24}
            color={theme.colors.purple}
            style={styles.iconContainer}
          />
        </View>
      )}
      <FlatList
        style={styles.flatListContainer}
        data={ofertasProv}
        renderItem={({ item: oferta }) => <OfertaItem {...oferta} />}
      />
    </>
  );
};
const styles = StyleSheet.create({
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
export default OfertasList;
