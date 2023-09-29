import React, { useState } from "react"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { BsPlusCircle, BsDashCircle } from "react-icons/bs"
import { FiPlus, FiMinus } from "react-icons/fi"
import { BiSolidMinusSquare, BiSolidPlusSquare } from "react-icons/bi"
import { useForm, Controller } from "react-hook-form"

const RHFStepperMinimal = ({ min, max, step, start, unit, className, layout, style, card, name, onChange }) => {
	const [value, setValue] = useState(start)
	const { control } = useForm()

	const handleClick = (type) => {
		if (type === "plus") {
			if (value < max) {
				setValue(value + step)
				onChange(name, value + step)
			}
		} else {
			if (value > min) {
				setValue(value - step)
				onChange(name, value - step)
			}
		}
	}

	const stepperIsColored = (action) => {
		if (action === "plus") {
			return value < max
		} else if (action === "minus") {
			return value > min
		}
		return false
	}

	return (
		<div
			className={` ${className} ${layout === "vertical" ? "flex-col" : "flex-row-reverse"} ${
				card
					? "bg-white dark:bg-zinc-600 py-2 w-full rounded-md shadow-sm ring-2 ring-zinc-400/10 ring-inset-2 border-zinc-300 border  justify-between"
					: "align-middle justify-center "
			}  relative flex items-center select-none `}>
			<Controller
				name={name}
				control={control}
				defaultValue={start}
				render={({ field }) => <input {...field} type="number" min={min} max={max} step={step} className="hidden" />}
			/>
			<div
				onClick={() => handleClick("plus")}
				className={`${
					layout === "vertical" ? "hover:-translate-y-0.5" : "flex-col mr-auto flex"
				} flex w-full h-full text-4xl text-center cursor-pointer text-zinc-400 active:text-zinc-600 hover:text-zinc-500`}>
				{layout === "vertical" && <IoIosArrowUp className="flex mx-auto" />}
				{layout === "horizontal" && style === "boxes" && (
					<BiSolidPlusSquare
						className={`${
							stepperIsColored("plus") ? "text-teal-500 active:text-teal-600" : "cursor-default hover:text-zinc-400"
						} flex mx-auto`}
					/>
				)}
				{layout === "horizontal" && style === "minimal" && <BsPlusCircle className="flex mx-auto" />}
				{layout === "horizontal" && style === "color" && (
					<FiPlus
						className={`bg-teal-400 p-1 active:bg-teal-600 hover:bg-teal-500 text-white  rounded-full flex  ml-auto mr-3`}
					/>
				)}
			</div>
			<div className="flex justify-center w-full mx-auto align-middle">
				<p className="text-4xl ">{value}</p>
				<span className="flex mt-auto text-2xl font-semibold text-zinc-500">{unit}</span>
			</div>
			<div
				onClick={() => handleClick("minus")}
				className={`${
					layout === "vertical" ? "hover:translate-y-0.5" : "flex-col items-center"
				} flex w-full h-full text-4xl cursor-pointer text-zinc-400 active:text-zinc-600 hover:text-zinc-500`}>
				{layout === "vertical" && <IoIosArrowDown className="flex mx-auto" />}
				{layout === "horizontal" && style === "boxes" && (
					<BiSolidMinusSquare
						className={`${
							stepperIsColored("minus") ? "text-teal-500 active:text-teal-600" : "cursor-default hover:text-zinc-400"
						} flex mx-auto`}
					/>
				)}
				{layout === "horizontal" && style === "minimal" && <BsDashCircle className="flex mx-auto" />}
				{layout === "horizontal" && style === "color" && (
					<FiMinus
						className={` bg-teal-200 hover:bg-teal-300 active:bg-teal-400 text-teal-800  p-1 rounded-full flex mx-auto mr-auto ml-3`}
					/>
				)}
			</div>
		</div>
	)
}

export default RHFStepperMinimal
