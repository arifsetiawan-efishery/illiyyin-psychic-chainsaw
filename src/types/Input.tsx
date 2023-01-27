import { ChangeEvent, Dispatch, SetStateAction } from "react"

export type Input = {
  setValue: (value:ChangeEvent<HTMLInputElement>)=>void
  value: string
  placeholder:string
}