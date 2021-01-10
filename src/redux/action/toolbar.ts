import { currentStyleToolBar } from '../variables';

let toolBarAction = {
	currentStyle(arg: string){
		return {type: currentStyleToolBar, payload: arg};
	}
}

export default toolBarAction;