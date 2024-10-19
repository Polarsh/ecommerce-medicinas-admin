/* eslint-disable react/display-name */
import { forwardRef } from 'react'
import LabelComponent from '../Label'

const InputComponent = forwardRef(
  ({ id, label, name, value, onChange, placeholder, errors }, ref) => {
    return (
      <div>
        <LabelComponent label={label} htmlFor={name} />
        <input
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          ref={ref}
          aria-describedby='input-description'
          className='block w-full rounded-lg px-3 py-2 text-gray-700 border border-gray-300  focus:outline-none focus:border-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
        />
        {errors && (
          <p className='mt-1 text-xs text-red-500'>{errors.message}</p>
        )}
      </div>
    )
  }
)

export default InputComponent
