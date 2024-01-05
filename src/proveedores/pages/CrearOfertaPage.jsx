import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import { Formik, useField } from "formik";
import { StatusBar } from "expo-status-bar";
import { Octicons, Ionicons } from "@expo/vector-icons";
import { useNavigate, Navigate } from "react-router-native";
import { apiUrl } from "../../../apiUrl";
import theme from "../../theme";
import StyledText from "../../styles/StyledText";
import StyledTextInput from "../../styles/StyledTextInput";
import UploadImage from "../../styles/UploadImage";
import crearOfertaValidationSchema from "../components/crearOfertaValidationSchema";
import { AuthContext } from "../../auth/context/AuthContext";
import { SelectList } from "react-native-dropdown-select-list";
import StyledSelectList from "../../styles/StyledSelectList";
import { ResumenOferta } from "../components/ResumenOferta";
import DateTimePicker from "react-native-modal-datetime-picker";
const initialValues = {
  pmax: "",
  pmin: "",
};

const FormikInputValue = ({
  name,
  icon,
  label,
  isPassword,
  hidePassword = false,
  setHidePassword,
  isDropDown,
  productosSelectList,
  setSelected,
  selected,
  getSelectProduct,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);
  return (
    <View>
      <Octicons
        style={styles.leftIcon}
        name={icon}
        size={30}
        color={theme.colors.purple1}
      />
      <StyledText style={styles.textInputLabel}>{label}</StyledText>
      {isDropDown ? (
        <StyledSelectList
          setSelected={(val) => setSelected(val)}
          onSelect={() => {
            helpers.setValue(selected);
            getSelectProduct();
          }}
          data={productosSelectList}
          placeholder="Selecciona uno de tus productos"
          searchPlaceholder="Buscar"
          save="key"
          error={meta.error}
        />
      ) : (
        <>
          <Octicons
            style={styles.leftIcon}
            name={icon}
            size={30}
            color={theme.colors.purple1}
          />
          <StyledTextInput
            error={meta.error}
            value={field.value}
            onChangeText={(value) => helpers.setValue(value)}
            {...props}
          />
        </>
      )}
      {meta.error && (
        <StyledText
          style={isDropDown ? styles.errorTextSelect : styles.errorText}
          fontSize="body"
        >
          {meta.error}
        </StyledText>
      )}
    </View>
  );
};

const FormikDateValue = ({ name, icon, label, ...props }) => {
  const [field, meta, helpers] = useField(name);
  let fechaLimiteMinimo = new Date();
  let fechaLimiteMaximo = new Date();
  fechaLimiteMinimo.setDate(fechaLimiteMinimo.getDate() + 1);
  fechaLimiteMaximo.setDate(fechaLimiteMinimo.getDate() + 183);
  const [date, setDate] = useState();

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    // console.warn("A date has been picked: ", date);
    setDate(date);
    helpers.setValue(date);
    hideDatePicker();
  };
  return (
    <View>
      <StyledText style={styles.textInputLabel}>{label}</StyledText>
      <TouchableOpacity style={styles.dateButton} onPress={showDatePicker}>
        <StyledText fontSize="subheading" color="secondary" fontWeight="bold">
          Escoger fecha límite
        </StyledText>
      </TouchableOpacity>
      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="date"
        minimumDate={fechaLimiteMinimo}
        maximumDate={fechaLimiteMaximo}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      {meta.error && (
        <StyledText style={styles.errorTextSelect} fontSize="body">
          {meta.error}
        </StyledText>
      )}
    </View>
  );
};

