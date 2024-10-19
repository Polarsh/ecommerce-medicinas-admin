import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

/* import { TrashIcon } from '@heroicons/react/20/solid'
 */ import { BiSave } from 'react-icons/bi'

import useCategory from '../hooks/useCategory'
import useCategoryNavigate from '../hooks/useCategoryNavigate'
import FormPageSkeleton from '../../../shared/components/Skeletons/FormPageSkeleton'
import { formatDateTime } from '../../../utils/functions'
import Title from '../../../shared/components/Title'
import CardComponent from '../../../shared/components/Cards/Card'
import InputViewComponent from '../../../shared/components/Form/View/InputView'
import ButtonComponent, { ButtonStyle } from '../../../shared/components/Button'
import DeleteModalComponent from '../../../shared/components/Modals/Delete'
import { MdCancel } from 'react-icons/md'

export default function CategoryViewPage() {
  const { categoryId } = useParams()

  const { category, isLoading, error, getCategoryById, deleteCategory } =
    useCategory()

  const { navigateToCategoryMenu, navigateToEditCategory } =
    useCategoryNavigate()

  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => {
    getCategoryById({ id: categoryId })
  }, [])

  const handleDelete = async categoryData => {
    try {
      await deleteCategory({ id: categoryData.id })
      navigateToCategoryMenu()
    } catch (error) {
      console.error(error)
    }
  }

  if (isLoading) return <FormPageSkeleton />

  if (error) return <div>Error: {error.message}</div>
  if (!category) return <div>No se encontró la categoría</div>

  const categoryDetails = [
    {
      label: 'Nombre',
      value: category.name,
    },
    {
      label: 'Subcategorías',
      value: category.subcategories?.join(', '),
    },
    {
      label: 'Creado en',
      value: formatDateTime(category.createdAt),
    },
    {
      label: 'Última actualización',
      value: formatDateTime(category.updatedAt),
    },
  ]

  return (
    <>
      <div className='space-y-6'>
        <Title
          title={'Detalles de la categoría'}
          description={'Aquí podrás encontrar el detalle de la categoría'}
        />

        <CardComponent>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
            {categoryDetails.map((detail, index) => (
              <InputViewComponent
                key={index}
                label={detail.label}
                value={detail.value}
              />
            ))}
          </div>

          {/* Botones */}
          <div className='mt-6 flex flex-wrap gap-4 justify-end sm:flex-nowrap'>
            {/* <ButtonComponent
              onClick={() => setShowDeleteModal(!showDeleteModal)}
              label={'Eliminar'}
              icon={TrashIcon}
              variant={ButtonStyle.Cancel}
            /> */}
            <ButtonComponent
              onClick={navigateToCategoryMenu}
              icon={MdCancel}
              label={'Cancelar'}
              variant={ButtonStyle.Cancel}
            />
            <ButtonComponent
              onClick={() => navigateToEditCategory(categoryId)}
              label={'Editar'}
              icon={BiSave}
              variant={ButtonStyle.Fill}
            />
          </div>
        </CardComponent>
      </div>
      {showDeleteModal && (
        <DeleteModalComponent
          label={'Borrar categoría'}
          onConfirmClick={() => handleDelete(category)}
          onCloseModal={() => setShowDeleteModal(false)}
        />
      )}
    </>
  )
}
