import React from "react"
import { useForm, FormProvider } from "react-hook-form"

// flowbite components
import { Button, TextInput, Label } from "flowbite-react"

export function Form({ defaultValues, children, onSubmit, className }) {
	const { handleSubmit, register } = useForm({ defaultValues })
	const methods = useForm()

	return (
		<FormProvider {...methods}>
			<form onSubmit={handleSubmit(onSubmit)} className={className}>
				{Array.isArray(children)
					? children.map((child) => {
							return child.props.name
								? React.createElement(child.type, {
										...{
											...child.props,
											register,
											key: child.props.name,
										},
								  })
								: child
					  })
					: children}
			</form>
		</FormProvider>
	)
}

export function Input({ register, name, ...rest }) {
	return <input {...register(name)} {...rest} name={name} />
}

export function Select({ register, options, name, ...rest }) {
	return (
		<select {...register(name)} {...rest}>
			{options.map((value) => (
				<option value={value} key={value}>
					{value}
				</option>
			))}
		</select>
	)
}

export function RadioGroup({ register, options, name, defaultValue }) {
	return (
		<>
			<h2 className="text-2xl capitalize ">{name}</h2>
			{options.map((option) => (
				<div className="flex items-center gap-2 pl-2 w-fit" key={option}>
					<input
						type="radio"
						value={option}
						name={name}
						id={`radio-${option}`}
						{...register(name)}
						className="cursor-pointer w-fit h-fit"
					/>
					<label className="text-left capitalize cursor-pointer whitespace-nowrap h-fit" htmlFor={`radio-${option}`}>
						{option}
					</label>
				</div>
			))}
		</>
	)
}

export function SubmitButton({ value, name, ...rest }) {
	return (
		<Button type="submit" gradientDuoTone="purpleToBlue" outline value={value} name={name} {...rest}>
			Submit
		</Button>
	)

	// <input type="submit" value={value} name={name} {...rest}
}
