import { useCallback, useState, useEffect } from "react"
import { Area, RawArea, TmpArea } from "type/Area"
import { Data } from "type/Data"
import { Size } from "type/Size"

export const useGetData = () => {
	const [data, setData] = useState<Data[]>([])
	const [area, setArea] = useState<TmpArea>({})
	const [size, setSize] = useState<Size[]>([])
	const getData = async () => {
		try {
			const req = await fetch(
				`https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/list?limit=10&sort={"uuid":"ascending"}`
				// search={"komoditas":"LELE"}
			)
			const res: Data[] = await req.json()
			setData(res)
		} catch (error) {
			console.log(error)
		}
	}
	const getArea = useCallback(async () => {
		try {
			const req = await fetch(
				`https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/option_area`
			)
			const res: RawArea[] = await req.json()
			const arr: Area[] = []
			let tmpObj: TmpArea = {}
			for (const item of res) {
				if (item.province && item.city) {
					if (tmpObj[item.province]?.length > 0) {
						tmpObj[item.province] = [
							...tmpObj[item.province],
							item.city,
						]
					} else {
						tmpObj[item.province] = [item.city]
					}
				}
			}
			for (const item in tmpObj) {
				arr.push({
					province: item,
					city: tmpObj[item],
				})
			}
			setArea(tmpObj)
		} catch (error) {
			console.log(error)
		}
	}, [])
	const getSize = useCallback(async () => {
		try {
			const req = await fetch(
				`https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/option_size`
			)
			const res: Size[] = await req.json()
			const sortedSize = res.sort(
				(a: Size, b: Size) => parseInt(a.size) - parseInt(b.size)
			)
			setSize(sortedSize)
		} catch (error) {
			console.log(error)
		}
	}, [])

	useEffect(() => {
		// getData()
		getSize()
		getArea()
	}, [])

	return { data, area, size }
}
