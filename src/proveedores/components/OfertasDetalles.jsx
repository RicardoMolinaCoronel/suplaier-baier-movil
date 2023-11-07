import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProgressBar from "react-native-progress/Bar";
import StyledText from "../../styles/StyledText";
import { apiUrl } from "../../../apiUrl";

const OfertasDetalles = () => {
  const route = useRoute();
  const { ofertaId: idOferta } = route.params;

  const [oferta, setOferta] = useState();
  const [producto, setProducto] = useState();
  const [estadoOferta, setEstadoOferta] = useState();
  const [proveedor, setProveedor] = useState();
  const [IlegalMinimo, setLlegaMinimo] = useState(false);
  const [showCerrarOferta, setShowCerrarOferta] = useState(false);
  const [showConfirmarCancelarOferta] = useState(false);
  const [showCierreExitoso] = useState(false);
  const [showCancelarExitoso] = useState(false);
  const [showHistorial] = useState(false);

  const getOferta = async () => {
    const resp = await fetch(`${apiUrl}/ofertas?id=${idOferta}`);
    const data = await resp.json();
    const { rows: oferta } = !!data && data;
    setOferta(oferta[0]);
  }

  const getProducto = async () => {
    const resp = await fetch(`${apiUrl}/productos?id=${oferta.IdProducto}`);
    const data = await resp.json();
    const { rows: producto } = !!data && data;
    setProducto(producto[0]);
  }

  const getEstadoOferta = async () => {
    const resp = await fetch(`${apiUrl}/estados?id=${oferta.IdEstadosOferta}`);
    const data = await resp.json();
    const { rows: estado } = !!data && data;
    setEstadoOferta(estado[0]);
  }

  const getProveedor = async () => {
    const resp = await fetch(`${apiUrl}/usuarios?idUsuario=${oferta.IdProveedor}`);
    const data = await resp.json();
    const { rows: proveedor } = !!data && data;
    setProveedor(proveedor[0]);
  }

  const calcularLlegaMinimo = () => {
    setLlegaMinimo(oferta?.ActualProductos >= oferta?.Minimo);
  };

  useEffect(() => {
    getOferta();
  }, [idOferta]);

  useEffect(() => {
    !!oferta && getProducto();
    !!oferta && getEstadoOferta();
    !!oferta && getProveedor();
    calcularLlegaMinimo();
  }, [oferta]);

  const handleClickCerrarOferta = () => {
    setShowCerrarOferta(true);
  };

  const handleClickCancelarOferta = () => {
    setShowConfirmarCancelarOferta(true);
  };

  const handleClickHistorial = () => {
    setShowHistorial(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>{producto?.Name}</Text>
      <TouchableOpacity onPress={handleClickCerrarOferta}>
        <View style={styles.cerrarOfertaContainer}>
          <Text>Cerrar oferta</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleClickHistorial}>
        <View style={styles.verHistorialContainer}>
          <Text>Ver Historial</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleClickCancelarOferta}>
        <View style={styles.cancelarOfertaContainer}>
          <Text>Cancelar oferta</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  texto: {
    alignItems: "center",
    justifyContent: "center",
  },
  cerrarOfertaContainer: {
    backgroundColor: "blue",
    padding: 10,
    margin: 10,
  },
  verHistorialContainer: {
    backgroundColor: "green",
    padding: 10,
    margin: 10,
  },
  cancelarOfertaContainer: {
    backgroundColor: "red",
    padding: 10,
    margin: 10,
  },
});

export default OfertasDetalles;





