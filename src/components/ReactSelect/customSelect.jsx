import React, { useState } from "react"
import CreatableSelect from "react-select/creatable"

const createOption = (label) => ({
	label,
	value: label.toLowerCase().replace(/\W/g, ""),
})

const CustomSelect = ({ placeholder, options, handleOnChange, name }) => {
	const [isLoading, setIsLoading] = useState(false)
	const [selectedOption, setSelectedOption] = useState()

	function handleSelect(data) {
		setSelectedOption(data)
		handleOnChange({ target: { name: name, value: data.value } }, "simpleArray") // Pass selected values to handleOnChange
	}

	const handleCreate = (inputValue) => {
		setIsLoading(true)
		setTimeout(() => {
			const newOption = createOption(inputValue)
			setIsLoading(false)
			handleSelect(newOption)
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
			value={selectedOption}
			name={name}
		/>
	)
}

export default CustomSelect
