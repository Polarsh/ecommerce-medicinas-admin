export default function TablePageSkeleton() {
  return (
    <div className=' space-y-4'>
      <div className=' h-6 bg-gray-300 rounded-lg w-1/4 animate-pulse'></div>
      <div className=' h-6 -my-3 bg-gray-300 rounded-lg w-1/2 animate-pulse'></div>

      <div className='flex justify-between'>
        <div className=' flex gap-3'>
          <div className=' h-6 w-32 bg-gray-300 rounded-lg animate-pulse'></div>
          <div className=' h-6 w-32 bg-gray-300 rounded-lg animate-pulse'></div>
        </div>
        <div className=' h-6 bg-gray-300 rounded-lg w-1/4 animate-pulse'></div>
      </div>
      <div className=' h-64 bg-gray-300 rounded-lg w-full animate-pulse'></div>
      <div className=' flex justify-between'>
        <div className=' h-6 bg-gray-300 rounded-lg w-1/4 animate-pulse'></div>
        <div className=' h-6 bg-gray-300 rounded-lg w-1/4 animate-pulse'></div>
      </div>
    </div>
  )
}
