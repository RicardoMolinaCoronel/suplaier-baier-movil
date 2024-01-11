import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, Alert } from "react-native";
import StyledText from "../../styles/StyledText";
import { dateOptions } from "../../components/dateOptions";
import theme from "../../theme";
import { useData } from "../../hooks/DemandasDataProvider";
export const PropuestaItem = ({
  ActualProductos,
  IdDemanda,
  onclose,
  data,
}) => {
  const [proveedor, setProveedor] = useState();
  const { getDemandasComp } = useData();

  const fechaLimiteObj = new Date(data.FechaPropuesta);

  const getProveedorPropuesta = async () => {
    const resp = await globalThis.fetch(
      `${apiUrl}/usuarios?idUsuario=${data.IdProveedor}`
    );
    const data = await resp.json();
    const { rows: proveedor } = !!data && data;
    setProveedor(proveedor[0]);
  };

  const actualizarEstadoPropuesta = async (idPropuesta, nuevoEstado) => {
    const responsePropuesta = await fetch(`${apiUrl}/propuestas`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ IdPropuesta: idPropuesta, Estado: nuevoEstado }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("La solicitud no fue exitosa");
        }

        Alert.alert(
          "Exito!",
          "La demanda se actualizo con exito",
          [
            {
              text: "Aceptar",
              onPress: () => {
                onclose();
              },
            },
          ],
          { cancelable: false }
        );
      })
      .catch(() => {
        Alert.alert(
          "Error en la demanda",
          "Ha habido un error al intentar realizar el pago",
          [
            {
              text: "Aceptar",
              onPress: () => {
                onclose();
              },
            },
          ],
          { cancelable: false }
        );
      });
    getDemandasComp();
  };
  const actualizarActualProductos = async () => {
    const nuevoActualProductos =
      parseInt(ActualProductos, 10) + parseInt(data.Cantidad, 10);
    const body = JSON.stringify({
      IdDemanda: IdDemanda,
      NuevoActualProductos: parseInt(nuevoActualProductos, 10),
    });
    const respondePathDemanda = await fetch(`${apiUrl}/demandas`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: body,
    });
  };

  useEffect(() => {
    getProveedorPropuesta();
  }, []);

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "black",
        marginVertical: 5,
        padding: 10,
        borderRadius: 15,
        flexDirection: "row",
      }}
    >
      <View style={{ width: "70%", alignSelf: "center" }}>
        <StyledText color="purple" fontWeight="bold">
          {data.Precio}$
        </StyledText>
        <StyledText color="purple">{data.Cantidad}</StyledText>
        <StyledText color="purple">
          {" "}
          {fechaLimiteObj.toLocaleString(undefined, dateOptions)}
        </StyledText>
      </View>
      <View style={{ width: "30%", alignSelf: "center" }}>
        <TouchableOpacity
          style={{
            backgroundColor: theme.colors.green,
            marginVertical: 5,
            borderRadius: 5,
            padding: 5,
            alignSelf: "center",
          }}
          activeOpacity={0.8}
          onPress={() => {
            Alert.alert(
              "Aviso!",
              "Esta seguro de aceptar la propuesta?",
              [
                {
                  text: "Aceptar",
                  onPress: () => {
                    actualizarEstadoPropuesta(data.IdPropuesta, "aprobada");
                    actualizarActualProductos();
                  },
                },
              ],
              { cancelable: false }
            );
          }}
        >
          <Text style={{ color: "white" }}>ACEPTAR</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: theme.colors.red,
            margin: 5,
            borderRadius: 5,
            padding: 5,
            alignSelf: "center",
          }}
          activeOpacity={0.8}
          onPress={() => {
            Alert.alert(
              "Aviso!",
              "Esta seguro de rechazar la propuesta?",
              [
                {
                  text: "Aceptar",
                  onPress: () => {
                    actualizarEstadoPropuesta(data.IdPropuesta, "rechazada");
                  },
                },
              ],
              { cancelable: false }
            );
          }}
        >
          <Text style={{ color: "white" }}>RECHAZAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
