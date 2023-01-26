import React from "react"
import style from "./Filter.module.scss"
import FilterSection from "./FilterSection"
export default function Filter() {
	return (
		<div className={style.container}>
			<p>Filter</p>
			<div className={style.section}>
				<FilterSection label="Size">
					<div className={style.wrapper}>
						<select className={style.select} name="" id="">
							{[1, 2].map((item) => (
								<option>{item}</option>
							))}
						</select>
						<button className={style.clear_button}>CLEAR</button>
					</div>
				</FilterSection>
				<FilterSection label="Province">
					<div className={style.wrapper}>
						<select className={style.select} name="" id="">
							{[1, 2].map((item) => (
								<option>{item}</option>
							))}
						</select>
						<button className={style.clear_button}>CLEAR</button>
					</div>
				</FilterSection>
				<FilterSection label="City">
					<div className={style.wrapper}>
						<select className={style.select} name="" id="">
							{[1, 2].map((item) => (
								<option>{item}</option>
							))}
						</select>
						<button className={style.clear_button}>CLEAR</button>
					</div>
				</FilterSection>
			</div>
		</div>
	)
}
