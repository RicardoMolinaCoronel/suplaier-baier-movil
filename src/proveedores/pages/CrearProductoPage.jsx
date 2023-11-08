import { StyleSheet, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { useState, useContext } from "react";
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
import CrearProductoValidation from "../components/CrearProductoValidation";
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
            <StyledTextInput
                error={meta.error}
                value={field.value}
                onChangeText={(value) => helpers.setValue(value)}
                {...props}
            />
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
                <StyledText style={styles.errorText} fontSize="body">
                    {meta.error}
                </StyledText>
            )}
        </View>
    );
};

const CrearProductoPage = () => {
    const { authState } = useContext(AuthContext);
    const [hidePassword, setHidePassword] = useState(true);
    const navigate = useNavigate();


    const createProduct = async (productData) => {
        const body = {
            IdProducto:1,
            IdProveedor: authState.user.IdUsuario,
            IdCatProducto: 1,
            Descripcion: productData.description,
            UrlImg: "no-img.jpeg",
            name: productData.name,
          };
          const resp = await global.fetch(`${apiUrl}/auth`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });
          const data = await resp.json();
          console.log("peticion");
        
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
                    Nuevo Producto
                </StyledText>
                <StyledText
                    color="tertiary"
                    fontWeight="normal"
                    fontSize="subheading"
                    style={styles.subtitle}
                >
                    Datos del Producto
                </StyledText>
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values) => createProduct(values)}
                    validationSchema={CrearProductoValidation}
                >
                    {({ handleSubmit }) => {
                        return (
                            <View style={styles.form}>
                                <FormikInputValue
                                    name="name"
                                    icon="note"
                                    placeholder="Nombre"
                                    placeholderTextColor={theme.colors.gray1}
                                    label="Nombre Producto"
                                />

                                <FormikInputValue
                                    name="description"
                                    icon="list-unordered"
                                    placeholderTextColor={theme.colors.gray1}
                                    label="Descripción"
                                />
                                <FormikInputValue
                                    name="categoria"
                                    icon="checklist"
                                    placeholder="Artesanías"
                                    placeholderTextColor={theme.colors.textPrimary}
                                    secureTextEntry={hidePassword}
                                    label="Categoria"
                                    isDropDown
                                />

                                <StyledText style={styles.textInputLabel}>Imagen</StyledText>
                                <UploadImage />
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
