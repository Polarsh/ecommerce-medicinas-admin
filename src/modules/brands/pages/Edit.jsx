import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import useBrand from '../hooks/useBrand'
import BrandForm from '../components/BrandForm'

import Title from '../../../shared/components/Title'
import CardComponent from '../../../shared/components/Cards/Card'
import FormPageSkeleton from '../../../shared/components/Skeletons/FormPageSkeleton'

export default function BrandEditPage() {
  const { brandId } = useParams()

  const { brand, isLoading, error, getBrandById } = useBrand()

  useEffect(() => {
    getBrandById({ id: brandId })
  }, [])

  if (isLoading) return <FormPageSkeleton />

  if (error) return <div>Error: {error.message}</div>
  if (!brand) return <div>No se encontró la marca</div>

  return (
    <div className='space-y-6'>
      <Title
        title={'Editar Marca'}
        description={'Aquí podrás editar el detalle de la marca'}
      />

      <CardComponent>
        <BrandForm initialData={brand} />
      </CardComponent>
    </div>
  )
}
