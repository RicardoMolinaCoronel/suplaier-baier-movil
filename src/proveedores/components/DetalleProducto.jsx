import React, { useEffect, useState } from "react";
import { View, Text, Image, Modal } from "react-native";
import { StarsQualification } from "./StarsQualification";
import { ProgressBar } from "./ProgressBar";
import { ButtonWithText } from "./ButtonWithText";
import { HistorialModal } from "./HistorialModal";
import { CancelarOferta } from "./CancelarOferta";

export const DetalleProducto = ({ isvisible, onclose, dataproducto }) => {
  const [isvisiblemodal, setisvisiblemodal] = useState(false);
  const [isvisiblecerraroferta, setisvisiblecerraroferta] = useState(false);

  const validarValoracion = (valor) => {
    const valorEntero = Math.floor(valor);
    return Math.min(Math.max(valorEntero, 1), 5);
  };

  let calificacion = validarValoracion(dataproducto?.producto?.Valoracion ?? 1);
  let porcentaje =
    ((dataproducto?.actualProductos ?? 0) / (dataproducto?.maximo ?? 1)) * 100;
  useEffect(() => {
    console.log("Detalle Producto", dataproducto);
  }, []);

  return (
    <>
      <Modal visible={isvisible} transparent={true} animationType="slide">
        <View
          style={{
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
          }}
        >
          <Text style={{ fontWeight: "bold", color: "black", margin: 5 }}>
            {dataproducto?.datosProd?.nombreProd ?? ""}
          </Text>
          <View
            style={{
              height: 95,
              borderWidth: 1,
              borderColor: "black",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={{
                uri: dataproducto?.datosProd?.urlImg ?? "",
              }}
              style={{ width: 180, height: 180, resizeMode: "center" }}
            />
            <View style={{ alignItems: "center" }}>
              <StarsQualification
                calificacion={calificacion}
              ></StarsQualification>
              <Text style={{ color: "black" }}>
                {dataproducto?.datosProd?.nombreProd ?? ""}
              </Text>
            </View>
          </View>
          <View style={{ marginVertical: 10, flexDirection: "row" }}>
            <View
              style={{
                width: "55%",
                padding: 5,
                borderWidth: 1,
                borderColor: "black",
              }}
            >
              <Text style={{ color: "black" }}>
                Proveedor: {dataproducto?.nombreProveedor ?? ""}
              </Text>
            </View>
            <View
              style={{
                width: "45%",
                padding: 5,
                borderWidth: 1,
                borderColor: "black",
              }}
            >
              <Text style={{ color: "black" }}>
                Precio Unitario: ${dataproducto?.datosProd?.costoU ?? 0}
              </Text>
            </View>
          </View>
          <View style={{ marginVertical: 10, flexDirection: "row" }}>
            <View
              style={{
                width: "100%",
                padding: 5,
                borderWidth: 1,
                borderColor: "black",
              }}
            >
              <Text style={{ color: "black" }}>
                precio de compra instantanea: $
                {dataproducto?.datosProd?.costoInst ?? 0}
              </Text>
            </View>
          </View>
          <View style={{ marginVertical: 10, flexDirection: "row" }}>
            <View
              style={{
                width: "48%",
                padding: 5,
                borderWidth: 1,
                borderColor: "black",
              }}
            >
              <Text style={{ color: "black" }}>
                {" "}
                unidades restantes: {dataproducto?.ActualProductos ?? 0}/
                {dataproducto?.maximo ?? 0}
              </Text>
            </View>
            <View
              style={{
                width: "52%",
                padding: 5,
                borderWidth: 1,
                borderColor: "black",
              }}
            >
              <Text style={{ color: "black" }}>
                Fecha cierre: {dataproducto?.fechaLimiteObj?.toString() ?? ""}
              </Text>
            </View>
          </View>
          <View style={{ marginVertical: 10, flexDirection: "row" }}>
            <View
              style={{
                width: "100%",
                padding: 5,
                borderWidth: 1,
                borderColor: "black",
              }}
            >
              <Text style={{ color: "black" }}>Oferta Especial</Text>
            </View>
          </View>
          <View style={{ marginVertical: 10, flexDirection: "row" }}>
            <View
              style={{
                width: "100%",
                padding: 5,
                borderWidth: 1,
                alignItems: "center",
                borderColor: "black",
              }}
            >
              <Text style={{ color: "black" }}>
                Progreso de Unidades Vendidas
              </Text>
              <ProgressBar porcentaje={porcentaje}></ProgressBar>
            </View>
          </View>
          <View
            style={{
              marginVertical: 10,
            }}
          >
            <View
              style={{
                width: "100%",
                padding: 5,
                borderWidth: 1,
                borderColor: "black",
              }}
            >
              <Text style={{ color: "cyan" }}>
                Unidades Restantes para Completar el Minimo:
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <ButtonWithText
              anyfunction={undefined}
              title={"cerrar oferta"}
              color="grey"
            ></ButtonWithText>
            <ButtonWithText
              anyfunction={() => setisvisiblemodal(true)}
              //anyfunction={undefined}
              title={"ver historial"}
              color="cyan"
            ></ButtonWithText>
            <ButtonWithText
              anyfunction={() => setisvisiblecerraroferta(true)}
              //anyfunction={undefined}
              title={"cancelar oferta"}
            ></ButtonWithText>
          </View>
          <ButtonWithText
            anyfunction={onclose}
            title={"cerrar"}
          ></ButtonWithText>
          {/* modales */}
          <HistorialModal
            isvisiblemodal={isvisiblemodal}
            oncloseHistorial={() => setisvisiblemodal(false)}
          ></HistorialModal>
          <CancelarOferta
            isvisible={isvisiblecerraroferta}
            onclosecerraroferta={() => {
              setisvisiblecerraroferta(false);
              onclose();
            }}
            oncloseoferta={() => setisvisiblecerraroferta(false)}
            IdProducto={dataproducto?.producto?.IdProducto??1} //oferta={dataproducto.producto}
          ></CancelarOferta>
        </View>
      </Modal>
    </>
  );
};
