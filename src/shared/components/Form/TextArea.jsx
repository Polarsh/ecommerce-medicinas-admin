/* eslint-disable react/display-name */
import { forwardRef } from 'react'
import LabelComponent from '../Label'

const TextAreaComponent = forwardRef(
  (
    { id, label, name, value, onChange, placeholder, errors, rows = 4 },
    ref
  ) => {
    return (
      <div>
        <LabelComponent label={label} htmlFor={name} />
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          ref={ref}
          rows={rows}
          className='block w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6'
        />
        {errors && (
          <p className='mt-1 text-xs text-red-500'>{errors.message}</p>
        )}
      </div>
    )
  }
)

export default TextAreaComponent
