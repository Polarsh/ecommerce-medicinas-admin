import { EnvelopeIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useAuth } from '../context/AuthProvider'

import LogoComponent from '../shared/components/Logo'

// Esquema de validación con Yup
const schema = yup.object().shape({
  email: yup
    .string()
    .email('El correo electrónico no es válido')
    .required('El correo electrónico es obligatorio'),
  password: yup.string().required('La contraseña es obligatoria'),
})

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [showPassword, setShowPassword] = useState(false)

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async data => {
    try {
      await login(data.email, data.password)
      navigate('/') // Redirigir a la ruta principal
    } catch (error) {
      toast.error('Error al iniciar sesión. Verifica tus credenciales.')
    }
  }

  return (
    <div className='flex min-h-screen flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8'>
      {/* Diagonal */}
      <div
        aria-hidden='true'
        className='absolute inset-y-0 right-1/2 -z-10 -mr-96 w-screen origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96'
      />
      {/* Gradiente superior izquierdo */}
      <div
        aria-hidden='true'
        className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'>
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-border to-primary opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
        />
      </div>
      {/* Form */}
      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-[480px] bg-white px-6 py-12 shadow-2xl sm:rounded-lg sm:px-12'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <LogoComponent size='h-14' />
          <h2 className='mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Inicia sesión en tu cuenta
          </h2>
        </div>
        <div className='mt-10'>
          <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium leading-6 text-gray-900'>
                Correo electrónico
              </label>
              <div className='relative mt-2 rounded-md shadow-sm'>
                <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                  <EnvelopeIcon
                    aria-hidden='true'
                    className='h-5 w-5 text-gray-400'
                  />
                </div>
                <Controller
                  name='email'
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id='email'
                      type='email'
                      placeholder='you@example.com'
                      className={`block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 ${
                        errors.email ? 'ring-red-500' : ''
                      }`}
                    />
                  )}
                />
              </div>
              {errors.email && (
                <p className='mt-2 text-sm text-red-600'>
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium leading-6 text-gray-900'>
                Contraseña
              </label>
              <div className='relative mt-2 rounded-md shadow-sm'>
                <div className='absolute inset-y-0 left-0 flex items-center pl-3'>
                  {showPassword ? (
                    <EyeSlashIcon
                      aria-hidden='true'
                      className='h-5 w-5 text-gray-400 cursor-pointer'
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <EyeIcon
                      aria-hidden='true'
                      className='h-5 w-5 text-gray-400 cursor-pointer'
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </div>
                <Controller
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id='password'
                      type={showPassword ? 'text' : 'password'}
                      autoComplete='current-password'
                      className={`block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 ${
                        errors.password ? 'ring-red-500' : ''
                      }`}
                    />
                  )}
                />
              </div>
              {errors.password && (
                <p className='mt-2 text-sm text-red-600'>
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className='text-end text-sm leading-6'>
              <a
                href='#'
                className='font-semibold text-primary hover:text-secondary'>
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'>
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Gradiente inferior derecho */}
      <div
        aria-hidden='true'
        className='absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl '>
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary to-border opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]'
        />
      </div>
    </div>
  )
}
