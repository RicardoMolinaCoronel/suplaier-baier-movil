/* eslint-disable no-unused-vars */
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import theme from "../../theme";
import ProgressBar from "react-native-progress/Bar";
import StyledText from "../../styles/StyledText";
import { apiUrl } from "../../../apiUrl";
import { useState, useEffect } from "react";
import { dateOptions } from "../../components/dateOptions";
import { EtiquetaEstadoOferta } from "../../components/EtiquetaEstadoOferta";
import { DetalleOrden } from "../../components/DetalleOrden";
import { SimpleLineIcons } from "@expo/vector-icons";
const OrdenItem = (props) => {
  const [oferta, setOferta] = useState();
  const [producto, setProducto] = useState();
  const [proveedor, setProveedor] = useState();
  const [comprador, setComprador] = useState();
  const [estadoOferta, setEstadoOferta] = useState();
  const [estadoCompra, setEstadoCompra] = useState();
  const [nombreProveedor, setNombreProveedor] = useState();
  const [datosProd, setDatosProd] = useState({});
  const [progresoOferta, setProgresoOferta] = useState(0);
  // const [fechaLimiteObj, setFechaLimiteObj] = useState("0");
  const [isvisible, setisvisible] = useState(false);

  const fechaLimiteObj = new Date(oferta?.FechaLimite ?? "0");
  let maximo;
  let actualProductos;
  const updateProgresoOferta = () => {
    maximo = parseInt(oferta.Maximo);
    actualProductos = parseInt(oferta.ActualProductos);
    setProgresoOferta(actualProductos / maximo);
  };
  const getOferta = async () => {
    const resp = await globalThis.fetch(
      `${apiUrl}/ofertas?id=${props.IdOferta}`
    );
    const data = await resp.json();
    const { rows: oferta } = !!data && data;
    setOferta(oferta[0]);
    getProductoOferta();
    updateProgresoOferta();
  };
  const getProductoOferta = async () => {
    const resp = await globalThis.fetch(
      `${apiUrl}/productos?id=${oferta?.IdProducto}`
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
      `${apiUrl}/estados?id=${oferta?.IdEstadosOferta ?? 1}`
    );
    const data = await resp.json();
    const { rows: estado } = !!data && data;
    setEstadoOferta(estado[0]);
  };
  const getEstadoCompra = async () => {
    const resp = await globalThis.fetch(
      `${apiUrl}/estados?id=${props.IdEstado ?? 1}`
    );
    const data = await resp.json();
    const { rows: estado } = !!data && data;
    setEstadoCompra(estado[0]);
  };
  useEffect(() => {
    getOferta();
    getProveedorOferta();
    // getEstadoCompra();
    getEstadoOferta();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  useEffect(() => {
    setNombreProveedor(proveedor?.Nombre);
  }, [proveedor]);

  useEffect(() => {
    setDatosProd({
      nombreProd: producto?.Name,
      costoU: oferta?.ValorUProducto,
      costoInst: oferta?.ValorUInstantaneo,
      urlImg: producto?.UrlImg,
    });
  }, [producto, oferta]);

  return (
    <View style={styles.ordenContainer}>
      <View style={styles.demandaIcon}>
        <SimpleLineIcons
          name={props.TipoCompra === "instantanea" ? "energy" : "handbag"}
          size={24}
          color={theme.colors.purple}
        />
      </View>
      <View style={styles.textoImagenContainer}>
        <StyledText
          style={styles.textTitulo}
          fontWeight="bold"
          fontSize="subtitle"
          color="purple"
        >
          {datosProd?.nombreProd}
        </StyledText>
        <Image
          source={
            datosProd?.urlImg != null && datosProd?.urlImg != "no-img.jpeg"
              ? {
                  uri: datosProd?.urlImg,
                }
              : require("../../../public/no-img.jpeg")
          }
          style={styles.imageContainer}
        />
      </View>
      <View style={styles.proveedorContainer}>
        <StyledText color="purple" fontWeight="bold">
          Proveedor:{" "}
        </StyledText>
        <StyledText color="purple">{proveedor?.Nombre}</StyledText>
      </View>
      <View style={styles.enOfertaContainer}>
        <StyledText color="purple" fontWeight="bold">
          En oferta:{" "}
        </StyledText>
        <StyledText color="purple">
          {parseInt(oferta?.Maximo) - parseInt(oferta?.ActualProductos)}/
        </StyledText>
        <StyledText color="purple">{oferta?.Maximo}</StyledText>
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
          <EtiquetaEstadoOferta estado="Verificando pagos" />
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
      {isvisible && (
        <DetalleOrden
          isvisible={isvisible}
          onclose={() => setisvisible(false)}
          dataorden={{
            oferta,
            producto,
            comprador,
            estadoOferta,
            datosProd,
            progresoOferta,
            proveedor,
            props,
          }}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  ordenContainer: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: theme.colors.lightGray2,
    marginBottom: 10,
    padding: 10,
  },
  demandaIcon: { width: "100%", alignItems: "flex-start" },

  textTitulo: {
    textAlign: "center",
  },
  textoImagenContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: 210,
    height: 210,
    resizeMode: "contain",
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
  proveedorContainer: {
    alignItems: "flex-start",
    flexDirection: "row",
  },
  enOfertaContainer: {
    alignItems: "flex-start",
    flexDirection: "row",
    marginTop: 10,
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
export default OrdenItem;
