import { PlusCircleIcon } from '@heroicons/react/20/solid'
import { BiSave } from 'react-icons/bi'
import { MdCancel } from 'react-icons/md'

import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'

import useAdministrator from '../hooks/useAdministrator'
import useAdministratorNavigate from '../hooks/useAdministratorNavigate'
import { adminSchema } from '../hooks/adminSchema'

import InputComponent from '../../../../shared/components/Form/Input'
import ButtonComponent, {
  ButtonStyle,
} from '../../../../shared/components/Button'
import LoadingModalComponent from '../../../../shared/components/Modals/Loading'

export default function AdminForm({ initialData }) {
  const isCreateForm = !Object.hasOwn(initialData, 'id')

  const { createAdministrator, updateAdministrator, isLoading, error } =
    useAdministrator()
  const { navigateToAdminMenu } = useAdministratorNavigate()

  const {
    control,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: initialData,
    resolver: yupResolver(adminSchema),
  })

  const onSubmit = async data => {
    try {
      if (isCreateForm) {
        await createAdministrator({ adminData: data })
      } else {
        await updateAdministrator({
          previousAdminData: initialData,
          newAdminData: data,
        })
      }
      navigateToAdminMenu()
      reset()
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = async (field, selectedOption) => {
    setValue(field, selectedOption)
    await trigger(field)
  }

  const buttonText = isCreateForm ? 'Añadir' : 'Guardar cambios'
  const buttonIcon = isCreateForm ? PlusCircleIcon : BiSave

  if (error) {
    // todo
    /* return <div>Error: {error.message}</div> */
  }

  return (
    <>
      <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-2 gap-6'>
          {/* Nombre */}
          <Controller
            name='firstName'
            control={control}
            render={({ field }) => (
              <InputComponent
                {...field}
                label='Nombre'
                placeholder='John'
                errors={errors.firstName}
                onChange={e => handleChange('firstName', e.target.value)}
              />
            )}
          />
          {/* Apellido */}
          <Controller
            name='lastName'
            control={control}
            render={({ field }) => (
              <InputComponent
                {...field}
                label='Apellido'
                placeholder='Doe'
                errors={errors.lastName}
                onChange={e => handleChange('lastName', e.target.value)}
              />
            )}
          />
          {/* DNI */}
          <Controller
            name='dni'
            control={control}
            render={({ field }) => (
              <InputComponent
                {...field}
                label='DNI'
                placeholder='12345678'
                errors={errors.dni}
                onChange={e => handleChange('dni', e.target.value)}
              />
            )}
          />
          {/* Email */}
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <InputComponent
                {...field}
                label='Email'
                placeholder='john.doe@gmail.com'
                errors={errors.email}
                onChange={e => handleChange('email', e.target.value)}
              />
            )}
          />
          {/* Teléfono */}
          <Controller
            name='phone'
            control={control}
            render={({ field }) => (
              <InputComponent
                {...field}
                label='Teléfono'
                placeholder='987654321'
                errors={errors.phone}
                onChange={e => handleChange('phone', e.target.value)}
              />
            )}
          />
        </div>

        <div className='flex justify-end gap-4'>
          <ButtonComponent
            onClick={navigateToAdminMenu}
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
