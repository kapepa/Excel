class StateApp {
	localState: any;
	baseComponent: any
;	constructor(baseComponent:any) {
		this.localState = {}
		this.baseComponent = baseComponent;
	}
	state(){
		return this.localState;
	}
	setState(component: any, arg:any){
		Object.assign(this.localState, arg);
		component.getHTML().innerHTML = component.toHTML().innerHTML
	}
}

export {StateApp} 