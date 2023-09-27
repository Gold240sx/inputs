import { useState } from "react"
//
const Form = () => {
	const [formVals, setFormVals] = useState({
		userName: "",
		email: "",
		password: "",
		gender: "",
	})
	const [submittedDetails, setSubmittedDetails] = useState({})

	const handleSubmit = (e) => {
		e.preventDefault()
		// data output to the server or api
		setSubmittedDetails(formVals)
		return
	}

	const handleOnChange = (e) => {
		const { name, value } = e.target
		setFormVals((prev) => {
			return { ...formVals, [name]: value }
		})
	}

	return (
		<>
			<h1 className="text-black">Vanilla Form</h1>
			<form id="form" onSubmit={handleSubmit} className="flex gap-4 min-h-fit flex-col p-4 max-w-[400px] mx-auto">
				<input
					onChange={handleOnChange}
					type="text"
					name="userName"
					id="userName"
					placeholder="username"
					className="bg-zinc-600 rounded px-4 py-1 focus:placeholder:opacity-0"
				/>
				<input
					onChange={handleOnChange}
					type="text"
					name="email"
					id="email"
					placeholder="email"
					className="bg-zinc-600 rounded px-4 py-1 focus:placeholder:opacity-0"
				/>

				<input
					onChange={handleOnChange}
					type="text"
					name="password"
					id="password"
					placeholder="password"
					className="bg-zinc-600 rounded px-4 py-1 focus:placeholder:opacity-0"
				/>
				<select onChange={handleOnChange} name="gender" id="gender">
					<option label="Select" value="" selected disabled></option>
					<option label="Boy" value="boy"></option>
					<option label="Girl" value="girl"></option>
				</select>
				<button type="submit" value="submit" className="bg-sky-600 rounded w-1/2 mx-auto h-12 cursor-pointer hover:bg-sky-500" />
				<button type="reset" className="bg-sky-600 text-white rounded-lg px-4 py-2">Reset</button>
			</form>
			<p className="text-wrap w-full">{JSON.stringify(submittedDetails, null, "")}</p>
		</>
	)
}

export default Form
