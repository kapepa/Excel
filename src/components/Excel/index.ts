import { createHTML } from '../../core/createHTML';
import { DomListener } from  '../../core/DomListener';
import { utility } from '../../core/utility';

class Excel extends DomListener{
	baseElement: HTMLElement ;
	components: Array<object>;
	constructor(props:{ selector: string, components:  Array<object>,}){
		super(props)
		this.baseElement = document.getElementById(props.selector)
		this.components = props.components;
	}

	initAction = () => {
		this.components.forEach( (compon: any): void => {
			if( compon.getListener() !== undefined ){
				compon.getListener().forEach(( el: string ) => {
					let receiveMethod = utility.onTransform(el)
					if(! (receiveMethod in compon) ){
						throw new Error(`error in component ${compon.className}, necessary add method ${el}`)
					}else{
						this.initListener( compon.html, el, compon[receiveMethod])
					}
				})
			};
		})
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
	render(){
		const area: HTMLElement = createHTML("main",{ name: "class", val: "excel" })
		this.components = this.components.map( ( el : any )  => {
			let obj = new el({html: HTMLElement, initAction: this.initAction, delListenenr: this.delListenenr })
			if(obj instanceof Object) area.appendChild(obj.toHTML())
			return obj
		} )
		this.baseElement.appendChild(area)
		return this
	}
}

export default Excel