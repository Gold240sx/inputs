import React from "react"
import { useForm, Controller } from "react-hook-form"
import Select from "react-select"

const MySelect = ({ options, label, control, name }) => {
	return (
		<Controller
			name={name} // Pass the name prop to Controller
			control={control}
			render={({ field }) => <Select {...field} options={options} name={name} />}
		/>
	)
}

export default MySelect