const CrearOfertaPage = () => {
  const { authState } = useContext(AuthContext);
  const { user } = authState;
  //   const [date, setDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const [productosSelectList, setProductosSelectList] = useState([]);
  const [selected, setSelected] = useState("");
  const [productoSelected, setProductoSelected] = useState("");
  const [isvisibleresumen, setisvisibleresumen] = useState(false);
  const [values, setValues] = useState();

  const getProductos = async () => {
    try {
      const resp = await fetch(
        `${apiUrl}/productos/onlyNames?idProveedor=${user.IdUsuario}`
      );
      const data = await resp.json();
      const { rows: productos } = !!data && data;

      let productosComprador = productos.map((producto) => {
        return { key: producto.IdProducto, value: producto.Name };
      });
      setProductosSelectList(productosComprador);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  const getSelectProduct = async () => {
    try {
      console.log(selected);
      const resp = await fetch(`${apiUrl}/productos?id=${selected}`);
      const data = await resp.json();
      const { rows: productos } = !!data && data;
      setProductoSelected(productos[0]);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  useEffect(() => {
    getProductos();
  }, []);
  const onMostrarResumen = (values) => {
    setValues(values);
    setisvisibleresumen(true);
  };
  return (
    <>
      <ScrollView>
        <StyledText
          color="tertiary"
          fontWeight="bold"
          fontSize="title"
          style={styles.pageTitle}
        >
          Crear oferta
        </StyledText>
        <StyledText
          color="tertiary"
          fontWeight="normal"
          fontSize="subheading"
          style={styles.subtitle}
        >
          ¡Crea una oferta con tu producto para los compradores!
        </StyledText>

        <Formik
          validationSchema={crearOfertaValidationSchema}
          initialValues={initialValues}
          onSubmit={(values) => onMostrarResumen(values)}
        >
          {({ handleSubmit }) => {
            return (
              <View style={styles.form}>
                <FormikInputValue
                  name="product"
                  setSelected={setSelected}
                  selected={selected}
                  placeholder="Producto"
                  placeholderTextColor={theme.colors.textPrimary}
                  label="Producto"
                  isDropDown
                  productosSelectList={productosSelectList}
                  getSelectProduct={getSelectProduct}
                />
                {selected && (
                  <View style={styles.productoContainer}>
                    <Image
                      source={
                        productoSelected?.UrlImg != null &&
                        productoSelected?.UrlImg != "no-img.jpeg"
                          ? {
                              uri: productoSelected?.UrlImg,
                            }
                          : require("../../../public/no-img.jpeg")
                      }
                      style={styles.imageContainer}
                    />
                    <StyledText
                      color={"primary"}
                      style={styles.textProductoDescripcion}
                    >
                      {productoSelected?.Descripcion}
                    </StyledText>
                  </View>
                )}
                <FormikInputValue
                  name="pmin"
                  keyboardType="decimal-pad"
                  placeholder="Precio por unidad"
                  icon="tag"
                  placeholderTextColor={theme.colors.gray1}
                  label="Precio unitario"
                />
                <FormikInputValue
                  name="pmax"
                  keyboardType="decimal-pad"
                  placeholder="Precio para compra instantánea"
                  icon="star"
                  placeholderTextColor={theme.colors.gray1}
                  label="Precio Instantáneo"
                />
                <FormikInputValue
                  name="description"
                  icon="list-unordered"
                  placeholder="Descripción de la demanda"
                  placeholderTextColor={theme.colors.gray1}
                  multiline={true}
                  numberOfLines={8}
                  textAreaSize="descripcion"
                  label="Descripción"
                />
                <FormikInputValue
                  name="umin"
                  keyboardType="numeric"
                  placeholderTextColor={theme.colors.gray1}
                  label="Cantidad mínima"
                  placeholder="Cantidad mínima de productos"
                  icon="package"
                />
                <FormikInputValue
                  name="umax"
                  keyboardType="numeric"
                  placeholderTextColor={theme.colors.gray1}
                  label="Cantidad total"
                  placeholder="Cantidad total de productos"
                  icon="stack"
                />
                <FormikDateValue name="date" label="Fecha límite" />

                <View style={styles.borderLine} />
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={handleSubmit}
                >
                  <StyledText
                    fontSize="subheading"
                    color="secondary"
                    fontWeight="bold"
                  >
                    Continuar
                  </StyledText>
                </TouchableOpacity>
              </View>
            );
          }}
        </Formik>
      </ScrollView>

      {isvisibleresumen && (
        <ResumenOferta
          isvisible={isvisibleresumen}
          onclose={() => setisvisibleresumen(false)}
          datosProducto={productoSelected}
          values={values}
        />
      )}
      <StatusBar style="light" />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  pageLogo: {
    width: 307.98,
    height: 61.14,
    marginTop: 60,
    marginBottom: 5,
  },
  pageTitle: {
    textAlign: "center",
    padding: 10,
    marginTop: 20,
  },
  form: {
    margin: 20,
  },
  textInputLabel: {
    color: theme.colors.purple,
    textAlign: "left",
  },

  subtitle: {
    textAlign: "center",
    marginBottom: 20,
    letterSpacing: 1,
    paddingHorizontal: 25,
  },
  leftIcon: {
    left: 15,
    top: 38,
    position: "absolute",
    zIndex: 1,
  },
  rightIcon: {
    right: 15,
    top: 38,
    position: "absolute",
    zIndex: 1,
  },
  submitButton: {
    padding: 15,
    backgroundColor: theme.colors.lightblue1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 5,
    height: 60,
  },
  registerButton: {
    padding: 15,
    backgroundColor: theme.colors.lightgreen,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 5,
    height: 60,
  },
  dateButton: {
    padding: 15,
    backgroundColor: theme.colors.blue,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 5,
    height: 50,
    width: "70%",
  },
  borderLine: {
    borderBottomColor: theme.colors.gray1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 15,
  },
  bottomText: {
    marginTop: 10,
    textAlign: "center",
  },
  errorText: {
    color: theme.colors.red,
    marginBottom: 10,
    marginTop: -13,
  },
  errorTextSelect: {
    color: theme.colors.red,
    marginBottom: 10,
    marginTop: 0,
  },
  extraView: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  extraText: {
    justifyContent: "center",
    alignContent: "center",
  },
  extraTextLink: {
    justifyContent: "center",
    alignItems: "center",
  },
  textLink: {
    color: theme.colors.purple,
  },

  cancelButton: {
    padding: 15,
    backgroundColor: theme.colors.red,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 5,
    height: 60,
  },
  selectBox: {
    marginVertical: 5,
    borderColor: theme.colors.gray2,
  },
  dropDownBox: {
    borderColor: theme.colors.gray2,
    marginBottom: 15,
  },
  productoContainer: {
    borderWidth: 1,
    borderColor: theme.colors.gray2,
    borderRadius: 5,
    marginBottom: 5,
    padding: 10,
  },
  imageContainer: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
  },
  textProductoDescripcion: {
    width: "100%",
    padding: 7,
    textAlign: "center",
  },
});

export default CrearOfertaPage;
