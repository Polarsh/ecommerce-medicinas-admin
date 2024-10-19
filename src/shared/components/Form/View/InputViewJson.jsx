import LabelComponent from '../../Label'

function sortObjectKeys(obj) {
  const sortedObj = {}
  Object.keys(obj)
    .sort()
    .forEach(key => {
      if (
        typeof obj[key] === 'object' &&
        obj[key] !== null &&
        !Array.isArray(obj[key])
      ) {
        sortedObj[key] = sortObjectKeys(obj[key])
      } else {
        sortedObj[key] = obj[key]
      }
    })
  return sortedObj
}

export default function InputJsonViewComponent({ label, value }) {
  const sortedValue = value ? sortObjectKeys(value) : value

  return (
    <div>
      <LabelComponent label={label} />
      <pre className='w-full px-3 py-2 text-gray-700 border rounded-lg border-gray-700 bg-gray-100'>
        {JSON.stringify(sortedValue, null, 2)}
      </pre>
    </div>
  )
}
