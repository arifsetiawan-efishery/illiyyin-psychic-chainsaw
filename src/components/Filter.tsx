import React from "react"
import style from "./Filter.module.scss"
import FilterSection from "./FilterSection"
import { Filter as Props } from "type/Filter"
export default function Filter({
	size,
	city,
	province,
	listProvince,
	listSize,
	setCity,
	setProvince,
	setSize,
}: Props) {
	return (
		<div className={style.container}>
			<p>Filter</p>
			<div className={style.section}>
				<FilterSection label="Size">
					<div className={style.wrapper}>
						<select
							className={style.select}
							onChange={(e) => setSize(e.target.value)}
							value={size}
						>
							{listSize.map((item) => (
								<option value={item.size} key={item.size}>
									{item.size}
								</option>
							))}
						</select>
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
						<select
							className={style.select}
							onChange={(e) => {
								setProvince(e.target.value)
								setCity(undefined)
							}}
							value={province}
						>
							{Object.keys(listProvince).map((item) => (
								<option value={item} key={item}>
									{item}
								</option>
							))}
						</select>
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
						<select
							className={style.select}
							onChange={(e) => setCity(e.target.value)}
							value={city}
						>
							{province
								? listProvince[province].map((item) => (
										<option value={item} key={item}>
											{item}
										</option>
								  ))
								: null}
						</select>
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
		</div>
	)
}
