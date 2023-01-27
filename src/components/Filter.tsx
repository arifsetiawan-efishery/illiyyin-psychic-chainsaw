import React from "react"
import style from "./Filter.module.scss"
import FilterSection from "./FilterSection"
import {
	Filter as Props,
	SizeProps,
	ProvinceProps,
	CityProps,
} from "type/Filter"

export const Size = ({ size, setSize, listSize }: SizeProps) => {
	return (
		<select
			className={style.select}
			onChange={(e) => setSize?.(e.target.value)}
			value={size}
		>
			{listSize?.map((item) => (
				<option value={item.size} key={item.size}>
					{item.size}
				</option>
			))}
		</select>
	)
}
export const Province = ({ province, listProvince, action }: ProvinceProps) => {
	return (
		<select className={style.select} onChange={action} value={province}>
			{listProvince
				? Object.keys(listProvince).map((item) => (
						<option value={item} key={item}>
							{item}
						</option>
				  ))
				: null}
		</select>
	)
}
export const City = ({ city, province, listProvince, setCity }: CityProps) => {
	return (
		<select
			className={style.select}
			onChange={(e) => setCity?.(e.target.value)}
			value={city}
		>
			{province && listProvince
				? listProvince[province].map((item) => (
						<option value={item} key={item}>
							{item}
						</option>
				  ))
				: null}
		</select>
	)
}

export default function Filter({
	size,
	city,
	province,
	listProvince,
	listSize,
	setCity,
	setProvince,
	setSize,
	addItem,
}: Props) {
	return (
		<div className={style.container}>
			<div className={style.section}>
				<p>Filter</p>
				<FilterSection label="Size">
					<div className={style.wrapper}>
						<Size
							size={size}
							setSize={setSize}
							listSize={listSize}
						/>
						<button
							onClick={() => setSize(undefined)}
							className={`${style.clear_button} ${
								!size ? style.hide : ""
							}`}
						>
							CLEAR
						</button>
					</div>
				</FilterSection>
				<FilterSection label="Province">
					<div className={style.wrapper}>
						<Province
							province={province}
							listProvince={listProvince}
							action={(e) => {
								setProvince(e.target.value)
								setCity(undefined)
							}}
						/>
						<button
							onClick={() => setProvince(undefined)}
							className={`${style.clear_button} ${
								!province ? style.hide : ""
							}`}
						>
							CLEAR
						</button>
					</div>
				</FilterSection>
				<FilterSection label="City">
					<div className={style.wrapper}>
						<City
							city={city}
							province={province}
							listProvince={listProvince}
							setCity={setCity}
						/>

						<button
							onClick={() => setCity(undefined)}
							className={`${style.clear_button} ${
								!city ? style.hide : ""
							}`}
						>
							CLEAR
						</button>
					</div>
				</FilterSection>
			</div>
			<button className={style.add_button} onClick={addItem}>
				Add Item
			</button>
		</div>
	)
}
