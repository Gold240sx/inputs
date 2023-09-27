import React, { useState } from 'react'
import CreatableSelect from 'react-select/creatable';

const createOption = (label) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ''),
});

const CustomMultiSelect = ({placeholder, options, handleOnChange, name }) => {
	const [isLoading, setIsLoading] = useState(false)
	const [selectedOptions, setSelectedOptions] = useState()

	    function handleSelect( data) {
			setSelectedOptions(data)
			const selectedValues = data.map((item) => item.value) // Extract values from selected items
			handleOnChange({ target: { name: name, value: selectedValues } }, "simpleArray") // Pass selected values to handleOnChange
		}

	const handleCreate = (inputValue) => {
		setIsLoading(true)
		setTimeout(() => {
			const newOption = createOption(inputValue)
			setIsLoading(false)
            handleSelect([newOption, ...selectedOptions])
		}, 1000)
	}

	return (
		<CreatableSelect
			isClearable
			isDisabled={isLoading}
			isLoading={isLoading}
			placeholder={placeholder}
			onChange={handleSelect}
			onCreateOption={handleCreate}
			options={options}
			value={selectedOptions}
			name={name}
			isMulti
		/>
	)
};

export default CustomMultiSelect