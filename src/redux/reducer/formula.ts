import { writeContentFormula } from "../variables";

function reducerFormula(state: any, action: any) {
	let cloneState = JSON.parse(JSON.stringify(state))
	let option: any = action.payload;
	switch(action.type){
		case writeContentFormula: 
			cloneState.lifeString = action.payload
			return cloneState
		default:
			return cloneState
	}
}

export default reducerFormula;