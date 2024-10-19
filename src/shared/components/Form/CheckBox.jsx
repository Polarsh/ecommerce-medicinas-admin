/* eslint-disable react/display-name */
import React from 'react'
import LabelComponent from '../Label'

const CheckBoxComponent = React.forwardRef(
  ({ id, label, description, name, onChange }, ref) => {
    return (
      <fieldset>
        <legend className='sr-only'>{label}</legend>
        <div className='space-y-5'>
          <div className='relative flex items-start'>
            <div className='flex h-6 items-center'>
              <input
                id={id}
                name={name}
                type='checkbox'
                ref={ref}
                aria-describedby={`${name}-description`}
                onChange={onChange}
                className='h-4 w-4 rounded border-gray-300 text-primary focus:text-primary'
              />
            </div>
            <div className='ml-3 text-sm leading-6'>
              <LabelComponent label={label} htmlFor={name} />
              <p id={`${name}-description`} className='text-gray-500'>
                {description}
              </p>
            </div>
          </div>
        </div>
      </fieldset>
    )
  }
)

export default CheckBoxComponent
