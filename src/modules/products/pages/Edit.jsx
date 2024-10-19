import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import useProduct from '../hooks/useProduct'
import ProductForm from '../components/ProductForm'

import Title from '../../../shared/components/Title'
import FormPageSkeleton from '../../../shared/components/Skeletons/FormPageSkeleton'

export default function ProductEditPage() {
  const { productId } = useParams()

  const { product, isLoading, error, getProductById } = useProduct()

  useEffect(() => {
    getProductById({ id: productId })
  }, [])

  if (isLoading) return <FormPageSkeleton />
  if (error) return <div>Error: {error.message}</div>
  if (!product) return <div>No se encontró el producto</div>

  return (
    <div className='space-y-6'>
      <Title
        title={'Editar Producto'}
        description={'Aquí podrás editar los detalles del producto'}
      />

      <ProductForm initialData={product} />
    </div>
  )
}
