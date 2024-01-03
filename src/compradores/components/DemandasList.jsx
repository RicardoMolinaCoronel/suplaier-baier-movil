import { View, StyleSheet, FlatList, Image } from "react-native";
import DemandaItem from "./DemandaItem";
import theme from "../../theme";
import StyledText from "../../styles/StyledText";
import { MaterialIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useData } from "../../hooks/DemandasDataProvider";

const DemandasList = () => {
  const { demandasComp, getDemandasComp } = useData();
  // const { ofertasTodos } = useOfertasTodos();
  const showEmptyArray = !!demandasComp && demandasComp?.length === 0;

  useEffect(() => {
    getDemandasComp();
  }, []);
  return (
    <>
      {showEmptyArray && (
        <View style={styles.vacioContainer}>
          <StyledText color={"purple"}>
            No tienes demandas por el momento
          </StyledText>
          <MaterialIcons
            name="add-shopping-cart"
            size={24}
            color={theme.colors.purple}
            style={styles.iconContainer}
          />
        </View>
      )}
      {
        <FlatList
          style={styles.flatListContainer}
          data={demandasComp}
          renderItem={({ item: demanda }) => <DemandaItem {...demanda} />}
        />
      }
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
