import React from "react";
import { TouchableOpacity, Text, StyleProp, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export const ButtonWithText = ({
  anyfunction,
  title,
  color = "red",
  colorTexto = "#FFFFFF",
  icon = "",
  //width = 150,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={anyfunction}
      style={{
        backgroundColor: color,
        marginVertical: 14,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        borderRadius: 10,
        alignSelf: "center",
        flexDirection: "row",
      }}
    >
      {icon.length > 0 && <Icon name={icon} size={25} color={"#FFFFFF"}></Icon>}
      <Text
        style={{
          fontSize: 15,
          marginHorizontal: 10,
          marginVertical: 10,
          textAlign: "center",
          color: colorTexto,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
