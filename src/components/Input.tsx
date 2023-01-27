import React, { ChangeEvent } from "react"
import styles from "./Input.module.scss"
import { Input as Props } from "type/Input"
export default function Input({ value, setValue, placeholder }: Props) {
	return (
		<div className={styles.container}>
			<input
				className={styles.input}
				value={value}
				onChange={setValue}
				placeholder={placeholder}
			/>
		</div>
	)
}
