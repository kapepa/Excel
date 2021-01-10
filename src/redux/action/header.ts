import { setHeaderTitle } from '../variables';

let actionHeader = {
	headerTitle(arg:any){
		return {type: setHeaderTitle, payload: arg};
	}
}

export default actionHeader