import ExcelComponent from '../../core/ExcelComponent';
import { GatherTable } from '../../container/index';

class Table extends ExcelComponent {
	constructor(props: { html: HTMLElement } ){
		super(props)
	}
	private className : string = "excel__table";
	toHTML(){
		let content = GatherTable(6)
		return super.appendHTML({tag: "section", className: this.className, content});
	}
}

export default Table