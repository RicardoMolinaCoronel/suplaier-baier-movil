import { View, StyleSheet } from "react-native";
import StyledText from "../../styles/StyledText";
import { StatusBar } from "expo-status-bar";
import Icon from "react-native-ico-material-design";
import theme from "../../theme";
import OfertasList from "../components/OfertasList";
import OrdenesList from "../components/OrdenesList";
const OrdenesProveedorPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.misOrdenesContainer}>
        <View style={styles.topContainer}>
          <Icon name="keyboard-right-arrow-button" width={20} height={20} />
          <StyledText
            fontWeight="bold"
            fontSize="subtitle"
            style={styles.textMisOrdenes}
          >
            Órdenes de compra
          </StyledText>
        </View>
        <View style={styles.borderLine} />
      </View>
      <OrdenesList />
      <View style={styles.spaceBorder} />
      <StatusBar style="light" />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    flex: 1,
  },
  misOrdenesContainer: {},
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textMisOrdenes: {
    marginLeft: 5,
  },
  borderLine: {
    borderBottomColor: theme.colors.lightGray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 5,
    marginBottom: 10,
  },
  spaceBorder: {
    marginTop: 45,
  },
});
export default OrdenesProveedorPage;
