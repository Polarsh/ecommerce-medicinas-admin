import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { BiSave } from 'react-icons/bi'
import { MdCancel } from 'react-icons/md'

import useBrand from '../hooks/useBrand'
import useBrandNavigate from '../hooks/useBrandNavigate'
import FormPageSkeleton from '../../../shared/components/Skeletons/FormPageSkeleton'
import { formatDateTime } from '../../../utils/functions'
import Title from '../../../shared/components/Title'
import CardComponent from '../../../shared/components/Cards/Card'
import InputViewComponent from '../../../shared/components/Form/View/InputView'
import ButtonComponent, { ButtonStyle } from '../../../shared/components/Button'
import DeleteModalComponent from '../../../shared/components/Modals/Delete'

export default function BrandViewPage() {
  const { brandId } = useParams()

  const { brand, isLoading, error, getBrandById, deleteBrand } = useBrand()

  const { navigateToBrandMenu, navigateToEditBrand } = useBrandNavigate()

  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => {
    getBrandById({ id: brandId })
  }, [])

  const handleDelete = async brandData => {
    try {
      await deleteBrand({ id: brandData.id })
      navigateToBrandMenu()
    } catch (error) {
      console.error(error)
    }
  }

  if (isLoading) return <FormPageSkeleton />

  if (error) return <div>Error: {error.message}</div>
  if (!brand) return <div>No se encontró la marca</div>

  const brandDetails = [
    {
      label: 'Nombre',
      value: brand.name,
    },
    {
      label: 'Creado en',
      value: formatDateTime(brand.createdAt),
    },
    {
      label: 'Última actualización',
      value: formatDateTime(brand.updatedAt),
    },
  ]

  return (
    <>
      <div className='space-y-6'>
        <Title
          title={'Detalles de la marca'}
          description={'Aquí podrás encontrar el detalle de la marca'}
        />

        <CardComponent>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
            {brandDetails.map((detail, index) => (
              <InputViewComponent
                key={index}
                label={detail.label}
                value={detail.value}
              />
            ))}
          </div>

          {/* Botones */}
          <div className='mt-6 flex flex-wrap gap-4 justify-end sm:flex-nowrap'>
            <ButtonComponent
              onClick={navigateToBrandMenu}
              icon={MdCancel}
              label={'Cancelar'}
              variant={ButtonStyle.Cancel}
            />
            <ButtonComponent
              onClick={() => navigateToEditBrand(brandId)}
              label={'Editar'}
              icon={BiSave}
              variant={ButtonStyle.Fill}
            />
          </div>
        </CardComponent>
      </div>
      {showDeleteModal && (
        <DeleteModalComponent
          label={'Borrar marca'}
          onConfirmClick={() => handleDelete(brand)}
          onCloseModal={() => setShowDeleteModal(false)}
        />
      )}
    </>
  )
}
