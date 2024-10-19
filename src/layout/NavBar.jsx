import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

import { MoonIcon as MoonDarkIcon } from '@heroicons/react/24/solid'
import { findTitleByPath } from '../routes/Routes'

import {
  Bars3Icon,
  MoonIcon as MoonLightIcon,
} from '@heroicons/react/24/outline'

import { useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useAuth } from '../context/AuthProvider'

export default function NavBarComponent({ openSideBar }) {
  const location = useLocation()
  const path = location.pathname

  const { darkMode, setDarkMode } = useApp()
  const { currentUser, logout } = useAuth()

  return (
    <div>
      <div className='sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8'>
        <button
          type='button'
          className='-m-2.5 p-2.5 text-gray-700 lg:hidden'
          onClick={openSideBar}>
          <span className='sr-only'>Abrir menú lateral</span>
          <Bars3Icon className='h-6 w-6' aria-hidden='true' />
        </button>

        {/* Separator */}
        <div className='h-6 w-px bg-gray-900/10 lg:hidden' aria-hidden='true' />

        {/* NavBar */}
        <div className='flex flex-1 gap-x-4 self-stretch lg:gap-x-6'>
          <div className='relative flex flex-1'>
            <div className=' flex items-center text-lg font-semibold'>
              {findTitleByPath(path)}
            </div>
          </div>
          {/* Botón de modo oscuro */}
          <div className='flex items-center gap-x-4 lg:gap-x-6'>
            <button
              type='button'
              className='-m-2.5 p-2.5 text-gray-400 hover:text-gray-500'
              onClick={() => setDarkMode(!darkMode)} // Alterna el modo oscuro
            >
              <span className='sr-only'>Alternar modo oscuro</span>
              {darkMode ? (
                <MoonDarkIcon className='h-6 w-6' aria-hidden='true' />
              ) : (
                <MoonLightIcon className='h-6 w-6' aria-hidden='true' />
              )}
            </button>
          </div>
        </div>

        {/* Separator */}
        <div
          aria-hidden='true'
          className='hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10'
        />

        {/* Profile dropdown */}
        <Menu as='div' className='relative'>
          <MenuButton className='-m-1.5 flex items-center p-1.5'>
            <span className='sr-only'>Abrir menú de usuario</span>
            <img
              alt=''
              src='https://firebasestorage.googleapis.com/v0/b/auto-ventas-lima-web.appspot.com/o/imageData%2FimageProfile.webp?alt=media&token=596a9291-3a97-4e2e-aa31-836abfda5644'
              className='h-8 w-8 rounded-full bg-gray-50'
            />
            <span className='hidden lg:flex lg:items-center'>
              <span
                aria-hidden='true'
                className='ml-4 text-sm font-semibold leading-6 text-gray-900'>
                {currentUser && currentUser.email}
              </span>
              <ChevronDownIcon
                aria-hidden='true'
                className='ml-2 h-5 w-5 text-gray-400'
              />
            </span>
          </MenuButton>
          <MenuItems
            transition
            className='absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in'>
            <MenuItem>
              <a
                href='mi-perfil'
                className='block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50'>
                Mi perfil
              </a>
            </MenuItem>
            <MenuItem>
              <button
                className='block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50'
                onClick={logout}>
                Cerrar sesión
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </div>
  )
}
