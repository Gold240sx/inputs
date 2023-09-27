import { set } from "husky"
import React, { useState } from "react"
import Select from "react-select"
import Creatable, { useCreatable } from "react-select/creatable"
import CreatableSelect from "react-select/creatable"

interface Option {
  readonly label: string;
  readonly value: string;
}

const createOption = (label: string) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ''),
});

export const CustomMultiSelect = ({ placeholder, options, handleOnChange }) => {
	const [isLoading, setIsLoading] = useState(false)
	//   const [, setOptions] = useState(options);
	  const [value, setValue] = useState<Option | null>();
	// const [value, setValue] = useState()

	  const handleCreate = (inputValue: string) => {
	// const handleCreate = (inputValue) => {
		setIsLoading(true)
		setTimeout(() => {
			const newOption = createOption(inputValue)
			setIsLoading(false)
			//   setOptions((prev) => [...prev, value]);
			setValue(newOption)
		}, 1000)
	}

	return (
		<CreatableSelect
			isClearable
			isDisabled={isLoading}
			isLoading={isLoading}
			placeholder={placeholder}
			onChange={(newValue) => setValue(newValue)}
			onCreateOption={handleCreate}
			options={options}
			value={value}
			name="bike-types"
			isMulti
		/>
	)
}

// export const CustomMultiSelect = ({placeholder, options, handleOnChange }) => {
//     const [selectedOptions, setSelectedOptions] = useState()
//     const isMulti = true

//     function handleSelect( data) {
// 		setSelectedOptions(data)
// 		// console.log(data.map((item) => item.value))
// 		// handleOnChange(() => data.map((item) => item.value), "array")
// 		const selectedValues = data.map((item) => item.value) // Extract values from selected items
// 		handleOnChange({ target: { name: "selectedColors", value: selectedValues } }, "simpleArray") // Pass selected values to handleOnChange
// 		//   handleOnChange({ target: { value: data } }, "rray"); // Pass selected values to handleOnChange
// 	}

//   return (
// 		<Select
//             options={options}
//             placeholder={placeholder}
//             value={selectedOptions}
//             onChange={handleSelect}
//             isSearchable
//             name="selectedColors"
//             isMulti />
//   )
// }
