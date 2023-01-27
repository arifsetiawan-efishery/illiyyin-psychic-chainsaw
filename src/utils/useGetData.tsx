import { useQuery } from "@tanstack/react-query"
import { useCallback, useState, useEffect, ChangeEvent } from "react"
import { Area, RawArea, TmpArea } from "type/Area"
import { Data, Query } from "type/Data"
import { Size } from "type/Size"
import { Order } from "type/Table"

export const useGetData = ({ query }: { query: Query }) => {
	const [data, setData] = useState<Data[]>([])
	const [area, setArea] = useState<TmpArea>({})
	const [size, setSize] = useState<Size[]>([])
	const [order, setOrder] = useState<Order>({
		by: "uuid",
		isAsc: true,
	})
	const [search, setSearch] = useState<string>("")
	const [rawData, setRawData] = useState<Data[]>([])

	useQuery({
		queryKey: [query],
		queryFn: async () => {
			let searchQuery = ""
			if (Object.values(query).some((item) => item)) {
				const objQuery = (Object.keys(query) as (keyof Query)[]).filter(
					(item) => query[item]
				)
				let finalQuery = {} as Query
				for (const item of objQuery) {
					finalQuery[item] = query[item]
				}
				searchQuery += `search=${JSON.stringify(finalQuery)}`
			}
			console.log(search, query)
			const req = await fetch(
				`https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/list?${searchQuery}`
				// search={"komoditas":"LELE"}
			)
			const res: Data[] = await req.json()
			const tmpArr: Data[] = []
			for (const item of res) {
				if (
					(Object.keys(item) as (keyof Data)[]).some(
						(val) => item[val] == null
					) ||
					Object.keys(item).length == 0
				) {
					continue
				}
				tmpArr.push(item)
			}
			setRawData(tmpArr)
			if (search.length > 0) {
				const filtered = tmpArr.filter((item) =>
					item.komoditas.toLowerCase().includes(search.toLowerCase())
				)
				console.log(filtered, tmpArr, search)
				setData(filtered)
			} else {
				setData(tmpArr)
			}
		},
	})
	useQuery({
		queryKey: ["areaData"],
		queryFn: async () => {
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
		},
	})
	useQuery({
		queryKey: ["sizeData"],
		queryFn: async () => {
			const req = await fetch(
				`https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/option_size`
			)
			const res: Size[] = await req.json()
			const sortedSize = res.sort(
				(a: Size, b: Size) => parseInt(a.size) - parseInt(b.size)
			)
			setSize(sortedSize)
		},
	})

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value)
	}

	useEffect(() => {
		setData(
			rawData.sort((a, b) => {
				if (
					["price", "size", "timestamp"].some(
						(item) => item == order.by
					)
				) {
					if (!order.isAsc) {
						return parseInt(b[order.by]) - parseInt(a[order.by])
					}
					return parseInt(a[order.by]) - parseInt(b[order.by])
				}
				if (!order.isAsc) {
					return b[order.by].localeCompare(a[order.by])
				}
				return a[order.by].localeCompare(b[order.by])
			})
		)
	}, [order.by, order.isAsc])

	useEffect(() => {
		setData(
			rawData.filter((item) =>
				item.komoditas.toLowerCase().includes(search.toLowerCase())
			)
		)
	}, [search])

	return { data, area, size, setSearch: handleSearch, search, setOrder,total:data.length }
}
