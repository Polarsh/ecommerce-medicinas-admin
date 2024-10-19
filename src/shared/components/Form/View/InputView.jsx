import LabelComponent from '../../Label'

export default function InputViewComponent({ label, value }) {
  return (
    <div>
      <LabelComponent label={label} />
      <div className='w-full px-3 py-2 text-gray-700 border rounded-lg border-gray-700 bg-gray-100'>
        {value}
      </div>
    </div>
  )
}
