/* eslint-disable react/display-name */
import { forwardRef, useEffect, useState } from 'react'
import Select from 'react-select'

import tailwindConfig from '../../../../tailwind.config'
import LabelComponent from '../Label'

const colors = tailwindConfig.theme.extend.colors

const primaryColor = colors.primary
const secondaryColor = colors.secondary

const textColor = 'rgb(55 65 81)'
const placeholderColor = 'rgb(156 163 175)'

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: state.isDisabled ? 'rgba(229, 231, 235, 1)' : 'white',
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
  indicatorSeparator: () => ({
    display: 'none',
  }),
}

const SelectComponent = forwardRef(
  (
    {
      id,
      label,
      options,
      name,
      value, // This will now be a simple value like "Brand 1"
      onChange,
      errors,
      isLoading = false,
      isMulti = false,
      isSearchable = false,
      isClearable = false,
    },
    ref
  ) => {
    // Convert the simple value back to the { value, label } object format for react-select
    const [selectedOption, setSelectedOption] = useState(null)

    useEffect(() => {
      if (value) {
        const matchedOption = options.find(option => option.label === value)
        setSelectedOption(matchedOption || null)
      } else {
        setSelectedOption(null)
      }
    }, [value, options])

    const handleChange = selectedOption => {
      setSelectedOption(selectedOption)
      // Call onChange with the simple value
      onChange(selectedOption ? selectedOption.label : null)
    }

    return (
      <div>
        <LabelComponent label={label} htmlFor={name} />
        <Select
          ref={ref}
          id={id}
          value={selectedOption}
          placeholder={'Seleccionar'}
          isDisabled={options.length <= 0}
          styles={customStyles}
          options={options}
          onChange={handleChange}
          isLoading={isLoading}
          isSearchable={isSearchable}
          isClearable={isClearable}
          isMulti={isMulti}
        />
        {errors && (
          <p className='mt-1 text-xs text-red-500'>{errors.message}</p>
        )}
      </div>
    )
  }
)

export default SelectComponent
