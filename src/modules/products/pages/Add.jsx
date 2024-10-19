import Title from '../../../shared/components/Title'
import ProductForm from '../components/ProductForm'

export default function ProductAddPage() {
  const initialData = {
    productInfo: {
      name: '', // Nombre del producto
      brand: '', // ID de la marca seleccionada
      category: '', // ID de la categoría seleccionada
      subcategory: '', // Subcategoría seleccionada
      description: '', // Descripción del producto
      presentationAmount: '', // Cantidad (e.g., 500)
      presentationType: '', // Tipo de presentación (e.g., 'Tableta')
      price: 0, // Precio del producto
      administrationRoute: '', // Forma de administración (e.g., 'Oral')
      requiresPrescription: false, // Booleano para receta médica
      isVisible: true, // Booleano para visibilidad en la página
    },
    images: [], // Arreglo de imágenes
  }

  return (
    <div className='space-y-6'>
      <Title
        title={'Crear Producto'}
        description={'Aquí podrás crear un nuevo producto en la tienda'}
      />

      <ProductForm initialData={initialData} />
    </div>
  )
}
