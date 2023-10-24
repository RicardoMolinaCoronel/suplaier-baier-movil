import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const TabProfile = ({ name, profileImage }) => {
  return (
    <View style={{ marginTop: "15%", marginLeft: "3%" }}>
      <Image
        source={require("../../../public/user_icon.png")}
        style={{
          width: 70,
          height: 70,
          borderRadius: 10,
          marginTop: 8,
        }}
      />

      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "white",
          marginTop: 10,
        }}
      >
        @{name}
      </Text>

      <TouchableOpacity>
        <Text
          style={{
            marginTop: 4,
            color: "white",
          }}
        >
          Ver Perfil
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default TabProfile;
