import { useState, useEffect } from "react"

// For providing values within a
const CheckboxArray = ({
	options,
	name,
	handleOnChange,
	//  resetFlag
}) => {
	const [prev, setPrev] = useState([])
	const [checkedItems, setCheckedItems] = useState({})

	const handleCheckboxChange = (e) => {
		const value = e.target.value
		const updatedArray = prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
		// console.log("updatedArray", updatedArray);

		setPrev(updatedArray)
		setCheckedItems({ ...checkedItems, [value]: !checkedItems[value] })
		handleOnChange(e, updatedArray)
	}

	// useEffect(() => {
	//   if (resetFlag) {
	//     setPrev([]);
	//   }
	// }, [resetFlag]);

	return (
		<div id="checkbox" className="flex-col flex">
			<p className="w-full capitalize">{name ? name + ":" : "options"}</p>
			{options?.map((value) => (
				<div key={value}>
					<input
						onChange={(e) => handleCheckboxChange(e)}
						type="checkbox"
						name={name}
						value={value}
						id={value}
						className="cursor-pointer ml-3 bg-zinc-600 text-white rounded py-1 focus:placeholder:opacity-0"
					/>
					<label htmlFor={value} className="cursor-pointer pl-3 capitalize">
						{value}
					</label>
				</div>
			))}
		</div>
	)
}

export default CheckboxArray
