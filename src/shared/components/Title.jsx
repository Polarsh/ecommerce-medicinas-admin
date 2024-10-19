export default function Title({ title, description }) {
  return (
    <div className='sm:flex sm:items-center'>
      <div className='sm:flex-auto'>
        <h1 className='text-base font-semibold leading-6 text-gray-900'>
          {title}
        </h1>
        <p className='mt-2 text-sm text-gray-700'>{description}</p>
      </div>
    </div>
  )
}
