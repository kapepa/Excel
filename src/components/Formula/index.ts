import ExcelComponent from '../../core/ExcelComponent';

class Formula extends ExcelComponent {
	listener: Array<string>;
	emmit: any;
	subscribe: any;
	currentEl: HTMLElement | null;
	constructor(props: {emmiter: any, initAction: Function, delListenenr: Function, initListener: Function } ){
		super({...props, listener: ["input"]})
		this.currentEl = null;
	}
	readonly className : string = "excel__formula";

	onInput = (e:Event): void => {
		let event: any = e;
		let str: any = event.target;
		this.emmit("formulaInput", str.innerHTML)
	}
	
	mainInput = (string: string) => {
		let prepareText = string.replace(/[</br>]/gi," ")
		this.currentEl.textContent = prepareText;
	}

	init(){
		super.init();
		this.currentEl = document.querySelector('[contenteditable]');
		this.subscribe("changeCell",this.mainInput);
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