import { Fragment, useState } from 'react'
import { Outlet } from 'react-router-dom'

import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react'

import { XMarkIcon } from '@heroicons/react/24/outline'

import SideBarComponent from './SideBar'

import Breadcrumb from './Breadcumb'
import NavBarComponent from './NavBar'

export default function PageLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <div>
        <Transition show={sidebarOpen} as={Fragment}>
          <Dialog className='relative z-50 lg:hidden' onClose={setSidebarOpen}>
            <TransitionChild
              as={Fragment}
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'>
              <div className='fixed inset-0 bg-gray-900/80' />
            </TransitionChild>

            <div className='fixed inset-0 flex'>
              <TransitionChild
                as={Fragment}
                enter='transition ease-in-out duration-300 transform'
                enterFrom='-translate-x-full'
                enterTo='translate-x-0'
                leave='transition ease-in-out duration-300 transform'
                leaveFrom='translate-x-0'
                leaveTo='-translate-x-full'>
                <DialogPanel className='relative mr-16 flex w-full max-w-xs flex-1'>
                  <TransitionChild
                    as={Fragment}
                    enter='ease-in-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in-out duration-300'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'>
                    <div className='absolute left-full top-0 flex w-16 justify-center pt-5'>
                      <button
                        type='button'
                        className='-m-2.5 p-2.5'
                        onClick={() => setSidebarOpen(false)}>
                        <span className='sr-only'>Cerrar menú lateral</span>
                        <XMarkIcon
                          className='h-6 w-6 text-white'
                          aria-hidden='true'
                        />
                      </button>
                    </div>
                  </TransitionChild>
                  {/* //! Sidebar component, swap this element with another sidebar if you like */}
                  <SideBarComponent />
                </DialogPanel>
              </TransitionChild>
            </div>
          </Dialog>
        </Transition>

        {/* Static sidebar for desktop */}
        <div className='hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col'>
          {/* //! Sidebar component, swap this element with another sidebar if you like */}
          <SideBarComponent />
        </div>

        {/* Content */}
        <div className='lg:pl-72'>
          {/* //! NavBar  component, swap this element with another sidebar if you like */}
          <NavBarComponent openSideBar={() => setSidebarOpen(true)} />

          {/* Outlet */}
          <main>
            <Breadcrumb />
            <div className='py-10 px-4 sm:px-6 lg:px-8'>
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
