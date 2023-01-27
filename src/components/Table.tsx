import React from "react"
import { Data } from "type/Data"
import styles from "./Table.module.scss"
import Spinner from "asset/spinner.svg"
import { Table as Props } from "type/Table"

export default function Table({ data, isLoading, setOrder, offset }: Props) {
	const handleOrder = (order_by: keyof Data) => {
		setOrder((prev) => ({
			by: order_by,
			isAsc: prev.by == order_by ? !prev.isAsc : prev.isAsc,
		}))
	}
	return (
		<table>
			<thead>
				<tr>
					{/* <th className={styles.header}>UUID</th> */}
					<th className={styles.header}>No.</th>
					<th
						className={styles.header}
						onClick={() => handleOrder("komoditas")}
					>
						Komoditas
					</th>
					<th
						className={styles.header}
						onClick={() => handleOrder("area_provinsi")}
					>
						Provinsi
					</th>
					<th
						className={styles.header}
						onClick={() => handleOrder("area_kota")}
					>
						Kota
					</th>
					<th
						className={styles.header}
						onClick={() => handleOrder("size")}
					>
						Size
					</th>
					<th
						className={styles.header}
						onClick={() => handleOrder("price")}
					>
						Price
					</th>
					<th
						className={styles.header}
						onClick={() => handleOrder("timestamp")}
					>
						Timestamp
					</th>
				</tr>
			</thead>
			<tbody>
				{isLoading ? (
					<tr>
						<td colSpan={6}>
							<img src={Spinner} className={styles.spinner} />
						</td>
					</tr>
				) : (
					data.map((item, index) => (
						<tr className={styles.row} key={item.uuid}>
							{/* <td>{item.uuid}</td> */}
							<td className={styles.cell}>
								{index + 1 + offset}
							</td>
							<td className={styles.cell}>{item.komoditas}</td>
							<td className={styles.cell}>
								{item.area_provinsi}
							</td>
							<td className={styles.cell}>{item.area_kota}</td>
							<td className={`${styles.cell} ${styles.size}`}>
								{item.size}
							</td>
							<td className={styles.cell}>{item.price}</td>
							<td className={styles.cell}>
								{new Date(
									parseInt(item.timestamp)
								).toLocaleString()}
							</td>
						</tr>
					))
				)}
			</tbody>
		</table>
	)
}
