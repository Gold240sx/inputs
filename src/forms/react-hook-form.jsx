import React, { useState } from "react"
import { useForm, FormProvider, Controller, set } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { ErrorMessage } from "@hookform/error-message"
import * as yup from "yup"

//flowbite
import { Button } from "flowbite-react"

// components
import { Form, Select, RadioGroup, SubmitButton } from "../components/ReactHookForm/Components"
import { FlowbiteCheckbox, FlowbiteInput } from "../components/ReactHookForm/FlowbiteComponents"
import RHFSelect from "../components/ReactHookForm/selects/RHFSelect"
import { RHFTest } from "../components/ReactHookForm/selects/RHFTest"

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
		// control,
		handleSubmit,
		register,
		// control,
		methods,
		formState: { errors },
	} = useForm({
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

			{/* <section>
				<label>Label</label>

				<Controller as={Select} name="Name" options={defaultValues.pizzaOptions} isMulti control={methods.control} />

				<ErrorMessage errors={methods.errors} name="Name" />
			</section> */}

			<RHFSelect
				name="pizza"
				options={defaultValues.pizzaOptions}
				placeholder="Select a pizza"
				register={register}
				errors={errors}
				defaultValue={defaultValues.primaryPizza}
			/>
			<Select name="sex" defaultValue={defaultValues.select} options={["female", "male"]} />
			<RadioGroup
				name="school"
				defaultValue={defaultValues.school}
				options={["elementary school", "middle school", "high school", "college"]}
			/>

			<SubmitButton />

			{/* <Input type="submit" value="Submit" name="submit" /> */}
			<pre>{JSON.stringify(formData, null, 2)}</pre>
		</Form>
		// </FormProvider>
	)
}

export default ReactHookForm
