import React, { useState } from "react";
import { Modal, View, Text, Alert } from "react-native";
import { ButtonWithText } from "./ButtonWithText";
import { apiUrl } from "../../../apiUrl";
import theme from "../../theme";
import { useData } from "../../hooks/OfertasDataProvider";
import StyledText from "../../styles/StyledText";
export const CancelarOferta = ({
  isvisible,
  onclosecerraroferta,
  oncloseoferta,
  IdOferta,
}) => {
  const { getOfertasProv } = useData();
  const [disabled, setDisabled] = useState(false);

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
          [
            {
              text: "Aceptar",
              onPress: () => {
                setDisabled(false);
                onclosecerraroferta();
              },
            },
          ],
          { cancelable: false }
        );
      })
      .catch(() => {
        Alert.alert(
          "¡Error!",
          "¡Hubo un error al intentar cancelar la oferta!", // Puedes poner un mensaje aquí si lo necesitas
          [
            {
              text: "Aceptar",
              onPress: () => {
                setDisabled(false);
                onclosecerraroferta();
              },
            },
          ],
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
          Cancelar Oferta
        </Text>
        <Text style={{ color: "black", margin: 5 }}>
          ¿Está seguro de{" "}
          <StyledText color="primary" fontWeight={"bold"}>
            cancelar su oferta
          </StyledText>
          ?, los pagos serán devueltos a los compradores y podría existir una
          tarifa de cobro adicional. Si esta seguro de cancelar la oferta pulse{" "}
          <StyledText color="primary" fontWeight={"bold"}>
            Aceptar
          </StyledText>
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
            anyfunction={oncloseoferta}
            title={"Retroceder"}
            color={theme.colors.red}
          ></ButtonWithText>
          <ButtonWithText
            anyfunction={() => {
              setDisabled(true);
              ActualizarOferta();
            }}
            title={"Aceptar"}
            color={disabled ? "gray" : theme.colors.lightblue1}
            disabled={disabled}
          ></ButtonWithText>
        </View>
      </View>
    </Modal>
  );
};
