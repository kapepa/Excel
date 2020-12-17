import ExcelComponent from '../../core/ExcelComponent';
import { GatherTable } from '../../container/index';

class Table extends ExcelComponent {
	baseElem: HTMLElement | null
	initAction: Function;
	delListenenr: Function;
	postLoader: Array< undefined | any > | any = [];
	curentColumn: string;
	runPointer: HTMLElement | null;
	cordinateMove: number;
	direction: string;
	constructor(props: { html: HTMLElement, initAction: Function, delListenenr: Function } ){
		super({...props, listener: ["mousedown", "mouseup"]});
		this.initAction = props.initAction;
		this.delListenenr = props.delListenenr
		this.baseElem = null;
		this.postLoader = [];
		this.runPointer = null;
		this.cordinateMove = 0
		this.direction = ""
	}

	onMousedown = (e: Event ) => {
		let resizeEvent: any = e.target;
		let discoverData: any = resizeEvent.closest("[data-resize]");
		if (resizeEvent.dataset.pointer && discoverData.dataset.resize !== undefined && resizeEvent.dataset.pointer){
			if(discoverData.dataset.pos){
				this.postLoader = Array.from(document.querySelectorAll(`[data-pos=${discoverData.dataset.pos}]`));
				this.cordinateMove = parseInt(window.getComputedStyle(discoverData).width);
			}else if(discoverData.dataset.pos === undefined){
				this.postLoader = discoverData
				this.cordinateMove = parseInt(window.getComputedStyle(discoverData).height);
			}
			this.setListener("mousemove");
			this.initAction();
			this.baseElem = discoverData;
			this.runPointer = resizeEvent;
			this.direction = discoverData.dataset.resize
		}
	}

	onMousemove = (e: Event | any ) => {
		let position = this.baseElem.getBoundingClientRect();
		if(this.direction === "col"){
			this.css(this.runPointer, {right: `${position.right - e.pageX}px`, bottom: `${-100}vh`})
			this.cordinateMove = parseInt(window.getComputedStyle(this.baseElem).width) + e.pageX - position.right
		}else if(this.direction === "row"){
			this.css(this.runPointer, {bottom: `${position.bottom - e.pageY}px`, right: `${-100}vw`})
			this.cordinateMove = parseInt(window.getComputedStyle(this.baseElem).height) + e.pageY - position.bottom
		}
	}

	onMouseup = (e: Event) => {
		if(this.baseElem){
			this.removeListener("mousemove");
			this.delListenenr(this.html, "mousemove", this.onMousemove);
			if(this.direction === "col"){
				this.css(this.runPointer, {right: `0px`})
				this.postLoader.forEach( (el: HTMLElement) => {
					this.css(el,{width: `${this.cordinateMove}px`})
				})
			}else if (this.direction === "row"){
				this.css(this.runPointer, {right: `0px`});
				this.css(this.postLoader, {height: `${this.cordinateMove}px`});
			}
		}
	}

	changeSize(arr: Array<HTMLElement>, size: number) {
		arr.forEach((el:HTMLElement): void => {this.css(el,{width: `${size}px`})});
	}

	private className : string = "excel__table";
	toHTML(){
		let content = GatherTable(15)
		return super.appendHTML({tag: "section", className: this.className, content});
	}
}

export default Table