import { Image, Text, View } from "react-native";
import React from "react";

const TabProfile = ({ name, pais, profileImage }) => {
  return (
    <View style={{ marginTop: "15%", marginLeft: "3%" }}>
      <Image
        source={
          profileImage != null && profileImage != "no-img.jpeg"
            ? {
                uri: profileImage,
              }
            : require("../../../public/default-logo1.jpg")
        }
        style={{
          width: 80,
          height: 80,
          borderRadius: 80 / 2,
          marginTop: 8,
          resizeMode: "center",
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
      <Text
        style={{
          fontSize: 18,
          fontWeight: "normal",
          color: "white",
          marginTop: 4,
        }}
      >
        {pais}
      </Text>

      {/* <TouchableOpacity>
        <Text
          style={{
            marginTop: 4,
            color: "white",
          }}
        >
          Ver Perfil
        </Text>
      </TouchableOpacity> */}
    </View>
  );
};
export default TabProfile;
