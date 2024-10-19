import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import useCategory from '../hooks/useCategory'
import CategoryForm from '../components/CategoryForm'

import Title from '../../../shared/components/Title'
import CardComponent from '../../../shared/components/Cards/Card'
import FormPageSkeleton from '../../../shared/components/Skeletons/FormPageSkeleton'

export default function CategoryEditPage() {
  const { categoryId } = useParams()

  const { category, isLoading, error, getCategoryById } = useCategory()

  useEffect(() => {
    getCategoryById({ id: categoryId })
  }, [])

  if (isLoading) return <FormPageSkeleton />

  if (error) return <div>Error: {error.message}</div>
  if (!category) return <div>No se encontró la categoría</div>

  return (
    <div className='space-y-6'>
      <Title
        title={'Editar categoria'}
        description={'Aqui podras editar el detalle de la categoria'}
      />

      <CardComponent>
        <CategoryForm initialData={category} />
      </CardComponent>
    </div>
  )
}
