import * as yup from 'yup';

const validationSchema = yup.object().shape({
  name: yup.string().required('El nombre del producto es requerido')
  .min(3,"El nombre no puede ser menor a 3 caracteres")
  .max(60, "El nombre no puede ser mayor a 60 caracteres")
  .test('valid-structure', '\" - \' son caracteres especiales inválidos',
  function (value) {
     const regex=/^[^-"']*$/;
     return regex.test(value) 
 }),
  description: yup.string().required('La descripción es requerida')
  .min(5,"La descripción no puede ser menor a 5 caracteres")
  .max(480,"La descripción no puede ser superior a los 480 caracteres")
  .test('valid-structure', '\" - \' son caracteres especiales inválidos',
  function (value) {
     const regex=/^[^-"']*$/;
     return regex.test(value) 
 }),
  categoria: yup.number().required('La categoría del producto es requerida'),
});

export default validationSchema;
