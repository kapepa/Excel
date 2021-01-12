import { createHTML } from '../../core/createHTML';
import { DomListener } from '../../core/DomListener';
import { utility } from '../../core/utility';

class DashBoard extends DomListener{
	baseEl: HTMLElement;
	router: any;
	constructor(props?:any) {
		super(props);
		this.router = props.router;
		this.baseEl = undefined;
	}

	actionDashBoard(e: Event){
		let event:any = e;
		if(event.target.closest(".db__new-view")){
			let time = Date.now();
			this.router.url(`#excel/${time}`)
		}
	};

	initAction(){this.initListener(this.baseEl,"click", this.actionDashBoard.bind(this))};
	
	render(){

		let listTable = utility.listTable()
		let html = `
		<div class="db__header">
			<h1>Excel Dashboard</h1>
		</div>
		<div class="db__new">
			<div class="db__new-view">
				<a>Новая<br>Таблица</a>
			</div>
		</div>
		<div class="db__table">
			<div class="db__table-header">
				${listTable.length ? '<span>Название</span><span>Дата открытия</span>' : "<span>Список с таблицами пуст</span>"}
			</div>
			${listTable.length ? `<ul class="db__table-list">${listTable.join("")}</ul>` : ""}
		</div>
		`;
		this.baseEl = createHTML("main",{ name: "class", val: "db" });
		this.baseEl.innerHTML = html;
		return this.baseEl
	}
};

export default DashBoard;