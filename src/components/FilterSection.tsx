import React, { ReactNode } from "react"
import style from "./FilterSection.module.scss"
export default function FilterSection({
	children,
	label,
}: {
	children: ReactNode
	label: string
}) {
	return (
		<div className={style.container}>
			<p className={style.label}>{label}</p>
			<div className={style.container}>{children}</div>
		</div>
	)
}
