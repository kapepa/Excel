import { createHTML } from "./createHTML";

class ExcelComponent implements excelInterface {
	html: HTMLElement;
	listener: Array<string> | undefined
	constructor(props: { html?: HTMLElement, listener?: Array<string> }) {
		this.listener = props ? props.listener : [];
		this.html = props.html;
	}
	createHTML(tage: string, attr: { name: string, val: string }){
		return createHTML( tage, attr )
	}
	getListener(){
		return this.listener
	}
	setListener(name: string): void{
		this.listener.push(name)
	}
	css(htmlEL: HTMLElement, style: object){
		let newCss: string = Object.entries(style).map(merge).join(';');
		htmlEL.style.cssText = newCss;
		function merge(el: any) {
			return `${el[0]}:${el[1]}`;
		}
	}
	removeListener(name: string): void{
		let dublicate: Array<string> = [...this.listener];
		let findindex = dublicate.findIndex((el: string) => el === name )
		dublicate.splice(findindex,1);
		this.listener = dublicate;
	}
	appendHTML(obj: { tag: string, className: string, content: string }){
		this.html = this.createHTML( obj.tag ,{ name: "class", val: obj.className } );
		this.html.insertAdjacentHTML("beforeend", obj.content);
		return this.html;
	}
}

interface excelInterface {
	// html: string;
}

export default ExcelComponent 
