import { ChangeEvent, Dispatch, SetStateAction } from "react"
import { Size } from "./Size"
import { TmpArea } from "./Area"

export type SizeProps = {
	size: string | undefined
	setSize: Dispatch<SetStateAction<string | undefined>>
	listSize: Size[]|undefined
}
export type ProvinceProps = {
	province: string | undefined
	listProvince: TmpArea | undefined
	action?: (key: ChangeEvent<HTMLSelectElement>) => void
}
export type CityProps = {
	city: string | undefined
	setCity: Dispatch<SetStateAction<string | undefined>>
	listProvince: TmpArea | undefined
	province: string | undefined
}

export type Filter = {
	size: string | undefined
	city: string | undefined
	province: string | undefined
	setSize: Dispatch<SetStateAction<string | undefined>>
	setCity: Dispatch<SetStateAction<string | undefined>>
	setProvince: Dispatch<SetStateAction<string | undefined>>
	listSize: Size[]
	listProvince: TmpArea
	action?: (key: ChangeEvent<HTMLSelectElement>) => void
	addItem:()=>void
}
