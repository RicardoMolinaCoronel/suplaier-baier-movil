import React, { useEffect, useState } from "react";
import { View, Image, Modal, Text } from "react-native";
import { StarsQualification } from "../../proveedores/components/StarsQualification";
import { ProgressBar } from "../../proveedores/components/ProgressBar";
import { ButtonWithText } from "../../proveedores/components/ButtonWithText";
import { StyleSheet, ScrollView } from "react-native";
import StyledText from "../../styles/StyledText";
import theme from "../../theme";
import { dateOptions } from "../../components/dateOptions";
import { UnirseOfertaModal } from "./UnirseOfertaModal";
import { UnirseOfertaAhoraModal } from "./UnirseOfertaAhoraModal";

export const DetalleProductoC = ({ isvisible, onclose, dataproducto }) => {
  const [isvisibleUnirseOfertaAhoraModal, setisvisibleUnirseOfertaAhoraModal] =
    useState(false);
  const [isvisibleUnirseoferta, setisvisibleUnirseoferta] = useState(false);
  const fechaLimiteObj = new Date(dataproducto?.fechaLimiteObj ?? "");

  const validarValoracion = (valor) => {
    const valorEntero = Math.floor(valor);
    return Math.min(Math.max(valorEntero, 1), 5);
  };

  let calificacion = validarValoracion(dataproducto?.producto?.Valoracion ?? 1);

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
              {dataproducto?.datosProd?.nombreProd ?? ""}
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
              source={
                dataproducto?.datosProd?.urlImg != null &&
                dataproducto?.datosProd?.urlImg != "no-img.jpeg"
                  ? {
                      uri: dataproducto?.datosProd?.urlImg ?? "",
                    }
                  : require("../../../public/no-img.jpeg")
              }
              style={styles.imageContainer}
            />
            <View style={styles.starsContainer}>
              <StarsQualification
                calificacion={calificacion}
              ></StarsQualification>
              <StyledText color={"primary"}>
                {dataproducto?.producto?.Descripcion ?? ""}
              </StyledText>
            </View>
          </View>

          <View style={styles.secondContainer}>
            <View style={styles.secondFirstContainer}>
              <StyledText color={"purple"} fontWeight={"bold"}>
                Proveedor:
              </StyledText>
              <StyledText color={"primary"}>
                {dataproducto?.nombreProveedor ?? ""}
              </StyledText>
            </View>
            <View style={styles.secondsecondContainer}>
              <StyledText color={"purple"} fontWeight={"bold"}>
                Precio Unitario:
              </StyledText>
              <StyledText color={"primary"}>
                ${dataproducto?.datosProd?.costoU ?? 0}
              </StyledText>
            </View>
          </View>
          <View style={styles.precioInstContainerSub}>
            <StyledText color={"purple"} fontWeight={"bold"}>
              Precio de compra instantanea:{" "}
            </StyledText>
            <StyledText color={"primary"}>
              {dataproducto?.datosProd?.costoInst === 0
                ? "--"
                : "$" + dataproducto?.datosProd?.costoInst}
            </StyledText>
          </View>

          <View style={styles.unidadesFechaContainer}>
            <View style={styles.unidadesContainer}>
              <StyledText color={"purple"} fontWeight={"bold"}>
                Unidades restantes:{" "}
              </StyledText>
              <StyledText color={"primary"}>
                {parseInt(dataproducto?.Maximo) -
                  parseInt(dataproducto?.actualProductos)}
                /{dataproducto?.Maximo}
              </StyledText>
            </View>
            <View style={styles.fechaCierreContainer}>
              <StyledText color={"purple"} fontWeight={"bold"}>
                Fecha cierre:{" "}
              </StyledText>
              <StyledText color={"primary"}>
                {fechaLimiteObj.toLocaleString(undefined, dateOptions)}
              </StyledText>
            </View>
          </View>
          <View style={styles.descripcionContainer}>
            <View style={styles.descripcionSubContainer}>
              <StyledText color={"primary"}>
                {dataproducto?.props.Descripcion}
              </StyledText>
            </View>
          </View>
          <View style={styles.restantesContainer}>
            <View style={styles.restantesSubContainer}>
              <StyledText color={"lightblue"} fontWeight={"bold"}>
                Unidades Restantes para Completar el Minimo:{" "}
                {dataproducto?.Minimo - dataproducto?.actualProductos}
              </StyledText>
            </View>
          </View>
          <View style={styles.progesoContainer}>
            <View style={styles.progresoSubContainer}>
              <StyledText color={"primary"}>
                Progreso de Unidades Vendidas
              </StyledText>
              <ProgressBar
                porcentaje={dataproducto?.progresoOferta * 100}
              ></ProgressBar>
            </View>
          </View>

          {!dataproducto?.estaUnido && (
            <>
              <View style={styles.botonesContainer}>
                <ButtonWithText
                  anyfunction={() => setisvisibleUnirseoferta(true)}
                  title={"Unirse"}
                  color="#3498DB"
                />
                {dataproducto?.datosProd?.costoInst != 0 && (
                  <ButtonWithText
                    anyfunction={() => setisvisibleUnirseOfertaAhoraModal(true)}
                    //anyfunction={() => undefined}
                    title={"Pagar Ahora"}
                    color={theme.colors.red}
                  />
                )}
              </View>
              {/* modales */}
              <UnirseOfertaModal
                dataproducto={dataproducto}
                isvisibleUnirseOfertaModal={isvisibleUnirseoferta}
                oncloseUnirseOferta={() => setisvisibleUnirseoferta(false)}
                onclopagado={() => {
                  setisvisibleUnirseoferta(false), onclose();
                }}
              ></UnirseOfertaModal>
              <UnirseOfertaAhoraModal
                dataproducto={dataproducto}
                isvisibleUnirseOfertaAhoraModal={
                  isvisibleUnirseOfertaAhoraModal
                }
                oncloseUnirseOfertaAhora={() =>
                  setisvisibleUnirseOfertaAhoraModal(false)
                }
                oncloseexito={() => {
                  setisvisibleUnirseOfertaAhoraModal(false);
                  onclose();
                }}
              ></UnirseOfertaAhoraModal>
            </>
          )}
          {dataproducto?.estaUnido && (
            <View>
              <View style={styles.borderLine}></View>
              <Text style={{ color: theme.colors.purple, fontWeight: "bold" }}>
                Tu orden de compra
              </Text>

              <View
                style={{
                  borderColor: theme.colors.lightGray3,
                  borderWidth: 1,
                  width: "100%",
                  padding: 10,
                  borderRadius: 8,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{ color: theme.colors.purple, fontWeight: "bold" }}
                  >
                    Fecha:
                    <Text style={{ color: theme.colors.purple }}>
                      {fechaLimiteObj.toLocaleString(undefined, dateOptions)}
                    </Text>
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{ color: theme.colors.purple, fontWeight: "bold" }}
                  >
                    Unidades adquiridas:
                    <Text style={{ color: theme.colors.purple }}> 2</Text>
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{ color: theme.colors.purple, fontWeight: "bold" }}
                  >
                    Total pagado:
                    <Text style={{ color: theme.colors.purple }}>
                      {" "}
                      $ {dataproducto?.datosProd?.costoU * 2}
                    </Text>
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{ color: theme.colors.purple, fontWeight: "bold" }}
                  >
                    Estado:
                    <Text style={{ color: "green" }}>
                      {" "}
                      {dataproducto?.estadoOferta?.Descripcion ?? ""}{" "}
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          )}
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
    marginTop: 10,
  },
});
