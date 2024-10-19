/* eslint-disable react/display-name */
import { forwardRef, useEffect, useState } from 'react'
import Select from 'react-select'
import LabelComponent from '../Label'
import tailwindConfig from '../../../../tailwind.config'

const colors = tailwindConfig.theme.extend.colors

const primaryColor = colors.primary
const secondaryColor = colors.secondary

const textColor = 'rgb(55 65 81)'
const placeholderColor = 'rgb(156 163 175)'

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: state.isDisabled ? 'rgba(229, 231, 235, 1)' : 'white',
    minHeight: '100%', // Ajusta la altura para que coincida con el input
    border: 'none',
    borderColor: state.isDisabled
      ? 'rgba(209, 213, 219, 1)'
      : state.isFocused
        ? primaryColor
        : 'rgba(209, 213, 219, 1)',
    boxShadow:
      state.isFocused && !state.isDisabled
        ? `0 0 0 2.5px ${primaryColor}`
        : `0 0 1px ${textColor}`,
    cursor: state.isDisabled ? 'not-allowed' : 'default',
    borderRadius: '0.375rem',
    ':hover': {
      borderColor: 'rgba(209, 213, 219, 1)',
    },
  }),
  menu: provided => ({
    ...provided,
    zIndex: 60,
    marginTop: '0.25rem',
    borderRadius: '0.375rem',
    boxShadow:
      '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -2px rgba(0, 0, 0, 1)',
    overflow: 'hidden',
  }),
  menuList: provided => ({
    ...provided,
    padding: '0.25rem 0',
    overflowY: 'auto',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? 'rgba(144, 238, 144, 0.5)' // Light green background for selected option
      : state.isFocused
        ? `${secondaryColor}1A` // Background color for focused option
        : 'white', // Default background color
    color: state.isSelected
      ? 'black'
      : state.isFocused
        ? primaryColor
        : 'black',
    cursor: 'default',
    padding: '0.5rem 1rem',
    ':active': {
      backgroundColor: state.isSelected
        ? 'rgba(144, 238, 144, 0.5)' // Slightly darker green when active
        : `${secondaryColor}1A`,
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: state.isDisabled ? 'rgba(107, 114, 128, 1)' : textColor,
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: state.isDisabled ? 'rgba(107, 114, 128, 1)' : placeholderColor,
  }),

  indicatorsContainer: provided => ({
    ...provided,
    paddingRight: '0.5rem',
  }),
}

const InputQuantityComponent = forwardRef(
  ({ id, label, value = '', onChange, placeholder, errors }, ref) => {
    const [inputValue, setInputValue] = useState('')
    const [unit, setUnit] = useState({ value: 'mg', label: 'mg' })

    const unitOptions = [
      { value: 'mg', label: 'mg' },
      { value: 'ml', label: 'ml' },
      { value: 'g', label: 'g' },
      { value: 'kg', label: 'kg' },
      { value: 'L', label: 'L' },
      // Añade más unidades según sea necesario
    ]

    // Función para separar el valor y la unidad al recibir un valor completo
    useEffect(() => {
      const regex = /^(\d+)([a-zA-Z]+)$/
      const match = value.match(regex)
      if (match) {
        setInputValue(match[1]) // Valor numérico
        const selectedUnit = unitOptions.find(
          option => option.value === match[2]
        )
        setUnit(selectedUnit || { value: '', label: '' }) // Unidad
      }
    }, [value])

    const handleInputChange = e => {
      setInputValue(e.target.value)
      onChange(`${e.target.value}${unit.value}`)
    }

    const handleUnitChange = selectedOption => {
      setUnit(selectedOption)
      onChange(`${inputValue}${selectedOption.value}`)
    }

    return (
      <div>
        <LabelComponent label={label} htmlFor={'quantity'} />

        <div className='relative mt-2 rounded-md shadow-sm'>
          <input
            id={id}
            name='quantity'
            value={inputValue}
            type='text'
            placeholder={placeholder}
            ref={ref}
            onChange={handleInputChange}
            className='block w-full rounded-lg px-3 py-2 text-gray-700 border border-gray-300 focus:outline-none focus:border-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
          />
          <div className='absolute inset-y-0 right-0 flex items-center'>
            <Select
              id='unit'
              name='unit'
              value={unit}
              onChange={handleUnitChange}
              options={unitOptions}
              styles={customStyles}
              placeholder='ml'
              isSearchable={false}
            />
          </div>
        </div>
        {errors && (
          <p className='mt-1 text-xs text-red-500'>{errors.message}</p>
        )}
      </div>
    )
  }
)

export default InputQuantityComponent
