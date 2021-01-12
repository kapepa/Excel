let utility = {
	onTransform: function(word: string){
		let begin: string = "on";
		let upCharacter: string = word.charAt(0).toLocaleUpperCase();
		return begin + upCharacter + word.substr(1);
	},
	rangeSelect: function (line: number, lineBase: number) {
		let [ start, end ] = line < lineBase ? [ line, lineBase ] : [ lineBase, line ];
		let len = end - start + 1;
		let arrSelect = new Array(len).fill({}).map( ( el, index ) => { return start + index });
		return arrSelect;
	},
	moveKey: function (action: string, line: number, pos: number) {
		switch(action){
			case "Enter":
			case "ArrowDown":
				line ++ ;
			break;
			case "ArrowLeft" :
				pos -- ;
			break;
			case "ArrowRight" :
				pos ++ ;
			break;
			case "ArrowUp" :
				line -- ;
			break;
		};
		return {line, pos};
	},
	createButton(arg:any){
		return `<div class="button material-icons" data-css='${arg.style}'>${arg.name}</div>`
	},
	calculate(elem:HTMLElement, string: string){
		let calc = string.substr(1,string.length);
		let doCalc = eval(calc);
		if(doCalc){
			elem.textContent = doCalc;
			return doCalc.toString()
		}
	},
	listTable(){
		let tableList = []
		for (var i = 0; i < localStorage.length; i++) {
			let url = window.location.origin;
			if(localStorage.key(i).includes(url)){
				let key = localStorage.key(i)
				let table = JSON.parse(window.localStorage.getItem(key));
				tableList.push({key: key.slice(url.length),title: table.title})
			};
		}
		return tableList.map((el:{key: string, title:string})=>{
			let explod = el.key.split("/");
			let date = new Date(parseInt(explod[explod.length -1]));
			return `
				<li class="db__table-list-record">
					<a href="${el.key}">
						<span>${el.title}</span>
						<strong>${date.getDay()}.${date.getMonth() < 10 ? ""+ date.getMonth() + 1 : date.getMonth() + 1 }.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}</strong>
					</a>	
				</li>
			`
		})
	}
}

export { utility }