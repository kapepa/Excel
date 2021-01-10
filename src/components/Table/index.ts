import ExcelComponent from '../../core/ExcelComponent';
import { GatherTable, SelectTable } from '../../container/index';
import { writeContentFormula } from '../../redux/variables'
import { utility } from '../../core/utility';
import { actionTable } from '../../redux/action/index'

class Table extends ExcelComponent {
	baseElem: HTMLElement | null
	initAction: Function;
	delListenenr: Function;
	initListener: Function
	postLoader: Array< undefined | any > | any = [];
	curentColumn: string;
	runPointer: HTMLElement | null;
	cordinateMove: number;
	direction: string;
	select: any;
	setActiveEl: any;
	timeOut: any;
	constructor(props: {getActiveEl: Function ,setActiveEl: Function, emmiter: any, initAction: Function, delListenenr: Function, initListener: Function, store: any, action: Object, getlocalStorage: any, stateApp: any } ){
		super({...props, listener: ["mousedown", "mouseup", "click", "keyup"]});
		this.initAction = props.initAction;
		this.delListenenr = props.delListenenr;
		this.baseElem = null;
		this.postLoader = [];
		this.runPointer = null;
		this.cordinateMove = 0
		this.direction = ""
		this.select = {};
		this.setActiveEl = props.setActiveEl;
		this.timeOut = undefined;
	}

	readonly className : string = "excel__table";

	onKeyup = (e:Event) => {
		let event: any = e;
		let keyList: Array<string> = ["ArrowRight","ArrowLeft","ArrowDown","ArrowUp"]
		if ((event.key === "Enter" && !event.shiftKey) || keyList.includes(event.key)) event.preventDefault();
		if (!(event.key === "Enter" &&  event.shiftKey)){
			let currentElem: any = event.target;
			this.select.actionKey(event.key);
			this.commonSaveContent(currentElem);
		}
	};
	onClick = (e:any) => {
		let event = e.target;
		let element = event.closest(`[data-line][data-pos]`)
		if(event.closest(`[data-line][data-pos]`) && e.ctrlKey !== true){
			this.select.selectOne(parseInt(element.dataset.line),parseInt(element.dataset.pos))
		}else if(event.closest(`[data-line][data-pos]`) && e.ctrlKey){
			this.select.selectMany(parseInt(element.dataset.line),parseInt(element.dataset.pos))
		}
	}

	onMousedown = (e: Event ) => {
		let resizeEvent: any = e.target;
		let discoverData: any = resizeEvent.closest("[data-resize]");
		if (resizeEvent.dataset.pointer && discoverData.dataset.resize !== undefined && resizeEvent.dataset.pointer){
			if(discoverData.dataset.pos){
				this.postLoader = Array.from(document.querySelectorAll(`[data-pos="${discoverData.dataset.pos}"]`));
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
				this.dispatch(this.action.table.establishCol({direction: this.direction, size: this.cordinateMove, pos: this.baseElem.dataset.pos, getlocalStorage: this.getlocalStorage}))
				this.css(this.runPointer, {right: `0px`})
				this.postLoader.forEach( (el: HTMLElement) => {
					let refreshStyle: any = {};
					let oldStyle = el.getAttribute("style").trim();
					let cropLast = oldStyle.substring(0,oldStyle.length -1)
					cropLast.split(';').forEach( (el:any) =>{
						let [name, val] = el.split(":")
						if(name !== "width" && name !== undefined && val !== undefined) refreshStyle[name] = val;
					});
					let associztion = Object.assign(refreshStyle,{width: `${this.cordinateMove}px`})
					this.css(el,associztion)
				})
			}else if (this.direction === "row"){
				this.dispatch(this.action.table.establishCol({direction: this.direction, size: this.cordinateMove, pos: this.baseElem.dataset.row, getlocalStorage: this.getlocalStorage}))
				this.css(this.runPointer, {right: `0px`});
				this.css(this.postLoader, {height: `${this.cordinateMove}px`});
			}
		}
	}

	changeSize(arr: Array<HTMLElement>, size: number) {
		arr.forEach((el:HTMLElement): void => {this.css(el,{width: `${size}px`})});
	}

	changeCell(){
		this.select = new SelectTable({dispatch: this.dispatch.bind(this), subscribe: this.subscribers, setActiveEl: this.setActiveEl});
	}

	init(){
		super.init();
		this.select.selectOne();
		this.subscribers(writeContentFormula, this.writable)
	}

	writable = (data: string) => {
		let el = this.select.curretnElem.querySelector(`[contenteditable]`);
		if(document.activeElement !== el){
			el.innerHTML = data;
			this.commonSaveContent(el);
		}
	}

	commonSaveContent(elem: any){
		let baseElem: HTMLElement = elem.closest(`[data-line][data-pos]`);
		let {line, pos} = baseElem.dataset;
		if(this.timeOut)window.clearTimeout(this.timeOut);
		if(baseElem.textContent.startsWith("=")){
			this.timeOut = window.setTimeout(() => {
				let res = utility.calculate(elem, elem.textContent);
				this.dispatch(actionTable.writeContentCell({content: res ,line, pos, getlocalStorage: this.getlocalStorage}));
			},5000);
		}
		this.dispatch(actionTable.writeContentCell({content: elem.textContent ,line, pos, getlocalStorage: this.getlocalStorage}));
	}
	
	toHTML(){
		let preverve = this.getlocalStorage
		let content = GatherTable(10,preverve)
		let appendHTML = super.appendHTML({tag: "section", className: this.className, content});
		this.changeCell();
		return appendHTML;
	}
}

export default Table