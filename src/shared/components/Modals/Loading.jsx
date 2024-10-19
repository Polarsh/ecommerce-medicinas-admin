import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { ArrowPathIcon } from '@heroicons/react/24/outline'

export default function LoadingModalComponent({ isOpen }) {
  return (
    <Dialog className='relative z-50' open={isOpen} onClose={() => {}}>
      <DialogBackdrop
        transition
        className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'
      />

      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
          <DialogPanel
            transition
            className='relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95'>
            <div className='flex flex-col items-center justify-center'>
              <ArrowPathIcon
                className='h-12 w-12 animate-spin text-gray-500'
                aria-hidden='true'
              />
              <p className='mt-4 text-gray-700'>Cargando...</p>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
