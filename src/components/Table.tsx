import React from "react"
import { Data } from "type/Data"
import styles from "./Table.module.scss"

export default function Table({ data }: { data: Data[] }) {
	return (
			<table>
				<thead>
					<tr>
						{/* <th className={styles.header}>UUID</th> */}
						<th className={styles.header}>Komoditas</th>
						<th className={styles.header}>Provinsi</th>
						<th className={styles.header}>Kota</th>
						<th className={styles.header}>Size</th>
						<th className={styles.header}>Price</th>
						{/* <th className={styles.header}>Tanggal</th> */}
						<th className={styles.header}>Timestamp</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item) => (
						<tr className={ styles.row}>
							{/* <td>{item.uuid}</td> */}
							<td className={styles.cell}>{item.komoditas}</td>
							<td className={styles.cell}>{item.area_provinsi}</td>
							<td className={styles.cell}>{item.area_kota}</td>
							<td className={`${styles.cell} ${styles.size}`}>{item.size}</td>
							<td className={styles.cell}>{item.price}</td>
							{/* <td className={styles.cell}>{item.tgl_parsed}</td> */}
							<td className={styles.cell}>
								{new Date(
									parseInt(item.timestamp)
								).toLocaleString()}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		
	)
}
