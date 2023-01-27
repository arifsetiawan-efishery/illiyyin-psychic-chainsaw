import { Dispatch, SetStateAction } from "react"

export type Paginate = {
	setLimit: Dispatch<SetStateAction<number>>
	setOffset: Dispatch<SetStateAction<number>>
	limit: number
	offset: number
	total: number
}
