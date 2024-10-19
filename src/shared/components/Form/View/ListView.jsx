import LabelComponent from '../../Label'

export default function ListInputViewComponent({ label, list }) {
  return (
    <div>
      <LabelComponent label={label} />
      <div className='w-full px-3 py-2 text-gray-700 border rounded-lg border-gray-700 bg-gray-100'>
        <ul className='list-disc pl-5 flex flex-col space-y-2'>
          {list.map((item, index) => (
            <li key={index}>
              <p className='text-gray-800'>{item}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
