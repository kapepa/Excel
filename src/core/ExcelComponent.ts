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
