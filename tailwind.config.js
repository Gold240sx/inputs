/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: "jit",
	content: ["./*{js,ts,jsx,tsx}","./**/*{js,ts,jsx,tsx}","./src/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}", "./node_modules/flowbite-react/**/*.js"],
	theme: {
		extend: {},
	},
	plugins: ["styled-jsx/babel", require("flowbite/plugin")],
}
