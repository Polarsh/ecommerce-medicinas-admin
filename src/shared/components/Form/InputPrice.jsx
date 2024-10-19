/* eslint-disable react/display-name */
import React from 'react'
import LabelComponent from '../Label'

const InputPriceComponent = React.forwardRef(
  ({ id, label, name, value, onChange, placeholder, errors }, ref) => {
    const handleChange = e => {
      let inputValue = e.target.value
      inputValue = inputValue.replace(/[^0-9.]/g, '')

      // Permitir solo un punto decimal y quitar ceros iniciales excepto "0" o "0."
      if (inputValue.match(/^\d*\.?\d*$/)) {
        if (
          inputValue.startsWith('0') &&
          inputValue !== '0' &&
          inputValue !== '0.'
        ) {
          inputValue = inputValue.replace(/^0+/, '')
        }

        onChange({
          target: {
            name,
            value: inputValue,
          },
        })
      }
    }

    return (
      <div>
        <LabelComponent label={label} htmlFor={name} />
        <div className='relative mt-2 rounded-lg shadow-sm'>
          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
            <span className='text-gray-500 sm:text-sm'>S/.</span>
          </div>
          <input
            id={id}
            name={name}
            value={value}
            onChange={handleChange}
            type='text'
            placeholder={placeholder}
            ref={ref}
            aria-describedby='price-currency'
            className='block w-full rounded-lg py-1.5 pl-8 pr-12 text-gray-700 border focus:outline-none focus:border-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
          />
          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
            <span id='price-currency' className='text-gray-500 sm:text-sm'>
              PEN
            </span>
          </div>
        </div>
        {errors && (
          <p className='mt-1 text-xs text-red-500'>{errors.message}</p>
        )}
      </div>
    )
  }
)

export default InputPriceComponent
