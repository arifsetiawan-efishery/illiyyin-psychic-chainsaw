import React from "react"
import style from "./Pagination.module.scss"
export default function Pagination() {
	return (
		<div className={style.container}>
			<div>
        <select className={ style.select}>
					{[1, 2].map((item) => (
						<option>{item}</option>
					))}
				</select>
			</div>
			<div className={style.container}>
				<button className={style.button}>PREV</button>
				<button className={style.button}>NEXT</button>
			</div>
		</div>
	)
}
