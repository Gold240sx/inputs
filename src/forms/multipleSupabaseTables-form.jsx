import React, { useState } from "react"
import { createClient } from "@supabase/supabase-js"
const SupabaseURL = import.meta.env.VITE_APP_PUBLIC_SUPABASE_URL
const SupabaseAnonKey = import.meta.env.VITE_APP_PUBLIC_SUPABASE_ANON_KEY

// const MultipleSupabaseTablesForm = () => {
// const [formData, setFormData] = useState({
// 	productTitle: "",
//     productDescription: "",
//     productPrice: 0,
// 	manufacturerName: "",
// })
// const [newId, setNewId] = useState()

// 	const supabase = createClient(SupabaseURL, SupabaseAnonKey)

// 	 const handleSubmit = async (e) => {
// 			e.preventDefault()

// 			const { productTitle, manufacturerName } = formData

// 			// Check if the manufacturer already exists
// 			const { data: existingManufacturer, error: manufacturerError } = await supabase
// 				.from("Manufacturers")
// 				.select("id, manufacturer")
// 				.eq("manufacturer", manufacturerName)

// 			let manufacturerId

// 			if (manufacturerError) {
// 				console.error("Error checking manufacturer:", manufacturerError)
// 			} else if (existingManufacturer.manufacturer !== undefined) {
// 				// Manufacturer already exists, use its ID
// 				manufacturerId = existingManufacturer[0].id
//                 setNewId(existingManufacturer[0].id)
// 			} else {
// 				// Manufacturer doesn't exist, create a new one
// 				const { data: newManufacturer, error: createError } = await supabase
// 					.from("Manufacturers")
// 					.upsert([{ manufacturer: manufacturerName }], { onConflict: ["manufacturer"] })

//                 const { data:newManId} = await supabase
// 					.from("Manufacturers")
// 					.select("id, manufacturer")
// 					.eq("manufacturer", manufacturerName)
//                     .single()
                    
//                     console.log(manufacturerName)
//                     console.log(newManId)
//                     setNewId(newManId.id)
//                     manufacturerId = newManId.id
// 				if (createError) {
// 					console.error("Error creating manufacturer:", createError)
// 				} 
// 			}

// 			// Create a new product
// 			const { data: newProduct, error: productError } = await supabase.from("Powducts").upsert([
// 				{
// 					title: productTitle,
// 					manufacturer_id: newId,
// 					description: formData.productDescription,
// 					price: formData.productPrice,
// 					manufacturer: manufacturerName,
// 				},
// 			])

// 			if (productError) {
// 				console.error("Error creating product:", productError)
// 			} else {
// 				console.log("Product created successfully:", newProduct)
// 				// Reset the form
// 				setFormData({
// 					productTitle: "",
//                     productDescription: "",
//                     productPrice: 0,
// 					manufacturerName: "",
// 				})
// 			}
// 		}

// 		const handleChange = (e) => {
// 			const { name, value } = e.target
// 			setFormData({ ...formData, [name]: value })
// 		}


// 	return (
// 		<form onSubmit={handleSubmit} className="flex flex-col gap-4">
// 			<input type="text" name="productTitle" placeholder="Product Title" value={formData.productTitle} onChange={handleChange} />
// 			<input type="text" name="productDescription" placeholder="Product Description" value={formData.productDescription} onChange={handleChange} />
// 			<input type="number" name="productPrice" placeholder="Product Price" value={formData.productPrice} onChange={handleChange} />
// 			<input
// 				type="text"
// 				name="manufacturerName"
// 				placeholder="Manufacturer Name"
// 				value={formData.manufacturerName}
// 				onChange={handleChange}
// 			/>
// 			<button type="submit" className="p-4 bg-blue-200">Create Product</button>
// 		</form>
// 	)
// }

// export default MultipleSupabaseTablesForm



const MultipleSupabaseTablesForm = () => {
	const [formData, setFormData] = useState({
		productTitle: "",
		productDescription: "",
		productPrice: 0,
		manufacturerName: "",
	})

	const [manufacturerId, setManufacturerId] = useState(null)

	const supabase = createClient(SupabaseURL, SupabaseAnonKey)

	const waitForNewManufacturer = async (manufacturerName) => {
		const timeout = 15000 // Timeout in milliseconds (15 seconds)
		const interval = 2000 // Check interval in milliseconds (2 seconds)
		const startTime = new Date().getTime()

		while (new Date().getTime() - startTime < timeout) {
			// Check if the manufacturer already exists
			const { data: existingManufacturer, error: manufacturerError } = await supabase
				.from("Manufacturers")
				.select("id, manufacturer")
				.eq("manufacturer", manufacturerName)

			if (manufacturerError) {
				console.error("Error checking manufacturer:", manufacturerError)
			} else if (existingManufacturer.length > 0) {
				// Manufacturer already exists, use its ID
				setManufacturerId(existingManufacturer[0].id)
				return
			}

			await new Promise((resolve) => setTimeout(resolve, interval))
		}

		// Timeout reached, no newManufacturer found
		console.error("Timed out waiting for newManufacturer")
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		const { productTitle, manufacturerName } = formData

		try {
			let manufacturerId

			// Check if the manufacturer already exists
			const { data: existingManufacturer, error: manufacturerError } = await supabase
				.from("Manufacturers")
				.select("id, manufacturer")
				.eq("manufacturer", manufacturerName)

			if (manufacturerError) {
				console.error("Error checking manufacturer:", manufacturerError)
			} else if (existingManufacturer.length > 0) {
				// Manufacturer already exists, use its ID
				manufacturerId = existingManufacturer[0].id
			} else {
				// Manufacturer doesn't exist, create a new one
				const { data: newManufacturer, error: createError } = await supabase
					.from("Manufacturers")
					.upsert([{ manufacturer: manufacturerName }], { onConflict: ["manufacturer"] })

				if (createError) {
					console.error("Error creating manufacturer:", createError)
				} else if (newManufacturer) {
					// Manufacturer created, set its ID and wait for it to appear in the database
					setManufacturerId(newManufacturer[0].id)
					await waitForNewManufacturer(manufacturerName)
				}
			}

			if (manufacturerId !== null && manufacturerId !== undefined) {
				// Create a new product
				const { data: newProduct, error: productError } = await supabase.from("Powducts").upsert([
					{
						title: productTitle,
						manufacturer_id: manufacturerId,
						description: formData.productDescription,
						price: formData.productPrice,
						manufacturer: manufacturerName,
					},
				])

				if (productError) {
					console.error("Error creating product:", productError)
				} else {
					console.log("Product created successfully:", newProduct)
					// Reset the form
					setFormData({
						productTitle: "",
						productDescription: "",
						productPrice: 0,
						manufacturerName: "",
					})
				}
			}
		} catch (error) {
			console.error("An error occurred:", error)
		}
	}

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-4">
			<input type="text" name="productTitle" placeholder="Product Title" value={formData.productTitle} onChange={handleChange} />
			<input
				type="text"
				name="productDescription"
				placeholder="Product Description"
				value={formData.productDescription}
				onChange={handleChange}
			/>
			<input type="number" name="productPrice" placeholder="Product Price" value={formData.productPrice} onChange={handleChange} />
			<input
				type="text"
				name="manufacturerName"
				placeholder="Manufacturer Name"
				value={formData.manufacturerName}
				onChange={handleChange}
			/>
			<button type="submit" className="p-4 bg-blue-200">
				Create Product
			</button>
		</form>
	)
}

export default MultipleSupabaseTablesForm