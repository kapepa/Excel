import { createHTML } from "./createHTML";
import { utility } from '../core/utility';

class ExcelComponent {
	html: HTMLElement;
	listener: Array<string> | undefined;
	callbackArr: Array<Function | undefined>;
	initListener: Function;
	className: any;
	emmit: any;
	subscribe: any;
	constructor(props: {emmiter: any, html?: HTMLElement, listener?: Array<string>, initListener: Function }) {
		this.listener = props ? props.listener : [];
		this.html = props.html;
		this.initListener = props.initListener;
		this.emmit = props.emmiter.emmit;
		this.subscribe = props.emmiter.subscribe;
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
	init(){
		let th: any = this;
		if( !this.listener ) return;
		th.listener.forEach((el:string) => {
			let receiveMethod = utility.onTransform(el)
			if(receiveMethod in th){
				th.initListener(th.html, el, th[receiveMethod])
			}else{
				throw new Error(`error in component ${th.className}, necessary add method ${el}`)
			}
		})
	}
}

export default ExcelComponent 
