import ExcelComponent from '../../core/ExcelComponent';
import { actionHeader } from '../../redux/action/index';

class Header extends ExcelComponent {
	constructor(props: {initAction: Function, delListenenr: Function, initListener: Function, store: any, action: Object, getlocalStorage: any, stateApp: any  } ){
		super({...props, listener: ["input"]});
	}
	readonly  className : string = "excel__header";

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