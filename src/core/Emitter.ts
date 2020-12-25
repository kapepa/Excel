class Emmiter {
	subscribeList: any;
	destroyList: any;
	constructor(){
		this.subscribeList = {}
		this.destroyList = []
	}
	emmit = (action: string, data: any) => {
		if(this.subscribeList[action] instanceof Function) this.subscribeList[action](data);
	}
	subscribe = (action: string, fnc: Function) => {
		this.subscribeList[action] = fnc;
		this.destroyList.push(action);
		this.destroyList.filter( (act:string) => {return !(act === action)} )
	}

	destroy = () => {
		return this.destroyList;
	}
}

export default Emmiter;