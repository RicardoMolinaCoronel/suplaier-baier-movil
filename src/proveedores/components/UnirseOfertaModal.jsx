import React, { useState } from "react";
import { Modal, Image, Text, View, StyleSheet, Button } from "react-native";
import { ButtonWithText } from "../../proveedores/components/ButtonWithText";
import StyledText from "../../styles/StyledText";
import theme from "../../theme";
import { dateOptions } from "../../components/dateOptions";
import StyledTextInput from "../../styles/StyledTextInput";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../auth/context/AuthContext";
import { useContext } from "react";
import { apiUrl } from "../../../apiUrl";
import { Alert } from "react-native";
export const UnirseOfertaModal = ({
  dataproducto,
  isvisibleUnirseOfertaModal,
  oncloseUnirseOferta,

  onclopagado,
}) => {
  const fechaLimiteObj = new Date(dataproducto?.fechaLimiteObj ?? "");
  const [contador, setContador] = useState(0);
  const [valortotal, setvalortotal] = useState(0);
  const [precioPropuesta, setPrecioPropuesta] = useState(0);
  const [values, setValues] = useState();
  let unidadesdisponibles =
    parseInt(dataproducto?.Maximo) - parseInt(dataproducto?.actualProductos);

  const incrementarContador = () => {
    if (contador < unidadesdisponibles) {
      setvalortotal((contador + 1) * dataproducto?.datosProd?.costoU);
      setContador(contador + 1);
    }
  };

  const handlePrecioPropuestaChange = (value) => {
    setPrecioPropuesta(value);
  };

  const decrementarContador = () => {
    if (contador > 0) {
      setvalortotal((contador - 1) * dataproducto?.datosProd?.costoU);
      setContador(contador - 1);
    }
  };

  const validationSchema = Yup.object().shape({
    precioPropuesta: Yup.number()
      .required("El precio es requerido")
      .min(
        dataproducto.Minimo,
        "Precio debe ser mayor o igual al precio minimo"
      )
      .max(
        dataproducto.Maximo,
        "Precio debe ser menor o igual al precio maximo"
      ),
  });

  const formik = useFormik({
    initialValues: {
      precioPropuesta: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      CrearPropuesta(values);
      console.log(values);
    },
  });
  const {
    authState: { user },
  } = useContext(AuthContext);

  const uploadPropuesta = async (values) => {
    const body = {
      IdDemanda: dataproducto.IdDemanda,
      IdProveedor: user.IdUsuario,
      Precio: values.precioPropuesta,
      Cantidad: contador,
      Estado: "Pendiente",
    };
    console.log(body);
    const resp = await fetch(`${apiUrl}/propuestas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .catch(() => {
        Alert.alert(
          "Error",
          "Ha habido un error al intentar crear la propuesta",
          [{ text: "Aceptar", onPress: () => oncloseUnirseOferta() }],
          { cancelable: false }
        );
      })
      .then(() => {
        Alert.alert(
          "¡Éxito!",
          "Se ha creado la propuesta con éxito",
          [{ text: "Aceptar", onPress: () => oncloseUnirseOferta() }],
          { cancelable: false }
        );
      });
  };

  return (
    <Formik
      initialValues={{
        precioPropuesta: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        uploadPropuesta(values);
        console.log(values);
      }}
    >
      {(formik) => (
        <Modal
          transparent={true}
          style={{ backgroundColor: "rgba(255,255,255,0.6)", flex: 1 }}
          visible={isvisibleUnirseOfertaModal}
          animationType="slide"
        >
          <View
            style={{
              backgroundColor: "#ffffff",
              padding: "5%",
              marginHorizontal: "10%",
              marginTop: "40%",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.23,
              shadowRadius: 2.62,
              elevation: 4,
              borderRadius: 15,
            }}
          >
            <Text style={{ color: "black", margin: 10, fontWeight: "bold" }}>
              Crear Propuesta
            </Text>
            <View style={styles.firstContainer}>
              <Image
                source={{
                  uri: dataproducto?.datosProd?.urlImg ?? "",
                }}
                style={styles.imageContainer}
              />
              <View style={styles.starsContainer}>
                <StyledText color={"primary"} fontWeight={"bold"}>
                  {dataproducto?.datosProd?.nombreProd ?? ""}
                </StyledText>
                <StyledText color={"primary"}>
                  Precio Minimo: ${dataproducto?.Minimo ?? 0}
                </StyledText>
                <StyledText color={"primary"}>
                  Precio Maximo: ${dataproducto?.Maximo ?? 0}
                </StyledText>
                <StyledText color={"primary"}>
                  Unidades Disponibles: {unidadesdisponibles}
                </StyledText>
              </View>
            </View>

            <View style={styles.secondFirstContainer}>
              <StyledText color={"primary"} fontWeight={"bold"}>
                Comprador: {""}
              </StyledText>
              <StyledText color={"primary"}>
                {dataproducto?.nombreComprador ?? ""}
              </StyledText>
            </View>

            <View style={styles.fechaCierreContainer}>
              <StyledText color={"primary"} fontWeight={"bold"}>
                Fecha cierre:{" "}
              </StyledText>
              <StyledText color={"primary"}>
                {fechaLimiteObj.toLocaleString(undefined, dateOptions)}
              </StyledText>
            </View>
            <View style={styles.fechaCierreContainer}>
              <StyledText color={"primary"} fontWeight={"bold"}>
                Precio:{" "}
              </StyledText>
              <StyledTextInput
                style={{ height: 50, width: 200 }}
                value={formik.values.precioPropuesta}
                onChangeText={formik.handleChange("precioPropuesta")}
                onBlur={formik.handleBlur("precioPropuesta")}
                keyboardType="numeric"
              />
            </View>

            {formik.touched.precioPropuesta &&
              formik.errors.precioPropuesta && (
                <StyledText style={styles.errorText}>
                  {formik.errors.precioPropuesta}
                </StyledText>
              )}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <View style={styles.unidadesContainer}>
                <Text style={{ marginHorizontal: 10 }}>{contador}</Text>
                <View style={{ flexDirection: "row" }}>
                  <Button title="-" onPress={decrementarContador} />
                  <Button title="+" onPress={incrementarContador} />
                </View>
              </View>
              <View style={styles.unidadesContainer}>
                <Text style={{ textAlign: "center" }}>
                  <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                    Total: $ {""}
                  </Text>
                  {contador * formik.values.precioPropuesta}
                </Text>
              </View>
            </View>

            <View
              style={{
                alignContent: "center",
                flexDirection: "row",
                padding: 20,
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <ButtonWithText
                anyfunction={() => {
                  setContador(0), setvalortotal(0), oncloseUnirseOferta();
                }}
                title={"Cancelar"}
                color={theme.colors.red}
              ></ButtonWithText>
              <ButtonWithText
                anyfunction={() => {
                  formik.handleSubmit();
                }}
                title={"Continuar"}
                color={theme.colors.lightblue1}
              ></ButtonWithText>
            </View>
          </View>
        </Modal>
      )}
    </Formik>
  );
};
const styles = StyleSheet.create({
  container: {
    width: 50000,
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
  textName: { margin: 5 },
  iconBehave: {
    padding: 14,
  },
  firstContainer: {
    marginVertical: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: theme.colors.lightGray3,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
  },
  imageContainer: { width: "40%", height: 90, resizeMode: "contain" },
  starsContainer: { width: "60%" },
  secondContainer: { marginVertical: 10, flexDirection: "row" },
  secondFirstContainer: {
    flexDirection: "row",
    marginVertical: 10,
    width: "100%",
    padding: 5,
    borderWidth: 1,
    borderColor: theme.colors.lightGray3,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  secondsecondContainer: {
    width: "45%",
    padding: 5,
    borderWidth: 1,
    borderColor: theme.colors.lightGray3,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  // precioInstaContainer: { marginVertical: 10, flexDirection: "row" },
  precioInstContainerSub: {
    marginVertical: 10,
    width: "100%",
    padding: 5,
    borderWidth: 1,
    borderColor: theme.colors.lightGray3,
    borderRadius: 8,
    flexDirection: "row",
  },
  unidadesFechaContainer: {
    marginVertical: 10,
    flexDirection: "row",
    width: "100%",
  },
  unidadesContainer: {
    width: "48%",
    // height: 40,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 5,
    borderWidth: 1,
    borderColor: theme.colors.lightGray3,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  fechaCierreContainer: {
    width: "100%",
    flexDirection: "row",
    marginVertical: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: theme.colors.lightGray3,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  descripcionContainer: {
    marginVertical: 10,
    flexDirection: "row",
    width: "100%",
  },
  descripcionSubContainer: {
    width: "100%",
    padding: 5,
    borderWidth: 1,
    borderColor: theme.colors.lightGray3,
    borderRadius: 8,
  },
  progesoContainer: { marginVertical: 10, flexDirection: "row" },
  progresoSubContainer: {
    width: "100%",
    padding: 5,
    borderWidth: 1,
    alignItems: "center",
    borderColor: theme.colors.lightGray3,
    borderRadius: 8,
  },
  restantesContainer: {
    marginVertical: 10,
  },
  restantesSubContainer: {
    width: "100%",
    padding: 5,
    borderWidth: 1,
    borderColor: theme.colors.lightGray3,
    borderRadius: 8,
  },
  botonesContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  },
  borderLine: {
    borderBottomColor: theme.colors.primary,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 10,
  },
  textInputLabel: {
    color: theme.colors.purple,
    textAlign: "left",
  },
  errorText: {
    color: "red",
    fontSize: theme.fontSizes.body,
  },
});
