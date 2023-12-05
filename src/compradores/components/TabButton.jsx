import { Text, TouchableOpacity, View } from "react-native";
import { useNavigate } from "react-router-native";
import { AuthContext } from "../../auth/context/AuthContext.jsx";
import React from "react";
import theme from "../../theme.js";
import Icon from "react-native-ico-material-design";
import { useContext } from "react";

export const TabButton = ({ currentTab, setCurrentTab, text, icon }) => {
  const { logout } = useContext(AuthContext);
  const iconHeight = 26;
  const iconWidth = 26;
  const navigate = useNavigate();
  return (
    <TouchableOpacity
      onPress={() => {
        setCurrentTab(text);
        switch (text) {
          case "Inicio":
            navigate("/comprador/home", {
              replace: true,
            });
            break;
          case "Perfil":
            navigate("/comprador/profile", {
              replace: true,
            });
            break;
          case "Crear demanda":
            navigate("/comprador/crearDemanda", {
              replace: true,
            });
            break;
          case "Crear producto":
            navigate("/comprador/crearProducto", {
              replace: true,
            });
            break;
          case "Órdenes":
            navigate("/comprador/ordenes", {
              replace: true,
            });
            break;
          case "Cerrar sesión":
            logout();
            break;
          default:
        }
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 8,
          backgroundColor: currentTab == text ? "white" : "transparent",
          paddingLeft: 13,
          paddingRight: 35,
          borderRadius: 8,
          marginTop: 15,
        }}
      >
        {/* <Image source={icon} style={{
                    width: 25, height: 25,
                    tintColor: currentTab == text ? "#5359D1" : "white"
                }}></Image> */}
        {/* <Icon
                    name={icon} color={currentTab == text ? "#5359D1" : "white"} /> */}
        <Icon
          name={icon}
          height={iconHeight}
          width={iconWidth}
          color={
            currentTab == text
              ? theme.colors.purple3
              : theme.bottomBar.iconPrimary
          }
        />
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            paddingLeft: 15,
            color: currentTab == text ? theme.colors.purple3 : "white",
          }}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
