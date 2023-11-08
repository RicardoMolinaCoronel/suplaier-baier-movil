
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  name: yup.string().required('El nombre del producto es requerido'),
  description: yup.string().required('La descripción del producto es requerida'),
  Categoria: yup.string().required('La categoría del producto es requerida'),
});

export default validationSchema;
