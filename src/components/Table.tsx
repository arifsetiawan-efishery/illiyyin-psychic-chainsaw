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
					</tr>
				</thead>
				<tbody>
					{data.map((item) => (
						<tr>
							<td>{item.uuid}</td>
							<td>{item.komoditas}</td>
							<td>{item.area_provinsi}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
