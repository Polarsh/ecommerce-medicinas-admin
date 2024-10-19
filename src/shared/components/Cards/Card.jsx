export default function CardComponent({
  children,
  label,
  className = 'bg-white',
}) {
  return (
    <div className={`${className} shadow sm:rounded-lg px-4 py-5 sm:p-6`}>
      {label && (
        <h3 className='text-base font-semibold leading-7 text-gray-900'>
          {label}
        </h3>
      )}
      {children}
    </div>
  )
}
