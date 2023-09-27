import React, { useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

const stepper = ({min,max,step, start, unit, className, name, handleOnChange }) => {
    const [value, setValue] = useState(start)
    
    const handleClick = (type) => {
        if (type === "plus") {
            if (value < max) {
                setValue(value + step)
                handleOnChange(value + step, "root")
            }
        } else {
            if (value > min) {
                setValue(value - step)
                handleOnChange(value - step, "root")
            }
        }
    }

    return (
		<div className={` ${className} bg-white select-none shadow-xs relative shadow-black/20 flex items-center h-20 overflow-hidden border border-zinc-300 rounded-md text-zinc-800`}>
			<input type="number" name={name} min={min} max={max} step={step} value={value} className="hidden" />
			<div className="flex w-full px-4 text-5xl items-right h-fit text-zinc-700">
                <p className='w-full ml-auto text-right'>{value}</p>
                <span className='flex mt-auto mr-12 text-2xl font-semibold text-right text-zinc-500'>{unit}</span>
            </div>
			<div className="absolute right-0 flex flex-col items-center h-full text-2xl text-center cursor-pointer w-14 bg-zinc-600">
				<div onClick={() => handleClick("plus")} className="flex w-full h-full text-4xl text-center text-white active:text-zinc-300 bg-zinc-600 hover:bg-zinc-500 ">
                    <IoIosArrowUp className='flex mx-auto'/>

                </div>
				<hr className="w-full border border-black" />
				<div onClick={() => handleClick("minus")} className="flex w-full h-full text-4xl text-white active:text-zinc-300 bg-zinc-600 hover:bg-zinc-500 ">
                    <IoIosArrowDown className='flex mx-auto'/>
          
                </div>
			</div>
		</div>
	)
}

export default stepper