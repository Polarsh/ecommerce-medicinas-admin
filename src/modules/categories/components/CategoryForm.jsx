import { PlusCircleIcon } from '@heroicons/react/20/solid'
import { BiSave } from 'react-icons/bi'
import { MdCancel, MdClose } from 'react-icons/md'

import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'

import useCategory from '../hooks/useCategory'
import useCategoryNavigate from '../hooks/useCategoryNavigate'
import { categorySchema } from '../hooks/categorySchema'

import ButtonComponent, { ButtonStyle } from '../../../shared/components/Button'
import InputComponent from '../../../shared/components/Form/Input'
import LabelComponent from '../../../shared/components/Label'
import LoadingModalComponent from '../../../shared/components/Modals/Loading'

export default function CategoryForm({ initialData }) {
  const isCreateForm = !Object.hasOwn(initialData, 'id')

  const { createCategory, updateCategory, isLoading, error } = useCategory()
  const { navigateToCategoryMenu } = useCategoryNavigate()

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    trigger,
  } = useForm({
    defaultValues: {
      ...initialData,
      subcategories: initialData.subcategories || [],
    },
    resolver: yupResolver(categorySchema),
  })

  const subcategories = watch('subcategories')
  const newSubcategory = watch('newSubcategory')

  const onSubmit = async data => {
    const { newSubcategory, ...rest } = data
    try {
      if (isCreateForm) {
        await createCategory({ categoryData: rest })
      } else {
        await updateCategory({
          previousCategoryData: initialData,
          newCategoryData: rest,
        })
      }
      navigateToCategoryMenu()
      reset()
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddSubcategory = async () => {
    if (newSubcategory && !subcategories.includes(newSubcategory)) {
      setValue('subcategories', [...subcategories, newSubcategory])
      setValue('newSubcategory', '')
    }

    await trigger('subcategories')
  }

  const handleRemoveSubcategory = indexToRemove => {
    setValue(
      'subcategories',
      subcategories.filter((_, index) => index !== indexToRemove)
    )
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
          {/* Nombre de la categoría */}
          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <InputComponent
                {...field}
                label='Nombre de la Categoría'
                placeholder='Ej. Dolor y Fiebre'
                errors={errors.name}
              />
            )}
          />

          <div className='flex items-center gap-4'>
            <Controller
              name='newSubcategory'
              control={control}
              render={({ field }) => (
                <InputComponent
                  {...field}
                  label='Añadir Subcategoría'
                  placeholder='Ej. Analgésico'
                  errors={errors.newSubcategory}
                />
              )}
            />
            <ButtonComponent
              onClick={handleAddSubcategory}
              icon={PlusCircleIcon}
              label={'Añadir'}
              variant={ButtonStyle.Fill}
              className=' mt-6 '
            />
          </div>
        </div>

        {/* Subcategorías */}
        <div>
          <LabelComponent label={'Subcategorías'} htmlFor={'subCategories'} />
          <div className='flex flex-wrap gap-2'>
            {subcategories.length > 0 ? (
              <>
                {subcategories.map((subcategory, index) => (
                  <div
                    key={index}
                    className='relative flex items-center bg-backgroundLight border-primary border-2 border-opacity-50 text-primary text-base px-3 py-1 rounded-md cursor-pointer'>
                    {subcategory}
                    <MdClose
                      onClick={() => handleRemoveSubcategory(index)}
                      className='ml-2 text-gray-500 hover:text-red-600 cursor-pointer'
                    />
                  </div>
                ))}
              </>
            ) : (
              <div className='block px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'>
                Aún no has añadido subcategorías
              </div>
            )}
          </div>
          {errors.subcategories && (
            <p className='text-red-600 text-sm mt-2'>
              {errors.subcategories.message}
            </p>
          )}
        </div>

        {/* Botones de acción */}
        <div className='flex justify-end gap-4 mt-6'>
          <ButtonComponent
            onClick={navigateToCategoryMenu}
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
