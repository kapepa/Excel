import ExcelComponent from '../../core/ExcelComponent';

class Formula extends ExcelComponent {
	listener: Array<string>;
	constructor(props: { html: HTMLElement } ){
		super({...props, listener: ["input"]})
	}
	private className : string = "excel__formula";

	onInput(e:Event): void{
		if(e.target.classList.contains("excel__formula-input")){
			let str = e.target.textContent.toString().trim()
			console.dir(str)
		}
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