import ExcelComponent from '../../core/ExcelComponent';

class Header extends ExcelComponent {
	constructor(props: { html: string } ){
		super(props)
	}
	private className : string = "excel__header"
	toHTML(){
		let content: string = `
			<input type="text" value="Новая таблица">
			<div>
				<div class="button material-icons">
					delete
				</div>
				<div class="button material-icons">
					exit_to_app
				</div>
			</div>`;
		return super.appendHTML({tag: "section", className: this.className, content})
	}
}

export default Header