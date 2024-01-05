import { View, Image, Modal } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../../auth/context/AuthContext";
import { StyleSheet, ScrollView } from "react-native";
import StyledText from "../../styles/StyledText";
import theme from "../../theme";
import { ButtonWithText } from "../../proveedores/components/ButtonWithText";
import { dateOptions } from "../../components/dateOptions";
import { apiUrl } from "../../../apiUrl";
import { Alert } from "react-native";

export const ResumenProducto = ({
  isvisible,
  onclose,
  productoImg,
  values,
  categoriaNombreSelected,
}) => {
  const {
    authState: { user },
  } = useContext(AuthContext);
  const createProduct = async () => {
    const body = {
      IdProveedor: user.IdUsuario,
      IdCatProducto: values.categoria,
      Activo: 1,
      Valoracion: 5,
      Descripcion: values.description,
      UrlImg: productoImg,
      Name: values.name,
    };
    const resp = await global
      .fetch(`${apiUrl}/productos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
      .catch(() => {
        Alert.alert(
          "Error",
          "Ha habido un error al intentar crear el producto",
          [{ text: "Aceptar", onPress: () => onclose() }],
          { cancelable: false }
        );
      })
      .then(() => {
        Alert.alert(
          "¡Éxito!",
          "Se ha creado el producto con éxito",
          [{ text: "Aceptar", onPress: () => onclose() }],
          { cancelable: false }
        );
      });
    console.log("peticion");
  };
  return (
    <Modal visible={isvisible} transparent={true} animationType="slide">
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.tituloContainer}>
            <StyledText
              fontWeight={"bold"}
              color={"purple"}
              style={styles.textName}
              fontSize={"subtitle"}
            >
              Resumen del producto
            </StyledText>
            <ButtonWithText
              anyfunction={onclose}
              title={""}
              icon={"close-sharp"}
              color={theme.colors.red2}
            />
          </View>
          <View style={styles.soloContainer}>
            <StyledText color={"purple"} fontWeight={"bold"}>
              Nombre producto:{" "}
            </StyledText>
            <StyledText color={"primary"}>{values.name}</StyledText>
          </View>
          <View style={styles.productoContainer}>
            <Image
              source={
                productoImg != null && productoImg != "no-img.jpeg"
                  ? {
                      uri: productoImg,
                    }
                  : require("../../../public/no-img.jpeg")
              }
              style={styles.imageContainer}
            />
            <StyledText
              color={"primary"}
              style={styles.textProductoDescripcion}
            >
              {values.description}
            </StyledText>
          </View>
          <View style={styles.soloContainerRow}>
            <StyledText color={"purple"} fontWeight={"bold"}>
              Categoría:{" "}
            </StyledText>
            <StyledText color={"primary"}>{categoriaNombreSelected}</StyledText>
          </View>
          <ButtonWithText
            anyfunction={() => createProduct()}
            title={"Crear producto"}
            color="#3498DB"
          />
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    padding: "5%",
    margin: "3%",
    marginTop: "20%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    borderRadius: 15,
  },

  tituloContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textName: { margin: 5, width: "70%" },
  iconBehave: {
    padding: 14,
  },
  firstContainer: {
    padding: 5,
    borderWidth: 1,
    borderColor: theme.colors.lightGray3,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
  },
  soloContainer: {
    marginVertical: 5,
    width: "100%",
    padding: 5,
    borderWidth: 1,
    borderColor: theme.colors.lightGray3,
    borderRadius: 8,
  },
  soloContainerRow: {
    marginVertical: 5,
    width: "100%",
    padding: 5,
    borderWidth: 1,
    borderColor: theme.colors.lightGray3,
    borderRadius: 8,
    flexDirection: "row",
  },
  productoContainer: {
    borderWidth: 1,
    borderColor: theme.colors.gray2,
    borderRadius: 5,
    marginBottom: 5,
    padding: 8,
  },
  imageContainer: {
    width: "100%",
    height: 400,
    resizeMode: "contain",
  },
  textProductoDescripcion: {
    width: "100%",
    padding: 7,
    textAlign: "center",
  },
});
