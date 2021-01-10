import { utility } from "../../core/utility";
import { actionFormula, toolBarAction } from '../../redux/action/index';

class SelectTable {
	curretnElem: any | null;
	listElem: Array<any> | undefined;
	dispatch: Function;
	subscribe: Function;
	setActiveEl: Function;
	private active: string ;
	constructor(props: {dispatch: Function, subscribe: Function, setActiveEl: Function}){
		this.subscribe = props.subscribe;
		this.dispatch = props.dispatch;
		this.curretnElem = null;
		this.listElem = new Array();
		this.active = "active-cell";
		this.setActiveEl = props.setActiveEl;
	}

	actionKey(action: string){
		let currline = parseInt(this.curretnElem.dataset.line);
		let currpos = parseInt(this.curretnElem.dataset.pos);
		let {line, pos}: {line: number, pos: number} = utility.moveKey(action, currline, currpos);
		this.selectOne(line, pos)
	}

	clear(name: string){
		Array.from(document.querySelectorAll(`.${name}`)).map( el => el.classList.remove(name));
	}

	selectOne = (line: number = 0, pos: number = 0) => {
		let element = document.querySelectorAll(`[data-line="${line}"][data-pos="${pos}"]`)[0];
		let cellStyle = element.getAttribute("style");
		if(element){
			this.curretnElem = element;
			let content = this.curretnElem.querySelector("[contenteditable]")
			let checkDel: Array<HTMLElement> = Array.from(document.querySelectorAll(this.active));
			if(checkDel) this.clear(this.active)
			element.querySelector(`[contenteditable]`).focus()
			element.classList.add(this.active);

			let range = document.createRange();
			range.selectNodeContents(content);
			range.collapse(false);
			let sel = window.getSelection();
			sel.removeAllRanges()
			sel.addRange(range);

			this.setActiveEl(element)
			this.dispatch(actionFormula.formulaInput(content.textContent))
			this.dispatch(toolBarAction.currentStyle(cellStyle))
		}
	}

	selectMany = (line: number, pos: number) => {
		let acticeCell = new Array();
		let basePosition: any = this.curretnElem.dataset;
		let currLine: Array<number> = utility.rangeSelect( parseInt(basePosition.line), line );
		let currPos: Array<number> = utility.rangeSelect( parseInt(basePosition.pos), pos );

		for(let key of currLine){
			for(let val of currPos){
				let assets = document.querySelector(`[data-line="${key}"][data-pos="${val}"]`);
				assets.classList.add(this.active);
				acticeCell.push(assets)
			}
		}
		this.setActiveEl(acticeCell)
		this.dispatch(toolBarAction.currentStyle(""));
	}
}

export default SelectTable;