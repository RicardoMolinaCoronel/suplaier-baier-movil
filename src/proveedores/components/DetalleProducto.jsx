import React, { useEffect, useState } from "react";
import { View, Text, Image, Modal } from "react-native";
import { StarsQualification } from "./StarsQualification";
import { ProgressBar } from "./ProgressBar";
import { ButtonWithText } from "./ButtonWithText";
import { HistorialModal } from "./HistorialModal";
import { CancelarOferta } from "./CancelarOferta";
import { StyleSheet, ScrollView } from "react-native";
import StyledText from "../../styles/StyledText";
import theme from "../../theme";
import { dateOptions } from "../../components/dateOptions";

export const DetalleProducto = ({ isvisible, onclose, dataproducto }) => {
  const [isvisiblemodal, setisvisiblemodal] = useState(false);
  const [isvisiblecerraroferta, setisvisiblecerraroferta] = useState(false);
  const fechaLimiteObj = new Date(dataproducto?.fechaLimiteObj ?? "");

  const validarValoracion = (valor) => {
    const valorEntero = Math.floor(valor);
    return Math.min(Math.max(valorEntero, 1), 5);
  };

  let calificacion = validarValoracion(dataproducto?.producto?.Valoracion ?? 1);
  let porcentaje =
    ((dataproducto?.actualProductos ?? 0) / (dataproducto?.maximo ?? 1)) * 100;
  useEffect(() => {
    console.log("Detalle Producto", dataproducto?.estadoOferta);
  }, []);

  return (
    <Modal visible={isvisible} transparent={true} animationType="slide">
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.tituloContainer}>
            <StyledText
              fontWeight={"bold"}
              color={"primary"}
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
              source={{
                uri: dataproducto?.datosProd?.urlImg ?? "",
              }}
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
              <StyledText color={"primary"} fontWeight={"bold"}>
                Proveedor:
              </StyledText>
              <StyledText color={"primary"}>
                {dataproducto?.nombreProveedor ?? ""}
              </StyledText>
            </View>
            <View style={styles.secondsecondContainer}>
              <StyledText color={"primary"} fontWeight={"bold"}>
                Precio Unitario:
              </StyledText>
              <StyledText color={"primary"}>
                {" "}
                ${dataproducto?.datosProd?.costoU ?? 0}
              </StyledText>
            </View>
          </View>

          <View style={styles.precioInstContainerSub}>
            <StyledText color={"primary"} fontWeight={"bold"}>
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
              <StyledText color={"primary"} fontWeight={"bold"}>
                Unidades restantes:{" "}
              </StyledText>
              <StyledText color={"primary"}>
                {dataproducto?.actualProductosOferta}/
                {dataproducto?.maximoOferta}
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
          </View>
          <View style={styles.ofertaEspecialContainer}>
            <View style={styles.ofertaEspecialSubContainer}>
              <StyledText color={"primary"}>Oferta Especial</StyledText>
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
          <View style={styles.restantesContainer}>
            <View style={styles.restantesSubContainer}>
              <StyledText color={"lightblue"} fontWeight={"bold"}>
                Unidades Restantes para Completar el Minimo:{" "}
                {dataproducto?.minimoOferta -
                  dataproducto?.actualProductosOferta}
              </StyledText>
            </View>
          </View>
          {dataproducto?.estadoOferta?.Descripcion === "En curso" && (
            <>
              <View style={styles.botonesContainer}>
                <ButtonWithText
                  anyfunction={undefined}
                  title={"Cerrar oferta"}
                  color="grey"
                />
                {/* <ButtonWithText
              anyfunction={() => setisvisiblemodal(true)}
              //anyfunction={undefined}
              title={"Ver historial"}
              color="grey"
            ></ButtonWithText> */}
                <ButtonWithText
                  anyfunction={() => setisvisiblecerraroferta(true)}
                  //anyfunction={undefined}
                  title={"Cancelar oferta"}
                  color={theme.colors.red}
                />
              </View>
              {/* modales */}
              {/* <HistorialModal
            isvisiblemodal={isvisiblemodal}
            oncloseHistorial={() => setisvisiblemodal(false)}
          ></HistorialModal> */}
              <CancelarOferta
                isvisible={isvisiblecerraroferta}
                onclosecerraroferta={() => {
                  setisvisiblecerraroferta(false);
                  onclose();
                }}
                oncloseoferta={() => setisvisiblecerraroferta(false)}
                IdOferta={dataproducto?.IdOferta} //oferta={dataproducto.producto}
              ></CancelarOferta>
            </>
          )}
          {dataproducto?.estadoOferta?.Descripcion !== "En curso" && (
            <View style={styles.borderLine} />
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
  ofertaEspecialContainer: { marginVertical: 10, flexDirection: "row" },
  ofertaEspecialSubContainer: {
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
