export type RawArea = {
	province: string
	city: string
}
export type Area = {
	province: string
	city: string[]
}

export type TmpArea = {
	[key: string]: string[]
}
