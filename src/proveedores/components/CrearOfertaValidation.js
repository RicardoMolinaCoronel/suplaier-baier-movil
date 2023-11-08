
import * as Yup from 'yup';

const CrearOfertaValidation = Yup.object().shape({
    //title: Yup.string().required('Title is required'),
    //description: Yup.string().required('Description is required'),
    pu: Yup.number().required('El precio Unitario es requerido').positive('El precio debe ser un número positivo'),
    pi: Yup.number()
        .required('El precio Instantáneo es requerido')
        .positive('El precio debe ser un número positivo')
        .test('higher-price', 'El precio instantaneo debe ser mayor al precio unitario', function (value) {
            const pu = this.parent.pu;
            return value > pu;
        }),
    min: Yup.number().required('La cantidad minima es requerida').integer('La cantidad minima debe ser un número entero').positive('La cantidad minima debe ser un número positivo'),
    max: Yup.number()
        .required('La cantidad maxima es requerida')
        .integer('La cantidad maxima debe ser un número entero')
        .positive('La cantidad maxima debe ser un número positivo')
        .test('higher-min', 'La cantidad maxima debe ser mayor o igual a la cantidad minima', function (value) {
            const min = this.parent.min;
            return value >= min;
        }),
});

export default CrearOfertaValidation;
