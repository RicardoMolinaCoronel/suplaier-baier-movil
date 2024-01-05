import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Button, Modal, Alert } from "react-native";
import { apiUrl } from "../../../apiUrl";
import { ButtonWithText } from "./ButtonWithText";
import theme from "../../theme";
export const CerrarOferta = ({
  IdOferta,
  isvisible,
  oncloseretroceder,
  onclosecerraroferta,
}) => {
  const [comprasInd, setComprasInd] = useState([]);
  const [seHaTerminado, setSeHaTerminado] = useState(false);

  const cerrarOferta = async () => {
    const body = {
      IdOferta: IdOferta,
      IdEstadosOferta: 11, // Id Estado PENDIENTE DB
    };

    try {
      const resp = await fetch(`${apiUrl}/cambiarofertaestado`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (resp.ok) {
        const data = await resp.json();
        console.log(!!data && "cerrada la oferta");
        // setIrAObtenerComprasInd(true);
      } else {
        Alert.alert(
          "¡Error!",
          "¡Hubo un error al intentar cerrar la oferta!", // Puedes poner un mensaje aquí si lo necesitas
          [{ text: "Aceptar", onPress: () => onclosecerraroferta() }],
          { cancelable: false }
        );
        console.error("Error al cerrar la oferta");
      }
    } catch (error) {
      Alert.alert(
        "¡Error!",
        "¡Hubo un error al intentar cerrar la oferta!", // Puedes poner un mensaje aquí si lo necesitas
        [{ text: "Aceptar", onPress: () => onclosecerraroferta() }],
        { cancelable: false }
      );
      console.error("Error en la solicitud de cierre", error);
    }
  };

  const getComprasIndByOferta = async () => {
    const resp = await fetch(`${apiUrl}/compras?idOferta=${IdOferta}`);
    if (resp.ok) {
      const data = await resp.json();
      const compras = !!data && data.rows;
      setComprasInd(compras);
    } else {
      Alert.alert(
        "¡Error!",
        "¡Hubo un error al intentar cerrar la oferta!", // Puedes poner un mensaje aquí si lo necesitas
        [{ text: "Aceptar", onPress: () => onclosecerraroferta() }],
        { cancelable: false }
      );
    }
  };

  const cambiarAVerificandoPagosCompras = async () => {
    for (const compra of comprasInd) {
      const body = {
        IdCompra: compra.IdCompra,
        IdEstado: 3, // Id Estado Cerrado DB
        PagadoAProveedor: false,
      };

      try {
        const resp = await fetch(`${apiUrl}/compras`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (resp.ok) {
          const data = await resp.json();
          console.log(!!data && "cambiando estado compra a verificando pagos");
          Alert.alert(
            "¡Éxito!",
            "¡Se ha cerrado la oferta con éxito!", // Puedes poner un mensaje aquí si lo necesitas
            [{ text: "Aceptar", onPress: () => onclosecerraroferta() }],
            { cancelable: false }
          );
        } else {
          Alert.alert(
            "¡Error!",
            "¡Hubo un error al intentar cerrar la oferta!", // Puedes poner un mensaje aquí si lo necesitas
            [{ text: "Aceptar", onPress: () => onclosecerraroferta() }],
            { cancelable: false }
          );
          console.error(
            "Error al cambiar estado de compra a verificando pagos"
          );
        }
      } catch (error) {
        Alert.alert(
          "¡Error!",
          "¡Hubo un error al intentar cerrar la oferta!", // Puedes poner un mensaje aquí si lo necesitas
          [{ text: "Aceptar", onPress: () => onclosecerraroferta() }],
          { cancelable: false }
        );
        console.error("Error en la solicitud de cambio de estado", error);
      }
    }

    setSeHaTerminado(true);
  };

  const efectuarPagoPaypal = (compra) => {
    // Simulación de pago con PayPal
    console.log(`Pagado con PayPal la compra con id: ${compra.IdCompra}`);
  };

  // const verificarCompraMetodosPago = () => {
  //   comprasInd.forEach((compra) => {
  //     if (compra.MetodoPago === "reserva") {
  //       setTimeout(() => {
  //         efectuarPagoPaypal(compra);
  //       }, 5000);
  //     }
  //   });
  // };

  useEffect(() => {
    !!comprasInd && cambiarAVerificandoPagosCompras();
    // eslint-disable-next-line
  }, [comprasInd]);

  const onClickConfirmarCierre = () => {
    cerrarOferta()
      .then((res) => getComprasIndByOferta())
      .catch(() => {
        Alert.alert(
          "¡Error!",
          "¡Hubo un error al intentar cerrar la oferta!", // Puedes poner un mensaje aquí si lo necesitas
          [{ text: "Aceptar", onPress: () => onclosecerraroferta() }],
          { cancelable: false }
        );
      });
  };

  return (
    <Modal visible={isvisible} transparent={true} animationType="slide">
      <View
        style={{
          alignItems: "center",
          backgroundColor: "#ffffff",
          width: "auto",
          height: "auto",
          padding: "5%",
          margin: "10%",
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
        <Text style={{ fontWeight: "bold", color: "black", margin: 5 }}>
          Cerrar oferta
        </Text>
        <Text style={{ color: "black", margin: 5 }}>
          Su oferta ha alcanzado la mínima cantidad de productos a vender, sin
          embargo, la oferta todavía no ha llegado a su fecha de vigencia. Si
          está seguro de cerrar su oferta, de click en "Aceptar".
        </Text>

        <View
          style={{
            flexDirection: "row",
            width: "80%",
            marginHorizontal: 10,
            justifyContent: "space-between",
          }}
        >
          <ButtonWithText
            anyfunction={oncloseretroceder}
            title={"Retroceder"}
            color={theme.colors.red}
          ></ButtonWithText>
          <ButtonWithText
            anyfunction={onClickConfirmarCierre}
            title={"Aceptar"}
            color={theme.colors.lightblue1}
          ></ButtonWithText>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  accionWarningVentana: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  metodoPagoBarraSup: {
    backgroundColor: "blue", // Color de fondo de la barra superior
    height: 20,
  },
  accionWarningVentanaTextoBox: {
    alignItems: "center",
  },
  iconWarning: {
    fontSize: 30, // Tamaño del icono de advertencia
    color: "red", // Color del icono de advertencia
  },
  paragraph: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
  },
  metodoPagoBtnBox: {
    marginTop: 20,
  },
};
