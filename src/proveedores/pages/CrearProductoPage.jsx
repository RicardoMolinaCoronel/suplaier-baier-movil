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
  import { AuthContext } from "../../auth/context/AuthContext.jsx";
  import validationSchema from "../components/crearProductoValidationSchema";
  import StyledSelectList from "../../styles/StyledSelectList";
  import { ResumenProducto } from "../components/ResumenProducto";
  const initialValues = {
    name: "",
    description: "",
    categoria: "",
  };
  

  const FormikInputValue = ({
    name,
    icon,
    label,
    isPassword,
    hidePassword,
    setHidePassword,
    isDropDown,
    categorias,
    setSelected,
    selected,
    ...props
  }) => {
    const [field, meta, helpers] = useField(name);
    return (
      <View>
        <StyledText style={styles.textInputLabel}>{label}</StyledText>
        {isDropDown ? (
          <StyledSelectList
            setSelected={(val) => setSelected(val)}
            onSelect={() => {
              helpers.setValue(selected);
            }}
            data={categorias}
            placeholder="Selecciona una categoría"
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
        {isPassword && (
          <TouchableOpacity
            style={styles.rightIcon}
            onPress={() => setHidePassword(!hidePassword)}
          >
            <Ionicons
              name={hidePassword ? "md-eye-off" : "md-eye"}
              size={30}
              color={theme.colors.gray1}
            />
          </TouchableOpacity>
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
  
  const CrearProductoPage = () => {
    const [selected, setSelected] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [isvisibleresumen, setisvisibleresumen] = useState(false);
    const [productoImg, setProductoImg] = useState("no-img.jpeg");
    const [values, setValues] = useState();
    const [categoriaNombreSelected, setCategoriaNombreSelected] = useState("");
    const [imageUri, setImageUri] = useState(null);

    const getCategorias = async () => {
      try {
        const response = await fetch(`${apiUrl}/catProductos`);
        const data = await response.json();
        const { rows: categorias } = data;
  
        let categoriasProducto = categorias.map((categoria) => {
          return { key: categoria.IdCatProducto, value: categoria.Nombre };
        });
        setCategorias(categoriasProducto);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    useEffect(() => {
      getCategorias();
    }, []);
  
    const onMostrarResumen = (values) => {
        
      let nombre = categorias.filter(
        (categoria) => parseInt(categoria.key) === parseInt(selected)
      );
      setCategoriaNombreSelected(nombre[0]["value"]);
      setValues(values);
      setisvisibleresumen(true);
    };

    const onImageChange = (uri) => {
      setProductoImg(uri);
      setImageUri(uri);
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
            Crear producto
          </StyledText>
          <StyledText
            color="tertiary"
            fontWeight="normal"
            fontSize="subheading"
            style={styles.subtitle}
          >
            Crea un nuevo producto para proveerlo en una oferta.
          </StyledText>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => onMostrarResumen(values)}
            validationSchema={validationSchema}
          >
            {({ handleSubmit }) => {
              return (
                <View style={styles.form}>
                  <FormikInputValue
                    name="name"
                    icon="note"
                    placeholder="Nombre del producto"
                    placeholderTextColor={theme.colors.gray1}
                    label="Nombre"
                  />
  
                  <FormikInputValue
                    name="description"
                    icon="list-unordered"
                    placeholder="Descripción del producto"
                    placeholderTextColor={theme.colors.gray1}
                    multiline={true}
                    numberOfLines={8}
                    textAreaSize="descripcion"
                    label="Descripción"
                  />
                  <FormikInputValue
                    name="categoria"
                    icon="checklist"
                    placeholderTextColor={theme.colors.textPrimary}
                    label="Categoría"
                    isDropDown
                    categorias={categorias}
                    selected={selected}
                    setSelected={setSelected}
                  />
  
                  <StyledText style={styles.textInputLabel}>Imagen</StyledText>
                  <UploadImage setImageUri={onImageChange} />
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
          <ResumenProducto
            isvisible={isvisibleresumen}
            onclose={() => setisvisibleresumen(false)}
            productoImg={productoImg}
            values={values}
            categoriaNombreSelected={categoriaNombreSelected}
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
  });
  
  export default CrearProductoPage;
  