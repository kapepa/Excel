class DomListener {
	activeElement: any
	constructor(props:{ selector: string, components:  Array<object> }){
		this.activeElement = null
	}
	getActiveEl = () => {
		return this.activeElement;
	}
	setActiveEl = (arg:any) => {
		return this.activeElement = arg
	}
	initListener(compon: HTMLElement ,action: string, callback: any){
		compon.addEventListener(action, callback);
	}
	delListenenr(compon: HTMLElement ,action: string, callback: any){
		compon.removeEventListener(action, callback);
	}
}

export { DomListener }