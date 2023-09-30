import React, { useState } from "react"
import ReactDOM from "react-dom"
import { useForm, Controller } from "react-hook-form"
// import ReactDatePicker from "react-datepicker";
import ReactSelect from "react-select"
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import DownShift from "../components/ReactHookForm/Downshift/Downshift"
import { SubmitButton } from "../components/ReactHookForm/Components"
import { FlowbiteInput, FlowbiteCheckbox } from "../components/ReactHookForm/FlowbiteComponents"

export const defaultValues = {
	ReactSelect: { value: "vanilla", label: "Vanilla" },
	ReactDatepicker: new Date(),
	downShift: "apple",
}

export default function ReactHookFormSelectJS() {
	const [formData, setFormData] = useState(defaultValues)
	const { handleSubmit, control, register } = useForm({ defaultValues })

	const onSubmit = (data) => {
		setFormData(data)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col px-6 form">
			<div className="container flex flex-col gap-4 mb-8">
				<FlowbiteInput defaultValue="" name="name" placeholder="Your Name" type="text" register={register} />
				<FlowbiteCheckbox name="agree" placeholder="agree" type="checkbox" register={register} />

				<section>
					{/* React Select */}
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
								styles={{
									input: (base) => ({
										...base,
										"input:focus": {
											boxShadow: "none",
										},
									}),
								}}
								isClearable
								isMulti={true}
							/>
						)}
						name="ReactSelect"
						control={control}
					/>
				</section>

				<section className="flex flex-col gap-2">
					<label>React Datepicker</label>
					<Controller
						control={control}
						name="ReactDatepicker"
						render={({ field: { value, ...fieldProps } }) => {
							return (
								<ReactDatePicker
									{...fieldProps}
									className="rounded input border-[#CCCCCC] border-1.5"
									placeholderText="Select date"
									selected={value}
								/>
							)
						}}
					/>
				</section>

				<section>
					{/* Downshift */}
					<Controller
						control={control}
						name="downShift"
						render={({ field }) => <DownShift {...field} className="px-2 py-1 rounded" />}
					/>
				</section>
			</div>

			<SubmitButton />

			<div className="p-4 m-6 text-white bg-zinc-800">
				<h3 className="my-4 text-xl text-yellow-400">Form Data</h3>
				<pre>{JSON.stringify(formData, null, 2)}</pre>
			</div>
		</form>
	)
}
