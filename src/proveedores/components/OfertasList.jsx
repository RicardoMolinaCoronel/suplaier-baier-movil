import { ofertas } from "../../data/ofertas";
import { View, StyleSheet, FlatList, Image } from "react-native";
import StyledText from "../../styles/StyledText";
import theme from "../../theme";
import ProgressBar from "react-native-progress/Bar";

const OfertasList = () => {
  return (
    <FlatList
      style={styles.flatListContainer}
      data={ofertas}
      renderItem={({ item: oferta }) => (
        <View style={styles.ofertaContainer}>
          <View style={styles.textoImagenContainer}>
            <StyledText fontWeight="bold" fontSize="subheading">
              {oferta.nombreItem}
            </StyledText>
            <Image
              source={require("../../../public/manzanas.jpg")}
              style={styles.imageContainer}
            />
            <StyledText>{oferta.empresa}</StyledText>
          </View>
          <View style={styles.enOfertaContainer}>
            <StyledText>En oferta: </StyledText>
            <StyledText>16/</StyledText>
            <StyledText>{oferta.cantidad}</StyledText>
          </View>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <ProgressBar
                progress={4 / 20}
                width={200}
                height={25}
                color={theme.colors.blue}
                unfilledColor={theme.colors.gray2}
              />
            </View>
            <View style={styles.estadoContainer}>
              <StyledText color="secondary">En curso</StyledText>
            </View>
          </View>
          <View style={styles.vigenciaContainer}>
            <StyledText>Fecha vigencia: </StyledText>
            <StyledText>{oferta.vigencia}</StyledText>
          </View>
          <View style={styles.enOfertaContainer}>
            <StyledText>Precio unitario: </StyledText>
            <StyledText>{oferta.precio}$</StyledText>
          </View>
          <View style={styles.enOfertaContainer}>
            <StyledText>Precio instantáneo: </StyledText>
            <StyledText>{oferta.instantaneo}$</StyledText>
          </View>
        </View>
      )}
    />
  );
};
const styles = StyleSheet.create({
  flatListContainer: {},
  ofertaContainer: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: theme.colors.lightGray2,
    marginBottom: 10,
    padding: 10,
  },
  textoImagenContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: 200,
    height: 200,
  },
  enOfertaContainer: {
    alignItems: "flex-start",
    flexDirection: "row",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 5,
  },
  progressBar: {
    marginRight: 50,
  },
  vigenciaContainer: {
    alignItems: "flex-start",
    flexDirection: "row",
    marginTop: 5,
  },
  estadoContainer: {
    backgroundColor: theme.colors.green,
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: "center",
  },
});
export default OfertasList;
