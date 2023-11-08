import * as yup from 'yup';

const RegisterValidationSchema = yup.object().shape({
  user: yup.string().required('El usuario es requerido'),
  password: yup.string().required('La contraseña es requerida'),
  password2: yup.string().oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir'),
  mail: yup.string().email('Ingresa un correo electrónico válido').required('El correo electrónico es requerido'),
  nombre: yup.string().required('El nombre es requerido'),
  tipoID: yup.string().required('El ID es requerido'),
});

export default RegisterValidationSchema;
