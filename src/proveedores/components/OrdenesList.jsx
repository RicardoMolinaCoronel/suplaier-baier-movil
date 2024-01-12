import { View, StyleSheet, FlatList } from "react-native";
import useOrdenes from "../hooks/useOrdenes";
import OrdenItem from "./OrdenItem";
import StyledText from "../../styles/StyledText";
import { MaterialIcons } from "@expo/vector-icons";
import theme from "../../theme";
const OrdenesList = () => {
  const { ordenesProv } = useOrdenes();
  const showEmptyArray = !!ordenesProv && ordenesProv?.length === 0;
  return (
    <>
      {showEmptyArray && (
        <View style={styles.vacioContainer}>
          <StyledText color="purple">
            No hay órdenes de compra por el momento
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
        data={ordenesProv}
        renderItem={({ item: orden }) => <OrdenItem {...orden} />}
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
export default OrdenesList;
