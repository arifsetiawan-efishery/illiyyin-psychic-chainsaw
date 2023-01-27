import { ChangeEvent, HTMLInputTypeAttribute } from "react"

export type Input = {
	setValue: (value: ChangeEvent<HTMLInputElement>) => void
	value: string
	placeholder: string
	type?: HTMLInputTypeAttribute
}
