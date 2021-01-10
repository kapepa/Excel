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
	}
}

export { utility }