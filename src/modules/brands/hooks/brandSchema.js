import * as Yup from 'yup'

export const brandSchema = Yup.object({
  name: Yup.string()
    .required('El nombre es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres'),
}).required()
