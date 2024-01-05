import React, { useState } from "react";
import { Modal, View, Text, Alert } from "react-native";
import { ButtonWithText } from "./ButtonWithText";
import { apiUrl } from "../../../apiUrl";
import theme from "../../theme";
import { useData } from "../../hooks/OfertasDataProvider";

export const CancelarOferta = ({
  isvisible,
  onclosecerraroferta,
  oncloseoferta,
  IdOferta,
}) => {
  const { getOfertasProv } = useData();

  const actualizarOferta = async () => {
    const bodySolicitud = {
      IdOferta: IdOferta,
      IdEstadosOferta: 7, //Id Estado DB
    };
    const resp = await fetch(`${apiUrl}/ofertas/estadoOferta`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodySolicitud),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("La solicitud no fue exitosa");
        }
        getOfertasProv();
        Alert.alert(
          "¡Éxito!",
          "¡Oferta cancelada con éxito!", // Puedes poner un mensaje aquí si lo necesitas
          [{ text: "Aceptar", onPress: () => onclosecerraroferta() }],
          { cancelable: false }
        );
      })
      .catch(() => {
        Alert.alert(
          "¡Error!",
          "¡Hubo un error al intentar cancelar la oferta!", // Puedes poner un mensaje aquí si lo necesitas
          [{ text: "Aceptar", onPress: () => onclosecerraroferta() }],
          { cancelable: false }
        );
      });
    // const dataSolicitud = await resp.json();
    // console.log(!!dataSolicitud && "Cancelando Oferta");
  };

  const ActualizarOferta = () => {
    actualizarOferta();
  };

  return (
    <Modal visible={isvisible} transparent={true} animationType="slide">
      <View
        style={{
          alignItems: "center",
          backgroundColor: "#ffffff",
          height: 500,
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
          Cancelar Oferta
        </Text>
        <Text style={{ color: "black", margin: 5 }}>
          ¿Está seguro de cancelar oferta?, los pagos serán devueltos a los
          compradores y pdoría existir una tarifa de cobro adicional
        </Text>

        <View
          style={{
            flexDirection: "row",
            width: "80%",
            marginHorizontal: 10,
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          <ButtonWithText
            anyfunction={oncloseoferta}
            title={"Retroceder"}
            color={theme.colors.red}
          ></ButtonWithText>
          <ButtonWithText
            anyfunction={() => ActualizarOferta()}
            title={"Aceptar"}
            color={theme.colors.lightblue1}
          ></ButtonWithText>
        </View>
      </View>
    </Modal>
  );
};
