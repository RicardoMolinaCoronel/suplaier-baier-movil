import { View } from "react-native";
import StyledText from "../../styles/StyledText";
import { StatusBar } from "expo-status-bar";
const HomeProveedorPage = () => {
  return (
    <View>
      <StyledText fontWeight="bold"> OFFERS</StyledText>
      <StatusBar style="light" />
    </View>
  );
};

export default HomeProveedorPage;
