import { React, useState, useRef, useContext } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import StyledText from "../../styles/StyledText";
import { StatusBar } from "expo-status-bar";
import { AuthContext } from "../../auth/context/AuthContext.jsx";
const MyProfile = () => {
  const { authState } = useContext(AuthContext);
  return (
    <><View>
      <StyledText style={styles.header} > MI PERFIL</StyledText>
      <StatusBar style="light" />

    </View><View style={styles.container}>

    <View style={styles.profileContainer}>
        <Image
          source={{uri: authState.user.UrlLogoEmpresa }}// Reemplaza con la URL de la imagen del usuario
          style={styles.profileImage}
        /></View>
      
        <View style={styles.row}>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.content}>{authState.user.Nombre}</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Usuario:</Text>
          <Text style={styles.content}>{authState.user.Usuario}</Text>
        </View>
        
        <View style={styles.row}>
            <Text style={styles.label}>Rol:</Text>
            <Text style={styles.content}>{authState.user.Rol}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Ciudad:</Text>
          <Text style={styles.content}>{authState.user.Ciudad}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Celular:</Text>
          <Text style={styles.content}>{authState.user.Numero}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Dirección:</Text>
          <Text style={styles.content}>{authState.user.Direccion}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Correo electrónico:</Text>
          <Text style={styles.content}>{authState.user.Email}</Text>
        </View>
      </View></>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    borderBottomColor: 'gray', // Color de las líneas 
    borderBottomWidth: 1, // Ancho de las líneas grises
    marginBottom: 10,
    paddingVertical: 5, 
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    width: '40%',
  },
  content: {
    fontSize: 16,
    width: '60%',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignContent: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'center',
  },
});

export default MyProfile;