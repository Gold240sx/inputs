import React, { useState } from 'react'
 import { createClient } from "@supabase/supabase-js"
const SupabaseURL = import.meta.env.VITE_APP_PUBLIC_SUPABASE_URL
const SupabaseAnonKey = import.meta.env.VITE_APP_PUBLIC_SUPABASE_ANON_KEY


const SupabaseForm = () => {
      const [formData, setFormData] = useState({
			name: "",
			email: "",
			details: {
				age: 0,
				address: "",
			},
		})


        const supabase = createClient(SupabaseURL, SupabaseAnonKey)

  const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			// Send the form data to Supabase
			const { data, error } = await supabase
				.from("customers") // Replace with your table name
				.upsert([formData])

			if (error) {
				console.error("Error submitting data:", error)
			} else {
				console.log("Data submitted successfully:", data)
				// Reset the form
				setFormData({
					name: "",
					email: "",
					details: {
						age: 0,
						address: "",
					},
				})
			}
		} catch (error) {
			console.error("Error:", error)
		}
  }

  const handleChange = (e) => {
		const { name, value } = e.target

		// Use a copy of the existing formData to avoid mutating state directly
		const updatedFormData = { ...formData }

		// Split the name attribute by dots to handle nested fields
		const nameParts = name.split(".")

		// Handle nested fields
		if (nameParts.length === 2) {
			const [outerField, innerField] = nameParts
			updatedFormData[outerField][innerField] = value
		} else {
			updatedFormData[name] = value
		}

		setFormData(updatedFormData)
  }

  return (
		<form onSubmit={handleSubmit}>
			<input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
			<input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
			<input type="number" name="details.age" placeholder="Age" value={formData.details.age} onChange={handleChange} />
			<input type="text" name="details.address" placeholder="Address" value={formData.details.address} onChange={handleChange} />
			<button type="submit">Submit</button>
		</form>
  )
}

export default SupabaseForm