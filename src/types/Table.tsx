import { Dispatch, SetStateAction } from "react"
import { Data } from "./Data"

export type TableHeader = {
	key: string
	label: string
}

export type Table = {
	data: Data[]
	isLoading: number
  setOrder: Dispatch<SetStateAction<Order>>
  offset:number
}

export type Order = {
	by: keyof Data
	isAsc: boolean
}
