import * as Yup from 'yup'

// Opciones válidas para algunas de las listas desplegables.
const validUnits = ['mg', 'ml', 'g', 'kg', 'L']
const presentationTypes = ['Tableta', 'Crema', 'Cápsula', 'Gel']
const administrationRoutes = ['Oral', 'Tópico', 'Inyectable', 'Sublingual']

export const productSchema = Yup.object().shape({
  productInfo: Yup.object()
    .shape({
      name: Yup.string()
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .max(100, 'El nombre no debe exceder los 100 caracteres')
        .required('El nombre es obligatorio'),
      brand: Yup.string().required('La marca es obligatoria'),
      category: Yup.string().required('La categoría es obligatoria'),
      subcategory: Yup.string().required('La subcategoría es obligatoria'),
      description: Yup.string()
        .max(1000, 'La descripción no debe exceder los 1000 caracteres')
        .required('La descripción es obligatoria'),
      presentationAmount: Yup.string()
        .matches(
          new RegExp(`^\\d+\\s*(${validUnits.join('|')})?$`),
          'Debe ser un número seguido de una unidad válida (mg, ml, g, kg, L)'
        )
        .required('La cantidad es obligatoria'),
      presentationType: Yup.string()
        .oneOf(presentationTypes, 'Selecciona un tipo de presentación válido')
        .required('El tipo de presentación es obligatorio'),
      price: Yup.number()
        .typeError('Es obligatorio')
        .positive('El precio debe ser un valor positivo')
        .min(1, 'El precio mínimo es 1.00')
        .required('Es obligatorio'),
      administrationRoute: Yup.string()
        .oneOf(
          administrationRoutes,
          'Selecciona una forma de administración válida'
        )
        .required('La forma de administración es obligatoria'),
      requiresPrescription: Yup.boolean().required(
        'El campo de receta médica es obligatorio'
      ),
      isVisible: Yup.boolean().required(
        'El campo de visibilidad es obligatorio'
      ),
    })
    .required(),

  images: Yup.array()
    .of(Yup.mixed().required('Se requiere una imagen'))
    .min(1, 'Debes subir al menos una imagen')
    .max(4, 'Solo puedes subir hasta 4 imágenes'),
})
