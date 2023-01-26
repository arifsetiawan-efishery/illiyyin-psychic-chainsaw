import React from "react"
import { Data } from "type/Data"

export default function Table({ data }: { data: Data[] }) {
	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>UUID</th>
						<th>Komoditas</th>
						<th>Provinsi</th>
						<th>Kota</th>
						<th>Size</th>
						<th>Price</th>
						<th>Tanggal</th>
						<th>Timestamp</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item) => (
						<tr>
							<td>{item.uuid}</td>
							<td>{item.komoditas}</td>
							<td>{item.area_provinsi}</td>
							<td>{item.area_kota}</td>
							<td>{item.size}</td>
							<td>{item.price}</td>
							<td>{item.tgl_parsed}</td>
							<td>{new Date(parseInt(item.timestamp)).toLocaleString()}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
