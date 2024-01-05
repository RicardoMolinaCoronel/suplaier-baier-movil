import React, { useState, useEffect } from "react";
import { Image, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import theme from "../theme";
import * as ImagePicker from "expo-image-picker";

export default function UploadImage({ setImageUri }) {
  const [image, setImage] = useState(null);

  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(JSON.stringify(_image));

    if (!_image.canceled) {
      setImage(_image.uri);
      setImageUri(_image.uri);
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
            style={{ width: "100%", height: 300, resizeMode: "contain" }}
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
