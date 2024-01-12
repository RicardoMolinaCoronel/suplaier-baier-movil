import { View, StyleSheet, FlatList } from "react-native";
import DemandaItem from "./DemandaItem";
import theme from "../../theme";
import StyledText from "../../styles/StyledText";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import { useData } from "../../hooks/DemandasDataProvider";

const DemandasList = () => {
  const { demandasTodos, getDemandasTodos } = useData();
  // const { ofertasTodos } = useOfertasTodos();
  const showEmptyArray = !!demandasTodos && demandasTodos?.length === 0;

  useEffect(() => {
    getDemandasTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {showEmptyArray && (
        <View style={styles.vacioContainer}>
          <StyledText color="purple">
            No hay demandas en curso por el momento
          </StyledText>
          <MaterialIcons
            name="add-shopping-cart"
            size={24}
            color={theme.colors.purple}
            style={styles.iconContainer}
          />
        </View>
      )}
      <FlatList
        style={styles.flatListContainer}
        data={demandasTodos}
        renderItem={({ item: demanda }) => <DemandaItem {...demanda} />}
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
export default DemandasList;
