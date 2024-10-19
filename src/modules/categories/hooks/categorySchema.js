import * as Yup from 'yup'

export const categorySchema = Yup.object({
  name: Yup.string()
    .required('El nombre es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres'),
  subcategories: Yup.array()
    .of(
      Yup.string()
        .required('El nombre de la subcategoría es requerido')
        .min(3, 'La subcategoría debe tener al menos 3 caracteres')
    )
    .required('Debe proporcionar al menos una subcategoría')
    .min(1, 'Debe tener al menos una subcategoría'),
}).required()
