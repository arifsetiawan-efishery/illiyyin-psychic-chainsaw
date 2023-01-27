import { Dispatch, SetStateAction } from "react";
import { TmpArea } from "./Area";
import { Size } from "./Size";

export type Modal = {
  listSize:Size[]
	listProvince:TmpArea
	onClose: Dispatch<SetStateAction<boolean>>,
}