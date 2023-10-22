import * as yup from 'yup'

export const loginValidationSchema = yup.object().shape({
    user: yup
    .string()
    .required("Usuario es requerido"),
    password: yup
    .string()
    .required("Contraseña es requerida")
})