import { PlusCircleIcon } from '@heroicons/react/20/solid'
import { BiSave } from 'react-icons/bi'
import { MdCancel } from 'react-icons/md'

import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'

import useBrand from '../hooks/useBrand' // Asegúrate de que el hook de brand esté configurado
import useBrandNavigate from '../hooks/useBrandNavigate' // Asegúrate de que el hook de navegación de brand esté configurado
import { brandSchema } from '../hooks/brandSchema' // Asegúrate de tener el esquema de validación de brand

import ButtonComponent, { ButtonStyle } from '../../../shared/components/Button'
import InputComponent from '../../../shared/components/Form/Input'
import LoadingModalComponent from '../../../shared/components/Modals/Loading'

export default function BrandForm({ initialData }) {
  const isCreateForm = !Object.hasOwn(initialData, 'id')

  const { createBrand, updateBrand, isLoading, error } = useBrand()
  const { navigateToBrandMenu } = useBrandNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: initialData,
    resolver: yupResolver(brandSchema),
  })

  const onSubmit = async data => {
    try {
      if (isCreateForm) {
        await createBrand({ brandData: data })
      } else {
        await updateBrand({
          previousBrandData: initialData,
          newBrandData: data,
        })
      }
      navigateToBrandMenu()
      reset()
    } catch (error) {
      console.log(error)
    }
  }

  const buttonText = isCreateForm ? 'Añadir' : 'Guardar'
  const buttonIcon = isCreateForm ? PlusCircleIcon : BiSave

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <>
      <form className='space-y-8' onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          {/* Nombre de la marca */}
          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <InputComponent
                {...field}
                label='Nombre de la Marca'
                placeholder='Ej. CeraVe'
                errors={errors.name}
              />
            )}
          />
        </div>

        {/* Botones de acción */}
        <div className='flex justify-end gap-4 mt-6'>
          <ButtonComponent
            onClick={navigateToBrandMenu}
            icon={MdCancel}
            label={'Cancelar'}
            variant={ButtonStyle.Cancel}
          />
          <ButtonComponent
            isSubmit={true}
            icon={buttonIcon}
            label={buttonText}
            variant={ButtonStyle.Fill}
          />
        </div>
      </form>
      {isLoading && <LoadingModalComponent isOpen={isLoading} />}
    </>
  )
}
