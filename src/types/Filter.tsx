import { Dispatch, SetStateAction } from "react"
import { Size } from "./Size"
import { TmpArea } from "./Area"

export type Filter = {
	size: string|undefined
	city: string|undefined
	province: string|undefined
	setSize: Dispatch<SetStateAction<string|undefined>>
	setCity: Dispatch<SetStateAction<string|undefined>>
	setProvince: Dispatch<SetStateAction<string|undefined>>
	listSize: Size[]
	listProvince: TmpArea
}
