import ExcelComponent from '../../core/ExcelComponent';
import { actionFormula } from '../../redux/action/index'
import { writeContentCell, writeContentFormula } from '../../redux/variables';
import { utility } from '../../core/utility';

class Formula extends ExcelComponent {
	listener: Array<string>;
	emmit: any;
	subscribe: any;
	currentEl: HTMLElement | null;
	timeOut: any;
	constructor(props: {getActiveEl: Function ,setActiveEl: Function, emmiter: any, initAction: Function, delListenenr: Function, initListener: Function, store: any, action: Object, getlocalStorage: any, stateApp: any } ){
		super({...props, listener: ["input"]})
		this.currentEl = null;
		this.timeOut = undefined;
	}
	readonly className : string = "excel__formula";

	onInput = (e:Event): void => {
		let event: any = e;
		let str: any = event.target;
		if(this.timeOut)window.clearTimeout(this.timeOut);
		if(str.textContent.startsWith("=")){
			this.timeOut = window.setTimeout(() => {
				let res = utility.calculate(event.target, event.target.textContent);
				this.dispatch(actionFormula.formulaInput(res));
			},4000);
		}
		this.dispatch(actionFormula.formulaInput(str.innerHTML));
	}
	
	mainInput = (string: string) => {
		if(document.activeElement !== this.currentEl){
			let prepareText = string.replace(/[</br>]/gi," ")
			this.currentEl.textContent = prepareText.toString()
		}
	}

	init(){
		super.init();
		this.currentEl = document.querySelector('[contenteditable]');
		this.subscribers(writeContentFormula,this.mainInput);
		this.subscribers(writeContentCell,(arg:any) => {this.mainInput(arg.content)})
		this.preloadString();
	}

	preloadString(){
		let {line, pos} = this.getState().cordinate;
		this.mainInput(document.querySelector(`[data-line='${line}'][data-pos='${pos}']`).textContent)
	}

	toHTML(){
		
		let content: string = `
			<div class="excel__formula-info">fx</div>
				<div class="excel__formula-wrap">
					<div class="excel__formula-input" contenteditable = "true" maxlength="10">
				</div>
			</div>`;
		return super.appendHTML({tag: "section", className: this.className, content})
	}

}

export default Formula;