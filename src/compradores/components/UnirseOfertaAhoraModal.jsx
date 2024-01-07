import React, { useState } from "react";
import {
  Modal,
  Image,
  Text,
  View,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import { ButtonWithText } from "../../proveedores/components/ButtonWithText";
import StyledText from "../../styles/StyledText";
import theme from "../../theme";
import { dateOptions } from "../../components/dateOptions";
import { apiUrl } from "../../../apiUrl";
import { useData } from "../../hooks/OfertasDataProvider";
export const UnirseOfertaAhoraModal = ({
  dataproducto,
  isvisibleUnirseOfertaAhoraModal,
  oncloseUnirseOfertaAhora,
  oncloseexito,
}) => {
  const fechaLimiteObj = new Date(dataproducto?.fechaLimiteObj ?? "");
  const [contador, setContador] = useState(0);
  const [valortotal, setvalortotal] = useState(0);
  const { getOfertasTodos } = useData();
  const [disabled, setDisabled] = useState(false);

  let unidadesdisponibles =
    parseInt(dataproducto?.Maximo) - parseInt(dataproducto?.actualProductos);

  const incrementarContador = () => {
    if (contador < unidadesdisponibles) {
      setvalortotal((contador + 1) * dataproducto.datosProd.costoInst);
      setContador(contador + 1);
    }
  };

  const decrementarContador = () => {
    if (contador > 0) {
      setvalortotal((contador - 1) * dataproducto.datosProd.costoInst);
      setContador(contador - 1);
    }
  };
  const crearCompraIndividual = async () => {
    const body = {
      IdComprador: dataproducto.IdUsuario,
      IdProveedor: dataproducto.proveedor.IdUsuario,
      IdOferta: dataproducto.IdOferta,
      Cantidad: contador,
      Total: valortotal,
      TipoCompra: "instantanea",
      Descripcion: "",
      Observacion: "",
      IdEstado: dataproducto.estadoOferta.IdEstadosOferta,
      MetodoPago: "reserva",
      PagadoAProveedor: false,
    };

    const resp = await fetch(`${apiUrl}/compras`, {
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
        getOfertasTodos();

        Alert.alert(
          "¡Éxito!",
          "La compra instantánea se ha realizado con éxito",
          [
            {
              text: "Aceptar",
              onPress: () => {
                setDisabled(false);
                oncloseexito();
              },
            },
          ],
          { cancelable: false }
        );
      })
      .catch(() => {
        Alert.alert(
          "Error en la oferta",
          "Ha habido un error al intentar crear la orden de compra",
          [
            {
              text: "Aceptar",
              onPress: () => {
                setDisabled(false);
                oncloseexito();
              },
            },
          ],
          { cancelable: false }
        );
      });
  };
  const pagarahora = async () => {
    setDisabled(true);
    {
      setvalortotal(contador * dataproducto.datosProd.costoInst);
      const body = {
        IdOferta: dataproducto.IdOferta,
        NuevoActualProductos:
          parseInt(dataproducto.actualProductos) + parseInt(contador),
      };
      const resp = await fetch(`${apiUrl}/ofertas`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => {
          crearCompraIndividual();
        })
        .catch(() => {
          Alert.alert(
            "Aviso",
            "Ha habido un error al intentar realizar el pago",
            [
              {
                text: "Aceptar",
                onPress: () => {
                  setDisabled(false);
                  oncloseexito();
                },
              },
            ],
            { cancelable: false }
          );
        });
    }
  };

  return (
    <Modal
      //transparent={true}
      style={{ backgroundColor: "rgba(255,255,255,0.6)", flex: 1 }}
      visible={isvisibleUnirseOfertaAhoraModal}
      animationType="slide"
    >
      <View
        style={{
          backgroundColor: "#ffffff",
          padding: "5%",
          marginHorizontal: "10%",
          marginTop: "40%",
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
        <Text style={{ color: "black", margin: 10, fontWeight: "bold" }}>
          Pagar ahora
        </Text>
        <View style={styles.firstContainer}>
          <Image
            source={{
              uri: dataproducto?.datosProd?.urlImg ?? "",
            }}
            style={styles.imageContainer}
          />
          <View style={styles.starsContainer}>
            <StyledText color={"primary"} fontWeight={"bold"}>
              {dataproducto?.datosProd?.nombreProd ?? ""}
            </StyledText>
            <StyledText color={"primary"}>
              P. Instantáneo: ${dataproducto?.datosProd?.costoInst ?? 0}
            </StyledText>
            <StyledText color={"primary"}>
              U. Disponibles: {unidadesdisponibles}
            </StyledText>
          </View>
        </View>

        <View style={styles.secondFirstContainer}>
          <StyledText color={"primary"} fontWeight={"bold"}>
            Proveedor: {""}
          </StyledText>
          <StyledText color={"primary"}>
            {dataproducto?.nombreProveedor ?? ""}
          </StyledText>
        </View>

        <View style={styles.fechaCierreContainer}>
          <StyledText color={"primary"} fontWeight={"bold"}>
            Fecha cierre:{" "}
          </StyledText>
          <StyledText color={"primary"}>
            {fechaLimiteObj.toLocaleString(undefined, dateOptions)}
          </StyledText>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <View style={styles.unidadesContainer}>
            <Text style={{ marginHorizontal: 10 }}>{contador}</Text>
            <View style={{ flexDirection: "row" }}>
              <Button title="-" onPress={decrementarContador} />
              <Button title="+" onPress={incrementarContador} />
            </View>
          </View>
          <View style={styles.unidadesContainer}>
            <Text style={{ textAlign: "center" }}>
              <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                Total: $ {""}
              </Text>
              {valortotal}
            </Text>
          </View>
        </View>

        <View
          style={{
            alignContent: "center",
            flexDirection: "row",
            padding: 20,
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <ButtonWithText
            anyfunction={() => {
              setContador(0), setvalortotal(0), oncloseUnirseOfertaAhora();
            }}
            title={"Cancelar"}
            color={theme.colors.red}
          ></ButtonWithText>
          <ButtonWithText
            anyfunction={() => (contador != 0 ? pagarahora() : undefined)}
            title={"Continuar"}
            color={disabled ? "gray" : theme.colors.lightblue1}
            disabled={disabled}
          ></ButtonWithText>
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
    marginVertical: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: theme.colors.lightGray3,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
  },
  imageContainer: { width: "40%", height: 90, resizeMode: "contain" },
  starsContainer: { width: "60%" },
  secondContainer: { marginVertical: 10, flexDirection: "row" },
  secondFirstContainer: {
    flexDirection: "row",
    marginVertical: 10,
    width: "100%",
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
    // height: 40,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 5,
    borderWidth: 1,
    borderColor: theme.colors.lightGray3,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  fechaCierreContainer: {
    width: "100%",
    flexDirection: "row",
    marginVertical: 5,
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
