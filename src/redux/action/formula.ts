import { writeContentFormula } from '../variables';

let actionFormula = {
	formulaInput(arg: any){
		return {type: writeContentFormula, payload: arg}
	}
}

export default actionFormula