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
import CrearOfertaValidation from "../components/CrearOfertaValidation";



const initialValues = {
    user: "",
    password: "",
};

const FormikInputValue = ({
    name,
    icon,
    label,
    isPassword,
    hidePassword=false,
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
            

            {meta.error && (
                <StyledText style={styles.errorText} fontSize="body">
                    {meta.error}
                </StyledText>
            )}
        </View>
    );
};

const CrearOfertaPage = () => {
    const [hidePassword, setHidePassword] = useState(true);
    const navigate = useNavigate();


    const createOffer = async (productData) => {
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
                    Nueva Oferta
                </StyledText>

                <Formik
                    validationSchema={CrearOfertaValidation}
                    initialValues={initialValues}
                >
                    {({ handleSubmit }) => {
                        return (
                            <View style={styles.form}>
                                <FormikInputValue
                                    name="product"
                                    icon="chevron-down"
                                    placeholder="Prueba"
                                    placeholderTextColor={theme.colors.textPrimary}
                                    label="Producto"
                                    isDropDown
                                    
                                />

                                <FormikInputValue
                                    name="pu"
                                    icon="tag"
                                    placeholderTextColor={theme.colors.gray1}
                                  
                                    label="Precio Unitario"

                                />

                                <FormikInputValue
                                    name="pi"
                                    icon="zap"
                                    placeholderTextColor={theme.colors.gray1}
                                    
                                    label="Precio Instantaneo"
                                    isDropDown
                                />
                                <FormikInputValue
                                    name="min"
                                    placeholderTextColor={theme.colors.gray1}
                                    
                                    label="Cantidad Minima"
                                />
                                <FormikInputValue
                                    name="max"
                                    placeholderTextColor={theme.colors.gray1}
                                    
                                    label="Cantidad Maxima"
                                />  
                                
                       
                                <View style={styles.borderLine} />
                                <TouchableOpacity
                                    style={styles.registerButton}
                                    onPress={() => {
                                        navigate("/signup_type", {
                                            replace: true,
                                        });
                                    }}
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

export default CrearOfertaPage;
