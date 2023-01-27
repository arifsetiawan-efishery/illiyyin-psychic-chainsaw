import React from "react"
import style from "./Pagination.module.scss"
import { Paginate } from "type/Paginate"
export default function Pagination({
	limit,
	offset,
	setLimit,
	setOffset,
	total,
}: Paginate) {
	return (
		<div className={style.container}>
			<p className={style.total}>Total Data : {total}</p>
			<div>
				<select
					className={style.select}
					value={limit}
					onChange={(e) => setLimit(parseInt(e.target.value))}
				>
					{[5, 10, 20, 40].map((item) => (
						<option value={item} key={item}>
							{item}
						</option>
					))}
				</select>
			</div>
			<div className={style.container}>
				<button
					className={style.button}
					onClick={() => {
						if (offset != 0) {
							setOffset((prev) => prev - limit)
						}
					}}
				>
					PREV
				</button>
				<button
					className={style.button}
					onClick={() => {
						if (offset + limit < total) {
							setOffset((prev) => prev + limit)
						}
					}}
				>
					NEXT
				</button>
			</div>
		</div>
	)
}
