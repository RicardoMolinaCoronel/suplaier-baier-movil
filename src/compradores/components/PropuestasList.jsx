import { View, StyleSheet, FlatList, Modal } from "react-native";
import theme from "../../theme";
import StyledText from "../../styles/StyledText";
import { MaterialIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { PropuestaItem } from "./PropuestaItem";
import { ButtonWithText } from "../../proveedores/components/ButtonWithText";
import { apiUrl } from "../../../apiUrl";
const PropuestasList = (IdDemanda, ActualProductos, onclose, isvisible) => {
  const [propuestas, setPropuestas] = useState([]);

  // const { ofertasTodos } = useOfertasTodos();
  const showEmptyArray = !!propuestas && propuestas?.length === 0;
  useEffect(() => {
    const cargarPropuestas = async () => {
      if (IdDemanda) {
        try {
          const response = await fetch(
            `${apiUrl}/propuestas?IdDemanda=${IdDemanda}&Estado=pendiente`
          );
          const data = await response.json();
          setPropuestas(data.rows);
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };
    cargarPropuestas();
  }, [IdDemanda]);

  return (
    <Modal visible={isvisible} transparent animationType="slide">
      <View style={styles.container}>
        <View style={styles.tituloContainer}>
          <StyledText
            fontWeight="bold"
            color="purple"
            style={styles.textName}
            fontSize="subtitle"
          >
            Propuestas de demanda
          </StyledText>
          <ButtonWithText
            anyfunction={onclose}
            title=""
            icon="close-sharp"
            color={theme.colors.red2}
          />
        </View>
        {showEmptyArray && (
          <View style={styles.vacioContainer}>
            <StyledText color="purple">
              No hay ofertas propuestas por el momento
            </StyledText>
            <MaterialIcons
              name="local-offer"
              size={24}
              color={theme.colors.purple}
              style={styles.iconContainer}
            />
          </View>
        )}
        {!showEmptyArray && (
          <FlatList
            style={styles.flatListContainer}
            data={propuestas}
            renderItem={({ item: propuesta }) => (
              <PropuestaItem
                IdDemanda={IdDemanda}
                ActualProductos={ActualProductos}
                onclose={onclose}
                {...propuesta}
              />
            )}
          />
        )}
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  flatListContainer: {},
  vacioContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    marginTop: 15,
  },
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    padding: "5%",
    margin: "3%",
    marginTop: "20%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    borderRadius: 15,
  },

  tituloContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
export default PropuestasList;
