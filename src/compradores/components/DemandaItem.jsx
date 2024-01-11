import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { AuthContext } from "../../auth/context/AuthContext";
import theme from "../../theme";
import ProgressBar from "react-native-progress/Bar";
import StyledText from "../../styles/StyledText";
import { apiUrl } from "../../../apiUrl";
import { useState, useEffect, useContext } from "react";
import { dateOptions } from "../../components/dateOptions";
import { EtiquetaEstadoOferta } from "../../components/EtiquetaEstadoOferta";
import { useNavigate } from "react-router-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import PropuestasList from "./PropuestasList";
import React from "react";

const DemandaItem = (props) => {
  const navigate = useNavigate();
  const [isvisible, setisvisible] = useState(false);
  const [producto, setProducto] = useState();
  const [comprador, setComprador] = useState();
  const [estadoDemanda, setEstadoDemanda] = useState();
  const [nombreComprador, setNombreComprador] = useState();
  const [datosProd, setDatosProd] = useState({});
  const [progresoDemanda, setProgresoDemanda] = useState(0);
  const [estaUnido, setEstaUnido] = useState(false);
  const fechaLimiteObj = new Date(props.FechaLimite);
  const { authState } = useContext(AuthContext);

  let maximo;
  let actualProductos;

  const updateProgresoDemanda = () => {
    maximo = parseInt(props.Maximo);
    actualProductos = parseInt(props.ActualProductos);
    setProgresoDemanda(actualProductos / maximo);
  };

  const getProductoDemanda = async () => {
    const resp = await globalThis.fetch(
      `${apiUrl}/productos?id=${props.IdProducto}`
    );
    const data = await resp.json();
    const { rows: producto } = !!data && data;
    setProducto(producto[0]);
  };
  const getCompradorDemanda = async () => {
    const resp = await globalThis.fetch(
      `${apiUrl}/usuarios?idUsuario=${props.IdComprador}`
    );
    const data = await resp.json();
    const { rows: comprador } = !!data && data;
    setComprador(comprador[0]);
  };
  const getEstadoDemanda = async () => {
    const resp = await globalThis.fetch(
      `${apiUrl}/estados?id=${props.IdEstadosOferta}`
    );
    const data = await resp.json();
    const { rows: estado } = !!data && data;
    setEstadoDemanda(estado[0]);
  };
  useEffect(() => {
    getProductoDemanda();
    getCompradorDemanda();
    getEstadoDemanda();
    updateProgresoDemanda();
    //checkEstaUnidoDemanda();
  }, [props]);

  useEffect(() => {
    setNombreComprador(comprador?.Nombre);
  }, [comprador]);

  useEffect(() => {
    setDatosProd({
      nombreProd: producto?.Name,
      precioMin: parseFloat(props.PrecioMinimo),
      precioMax: parseFloat(props.PrecioMaximo),
      urlImg: producto?.UrlImg,
    });
  }, [producto, props]);

  return (
    <View style={styles.ofertaContainer}>
      <View style={styles.demandaIcon}>
        <SimpleLineIcons name="basket" size={24} color={theme.colors.purple} />
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
        <StyledText color="purple">{nombreComprador}</StyledText>
      </View>

      <View style={styles.enOfertaContainer}>
        <View style={styles.textoEnOfertaContainer}>
          <StyledText color="purple" fontWeight="bold">
            En demanda:{" "}
          </StyledText>
          <StyledText color="purple">
            {parseInt(props.Maximo) - parseInt(props.ActualProductos)}/
          </StyledText>
          <StyledText color="purple">{props.Maximo}</StyledText>
        </View>
      </View>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <ProgressBar
            progress={progresoDemanda}
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
            Precio mínimo:{" "}
          </StyledText>
          <StyledText color="purple">{datosProd?.precioMin}$</StyledText>
        </View>
        {estadoDemanda?.Descripcion === "Cerrado" ? (
          <EtiquetaEstadoOferta estado={"Verificando pagos"} />
        ) : (
          <EtiquetaEstadoOferta estado={estadoDemanda?.Descripcion} />
        )}
      </View>
      <View style={styles.provDetalleContainer}>
        <View style={styles.precioInstContainer}>
          <StyledText color="purple" fontWeight="bold">
            Precio máximo:{" "}
          </StyledText>
          <StyledText color="purple">{datosProd?.precioMax}$</StyledText>
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
      {/* {isvisible && (
        <PropuestasList
          isvisible={isvisible}
          onclose={() => setisvisible(false)}
          IdDemanda={props.IdDemanda}
          ActualProductos={props.ActualProductos}
        ></PropuestasList>
      )} */}
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
  demandaIcon: { width: "100%", alignItems: "flex-start" },
  textTitulo: {
    textAlign: "center",
  },
  textoImagenContainer: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
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
  enOfertaContainer: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  textoEnOfertaContainer: {
    alignItems: "flex-start",
    flexDirection: "row",
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
export default DemandaItem;
