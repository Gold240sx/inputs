import { useForm } from "react-hook-form"

// flowbite components
import { Button, TextInput, Label, Checkbox } from "flowbite-react"

export function FlowbiteCheckbox({ register, name, ...rest }) {
	return (
		<div className="flex items-center gap-2 pl-2">
			<Checkbox id={name} {...register(name)} name={name} defaultChecked={false} />
			<Label htmlFor={name} value={rest.placeholder} className="text-xl font-light capitalize text-zinc-600">
				{rest.placeholder}
			</Label>
		</div>
	)
}

export function FlowbiteInput({ register, name, ...rest }) {
	return (
		<div className={`${rest.className}`}>
			<div className="block mb-2">
				<Label htmlFor={name} value={rest.placeholder} className="text-xl font-light capitalize text-zinc-600" />
			</div>
			<TextInput
				id={name}
				{...register(name)}
				{...rest}
				name={name}
				placeholder={rest.placeholder}
				className="text-lg placeholder:capitalize"
			/>
		</div>
	)
}
