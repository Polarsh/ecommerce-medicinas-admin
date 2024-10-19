/* eslint-disable react/display-name */
import React from 'react'
import LabelComponent from '../Label'

const FileInputComponent = React.forwardRef(
  ({ id, label, name, onChange, errors }, ref) => {
    return (
      <div>
        <LabelComponent label={label} />
        <input
          id={id}
          name={name}
          type='file'
          accept='image/*'
          onChange={onChange}
          ref={ref}
          className='block w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
        />
        {errors && (
          <p className='mt-1 text-xs text-red-500'>{errors.message}</p>
        )}
      </div>
    )
  }
)

export default FileInputComponent
