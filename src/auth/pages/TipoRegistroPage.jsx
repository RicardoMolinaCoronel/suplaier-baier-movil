import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import theme from "../../theme";
import StyledText from "../../styles/StyledText";
import { useNavigate, Navigate } from "react-router-native";
const TipoRegistroPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <View style={styles.container}>
        <StyledText
          fontSize={"bigtitle"}
          fontWeight={"bold"}
          color={"purple"}
          style={styles.titleText}
        >
          ¿Qué tipo de usuario deseas ser?
        </StyledText>
        <StyledText
          fontSize={"title"}
          fontWeight={"normal"}
          color={"purple"}
          style={styles.compradorText}
        >
          Comprador
        </StyledText>
        <Image
          source={require("../../../public/comprador_registro.jpeg")}
          style={styles.imageComprador}
        />
        <TouchableOpacity style={styles.compradorButton} onPress={() => {
          navigate("/signup_comprador", {
            replace: true,
          });
        }}>
          <StyledText
            color={"secondary"}
            fontSize="subheading"
            style={styles.compradorButtonText}
          >
            Continuar
          </StyledText>
        </TouchableOpacity>
        <StyledText
          fontSize={"title"}
          color={"purple"}
          fontWeight={"normal"}
          style={styles.proveedorText}
        >
          Proveedor
        </StyledText>
        <Image
          source={require("../../../public/proveedor_v2.jpeg")}
          style={styles.imageComprador}
        />
        <TouchableOpacity style={styles.proveedorButton} onPress={() => {
          navigate("/signup_proveedor", {
            replace: true,
          });
        }} >
          <StyledText
            color={"secondary"}
            fontSize="subheading"
            style={styles.proveedorButtonText}

          >
            Continuar
          </StyledText>
        </TouchableOpacity>
      </View>
      <StatusBar style="light" />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.lightGray,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  titleText: {
    textAlign: "center",
  },
  compradorText: {
    marginBottom: 10,
    marginTop: 10,
  },
  imageComprador: {
    width: 180,
    height: 180,
    borderRadius: 180 / 2,
  },
  compradorButton: {
    backgroundColor: theme.colors.blue,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  compradorButtonText: {
    padding: 15,
  },
  proveedorText: {
    marginTop: 20,
    marginBottom: 10,
  },
  proveedorButton: {
    backgroundColor: theme.colors.lightgreen,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  proveedorButtonText: {
    padding: 13,
  },
});
export default TipoRegistroPage;
