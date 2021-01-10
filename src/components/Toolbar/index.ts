import ExcelComponent from '../../core/ExcelComponent';
import { utility } from '../../core/utility';
import { setStyleCell, currentStyleToolBar} from '../../redux/variables';
import { actionTable } from '../../redux/action/index';

class Toolbar extends ExcelComponent {
	getActiveEl: Function;
	buttonList: Array<Object>;
	constructor(props: {getActiveEl: Function ,setActiveEl: Function, initAction: Function, delListenenr: Function, initListener: Function, store: any, action: Object, getlocalStorage: any, stateApp: any  } ){
		super({...props, listener:["click"]});
		this.getActiveEl = props.getActiveEl
		this.buttonList = [
			{name: "format_align_left", style: "text-align:left;"}, 
			{name: "format_align_center", style: "text-align:center;"},
			{name: "format_align_right", style: "text-align:right;"},
			{name: "format_bold", style: "font-weight:bold;"}, 
			{name: "format_italic", style: "font-style:italic;"}, 
			{name: "format_underlined", style: "text-decoration:underline;"}
		]
	}

	onClick = (e:any) => {
		let event = e.target;
		let baseEl = this.getActiveEl();

		if(event.classList.contains("material-icons")){
			let flag = !event.classList.contains("toolActive");
			if(Array.isArray(baseEl)){
				baseEl.forEach( el => {
					let {line, pos} = el.dataset;
					this.dispatch(actionTable.setStyle({line, pos, style: event.dataset.css, add: flag}));
				});
			}else{
				let active = baseEl.dataset;
				this.dispatch(actionTable.setStyle({line: active.line, pos: active.pos, style: event.dataset.css, add: false}))
			}	
		}
	}

	setActive(el:any){el.classList.add("toolActive")}

	removeActive(el:any){el.classList.remove("toolActive")}

	doneActive = (arg: any) => {
		let elem = arg.dataset;
		let currwntState = this.getState();
		document.querySelectorAll(`[data-css]`).forEach( el => this.removeActive(el));

		if(!(currwntState.content[elem.line] && currwntState.content[elem.line][elem.pos])) return;
		let style = currwntState.content[elem.line][elem.pos].style.split(";");
		for(let val of style){
			let node = document.querySelector(`[data-css='${val+";"}']`);
			if(node) this.setActive(node)
		}
	}

	swapStyle = (arg?:any) => {
		let baseEl = this.getActiveEl();
		if(Array.isArray(baseEl)){
			baseEl.forEach( (el) => {this.prepareActive(el)});
		}else if (!Array.isArray(baseEl)){
			this.prepareActive(baseEl);
		}
	}

	prepareActive(el: HTMLElement){
		let state = this.getState();
		let {line,pos} = el.dataset;
		if(state.content[line] && state.content[line][pos]){
			let cssString = state.content[line][pos].style;
			if(state.col[pos] !== undefined) cssString = cssString + `width: ${state.col[pos]}px;`
			el.setAttribute("style",cssString);
			this.setAsset(cssString);
		};	
	}

	setAsset(string: string){
		let splitStr: any = string.trim();
		splitStr = splitStr.substr(0, splitStr.length - 1).split(";");
		Array.from(document.querySelectorAll(`[data-css]`)).forEach( el => this.removeActive(el));
		for(let key of splitStr){
			for(let val of this.buttonList){
				if(key + ";" === val.style) this.setActive(document.querySelector(`[data-css="${val.style}"]`));
			}
		}
	}

	init(){
		super.init();
		this.subscribers(setStyleCell, this.swapStyle);
		this.subscribers(currentStyleToolBar,(arg: string) => {this.setAsset(arg)})
		this.startAssets()
	}

	startAssets = () => {
		let state = this.getState();
		let {line, pos} = state.cordinate;
		let content = state.content;
		if(content[line] && state.content[line][pos])this.setAsset(state.content[line][pos].style)
	}

	readonly className : string = "excel__toolbar";
	toHTML(){
		let content: string = this.buttonList.map(utility.createButton).join("")
		return super.appendHTML({tag: "section", className: this.className, content});
	}
}

export default Toolbar