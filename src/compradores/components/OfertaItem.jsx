import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import theme from "../../theme";
import ProgressBar from "react-native-progress/Bar";
import StyledText from "../../styles/StyledText";
import { apiUrl } from "../../../apiUrl";
import { useState, useEffect, useContext } from "react";
import { dateOptions } from "../../components/dateOptions";
import { EtiquetaEstadoOferta } from "../../components/EtiquetaEstadoOferta";
import { useNavigate } from "react-router-native";
//import { DetalleProducto } from "./DetalleProducto";
import React from "react";

const OfertaItem = (props) => {
  const navigate = useNavigate();
  const [isvisible, setisvisible] = useState(false);
  const [producto, setProducto] = useState();
  const [proveedor, setProveedor] = useState();
  const [estadoOferta, setEstadoOferta] = useState();
  const [nombreProveedor, setNombreProveedor] = useState();
  const [datosProd, setDatosProd] = useState({});
  const [progresoOferta, setProgresoOferta] = useState(0);
  const fechaLimiteObj = new Date(props.FechaLimite);

  let maximo;
  let actualProductos;

  const updateProgresoOferta = () => {
    maximo = parseInt(props.Maximo);
    actualProductos = parseInt(props.ActualProductos);
    setProgresoOferta(actualProductos / maximo);
  };

  const getProductoOferta = async () => {
    const resp = await globalThis.fetch(
      `${apiUrl}/productos?id=${props.IdProducto}`
    );
    const data = await resp.json();
    const { rows: producto } = !!data && data;
    setProducto(producto[0]);
  };
  const getProveedorOferta = async () => {
    const resp = await globalThis.fetch(
      `${apiUrl}/usuarios?idUsuario=${props.IdProveedor}`
    );
    const data = await resp.json();
    const { rows: proveedor } = !!data && data;
    setProveedor(proveedor[0]);
  };
  const getEstadoOferta = async () => {
    const resp = await globalThis.fetch(
      `${apiUrl}/estados?id=${props.IdEstadosOferta}`
    );
    const data = await resp.json();
    const { rows: estado } = !!data && data;
    setEstadoOferta(estado[0]);
  };
  useEffect(() => {
    getProductoOferta();
    getProveedorOferta();
    getEstadoOferta();
    updateProgresoOferta();
  }, [props]);

  useEffect(() => {
    setNombreProveedor(proveedor?.Nombre);
  }, [proveedor]);

  useEffect(() => {
    setDatosProd({
      nombreProd: producto?.Name,
      costoU: props.ValorUProducto,
      costoInst: props.ValorUInstantaneo,
      urlImg: producto?.UrlImg,
    });
  }, [producto, props]);

  return (
    <View style={styles.ofertaContainer}>
      <View style={styles.textoImagenContainer}>
        <StyledText fontWeight="bold" fontSize="subheading" color="purple">
          {datosProd?.nombreProd}
        </StyledText>
        <Image
          source={{
            uri: datosProd?.urlImg,
          }}
          style={styles.imageContainer}
        />
        <StyledText color="purple">{nombreProveedor}</StyledText>
      </View>

      <View style={styles.enOfertaContainer}>
        <StyledText color="purple" fontWeight="bold">
          En oferta:{" "}
        </StyledText>
        <StyledText color="purple">
          {parseInt(props.Maximo) - parseInt(props.ActualProductos)}/
        </StyledText>
        <StyledText color="purple">{props.Maximo}</StyledText>
      </View>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <ProgressBar
            progress={progresoOferta}
            width={200}
            height={25}
            color={theme.colors.blue}
            unfilledColor={theme.colors.gray2}
          />
        </View>
      </View>

      <View style={styles.provEstadoContainer}>
        <View style={styles.precioUContainer}>
          <StyledText color="purple" fontWeight="bold">
            Precio unitario:{" "}
          </StyledText>
          <StyledText color="purple">{datosProd?.costoU}$</StyledText>
        </View>
        {estadoOferta?.Descripcion === "Cerrado" ? (
          <EtiquetaEstadoOferta estado={"Verificando pagos"} />
        ) : (
          <EtiquetaEstadoOferta estado={estadoOferta?.Descripcion} />
        )}
      </View>
      <View style={styles.provDetalleContainer}>
        <View style={styles.precioInstContainer}>
          <StyledText color="purple" fontWeight="bold">
            Precio instantáneo:{" "}
          </StyledText>
          <StyledText color="purple">
            {datosProd?.costoInst === 0 ? "--" : datosProd?.costoInst + "$"}
          </StyledText>
        </View>
        <TouchableOpacity
          style={styles.detalleContainer}
          onPress={() => setisvisible(true)}
        >
          <StyledText color="secondary">Detalle</StyledText>
        </TouchableOpacity>
      </View>
      <View style={styles.vigenciaContainer}>
        <StyledText color="purple" fontWeight="bold">
          Fecha vigencia:{" "}
        </StyledText>
        <StyledText color="purple">
          {fechaLimiteObj.toLocaleString(undefined, dateOptions)}
        </StyledText>
      </View>
      {/* <DetalleProducto
        isvisible={isvisible}
        onclose={() => setisvisible(false)}
        dataproducto={{
          producto,
          proveedor,
          estadoOferta,
          nombreProveedor,
          datosProd,
          progresoOferta,
          fechaLimiteObj,
          maximo,
          actualProductos,
        }}
      ></DetalleProducto> */}
    </View>
  );
};
const styles = StyleSheet.create({
  ofertaContainer: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: theme.colors.lightGray2,
    marginBottom: 10,
    padding: 10,
  },
  textoImagenContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: 210,
    height: 210,
    resizeMode: "center",
  },
  provEstadoContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  provDetalleContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 7,
  },
  enOfertaContainer: {
    alignItems: "flex-start",
    flexDirection: "row",
    marginTop: 5,
  },
  precioUContainer: {
    flexDirection: "row",
  },
  precioInstContainer: {
    flexDirection: "row",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 5,
  },
  progressBar: {
    marginRight: 2,
  },
  vigenciaContainer: {
    alignItems: "flex-start",
    flexDirection: "row",
    marginTop: 12,
  },
  detalleContainer: {
    backgroundColor: theme.colors.blue,
    padding: 5,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
});
export default OfertaItem;
