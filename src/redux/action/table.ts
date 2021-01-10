import { changeSizeCell, writeContentCell, setStyleCell } from '../variables';

let actionTable = {
	establishCol(data: any){
		return {type: changeSizeCell, payload: data};
	},
	writeContentCell(data: any){
		return {type: writeContentCell, payload: data};
	},
	setStyle(arg:any){
		return {type: setStyleCell, payload: arg}
	},
}

export default actionTable;