import React, { useState } from "react";
import { View, Text, useWindowDimensions } from "react-native";

export const ProgressBar = ({ porcentaje }) => {
  const { width } = useWindowDimensions();

  const calcularPorcentaje = (porcentaje: number = 0) => {
    return (width * 0.5 * porcentaje) / 100;
  };

  return (
    <View>
      <View
        style={{
          margin: 20,
          height: 30,
          borderLeftWidth: calcularPorcentaje(porcentaje),
          borderLeftColor: "green",
          width: width * 0.5,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
          elevation: 4,
          backgroundColor: "#FFFFFF",
        }}
      ></View>
      <View
        style={{
          position: "absolute",
          top: 25,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 14,
            color: "black",
            alignSelf: "center",
            textAlign: "center",
          }}
        >
          {porcentaje}%
        </Text>
      </View>
    </View>
  );
};
