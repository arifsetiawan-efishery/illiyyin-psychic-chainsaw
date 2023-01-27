import { useState } from "react"
// import "./App.scss"
import { useGetData } from "util/useGetData"
import Table from "component/Table"
import Filter from "component/Filter"
import style from "./App.module.scss"
import Input from "component/Input"
import Pagination from "component/Pagination"
import { useIsFetching } from "@tanstack/react-query"
import Modal from "component/Modal"
import { Toaster } from "react-hot-toast"

function App() {
	const isFetching = useIsFetching()
	const [offset, setOffset] = useState(0)
	const [limit, setLimit] = useState(10)
	const [selectedProvince, setSelectedProvince] = useState<
		undefined | string
	>()
	const [selectedCity, setSelectedCity] = useState<undefined | string>()
	const [selectedSize, setSelectedSize] = useState<undefined | string>()
	const [openModal, setOpenModal] = useState(false)

	const { data, area, size, setSearch, search, setOrder, total } = useGetData(
		{
			query: {
				area_provinsi: selectedProvince,
				area_kota: selectedCity,
				size: selectedSize,
			},
		}
	)

	const final = data.slice(0 + offset, limit + offset)

	return (
		<div className={style.app}>
			<Toaster />
			{openModal ? (
				<Modal
					listSize={size}
					listProvince={area}
					onClose={setOpenModal}
				/>
			) : null}
			<div className={`${style.container} ${style.search}`}>
				<Input
					value={search}
					setValue={setSearch}
					placeholder="Cari berdasarkan komoditas"
				/>
				<Pagination
					setOffset={setOffset}
					setLimit={setLimit}
					offset={offset}
					limit={limit}
					total={total}
				/>
			</div>
			<div className={style.container}>
				<Filter
					size={selectedSize}
					city={selectedCity}
					province={selectedProvince}
					setSize={setSelectedSize}
					setCity={setSelectedCity}
					setProvince={setSelectedProvince}
					listSize={size}
					listProvince={area}
					addItem={() => setOpenModal(true)}
				/>
				<Table
					data={final}
					isLoading={isFetching}
					setOrder={setOrder}
					offset={offset}
				/>
			</div>
		</div>
	)
}

export default App
