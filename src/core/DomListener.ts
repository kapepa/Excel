class DomListener {
	constructor(props:{ selector: string, components:  Array<object> }){

	}
	initListener(compon: HTMLElement ,action: string, callback: any){
		compon.addEventListener(action, callback);
	}
	delListenenr(compon: HTMLElement ,action: string, callback: any){
		compon.removeEventListener(action, callback);
	}
}

export { DomListener }