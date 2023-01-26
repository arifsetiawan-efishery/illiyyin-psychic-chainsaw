export type Data = {
  uuid: string
  komoditas: string
  area_provinsi: string
  area_kota: string
  size: string
  price: string
  tgl_parsed: string
  timestamp: string
}

export type Query={
  area_provinsi: string|undefined
  area_kota: string|undefined
  size: string|undefined
}