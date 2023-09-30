import React, { useState, useEffect, useRef } from "react"
import Select from "react-select"
import { set, useFormContext, useForm, get } from "react-hook-form"

import { Controller } from "react-hook-form"
import { Label } from "flowbite-react"

const ReactSelect = ({ name, options, control, register, errors, ...rest }) => {
	// const { control, setValue } = useFormContext()
	const { getValues } = useForm()
	const [selectedValue, setSelectedValue] = useState("")

	useEffect(() => {
		console.log("control", control)
	}, [])

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
                    input={...register(name)}
					// {...register(name)}
					isMulti={rest.isMulti}
					isClearable={rest.isClearable}
					isSearchable={rest.isSearchable}
					onChange={(option) => {
						console.log(option.value)
						rest.value = option.value
					}}
				/> */}
			</div>
		</div>
	)
}

export default ReactSelect
