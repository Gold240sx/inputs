import React, { useState } from "react"
import ReactDOM from "react-dom"
import { useForm, Controller } from "react-hook-form"
import type { NestedValue, SubmitHandler, DefaultValues } from "react-hook-form"
// import ReactDatePicker from "react-datepicker";
import ReactSelect from "react-select"
import { SubmitButton } from "../components/ReactHookForm/Components"

export type FormValues = {
	ReactSelect: NestedValue<{ value: string; label: string }>
}

export const defaultValues: DefaultValues<FormValues> = {
	ReactSelect: { value: "vanilla", label: "Vanilla" },
}

export default function ReactHookFormSelect() {
	const [formData, setFormData] = useState<FormValues>(defaultValues)
	const { handleSubmit, control } = useForm<FormValues>({
		defaultValues,
	})

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		// alert(JSON.stringify(data))
		setFormData(data)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="form">
			<div className="container">
				<section>
					<label>React Select</label>
					<Controller
						render={({ field }) => (
							<ReactSelect
								{...field}
								options={[
									{ value: "chocolate", label: "Chocolate" },
									{ value: "strawberry", label: "Strawberry" },
									{ value: "vanilla", label: "Vanilla" },
								]}
								isClearable
							/>
						)}
						name="ReactSelect"
						control={control}
					/>
				</section>
			</div>

			<SubmitButton />
			{/* <button type="submit">Submit</button> */}
			<pre>{JSON.stringify(formData.ReactSelect.value, null, 2)}</pre>
		</form>
	)
}
