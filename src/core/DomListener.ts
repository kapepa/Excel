class DomListener {
	activeElement: any
	listListener: Array<any>;
	constructor(props:{components:  Array<object> }){
		this.activeElement = null
		this.listListener = [];
	}
	getActiveEl = () => {
		return this.activeElement;
	}
	setActiveEl = (arg:any) => {
		return this.activeElement = arg
	}
	initListener = (compon: HTMLElement ,action: string, callback: any) => {
		this.listListener.push({compon,action,callback})
		compon.addEventListener(action, callback);
	}
	delListenenr(compon: HTMLElement ,action: string, callback: any){
		compon.removeEventListener(action, callback);
	}
	destroy(){
		this.listListener.forEach((obj:{compon:HTMLElement,action:string,callback:Function}) => {
			this.delListenenr(obj.compon,obj.action,obj.callback)
		})
	}
}

export { DomListener }