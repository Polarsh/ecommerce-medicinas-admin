import { useEffect, useState, useRef } from 'react'
import useBrand from '../../brands/hooks/useBrand'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { PlusCircleIcon } from '@heroicons/react/20/solid'
import { BiSave } from 'react-icons/bi'
import { MdCancel } from 'react-icons/md'

import useProduct from '../hooks/useProduct'
import useProductNavigate from '../hooks/useProductNavigate'
import { productSchema } from '../hooks/productSchema'

import useCategory from '../../categories/hooks/useCategory'

import ImagesForm from './ImagesForm'

import ButtonComponent, { ButtonStyle } from '../../../shared/components/Button'
import InputComponent from '../../../shared/components/Form/Input'
import LoadingModalComponent from '../../../shared/components/Modals/Loading'
import SelectComponent from '../../../shared/components/Form/Select'
import ToggleComponent from '../../../shared/components/Form/Toogle'
import InputPriceComponent from '../../../shared/components/Form/InputPrice'
import TextAreaComponent from '../../../shared/components/Form/TextArea'
import CardComponent from '../../../shared/components/Cards/Card'
import InputQuantityComponent from '../../../shared/components/Form/InputQuantity'

export default function ProductForm({ initialData }) {
  const isCreateForm = !Object.hasOwn(initialData, 'id')
  const [imageList, setImageList] = useState(initialData.images || [])

  const { createProduct, updateProduct, isLoading, error } = useProduct()
  const { navigateToProductMenu } = useProductNavigate()

  const { brandList, getAllBrands } = useBrand()
  const { categoryList, getAllCategories } = useCategory()

  const categoryRef = useRef(null) // To track the initial category
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    trigger,
    watch,
  } = useForm({
    defaultValues: initialData,
    resolver: yupResolver(productSchema),
  })

  const selectedCategory = watch('productInfo.category')

  useEffect(() => {
    if (brandList.length === 0) {
      getAllBrands()
    }
    if (categoryList.length === 0) {
      getAllCategories()
    }
    // Set the initial category value to the ref
    categoryRef.current = selectedCategory
  }, [])

  useEffect(() => {
    // Reset subcategory only if categoryRef is not the same as selectedCategory
    if (categoryRef.current !== selectedCategory) {
      setValue('productInfo.subcategory', null)
    }
  }, [selectedCategory, setValue])

  const onSubmit = async data => {
    const { images, ...rest } = data

    const productData = {
      ...rest,
      images: imageList,
    }

    try {
      if (isCreateForm) {
        await createProduct({ productData })
      } else {
        await updateProduct({
          previousProductData: initialData,
          newProductData: productData,
        })
      }
      navigateToProductMenu()
      reset()
    } catch (error) {
      console.log(error)
    }
  }

  const handleImagesChange = async images => {
    setImageList(images)

    if (Array.isArray(images)) {
      setValue('images', images)
      await trigger('images') // Revalida el campo de imágenes
    }
  }

  const buttonText = isCreateForm ? 'Añadir' : 'Guardar'
  const buttonIcon = isCreateForm ? PlusCircleIcon : BiSave

  const brandOptions = brandList.map(brand => ({
    value: brand.id,
    label: brand.name,
  }))

  const categoryOptions = categoryList.map(category => ({
    value: category.id,
    label: category.name,
  }))

  const subcategoryOptions =
    categoryList
      .find(category => category.name === selectedCategory)
      ?.subcategories.map(subcategory => ({
        value: subcategory,
        label: subcategory,
      })) || []

  const administrationOptions = [
    { value: 'Oral', label: 'Oral' },
    { value: 'Tópico', label: 'Tópico' },
    { value: 'Inyectable', label: 'Inyectable' },
    { value: 'Sublingual', label: 'Sublingual' },
    // Agrega más opciones según sea necesario
  ]

  const presentationTypeOptions = [
    { value: 'Tableta', label: 'Tableta' },
    { value: 'Crema', label: 'Crema' },
    { value: 'Cápsula', label: 'Cápsula' },
    { value: 'Gel', label: 'Gel' },
    // Agrega más tipos de presentaciones según sea necesario
  ]

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <>
      <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
        {/* Información Básica */}
        <CardComponent
          label={'Información Básica'}
          className='space-y-6 bg-gray-50'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4'>
            <Controller
              name='productInfo.name'
              control={control}
              render={({ field }) => (
                <InputComponent
                  {...field}
                  label='Nombre'
                  placeholder='Ej. Panadol'
                  errors={errors.productInfo && errors.productInfo.name}
                />
              )}
            />

            <Controller
              name='productInfo.brand'
              control={control}
              render={({ field }) => (
                <SelectComponent
                  {...field}
                  label='Marca'
                  options={brandOptions}
                  placeholder='Selecciona la marca'
                  errors={errors.productInfo && errors.productInfo.brand}
                />
              )}
            />

            <Controller
              name='productInfo.category'
              control={control}
              render={({ field }) => (
                <SelectComponent
                  {...field}
                  label='Categoría'
                  options={categoryOptions}
                  placeholder='Selecciona la categoría'
                  errors={errors.productInfo && errors.productInfo.category}
                />
              )}
            />

            <Controller
              name='productInfo.subcategory'
              control={control}
              render={({ field }) => (
                <SelectComponent
                  {...field}
                  label='Subcategoría'
                  options={subcategoryOptions}
                  placeholder='Selecciona la subcategoría'
                  errors={errors.productInfo && errors.productInfo.subcategory}
                  isDisabled={!selectedCategory}
                />
              )}
            />

            <div className='col-span-full'>
              <Controller
                name='productInfo.description'
                control={control}
                render={({ field }) => (
                  <TextAreaComponent
                    {...field}
                    label='Descripción'
                    placeholder='Ingresa una descripción detallada...'
                    errors={
                      errors.productInfo && errors.productInfo.description
                    }
                  />
                )}
              />
            </div>
          </div>
        </CardComponent>

        {/* Detalles del Producto */}
        <CardComponent label={'Detalles del Producto'} className='bg-gray-50'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4'>
            <Controller
              name='productInfo.presentationAmount'
              control={control}
              render={({ field }) => (
                <InputQuantityComponent
                  {...field}
                  label='Cantidad'
                  placeholder='Ej. 500'
                  errors={
                    errors.productInfo && errors.productInfo.presentationAmount
                  }
                />
              )}
            />

            <Controller
              name='productInfo.presentationType'
              control={control}
              render={({ field }) => (
                <SelectComponent
                  {...field}
                  label='Tipo de Presentación'
                  options={presentationTypeOptions}
                  placeholder='Selecciona el tipo'
                  errors={
                    errors.productInfo && errors.productInfo.presentationType
                  }
                />
              )}
            />

            <Controller
              name='productInfo.price'
              control={control}
              render={({ field }) => (
                <InputPriceComponent
                  {...field}
                  label='Precio'
                  placeholder='9.99'
                  errors={errors.productInfo && errors.productInfo.price}
                />
              )}
            />

            <Controller
              name='productInfo.administrationRoute'
              control={control}
              render={({ field }) => (
                <SelectComponent
                  {...field}
                  label='Forma de Administración'
                  options={administrationOptions}
                  placeholder='Selecciona la forma de administración'
                  errors={
                    errors.productInfo && errors.productInfo.administrationRoute
                  }
                />
              )}
            />
          </div>
        </CardComponent>

        {/* Imágenes del Producto */}
        <CardComponent className='bg-gray-50'>
          <ImagesForm
            images={imageList}
            setImages={handleImagesChange}
            errors={errors.images}
          />
        </CardComponent>

        {/* Configuraciones Adicionales */}
        <CardComponent
          label={'Configuraciones Adicionales'}
          className='bg-gray-50'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4'>
            <Controller
              name='productInfo.requiresPrescription'
              control={control}
              render={({ field }) => (
                <ToggleComponent
                  {...field}
                  label='Requiere Receta Médica'
                  value={field.value}
                  onChange={value =>
                    setValue('productInfo.requiresPrescription', value)
                  }
                />
              )}
            />
            <Controller
              name='productInfo.isVisible'
              control={control}
              render={({ field }) => (
                <ToggleComponent
                  {...field}
                  label='Visibilidad en la página'
                  value={field.value}
                  onChange={value => setValue('productInfo.isVisible', value)}
                />
              )}
            />
          </div>
        </CardComponent>

        {/* Botones de acción */}
        <div className='flex justify-end gap-4 mt-6'>
          <ButtonComponent
            onClick={navigateToProductMenu}
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
