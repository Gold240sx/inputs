import React, { useState } from "react"
import Select from "react-select"

const MultiSelect = ({ placeholder, options, handleOnChange, className, name }) => {
	const [selectedOptions, setSelectedOptions] = useState()
	const isMulti = true

	function handleSelect(data) {
		setSelectedOptions(data)
		// console.log(data.map((item) => item.value))
		// handleOnChange(() => data.map((item) => item.value), "array")
		const selectedValues = data.map((item) => item.value) // Extract values from selected items
		handleOnChange({ target: { name: name, value: selectedValues } }, "simpleArray") // Pass selected values to handleOnChange
		//   handleOnChange({ target: { value: data } }, "rray"); // Pass selected values to handleOnChange
	}

	return (
		<div className={className}>
			<Select
				options={options}
				placeholder={placeholder}
				value={selectedOptions}
				onChange={handleSelect}
				isSearchable
				name={name}
				isMulti={isMulti}
			/>
		</div>
	)
}

export default MultiSelect