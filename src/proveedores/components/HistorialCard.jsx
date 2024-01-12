import React from "react";
import { View, Text } from "react-native";

export const HistorialCard = ({ item }) => {
  return (
    <View
      style={{
        height: 180,
        width: 200,
        borderWidth: 1,
        borderColor: "black",
        alignItems: "right",
        margin: 5,
      }}
    >
      <Text style={{ fontWeight: "bold", color: "black", margin: 5 }}>
        ESTADO OFERTA:{" "}
        <Text style={{ color: "black", fontWeight: "normal" }}>
          {item?.OldIdEstadosOferta?.toString() ?? ""}
        </Text>
      </Text>
      <Text style={{ fontWeight: "bold", color: "black", margin: 5 }}>
        Productos Comprados:
      </Text>
      <Text style={{ fontWeight: "bold", color: "black", margin: 5 }}>
        Tipo de cambio:{" "}
        <Text style={{ color: "black", fontWeight: "normal" }}>
          {" "}
          {item?.ChangeType ?? ""}
        </Text>
      </Text>
      <Text style={{ fontWeight: "bold", color: "black", margin: 5 }}>
        Fecha y hora:{" "}
        <Text style={{ color: "black", fontWeight: "normal" }}>
          {" "}
          {item.ChangeTime?.toString() ?? ""}{" "}
        </Text>
      </Text>
    </View>
  );
};
