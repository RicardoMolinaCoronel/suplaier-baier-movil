import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import theme from "../theme";
import { View } from "react-native";
import StyledText from "../styles/StyledText";
export const EtiquetaEstadoOferta = ({ estado, esOfertaDetalle = false }) => {
  const [estiloSegunEstado, setEstiloSegunEstado] = useState("containerGray");

  useEffect(() => {
    switch (estado) {
      case "En curso":
        setEstiloSegunEstado("containerGreen");
        break;
      case "Por confirmar cierre":
        setEstiloSegunEstado("containerRed");
        break;
      case "Verificando pagos":
        setEstiloSegunEstado("containerPurple");
        break;
      case "Por despachar":
        setEstiloSegunEstado("containerRed");
        break;
      case "Despachado":
        setEstiloSegunEstado("containerGreen");
        break;
      case "En revisión":
        setEstiloSegunEstado("containerLightBlue");
        break;
      case "Por devolver pago":
        setEstiloSegunEstado("containerRed");
        break;
      case "Pago devuelto":
        setEstiloSegunEstado("containerGreen");
        break;
      case "Finalizado":
        setEstiloSegunEstado("containerGray");
        break;
      case "Unido":
        setEstiloSegunEstado("containerBlue");
        break;
      default:
        setEstiloSegunEstado("containerGray");
        break;
    }
  }, [estado]);

  return (
    <View style={styles[estiloSegunEstado]}>
      <StyledText color="secondary">{estado}</StyledText>
    </View>
  );
};

const styles = StyleSheet.create({
  containerGreen: {
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: theme.colors.green,
  },
  containerRed: {
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: theme.colors.red1,
  },
  containerPurple: {
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: theme.colors.purple2,
  },
  containerLightBlue: {
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: theme.colors.lightblue2,
  },
  containerGray: {
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: theme.colors.gray3,
  },
  containerBlue: {
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: theme.colors.blue,
  },
});
