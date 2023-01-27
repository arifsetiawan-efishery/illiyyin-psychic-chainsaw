import React, { Dispatch, SetStateAction, useState } from "react"
import style from "./Modal.module.scss"
import Input from "./Input"
import { City, Province, Size } from "./Filter"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { v4 as uuidv4 } from "uuid"
import { Modal as Props } from "type/Modal"

export default function Modal({ listSize, listProvince, onClose }: Props) {
	const queryCache = useQueryClient()
	const [komoditas, setKomoditas] = useState("")
	const [price, setPrice] = useState("")
	const [size, setSize] = useState<undefined | string>()
	const [province, setProvince] = useState<undefined | string>()
	const [city, setCity] = useState<undefined | string>()

	const { mutate } = useMutation({
		mutationFn: async () => {
			const form = {
				uuid: uuidv4(),
				komoditas: komoditas,
				area_provinsi: province,
				area_kota:
					province && listProvince[province].length == 1
						? listProvince[province][0]
						: city,
				size: size,
				price: price,
				tgl_parsed: new Date().toISOString(),
				timestamp: new Date().getTime().toString(),
			}

			const req = await fetch(
				`https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/list`,
				{
					method: "POST",
					body: JSON.stringify([form]),
				}
			)
			const res = await req.json()
			if (!res.updatedRange) throw "Gagal"
			console.log(res, form)
		},
		onSuccess: () => {
			toast.success("berhasil update data user")
			onClose(false)
			queryCache.invalidateQueries({ queryKey: ["hargaData"] })
		},
		onError: (error) => toast.error(error as string),
	})
	return (
		<div className={style.container} onClick={() => onClose(false)}>
			<div className={style.wrapper} onClick={(e) => e.stopPropagation()}>
				<p>Input New Data</p>
				<div className={style.input_list}>
					<p>Komoditas</p>
					<Input
						placeholder="Komoditas"
						setValue={(e) => setKomoditas(e.target.value)}
						value={komoditas}
					/>
				</div>
				<div className={style.input_list}>
					<p>Province</p>

					<Province
						listProvince={listProvince}
						province={province}
						action={(e) => setProvince(e.target.value)}
					/>
				</div>
				<div className={style.input_list}>
					<p>City</p>
					<City
						city={city}
						setCity={setCity}
						province={province}
						listProvince={listProvince}
					/>
				</div>
				<div className={style.input_list}>
					<p>Size</p>
					<Size size={size} setSize={setSize} listSize={listSize} />
				</div>
				<div className={style.input_list}>
					<p>Price</p>
					<Input
						placeholder="Price"
						setValue={(e) => setPrice(e.target.value)}
						value={price}
						type={"number"}
					/>
				</div>
				<button className={style.submit} onClick={() => mutate()}>
					Submit
				</button>
			</div>
		</div>
	)
}
