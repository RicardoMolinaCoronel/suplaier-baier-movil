import React from "react";
import { Modal, View, Text, Image, StyleSheet, Alert } from "react-native";
import { ButtonWithText } from "../../proveedores/components/ButtonWithText";
import theme from "../../theme";
import { RadioButton } from "react-native-paper";
import { apiUrl } from "../../../apiUrl";
import { useData } from "../../hooks/OfertasDataProvider";
export const MetodoPagoModal = ({
  isvisibleMetodoPagoModal,
  valortotal,
  oncloseMetodoPago,
  oncloseReservado,
  dataproducto,
  contador,
}) => {
  const [checked, setChecked] = React.useState("");
  const { getOfertasTodos } = useData();
  const actualizarOferta = async () => {
    const body = {
      IdOferta: dataproducto.IdOferta,
      NuevoActualProductos:
        parseInt(dataproducto.actualProductos) + parseInt(contador),
    };
    await fetch(`${apiUrl}/ofertas`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("La solicitud no fue exitosa");
        }
        getOfertasTodos();

        Alert.alert(
          "El pago de tipo Reserva se ha realizado con éxito!",
          "Se ha unido correctamente a la oferta",
          [
            {
              text: "Aceptar",
              onPress: () => oncloseReservado(),
            },
          ],
          { cancelable: false }
        );
      })
      .catch(() => {
        Alert.alert(
          "Error en la oferta",
          "Ha habido un error al intentar realizar el pago",
          [
            {
              text: "Aceptar",
              onPress: () => oncloseReservado(),
            },
          ],
          { cancelable: false }
        );
      });
  };

  const crearCompraIndividual = async () => {
    const body = {
      IdComprador: dataproducto.IdUsuario,
      IdProveedor: dataproducto.proveedor.IdUsuario,
      IdOferta: dataproducto.IdOferta,
      Cantidad: contador,
      Total: valortotal,
      Descripcion: "",
      Observacion: "",
      IdEstado: dataproducto.estadoOferta.IdEstadosOferta,
      MetodoPago: "reserva",
      PagadoAProveedor: false,
      TipoCompra: "normal",
    };

    await fetch(`${apiUrl}/compras`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("La solicitud no fue exitosa");
        }
        actualizarOferta();
      })
      .catch(() => {
        Alert.alert(
          "Error en la orden de compra",
          "Ha habido un error al intentar crear la orden de compra",
          [
            {
              text: "Aceptar",
              onPress: () => oncloseReservado(),
            },
          ],
          { cancelable: false }
        );
      });
  };

  const postpago = () => {
    if (checked === "Reserva") {
      Alert.alert(
        "Efectuando Pago con " + checked,
        "$ " + valortotal,
        [
          {
            text: "Aceptar",
            onPress: () => {
              crearCompraIndividual();
            },
          },
        ],
        { cancelable: false }
      );
    }
  };
  return (
    <Modal transparent visible={isvisibleMetodoPagoModal} animationType="slide">
      <View
        style={{
          backgroundColor: "#ffffff",
          alignItems: "center",
          marginHorizontal: "10%",
          marginTop: "50%",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
          elevation: 4,
          borderRadius: 15,
        }}
      >
        <View
          style={{
            width: "100%",
            height: "7%",
            backgroundColor: "#9434DB",
            borderTopStartRadius: 15,
            borderTopEndRadius: 15,
          }}
        />
        <Text style={{ color: "black", margin: 10, fontWeight: "bold" }}>
          Seleccione Metodo de Pago:
        </Text>
        <View style={{ alignItems: "center" }}>
          <Image
            source={{
              uri: "https://1000marcas.net/wp-content/uploads/2019/12/logo-Paypal.png",
            }}
            style={{ width: 250, height: 100 }}
          />
        </View>
        <View style={{ alignContent: "flex-start" }}>
          {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton
              value="Pago anticipado"
              status={checked === "Pago anticipado" ? "checked" : "unchecked"}
              onPress={() => setChecked("Pago anticipado")}
            />
            <Text>Pago anticipado</Text>
          </View> */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton
              value="Reserva"
              status={checked === "Reserva" ? "checked" : "unchecked"}
              onPress={() => setChecked("Reserva")}
            />
            <Text>Reserva</Text>
          </View>
        </View>
        <View style={styles.botonesContainer}>
          <ButtonWithText
            anyfunction={() => {
              // eslint-disable-next-line no-unused-expressions, no-sequences
              setChecked(""), oncloseMetodoPago();
            }}
            title="cancelar"
            color={theme.colors.red}
          />
          <ButtonWithText
            anyfunction={postpago}
            title="Continuar"
            color="#3498DB"
          />
        </View>
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
  textName: { margin: 5 },
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
  imageContainer: { width: "30%", height: 90, resizeMode: "contain" },
  starsContainer: { alignItems: "center", width: "70%" },
  secondContainer: { marginVertical: 10, flexDirection: "row" },
  secondFirstContainer: {
    width: "55%",
    padding: 5,
    borderWidth: 1,
    borderColor: theme.colors.lightGray3,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  secondsecondContainer: {
    width: "45%",
    padding: 5,
    borderWidth: 1,
    borderColor: theme.colors.lightGray3,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  // precioInstaContainer: { marginVertical: 10, flexDirection: "row" },
  precioInstContainerSub: {
    marginVertical: 10,
    width: "100%",
    padding: 5,
    borderWidth: 1,
    borderColor: theme.colors.lightGray3,
    borderRadius: 8,
    flexDirection: "row",
  },
  unidadesFechaContainer: {
    marginVertical: 10,
    flexDirection: "row",
    width: "100%",
  },
  unidadesContainer: {
    width: "48%",
    padding: 5,
    borderWidth: 1,
    borderColor: theme.colors.lightGray3,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  fechaCierreContainer: {
    width: "52%",
    padding: 5,
    borderWidth: 1,
    borderColor: theme.colors.lightGray3,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  descripcionContainer: {
    marginVertical: 10,
    flexDirection: "row",
    width: "100%",
  },
  descripcionSubContainer: {
    width: "100%",
    padding: 5,
    borderWidth: 1,
    borderColor: theme.colors.lightGray3,
    borderRadius: 8,
  },
  progesoContainer: { marginVertical: 10, flexDirection: "row" },
  progresoSubContainer: {
    width: "100%",
    padding: 5,
    borderWidth: 1,
    alignItems: "center",
    borderColor: theme.colors.lightGray3,
    borderRadius: 8,
  },
  restantesContainer: {
    marginVertical: 10,
  },
  restantesSubContainer: {
    width: "100%",
    padding: 5,
    borderWidth: 1,
    borderColor: theme.colors.lightGray3,
    borderRadius: 8,
  },
  botonesContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  },
  borderLine: {
    borderBottomColor: theme.colors.primary,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 10,
  },
});
