export default function LabelComponent({ label, htmlFor }) {
  return (
    <label
      htmlFor={htmlFor}
      className='block mb-2 text-sm font-bold text-gray-700'>
      {label}
    </label>
  )
}
