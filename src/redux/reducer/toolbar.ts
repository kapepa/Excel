import { currentStyleToolBar } from '../variables';

function reducerToolbar(state: any, action: any) {
	let cloneState = JSON.parse(JSON.stringify(state));
	let option = action.payload;
	switch(action.type){
		case currentStyleToolBar: 
			cloneState.btnActive = option;
			return cloneState
		default:
			return cloneState;
	}
}

export default reducerToolbar