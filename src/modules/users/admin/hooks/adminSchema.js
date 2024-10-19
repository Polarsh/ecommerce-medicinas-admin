import * as Yup from 'yup'

export const adminSchema = Yup.object({
  firstName: Yup.string().required('Es requerido'),
  lastName: Yup.string().required('Es requerido'),
  dni: Yup.string()
    .length(8, 'Debe tener 8 caracteres')
    .matches('^[0-9]*$', 'No es válido')
    .required('Es requerido'),
  email: Yup.string().email('No es válido').required('Es requerido'),
  phone: Yup.string()
    .length(9, 'Debe tener 9 caracteres')
    .matches('^9[0-9]{8}$', 'El teléfono no es válido')
    .required('Es requerido'),
}).required()
