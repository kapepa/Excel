import ExcelComponent from '../../core/ExcelComponent';
import { actionHeader } from '../../redux/action/index';

class Header extends ExcelComponent {
	router: any;
	constructor(props: {initAction: Function, delListenenr: Function, initListener: Function, store: any, action: Object, getlocalStorage: any, stateApp: any, router: any } ){
		super({...props, listener: ["input","click"]});
		this.router = props.router;
	}
	readonly  className : string = "excel__header";

	onClick = (e:Event) => {
		let target: any = e.target;
		if(target.classList.contains("material-icons")){
			let btn = target.textContent.trim();
			if(btn === "delete"){
				let storeName = this.router.href();
				window.localStorage.removeItem(storeName);
				this.router.url("");
			}else if(btn === "exit_to_app"){
				this.router.url("");
			}
		}
	}

	onInput = (e:any) => {
		this.dispatch(actionHeader.headerTitle(e.target.value))
	}

	init(){
		super.init()
		if(this.getlocalStorage.hasOwnProperty("title")) this.setState({title: this.getlocalStorage.title})
	}
	toHTML(){
		let content: string = `
			<input type="text" value="${this.state().title === undefined ? "Новая таблица" : this.state().title}">
			<div>
				<div class="button material-icons">
					delete
				</div>
				<div class="button material-icons">
					exit_to_app
				</div>
			</div>`;
		return super.appendHTML({tag: "section", className: this.className, content});
	}
}

export default Header