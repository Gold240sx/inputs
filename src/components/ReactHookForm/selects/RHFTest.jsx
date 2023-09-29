import { useForm, Controller } from "react-hook-form"
import { Label } from "flowbite-react"
import { useState } from "react"
import Select from "react-select"

const itemTypeList = [
	{ value: "item", label: "Item" },
	{ value: "service", label: "Service" },
]

export const RHFTest = () => {
	const {
		control,
		register,
		formState: { errors },
	} = useForm()

	const handleChangeType = (val) => {
		console.log(val)
	}

	const [assetType, setAssetType] = useState({ value: "item", label: "Item" })
	return (
		<>
			<Controller
				control={control}
				name="itemType"
				rules={{
					required: {
						value: assetType.value == "item",
						message: "Item type is required.",
					},
				}}
				render={({ field: { onChange, value, ref, name } }) => (
					<Select
						className={"react-select"}
						name={name}
						{...register("itemType")}
						value={value}
						classNamePrefix={"react-select"}
						placeholder={"Item type"}
						options={itemTypeList}
						onChange={(val) => {
							onChange(val.value)
							handleChangeType(val)
						}}
					/>
				)}
			/>
			{errors.item?.message && <div class="validationText">{errors.item?.message}</div>}
		</>
	)
}
