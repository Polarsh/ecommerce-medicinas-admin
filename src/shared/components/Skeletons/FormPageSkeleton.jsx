export default function FormPageSkeleton() {
  return (
    <div className=' space-y-4'>
      <div className=' h-6 bg-gray-300 rounded-lg w-1/4 animate-pulse'></div>
      <div className=' h-6 -my-3 bg-gray-300 rounded-lg w-1/2 animate-pulse'></div>

      <div className=' bg-gray-300 rounded-lg w-full animate-pulse grid grid-cols-2 p-4 gap-6'>
        <div className=' h-6 bg-gray-400 rounded-lg w-full animate-pulse'></div>
        <div className=' h-6 bg-gray-400 rounded-lg w-full animate-pulse'></div>
        <div className=' h-6 bg-gray-400 rounded-lg w-full animate-pulse col-span-full'></div>
        <div className=' h-6 bg-gray-400 rounded-lg w-full animate-pulse'></div>
        <div className=' h-6 bg-gray-400 rounded-lg w-full animate-pulse col-span-full'></div>
        <div className=' h-6 bg-gray-400 rounded-lg w-full animate-pulse'></div>
      </div>
      <div className=' flex justify-end'>
        <div className=' flex gap-3'>
          <div className=' h-6 w-24 bg-gray-300 rounded-lg animate-pulse'></div>
          <div className=' h-6 w-24 bg-gray-300 rounded-lg animate-pulse'></div>
        </div>
      </div>
    </div>
  )
}
