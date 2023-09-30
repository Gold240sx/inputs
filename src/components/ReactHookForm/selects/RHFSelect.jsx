import React, { useState, useEffect, useRef } from "react"
import Select from "react-select"
import { set, useFormContext, useForm, get } from "react-hook-form"

import { Controller } from "react-hook-form"
import { Label } from "flowbite-react"

// interface RHFSelectProps {
//   name: string;
//   options: { value: string; label: string }[];
//   control: UseFormReturn<FieldValues>["control"];
//   placeholder: string;
//   isMulti?: boolean;
// }

// const RHFSelect = ({ name, options, register, errors, ...rest }) => {
// 	const [selectedValue, setSelectedValue] = useState("")
// 	const { control, setValue } = useFormContext()

// 	useEffect(() => {
// 		// When the React Select value changes, update the input field value
// 		if (selectedValue) {
// 			setValue(selectedValue)
// 		}
// 	}, [selectedValue, setValue, name])

// 	return (
// 		<div className={`${rest.className}`}>
// 			{options.find((option) => option.value === rest.value) && (
// 				<div className="block mb-2">
// 					<Label htmlFor={name} value={rest.placeholder} className="text-xl font-light capitalize text-zinc-600" />
// 				</div>
// 			)}
// 			<div className="block mb-2">
// 				<Label htmlFor={name} value={rest.placeholder} className="text-xl font-light capitalize text-zinc-600" />
// 			</div>
// 			<input
// 				type="text"
// 				value={selectedValue}
// 				// {...control(name)}
// 				{...register(name)}
// 				name={name}
// 				{...rest}
// 				className=""
// 			/>
// 			<Select
// 				name={name}
// 				isMulti={rest.isMulti}
// 				isClearable={rest.isClearable}
// 				isSearchable={rest.isSearchable}
// 				options={options}
// 				placeholder={rest.placeholder}
// 				onChange={(selectedOption) => {
// 					setSelectedValue(selectedOption.value)
// 				}}
// 			/>
// 			<p style={{ color: "red" }}>{errors?.message}</p>
// 		</div>
// 	)
// }

const RHFSelect = ({ name, options, control, register, errors, ...rest }) => {
	// const { control, setValue } = useFormContext()
	const { getValues } = useForm()
	const [selectedValue, setSelectedValue] = useState("")

	return (
		<div className={`${rest.className}`}>
			{options.find((option) => option.value === rest.value) && (
				<div className="block mb-2">
					<Label htmlFor={name} value={rest.placeholder} className="text-xl font-light capitalize text-zinc-600" />
				</div>
			)}
			<div className="block mb-2">
				{/* <Select
					options={options}
					value={selectedValue}
					name={name}
					{...register(name)}
					isMulti={rest.isMulti}
					isClearable={rest.isClearable}
					isSearchable={rest.isSearchable}
					onChange={(option) => {
						console.log(option.value)
						rest.value = option.value
					}}
					// onChange={(e) => {
					// 	setValue(e.value)
					// 	console.log(getValues())
					// 	setSelectedValue(e.value)
					// 	console.log(name, e.value)
					// }}
				// /> */}
			</div>
		</div>
	)
}

export default RHFSelect
