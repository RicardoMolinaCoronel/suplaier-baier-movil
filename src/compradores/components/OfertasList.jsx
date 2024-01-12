import { View, StyleSheet, FlatList } from "react-native";
import OfertaItem from "./OfertaItem";
import theme from "../../theme";
import StyledText from "../../styles/StyledText";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import { useData } from "../../hooks/OfertasDataProvider";

const OfertasList = () => {
  const { ofertasTodos, getOfertasTodos } = useData();
  // const { ofertasTodos } = useOfertasTodos();
  const showEmptyArray = !!ofertasTodos && ofertasTodos?.length === 0;

  useEffect(() => {
    getOfertasTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {showEmptyArray && (
        <View style={styles.vacioContainer}>
          <StyledText color="purple">
            No hay ofertas en curso por el momento
          </StyledText>
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
        data={ofertasTodos}
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
