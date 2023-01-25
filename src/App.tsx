import { ChangeEvent, useCallback, useEffect, useState } from "react"
import "./App.scss"
import { useGetData } from "util/useGetData"
import { TmpArea } from "type/Area"
import Table from "component/Table"
const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

function App() {
  const { data, area, size } = useGetData()
  const [offset,setOffset]=useState(0)
	const [selectedProvince, setSelectedProvince] = useState<
		undefined | string
	>()
  const [selectedCity, setSelectedCity] = useState<undefined | string>()
  
  const final = data.slice(0+offset,10+offset)

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
        <button onClick={()=>setOffset(prev=>prev-10)}>back</button>
        <button onClick={()=>setOffset(prev=>prev+10)}>next</button>
        {/* <p>{JSON.stringify(final)}</p> */}
      </div>
			<select>
				{size.map((item) => (
					<option>{item.size}</option>
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
						clear
					</button>
				</>
			) : null}
			<h1>Hai</h1>
			<p>{selectedProvince}</p>
			<p>{selectedCity}</p>
			<Table data={final} />
			{/* <p>{JSON.stringify(area[selectedProvince])}</p> */}
		</div>
	)
}

export default App
