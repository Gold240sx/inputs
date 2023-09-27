import { useState } from "react"
//
const NestedDataForm = () => {
	const [formVals, setFormVals] = useState({
		// userName: "",
		// email: "",
		// password: "",
		gender: "",
	})
	const [submittedDetails, setSubmittedDetails] = useState({})

	const handleSubmit = (e) => {
		e.preventDefault()
		// data output to the server or api
		setSubmittedDetails(formVals)
		return
	}

	const handleOnChange = (e, depth) => {
		const { name, value } = e.target
		const depthVal = [depth][0]
		console.log("depthval", depthVal)

		if (depth === "root") {
			setFormVals((prev) => {
				return { ...formVals, [name]: value }
			})
		} else {
			// return with nested data (like address)
			setFormVals((prev) => {
				return {
					...formVals,
					[depthVal]: {
						...prev[depthVal],
						[name]: value,
					},
				}
			})
		}
	}

	return (
		<>
			<h2 className="text-black">Nested Form</h2>
			<form id="form" onSubmit={handleSubmit} className="flex gap-4 min-h-fit flex-col p-4 max-w-[400px] mx-auto">
				<input
					onChange={(e) => handleOnChange(e, "root")}
					type="text"
					name="userName"
					id="userName"
					placeholder="username"
					className="bg-zinc-600 rounded px-4 py-1 focus:placeholder:opacity-0"
				/>
				<input
					onChange={(e) => handleOnChange(e, "root")}
					type="text"
					name="email"
					id="email"
					placeholder="email"
					className="bg-zinc-600 rounded px-4 py-1 focus:placeholder:opacity-0"
				/>

				<input
					onChange={(e) => handleOnChange(e, "root")}
					type="text"
					name="password"
					id="password"
					placeholder="password"
					className="bg-zinc-600 rounded px-4 py-1 focus:placeholder:opacity-0"
				/>
				<div className="form-group gap-2 flex flex-col py-2 px-2 w-full">
					<input
						onChange={(e) => handleOnChange(e, "address")}
						type="text"
						name="addressLn1"
						id="addressLn1"
						placeholder="address Line 1"
						className="bg-zinc-600 w-full rounded px-4 py-1 focus:placeholder:opacity-0"
					/>
					<input
						onChange={(e) => handleOnChange(e, "address")}
						type="text"
						name="addressLn2"
						id="addressLn2"
						placeholder="address Line 2"
						className="bg-zinc-600 w-full rounded px-4 py-1 focus:placeholder:opacity-0"
					/>
					<div className="flex gap-2 justify-between max-w-[400px]">
						<input
							onChange={(e) => handleOnChange(e, "address")}
							type="text"
							name="city"
							id="city"
							placeholder="city"
							className="bg-zinc-600 w-[40%] rounded px-4 py-1 focus:placeholder:opacity-0"
						/>
						<input
							onChange={(e) => handleOnChange(e, "address")}
							type="text"
							name="state"
							id="state"
							placeholder="state"
							className="bg-zinc-600 w-1/4 rounded px-4 py-1 focus:placeholder:opacity-0"
						/>
						<input
							onChange={(e) => handleOnChange(e, "address")}
							type="text"
							name="zip"
							id="zip"
							placeholder="zip"
							className="bg-zinc-600 w-1/4 rounded px-4 py-1 focus:placeholder:opacity-0"
						/>
					</div>
				</div>

				<select onChange={(e) => handleOnChange(e, "root")} name="gender" id="gender">
					<option label="Select" value="" selected disabled></option>
					<option label="Boy" value="boy"></option>
					<option label="Girl" value="girl"></option>
				</select>
				<input type="submit" value="submit" className="bg-sky-600 rounded w-1/2 mx-auto h-12 cursor-pointer hover:bg-sky-500" />
			</form>
			<p className="text-wrap w-full">{JSON.stringify(submittedDetails, null, "")}</p>
			<style jsx>{`
				form .input {
					width: 100%;
					border: blue;
					border-width: 3px;
				}
				button {
					color: orange !important;
				}
			`}</style>
		</>
	)
}

export default NestedDataForm
