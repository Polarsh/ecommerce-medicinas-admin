import CardComponent from '../../../shared/components/Cards/Card'
import Title from '../../../shared/components/Title'
import CategoryForm from '../components/CategoryForm'

export default function CategoryAddPage() {
  const initialData = {
    name: '',
    subcategories: [],
  }

  return (
    <div className='space-y-6'>
      <Title
        title={'Crear categoría'}
        description={'Aqui podrás crear el detalle de la categoria'}
      />

      <CardComponent>
        <CategoryForm initialData={initialData} />
      </CardComponent>
    </div>
  )
}
