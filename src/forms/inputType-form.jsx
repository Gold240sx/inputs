import { useState, useEffect } from "react"
import CheckboxArray from "../components/vanilla/checkboxArray"
import CustomMultiSelect from "../components/ReactSelect/customMultiSelect"
import MultiSelect from "../components/ReactSelect/multiSelect"
import Selector from "../components/ReactSelect/select"
import CustomSelect from "../components/ReactSelect/customSelect"
import Stepper from "../components/vanilla/steppers/stepper"
import StepperMinimal from "../components/vanilla/steppers/stepper-minimal"
//
const InputTypeForm = (e, depth) => {
	const [formVals, setFormVals] = useState({})
	const [submittedDetails, setSubmittedDetails] = useState({})
      const [resetFlag, setResetFlag] = useState(false)

    const formReset = () => {
            const InitialFormState = {
//                  food: [],
//   weekdays: false, 
//   weekends: false, 
//   feeling: "", 
//   date: "", 
//   slide: 0,
//   description: "", 
//   gender: "", 
            }
          setFormVals(InitialFormState)
           setResetFlag(true)
    }

      useEffect(() => {
			if (resetFlag) {
				setResetFlag(false) // Reset the reset flag
			}
		}, [formVals, resetFlag])

	const handleSubmit = (e) => {
		e.preventDefault()
		// data output to the server or api
		setSubmittedDetails(formVals)
		return
	}

    const handleOnChange = (e, depth) => {
		const { name, value, checked } = e.target
		setFormVals((prev) => {
			if (depth === "root") {
                // console.log("e.target.checked", e.target.checked)
                if (e.target.checked === true){
				return { ...prev, [name]: value }
            } // remove the week days and weekends from the formVals object
            else if (e.target.type === "checkbox") {
                const { [name]: value, ...rest } = prev
                return rest
            } else {
                return { ...prev, [name]: value }
            }
			} else if (depth === "array") {
				const updatedArray = prev[name] ? [...prev[name]] : []
				if (checked) {
					updatedArray.push(value)
				} else {
					const index = updatedArray.indexOf(value)
					if (index !== -1) {
						updatedArray.splice(index, 1)
					}
				}
				return { ...prev, [name]: updatedArray }
			} else if (depth === "simpleArray") {
				   return { ...prev, [name]: value }
			} else {
				return {
					...prev,
					[depth]: {
						...prev[depth],
						[name]: value,
					},
				}
			}
		})
	}

	return (
		<>
			<h2 className="text-black">Input Types Form</h2>
			<form id="form" onSubmit={handleSubmit} className="flex gap-4 min-h-fit flex-col p-4 max-w-[400px] mx-auto">
				Horizontal
				<StepperMinimal name="SystemSize"  		handleOnChange={handleOnChange} min={3} max={45} step={2} start={3} layout="horizontal" unit="kw" style="minimal" className="w-44" />
				<StepperMinimal name="age" 		handleOnChange={handleOnChange}  min={3} max={45} step={2} start={3} layout="horizontal" unit="y/o" style="color" card={true} color="teal-500" className="w-44" />
				<StepperMinimal name="ProductCount" 		handleOnChange={handleOnChange}  min={0} max={10} step={1} start={0} layout="horizontal" unit="" style="boxes" className="w-44" />
				Vertical
				<StepperMinimal name="Torque" 		handleOnChange={handleOnChange}  min={3} max={45} step={2} start={3} layout="vertical" unit="ft/p" className="w-44" />
				<Stepper name="age5" 		handleOnChange={handleOnChange}  min={3} max={45} step={2} start={3} unit="kw" className="w-44" />
				{/* <label htmlFor="class" className="text-black">
					Class
				</label> */}
				{/* <CustomSelect
					id="class"
					placeholder="Select a class"
					handleOnChange={handleOnChange}
					options={[
						{ value: "chemistry", label: "Chemistry" },
						{ value: "Math", label: "Math" },
						{ value: "History", label: "History" },
						{ value: "Art", label: "Art" },
					]}
					name="class"
					value
				/> */}
				{/* <label htmlFor="animal" className="text-black">
					Pet
				</label> */}
				{/* <Selector
					id="animal"
					placeholder="Select an animal"
					handleOnChange={handleOnChange}
					options={[
						{ value: "snake", label: "Snake" },
						{ value: "bat", label: "bat" },
						{ value: "anaconda", label: "Anaconda" },
						{ value: "husky", label: "Husky" },
						{ value: "feline", label: "Feline" },
					]}
					name="pet"
					value
				/> */}
				{/* // Multiselect with custom input */}
				{/* <label htmlFor="body-types" className="text-black">
					Body Types
				</label> */}
				{/* <CustomSelect
					id="body-type"
					placeholder="Select a body type"
					handleOnChange={handleOnChange}
					options={[
						{ value: "skinny", label: "Skinny" },
						{ value: "petite", label: "Petite" },
						{ value: "average", label: "Average" },
						{ value: "husky", label: "Husky" },
						{ value: "fat", label: "Fat" },
					]}
					name="body-type"
					value
				/> */}
				{/* <label htmlFor="soup-types" className="text-black">
					Soup Types
				</label>
				<CustomMultiSelect
					id="soup-types"
					placeholder="Select a soup"
					handleOnChange={handleOnChange}
					options={[
						{ value: "tomato", label: "Tomato Soup" },
						{ value: "chicken_noodle", label: "Chicken Noodle Soup" },
						{ value: "minestrone", label: "Minestrone Soup" },
						{ value: "mushroom", label: "Mushroom Soup" },
						{ value: "clam_chowder", label: "Clam Chowder" },
					]}
					name="soup-types"
					value
				/> */}
				<div id="working" className="flex flex-col">
					<label htmlFor="color-types" className="text-black">
						Selected Colors
					</label>
					{/* // Multiselect */}
					<MultiSelect
						id="color-types"
						placeholder="Select a color"
						handleOnChange={handleOnChange}
						options={[
							{ value: "red", label: "Red" },
							{ value: "green", label: "Green" },
							{ value: "yellow", label: "Yellow" },
							{ value: "blue", label: "Blue" },
							{ value: "white", label: "White" },
						]}
						name="selectedColors"
						className="mb-4"
						value
					/>

					<CheckboxArray
						options={["pizza", "tacos", "chicken & rice"]}
						handleOnChange={(e) => handleOnChange(e, "array")}
						resetFlag={resetFlag}
						name="food"
					/>
					<div id="checkbox" className="flex flex-col">
						<p className="w-full">Availability: (individual checkbox)</p>
						<div>
							<input
								onChange={(e) => handleOnChange(e, "root")}
								type="checkbox"
								name="weekdays"
								value="available"
								id="weekdays"
								className="py-1 ml-3 text-white rounded cursor-pointer bg-zinc-600 focus:placeholder:opacity-0"
							/>
							<label for="weekdays" className="pl-3 cursor-pointer">
								Weekdays
							</label>
						</div>
						<div>
							<input
								onChange={(e) => handleOnChange(e, "root")}
								type="checkbox"
								for="feeling"
								name="weekends"
								value="available"
								id="weekends"
								className="py-1 ml-3 text-white rounded cursor-pointer bg-zinc-600 focus:placeholder:opacity-0"
							/>
							<label for="weekends" className="pl-3 cursor-pointer ">
								Weekends
							</label>
						</div>
					</div>
					<div id="radio" className="flex items-center gap-2">
						<p className="w-full">Feeling:</p>
						<br /> <br />
						<input
							onChange={(e) => handleOnChange(e, "root")}
							type="radio"
							for="feeling"
							name="feeling"
							value="happy"
							id="happy"
							className="py-1 text-white rounded cursor-pointer bg-zinc-600 focus:placeholder:opacity-0"
						/>
						<label for="happy" className="cursor-pointer ">
							happy
						</label>
						<input
							onChange={(e) => handleOnChange(e, "root")}
							type="radio"
							for="feeling"
							name="feeling"
							value="sad"
							id="sad"
							className="py-1 text-white rounded cursor-pointer bg-zinc-600 focus:placeholder:opacity-0"
						/>
						<label for="sad" className="cursor-pointer ">
							sad
						</label>
					</div>
					<label>
						<p>Date Picker</p>
						<input
							onChange={(e) => handleOnChange(e, "root")}
							type="date"
							name="date"
							id="date"
							placeholder="date"
							className="w-full px-4 py-1 text-white rounded bg-zinc-600 focus:placeholder:opacity-0"
						/>
					</label>
					<label>
						<p>Slider</p>
						<input
							onChange={(e) => handleOnChange(e, "root")}
							type="range"
							name="slide"
							id="slide"
							placeholder="slide"
							className="w-full px-4 py-1 rounded bg-zinc-600 focus:placeholder:opacity-0"
						/>
					</label>
					<label>
						<p>text area</p>
						<textarea
							onChange={(e) => handleOnChange(e, "root")}
							type="text"
							name="description"
							id="description"
							placeholder="description"
							className="px-4 py-1 rounded bg-zinc-600 focus:placeholder:opacity-0"
						/>
					</label>
					<select onChange={(e) => handleOnChange(e, "root")} name="gender" id="gender">
						<option label="Select" value="" selected disabled></option>
						<option label="Boy" value="boy"></option>
						<option label="Girl" value="girl"></option>
					</select>
				</div>
				<button type="submit" value="submit" className="w-1/2 h-12 mx-auto rounded cursor-pointer bg-sky-600 hover:bg-sky-500">
					Submit
				</button>
				<button type="reset" onClick={formReset} className="w-1/2 h-12 mx-auto bg-red-600 rounded cursor-pointer hover:bg-red-500">
					Reset Form
				</button>
			</form>
			<p className="w-full text-wrap">{formVals && JSON.stringify(submittedDetails, null, "")}</p>
		</>
	)
}

export default InputTypeForm
