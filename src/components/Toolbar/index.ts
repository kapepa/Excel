import ExcelComponent from '../../core/ExcelComponent';

class Toolbar extends ExcelComponent {
	constructor(props: { html: string } ){
		super(props);
	}
	private className : string = "excel__toolbar";
	toHTML(){
		let content: string = `
			<div class="button material-icons">
				format_align_left
			</div>
			<div class="button material-icons">
				format_align_center
			</div>
			<div class="button material-icons">
				format_align_right
			</div>
			<div class="button material-icons">
				format_bold
			</div>
			<div class="button material-icons">
				format_italic
			</div>
			<div class="button material-icons">
				format_underlined
			</div>
		`;
		return super.appendHTML({tag: "section", className: this.className, content});
	}
}

export default Toolbar