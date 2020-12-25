import { createHTML } from '../../core/createHTML';
import { DomListener } from  '../../core/DomListener';
import { utility } from '../../core/utility';
import  Emmiter  from '../../core/Emitter';

class Excel extends DomListener{
	baseElement: HTMLElement ;
	components: Array<object>;
	emmiter: undefined | Object;
	constructor(props:{ selector: string, components:  Array<object>,}){
		super(props)
		this.baseElement = document.getElementById(props.selector)
		this.components = props.components;
		this.emmiter = undefined;
	}

	initAction = () => {
		this.components.forEach( (compon: any): void => {compon.init()})
	}
	
	delAction = () => {
		this.components.forEach( (compon: any): void => {
			if( compon.getListener() !== undefined ){
				compon.getListener().forEach(( el:string ) => {
					let receiveMethod = utility.onTransform(el)
					this.delListenenr( compon.html, el, compon[receiveMethod])
				})
			}
		})
	}

	initEmmiter(){
		this.emmiter = new Emmiter();
	}
	
	render(){
		const area: HTMLElement = createHTML("main",{ name: "class", val: "excel" })
		this.initEmmiter()
		this.components = this.components.map( ( el : any )  => {
			let obj = new el({emmiter: this.emmiter, initAction: this.initAction, delListenenr: this.delListenenr, initListener: this.initListener })
			if(obj instanceof Object) area.appendChild(obj.toHTML())
			return obj
		} )
		this.baseElement.appendChild(area);
		return this
	}
}

export default Excel