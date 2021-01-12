class ActiveRouter{
	static hash(){
		return window.location.hash.slice(1)
	}
	static param(arg?: string){
		let url = this.hash().split("/")
		return arg === "first" ? url[0] : url[1];
	}
	static url(param:string){
		let name = window.location.origin;
		window.location.assign(name + param);
	}
	static href(){
		return window.location.href
	}
}

export default ActiveRouter