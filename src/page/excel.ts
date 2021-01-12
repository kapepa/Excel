import { Page } from '../core/Page';
import "../App";
import { Header, Toolbar, Formula, Table, Excel } from '../components/index';
import { CreateStore } from '../core/createStore';
import { rootReducer } from '../redux/rootReducer';

class ExcelPage extends Page {
	getlocalStorage: any;
	store: any;
	router: any;
	constructor(props:any) {
		super(props);
		this.getlocalStorage = undefined;
		this.store = undefined;
		this.init()
		this.router = props.router;
	}

	init(){
		this.getlocalStorage = JSON.parse(window.localStorage.getItem(window.location.href));
		this.store = CreateStore(rootReducer, this.getlocalStorage);
	}

	rootStart(){
		return new Excel({components: [Header, Toolbar, Formula, Table], store: this.store, getlocalStorage: this.getlocalStorage, router: this.router});
	}
}

export default ExcelPage
