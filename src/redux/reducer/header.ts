import { setHeaderTitle } from "../variables";

function reducerHeader(state:any, action:any) {
	let cloneState = JSON.parse(JSON.stringify(state))
	switch(action.type){
		case setHeaderTitle:
			cloneState.title = action.payload;
			window.localStorage.setItem(window.location.origin,JSON.stringify(cloneState));
			return cloneState
		default:
			return cloneState
	}
};

export default reducerHeader;
