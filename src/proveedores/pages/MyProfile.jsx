import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import StyledText from "../../styles/StyledText";
import { StatusBar } from "expo-status-bar";
const MyProfile = () => {
  return (
    <><View>
      <StyledText fontWeight="bold"> MI PERFIL</StyledText>
      <StatusBar style="light" />

    </View><View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.content}>Sergio Basurto</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Rol:</Text>
          <Text style={styles.content}> Proveedor</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Correo Electrónico:</Text>
          <Text style={styles.content}>sergio@example.com</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>País:</Text>
          <Text style={styles.content}>Ecuador</Text>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
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
});

export default MyProfile;