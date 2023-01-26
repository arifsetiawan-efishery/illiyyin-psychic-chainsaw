import { ChangeEvent, useCallback, useEffect, useState } from "react"
import "./App.scss"
import { useGetData } from "util/useGetData"
import { TmpArea } from "type/Area"
import Table from "component/Table"

function App() {
	const [offset, setOffset] = useState(0)
	const [selectedProvince, setSelectedProvince] = useState<
		undefined | string
	>()
	const [selectedCity, setSelectedCity] = useState<undefined | string>()
	const [selectedSize, setSelectedSize] = useState<undefined | string>()
	// const query =
	const { data, area, size, setSearch, search } = useGetData({
		query: {
			area_provinsi: selectedProvince,
			area_kota: selectedCity,
			size: selectedSize,
		},
	})

	const final = data.slice(0 + offset, 10 + offset)

	const handleSelectProvince = useCallback(
		(e: ChangeEvent<HTMLSelectElement>, area: TmpArea) => {
			const { value } = e.target

			setSelectedCity(undefined)
			if (area[value].length == 1) {
				setSelectedCity(area[value][0])
			}
			setSelectedProvince(value)
		},
		[]
	)
	return (
		<div className="">
			<div>
				<button
					onClick={() => {
						if (data.length > 10) setOffset((prev) => prev - 10)
					}}
				>
					back
				</button>
				<button
					onClick={() => {
						if (data.length > 10) setOffset((prev) => prev + 10)
					}}
				>
					next
				</button>
				{/* <p>{JSON.stringify(final)}</p> */}
			</div>
			<select
				value={selectedSize}
				onChange={(e) => setSelectedSize(e.target.value)}
			>
				{size.map((item) => (
					<option value={item.size}>{item.size}</option>
				))}
			</select>
			<select
				onChange={(e) => handleSelectProvince(e, area)}
				value={selectedProvince}
			>
				{Object.keys(area).map((item) => (
					<option value={item}>{item}</option>
				))}
			</select>
			{selectedProvince ? (
				<>
					<select
						value={selectedCity}
						onChange={(e) => setSelectedCity(e.target.value)}
					>
						{area[selectedProvince].map((item) => (
							<option value={item}>{item}</option>
						))}
					</select>
					<button onClick={() => setSelectedCity(undefined)}>
						clear city
					</button>
				</>
			) : null}
			<button
				onClick={() => {
					setSelectedCity(undefined)
					setSelectedProvince(undefined)
				}}
			>
				clear city& prov
			</button>
			<button
				onClick={() => {
					setSelectedSize(undefined)
				}}
			>
				clear size
			</button>
			<h1>Hai</h1>
			<input onChange={setSearch} value={search} />
			<p>{selectedProvince}</p>
			<p>{selectedCity}</p>
			<Table data={final} />
			{/* <p>{JSON.stringify(area[selectedProvince])}</p> */}
		</div>
	)
}

export default App
