import * as React from "react"
import Downshift from "downshift"
import type { DownshiftProps } from "downshift"
import { GrFormClose } from "react-icons/gr"
// import { FlowbiteInput } from "../FlowbiteComponents"
import { TextInput } from "flowbite-react"

const items = ["apple", "pear", "orange", "grape", "banana"] as const

export type Item = (typeof items)[number]

export default React.forwardRef<Downshift<Item>, DownshiftProps<Item> & { value: Item }>(({ value, onChange }, ref) => (
	<Downshift ref={ref} selectedItem={value} onChange={onChange}>
		{({ getInputProps, getItemProps, getLabelProps, getMenuProps, isOpen, inputValue }) => (
			<div className="flex flex-col gap-2">
				<label {...getLabelProps()} className="label">
					Downshift
				</label>
				<div className="relative flex items-center gap-0">
					<TextInput
						{...getInputProps()}
						// className="input w-full px-2 py-1 rounded border-[#cccccc] border text-lg"
						placeholder="Enter a fruit"
					/>
					<span className="absolute mb-1 text-xl font-extralight right-9 text-[#cccccc]">|</span>
					<GrFormClose
						className="absolute w-6 h-6 cursor-pointer right-2 opacity-30 hover:opacity-50"
						// on click reset the value
						// onClick={() => setValue("")}
					/>
				</div>
				<ul {...getMenuProps()}>
					{isOpen
						? items
								.filter((item) => !inputValue || item.includes(inputValue))
								.map((item, index) => (
									<li
										className="px-2 py-1 rounded hover:bg-[#eeeeee] cursor-pointer"
										{...getItemProps({
											key: item,
											index,
											item,
										})}>
										{item}
									</li>
								))
						: null}
				</ul>
			</div>
		)}
	</Downshift>
))
