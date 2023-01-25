import { useCallback, useEffect, useState } from "react"
import "./App.scss"
import { useGetData } from "util/useGetData"

function App() {
	const { area, size } = useGetData()
	const [selectedProvince, setSelectedProvince] = useState<null | string>(
		null
	)

	return (
		<div className="">
			<select>
				{size.map((item) => (
					<option>{item.size}</option>
				))}
			</select>
			<select onChange={(e) => setSelectedProvince(e.target.value)}>
				{Object.keys(area).map((item) => (
					<option value={item}>{item}</option>
				))}
			</select>
			{selectedProvince ? (
				<select>
					{area[selectedProvince].map((item) => (
						<option>{item}</option>
					))}
				</select>
			) : null}
			<h1>Hai</h1>
		</div>
	)
}

export default App
