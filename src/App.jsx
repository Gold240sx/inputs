//
import Form from "./forms/form";
import NestedDataForm from "./forms/nested-data-form";
import ReactHookForm from "./forms/react-hook-form";
import InputTypeForm from "./forms/inputType-form"
import SupabaseForm from "./forms/supabaseForm"
import MultipleSupabaseTablesForm from "./forms/multipleSupabaseTables-form"
import "./styles/index.css"


function App() {
	return (
		<>
			<main className="relative flex items-center w-screen min-h-screen p-4 shadow-lg bg-zinc-200 shadow-black">
				<div id="card" className="flex flex-col w-full p-4 rounded-lg bg-zinc-100">
					<h1 className="p-6 text-4xl capitalize text-sky-600">form submit test</h1>
					{/* <Form /> */}
					{/* <NestedDataForm /> */}
					{/* <InputTypeForm /> */}
					{/* <SupabaseForm /> */}
					{/* <MultipleSupabaseTablesForm /> */}
					<ReactHookForm />
				</div>
			</main>
		</>
	)
}

export default App
