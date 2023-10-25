import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Formik, useField } from "formik";
import { StatusBar } from "expo-status-bar";
import { Octicons, Ionicons } from "@expo/vector-icons";
import { useNavigate } from "react-router-native";
import { loginValidationSchema } from "../components/loginValidationSchema";
import theme from "../../theme";
import StyledText from "../../styles/StyledText";
import StyledTextInput from "../../styles/StyledTextInput";
const initialValues = {
  user: "",
  password: "",
};

const FormikInputValue = ({
  name,
  icon,
  label,
  isPassword,
  hidePassword,
  setHidePassword,
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

const LoginPage = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const navigate = useNavigate();
  return (
    <>
      <View style={styles.container}>
        <Image
          resizeMode="cover"
          source={require("../../../public/suplaier_horizontal_degradado_recortado.png")}
          style={styles.pageLogo}
        />
        <StyledText
          color="tertiary"
          fontWeight="bold"
          fontSize="title"
          style={styles.pageTitle}
        >
          Iniciar sesión
        </StyledText>
        <StyledText
          color="tertiary"
          fontWeight="normal"
          fontSize="subheading"
          style={styles.subtitle}
        >
          Para comenzar inicia sesión con tu usuario y contraseña
        </StyledText>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={initialValues}
          onSubmit={(values) => navigate("/proveedor/home", {})}
        >
          {({ handleSubmit }) => {
            return (
              <View style={styles.form}>
                <FormikInputValue
                  name="user"
                  icon="person"
                  placeholder="ejemplo_proveedor.004"
                  placeholderTextColor={theme.colors.gray1}
                  label="Usuario"
                />
                <FormikInputValue
                  name="password"
                  icon="lock"
                  placeholder="**********"
                  placeholderTextColor={theme.colors.gray1}
                  secureTextEntry={hidePassword}
                  label="Contraseña"
                  isPassword
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit}
                >
                  <StyledText
                    fontSize="subheading"
                    color="secondary"
                    fontWeight="bold"
                  >
                    Log in
                  </StyledText>
                </TouchableOpacity>
                <View style={styles.borderLine} />
                <TouchableOpacity style={styles.registerButton} onPress>
                  <StyledText
                    fontSize="subheading"
                    color="secondary"
                    fontWeight="bold"
                  >
                    Registrarse
                  </StyledText>
                </TouchableOpacity>
                <View style={styles.extraView}>
                  <StyledText
                    fontSize="subheading"
                    color="primary"
                    style={styles.extraText}
                  >
                    ¿Aún no tienes cuenta?,{" "}
                  </StyledText>
                  <TouchableOpacity style={styles.extraTextLink}>
                    <StyledText fontSize="subheading" style={styles.textLink}>
                      ¡Regístrate!
                    </StyledText>
                  </TouchableOpacity>
                </View>

                {/* <Button onPress={handleSubmit} title='Iniciar sesión'/> */}
              </View>
            );
          }}
        </Formik>
      </View>
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
    color: "black",
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
});

export default LoginPage;
