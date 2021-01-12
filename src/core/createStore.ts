export function CreateStore(rootReducer: Function, initialsState?: any) {
	let state: any = initialsState || {title: "Новая таблица", col:{}, row:{}, content: {}, allStyle: {}, cordinate: {line: 0, pos: 0}};
	let listener: Array<{name: String, fnc: Function}> = [];

	return {
		subscribe(action: string, fnc: Function){
			listener.push({name: action ,fnc: fnc});
			return {
				unsubscribe(){
					listener.filter((obj:Object) => obj !== fnc);
				}
			}
		},
		dispatch(action: any){
			let root = rootReducer();
			let {type, ...prop} = action;
			Object.keys(root).forEach((key: string) => {
				let comapre = root[key](state, action)
				if(JSON.stringify(comapre) !== JSON.stringify(state)){
					state = comapre
					listener.forEach( (obj:any) => {
						if(action.type === obj.name){obj.fnc(action[Object.keys(prop)[0]])}
					});
				};
			});
			window.localStorage.setItem(window.location.href, JSON.stringify(state));
		},
		getState(){
			return state
		}
	}
}

