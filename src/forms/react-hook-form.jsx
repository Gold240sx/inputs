import React, { useState } from "react"
import { useForm, FormProvider, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { ErrorMessage } from "@hookform/error-message"
import * as yup from "yup"

//flowbite
import { Button } from "flowbite-react"

// components
import { Form, RadioGroup, SubmitButton } from "../components/ReactHookForm/Components"
import { FlowbiteCheckbox, FlowbiteInput } from "../components/ReactHookForm/FlowbiteComponents"
import RHFSelect from "../components/ReactHookForm/selects/RHFSelect"
// import { RHFTest } from "../components/ReactHookForm/selects/RHFTest"
import ReactSelect from "../components/ReactHookForm/selects/RHFTest"
import Select from "react-select"

const defaultValues = {
	firstName: "doug",
	lastName: "dougy",
	sex: "female",
	school: "high school",
	pizzaOptions: [
		{ value: "cheese", label: "Cheese" },
		{ value: "pepperoni", label: "Pepperoni" },
		{ value: "mushrooms", label: "Mushrooms" },
	],
	primaryPizza: { value: "pepperoni", label: "Pepperoni" },
}

// interface SelectField {
//   gender: { value: string, label: string }
//   hobbies: { value: string, label: string }[]
// }

const schema = yup
	.object({
		firstName: yup.string().required(),
		// age: yup.number("Age must be a number").positive("Age must be positive").integer().required(),
	})
	.required()

const ReactHookForm = () => {
	const [formData, setFormData] = useState({})

	const {
		handleSubmit,
		reset,
		register,
		control,
		// methods,
		formState: { errors },
	} = useForm({
		defaultValues,
		resolver: yupResolver(schema),
	})

	// const handleonchange = (e, name) => {
	// 	setFormData({ ...formData, [name]: e.value })
	// }

	const onSubmit = (data) => {
		setFormData(data)
		console.log(data)
	}

	return (
		// <FormProvider {...methods}>
		<Form onSubmit={onSubmit} className="flex flex-col gap-4">
			{/* <Input name="firstName" defaultValue={defaultValues.firstName} placeholder="first name" /> */}
			<FlowbiteInput name="firstName" defaultValue={defaultValues.firstName} placeholder="first name" type="text" />
			<FlowbiteCheckbox name="agree" placeholder="agree" type="checkbox" />
			{/* React Select Test */}
			{/* <RHFTest methods={methods} control={control} /> */}
			{/* <ReactSelect
				options={[
					{ label: "Option 1", value: "option1" },
					{ label: "Option 2", value: "option2" },
					{ label: "Option 3", value: "option3" },
				]}
				label="Select an option"
				name="select"
				control={control}
			/> */}
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
			<Controller
				name="MyCheckbox"
				control={control}
				rules={{ required: true }}
				render={({ field }) => <Select {...field} options={defaultValues.pizzaOptions} />}
			/>
			{/* <Select name="sex" defaultValue={defaultValues.select} options={["female", "male"]} /> */}
			{/* <RadioGroup
				name="school"
				defaultValue={defaultValues.school}
				options={["elementary school", "middle school", "high school", "college"]}
			/> */}
			<SubmitButton />
			{/* <Input type="submit" value="Submit" name="submit" /> */}
			{/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
		</Form>
		// </FormProvider>
	)
}

export default ReactHookForm
