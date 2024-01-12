import React, { useState } from "react";
import { Image, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import theme from "../theme";
import * as ImagePicker from "expo-image-picker";

export default function UploadImage({ setImageUri }) {
  const [image, setImage] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [base64Image, setBase64Image] = useState(null);

  const addImage = async () => {
    const _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!_image.canceled) {
      try {
        const response = await fetch(_image.uri);
        const blob = await response.blob();

        // eslint-disable-next-line no-undef
        const reader = new FileReader();
        reader.onload = () => {
          const base64Data = reader.result;
          setBase64Image(base64Data);
          setImage(base64Data);
          setImageUri(base64Data);
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error("Error al convertir la imagen a base64:", error);
      }
    }
  };

  return (
    <>
      <View style={imageUploaderStyles.container}>
        <View style={imageUploaderStyles.uploadBtnContainer}>
          <TouchableOpacity
            onPress={addImage}
            style={imageUploaderStyles.uploadBtn}
          >
            <Text>{image ? "Editar" : "Añadir"} Imagen</Text>
            <AntDesign name="camera" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      {image && (
        <View style={imageUploaderStyles.imageContainer}>
          <Image
            source={{ uri: image }}
            style={{ width: "100%", height: 250, resizeMode: "contain" }}
          />
        </View>
      )}
    </>
  );
}

const imageUploaderStyles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 60,
    width: "100%",
    backgroundColor: "#efefef",
    position: "relative",
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 3,
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: theme.colors.gray2,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "lightgrey",
    width: "100%",
    height: "100%",
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
