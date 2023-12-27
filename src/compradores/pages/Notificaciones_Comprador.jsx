import { View, StyleSheet } from "react-native";
import StyledText from "../../styles/StyledText";
import { StatusBar } from "expo-status-bar";
import Notificaciones_List from '../../components/Notificaciones_List';
import Icon from "react-native-ico-material-design";
import theme from "../../theme";
const Notificaciones_Comprador = () => {
  return (
    <View style={styles.container}>
    <View style={styles.notificacionesContainer}>
      <View style={styles.topContainer}>
        <Icon name="keyboard-right-arrow-button" width={20} height={20} />
        <StyledText
          fontWeight="bold"
          fontSize="subtitle"
          style={styles.textNotificaciones}
        >
          Notificaciones
        </StyledText>
      </View>
      <View style={styles.borderLine} />
    </View>
    <View style={styles.spaceBorder} />
    <Notificaciones_List/>
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
  notificacionesContainer: {},
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textNotificaciones: {
    marginLeft: 5,
  },
  borderLine: {
    borderBottomColor: theme.colors.lightGray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 5,
    marginBottom: 10,
  },
  spaceBorder: {
    marginTop: 15,
  },
});
export default Notificaciones_Comprador;
