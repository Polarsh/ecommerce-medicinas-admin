import { BiSave } from 'react-icons/bi'
import { MdCancel, MdDelete } from 'react-icons/md'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import useProduct from '../hooks/useProduct'
import useProductNavigate from '../hooks/useProductNavigate'

import { formatDateTime } from '../../../utils/functions'

import Title from '../../../shared/components/Title'
import CardComponent from '../../../shared/components/Cards/Card'
import InputViewComponent from '../../../shared/components/Form/View/InputView'
import ButtonComponent, { ButtonStyle } from '../../../shared/components/Button'
import FormPageSkeleton from '../../../shared/components/Skeletons/FormPageSkeleton'
import DeleteModalComponent from '../../../shared/components/Modals/Delete'
import ImageComponent from '../../../shared/components/Image'

export default function ProductViewPage() {
  const { productId } = useParams()

  const { product, isLoading, error, getProductById, deleteProduct } =
    useProduct()
  const { navigateToProductMenu, navigateToEditProduct } = useProductNavigate()

  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => {
    getProductById({ id: productId })
  }, [])

  const handleDelete = async productData => {
    try {
      await deleteProduct({ id: productData.id })
      navigateToProductMenu()
    } catch (error) {
      console.error(error)
    }
  }

  if (isLoading) return <FormPageSkeleton />
  if (error) return <div>Error: {error.message}</div>
  if (!product) return <div>No se encontró el producto</div>

  const productDetails = [
    { label: 'Nombre', value: product.productInfo.name },
    { label: 'Marca', value: product.productInfo.brand },
    { label: 'Categoría', value: product.productInfo.category },
    { label: 'Subcategoría', value: product.productInfo.subcategory },
    { label: 'Descripción', value: product.productInfo.description },
    { label: 'Cantidad', value: product.productInfo.presentationAmount },
    {
      label: 'Tipo de Presentación',
      value: product.productInfo.presentationType,
    },
    { label: 'Precio', value: `S/.${product.productInfo.price}` },
    {
      label: 'Forma de Administración',
      value: product.productInfo.administrationRoute,
    },
    {
      label: 'Requiere Receta Médica',
      value: product.productInfo.requiresPrescription ? 'Sí' : 'No',
    },
    {
      label: 'Visibilidad en la página',
      value: product.productInfo.isVisible ? 'Visible' : 'Oculto',
    },
    { label: 'Creado en', value: formatDateTime(product.createdAt) },
    { label: 'Última actualización', value: formatDateTime(product.updatedAt) },
  ]

  return (
    <>
      <div className='space-y-6'>
        <Title
          title={'Detalles del Producto'}
          description={'Aquí podrás ver los detalles del producto'}
        />

        {/* Información Básica */}
        <CardComponent label='Información Básica'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
            {productDetails.slice(0, 4).map((detail, index) => (
              <InputViewComponent
                key={index}
                label={detail.label}
                value={detail.value}
              />
            ))}
            <div className=' col-span-full'>
              <InputViewComponent
                label={'Descripción'}
                value={product.productInfo.description}
              />
            </div>
          </div>
        </CardComponent>

        {/* Detalles del Producto */}
        <CardComponent label='Detalles del Producto'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
            {productDetails.slice(5, 9).map((detail, index) => (
              <InputViewComponent
                key={index}
                label={detail.label}
                value={detail.value}
              />
            ))}
          </div>
        </CardComponent>

        {/* Imágenes del Producto */}
        {product.images?.length > 0 && (
          <CardComponent label='Imágenes del Producto'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className='relative h-48 border-gray-400 border-2 bg-white'>
                  <ImageComponent
                    image={image}
                    imageAlt={`Imagen del Producto ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </CardComponent>
        )}

        {/* Configuraciones Adicionales */}
        <CardComponent label='Configuraciones Adicionales'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
            {productDetails.slice(9, 11).map((detail, index) => (
              <InputViewComponent
                key={index}
                label={detail.label}
                value={detail.value}
              />
            ))}
          </div>
        </CardComponent>

        {/* Fechas */}
        <CardComponent label='Fechas'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
            {productDetails.slice(11).map((detail, index) => (
              <InputViewComponent
                key={index}
                label={detail.label}
                value={detail.value}
              />
            ))}
          </div>
        </CardComponent>

        {/* Botones de acción */}
        <div className='flex justify-end gap-4 mt-6'>
          <ButtonComponent
            onClick={() => setShowDeleteModal(!showDeleteModal)}
            icon={MdDelete}
            label={'Eliminar'}
            variant={ButtonStyle.Cancel}
          />
          <ButtonComponent
            onClick={navigateToProductMenu}
            icon={MdCancel}
            label={'Regresar'}
            variant={ButtonStyle.Cancel}
          />
          <ButtonComponent
            onClick={() => navigateToEditProduct(productId)}
            label={'Editar'}
            icon={BiSave}
            variant={ButtonStyle.Fill}
          />
        </div>
      </div>

      {/* Modal de confirmación para eliminar */}
      {showDeleteModal && (
        <DeleteModalComponent
          label={'Borrar producto'}
          onConfirmClick={() => handleDelete(product)}
          onCloseModal={() => setShowDeleteModal(false)}
        />
      )}
    </>
  )
}
