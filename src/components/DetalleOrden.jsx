import React, { useEffect, useState, useContext } from "react";
import { View, Text, Image, Modal } from "react-native";
import { StarsQualification } from "../proveedores/components/StarsQualification";
import { ButtonWithText } from "../proveedores/components/ButtonWithText";
import { AuthContext } from "../auth/context/AuthContext";
import { StyleSheet, ScrollView } from "react-native";
import StyledText from "../styles/StyledText";
import theme from "../theme";
import { dateOptions } from "./dateOptions";
export const DetalleOrden = ({ isvisible, onclose, dataorden }) => {
  const [isvisiblemodal, setisvisiblemodal] = useState(false);
  const [isvisiblecerraroferta, setisvisiblecerraroferta] = useState(false);
  const { authState } = useContext(AuthContext);
  const fechaLimiteObj = new Date(dataorden?.props.Fecha ?? "");

  const validarValoracion = (valor) => {
    const valorEntero = Math.floor(valor);
    return Math.min(Math.max(valorEntero, 1), 5);
  };

  let calificacion = validarValoracion(dataorden?.producto?.Valoracion ?? 1);
  let porcentaje =
    ((dataorden?.oferta?.ActualProductos ?? 0) / (dataorden?.maximo ?? 1)) *
    100;
  useEffect(() => {
    //console.log("Detalle Producto", dataorden?.estadoOferta);
  }, []);

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
              {dataorden?.datosProd?.nombreProd ?? ""}
            </StyledText>
            <ButtonWithText
              anyfunction={onclose}
              title={""}
              icon={"close-sharp"}
              color={theme.colors.red2}
            />
          </View>

          <View style={styles.firstContainer}>
            <Image
              source={{
                uri: dataorden?.datosProd?.urlImg ?? "",
              }}
              style={styles.imageContainer}
            />
            <View style={styles.starsContainer}>
              <StarsQualification
                calificacion={calificacion}
              ></StarsQualification>
              <StyledText color={"primary"}>
                {dataorden?.producto?.Descripcion ?? ""}
              </StyledText>
            </View>
          </View>

          <View style={styles.secondContainer}>
            {authState?.user?.Rol === "proveedor" ? (
              <View style={styles.secondFirstContainer}>
                <StyledText color={"purple"} fontWeight={"bold"}>
                  Comprador:
                </StyledText>
                <StyledText color={"primary"}>
                  {dataorden?.comprador?.Nombre ?? ""}
                </StyledText>
              </View>
            ) : (
              <View style={styles.secondFirstContainer}>
                <StyledText color={"purple"} fontWeight={"bold"}>
                  Proveedor:
                </StyledText>
                <StyledText color={"primary"}>
                  {dataorden?.proveedor?.Nombre ?? ""}
                </StyledText>
              </View>
            )}

            <View style={styles.secondsecondContainer}>
              <StyledText color={"purple"} fontWeight={"bold"}>
                Precio Unitario:
              </StyledText>
              <StyledText color={"primary"}>
                {" "}
                ${dataorden?.datosProd?.costoU ?? 0}
              </StyledText>
            </View>
          </View>

          <View style={styles.precioInstContainerSub}>
            <StyledText color={"purple"} fontWeight={"bold"}>
              Precio de compra instantanea:{" "}
            </StyledText>
            <StyledText color={"primary"}>
              {dataorden?.datosProd?.costoInst === 0
                ? "--"
                : "$" + dataorden?.datosProd?.costoInst}
            </StyledText>
          </View>
          <View style={styles.restantesContainer}>
            <View style={styles.restantesSubContainer}>
              <StyledText color={"purple"} fontWeight={"bold"}>
                Tipo de compra:{" "}
              </StyledText>
              {dataorden?.props.TipoCompra === "instantanea" && (
                <StyledText>Instantánea</StyledText>
              )}
              {dataorden?.props.TipoCompra === "normal" && (
                <StyledText>Normal</StyledText>
              )}
            </View>
          </View>
          <View style={styles.secondContainer}>
            <View style={styles.secondFirstContainer}>
              <StyledText color={"purple"} fontWeight={"bold"}>
                Unidades adquiridas:
              </StyledText>
              <StyledText color={"primary"}>
                {dataorden?.props.Cantidad ?? ""}
              </StyledText>
            </View>
            <View style={styles.secondsecondContainer}>
              <StyledText color={"purple"} fontWeight={"bold"}>
                Total:
              </StyledText>
              <StyledText color={"primary"}>
                ${dataorden?.props.Total}
              </StyledText>
            </View>
          </View>
          <View style={styles.descripcionContainer}>
            <View style={styles.descripcionSubContainer}>
              <StyledText color={"primary"}>
                {dataorden?.oferta?.Descripcion}
              </StyledText>
            </View>
          </View>
          <View style={styles.restantesContainer}>
            <View style={styles.restantesSubContainer}>
              <StyledText color={"primary"}>
                Fecha de compra:{" "}
                {fechaLimiteObj.toLocaleString(undefined, dateOptions)}
              </StyledText>
            </View>
          </View>
          <View style={styles.borderLine} />
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
    marginTop: 5,
  },
});
