import { createHTML } from '../../core/createHTML';
import { StateApp } from '../../core/stateApp';
import { DomListener } from  '../../core/DomListener';
import { utility } from '../../core/utility';
import { actionTable } from '../../redux/action/index';

class Excel extends DomListener{
	baseElement: HTMLElement ;
	components: Array<object>;
	store: any;
	action: Object;
	getlocalStorage: any;
	stateApp: any;
	componentName: any;
	area: any;
	markup: any;
	router: any;
	constructor(props:{components:  Array<object>, store: any, getlocalStorage: any, router: any}){
		super(props)
		this.components = props.components;
		this.componentName = undefined;
		this.store = props.store
		this.action = {table: actionTable};
		this.getlocalStorage = props.getlocalStorage || {};
		this.stateApp = new StateApp(this);
		this.area = undefined;
		this.markup = {};
		this.router = props.router
	}

	initAction = () => {
		this.componentName.forEach( (compon: any): void => {compon.init()});
	}
	
	delAction = () => {
		this.componentName.forEach( (compon: any): void => {
			if( compon.getListener() !== undefined ){
				compon.getListener().forEach(( el:string ) => {
					let receiveMethod = utility.onTransform(el)
					this.delListenenr( compon.html, el, compon[receiveMethod])
				})
			}
		})
	}

	render(){
		if(this.area === undefined) this.area = createHTML("main",{ name: "class", val: "excel" });
		this.componentName = this.components.map( ( el : any )  => {
			let obj = new el({getActiveEl: this.getActiveEl,setActiveEl: this.setActiveEl ,initAction: this.initAction, delListenenr: this.delListenenr, initListener: this.initListener, store: this.store,action: this.action, getlocalStorage: this.getlocalStorage, stateApp: this.stateApp, router: this.router})
			let html = obj.toHTML();
			if(this.markup[el.name] !== undefined && JSON.stringify(this.markup[el.name].innerHTML) !== JSON.stringify(html.innerHTML)){
				this.markup[el.name].innerHTML = html.innerHTML;
			}else if(this.markup[el.name] === undefined){
				if(obj instanceof Object) this.area.appendChild(html);
				this.markup[el.name] = html
			}
			return obj
		} )
		return this.area
	}
}

export default Excel