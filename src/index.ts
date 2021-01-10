import './assets/js/common.js';
import './assets/style/style.scss';
import 'material-design-icons'
import './App';
import { Header, Toolbar, Formula, Table, Excel } from './components/index';
import { CreateStore } from './core/createStore';
import { rootReducer } from './redux/rootReducer';

let getlocalStorage = JSON.parse(window.localStorage.getItem(window.location.origin));
let store = CreateStore(rootReducer, getlocalStorage);
let excel = new Excel({selector: "app", components: [Header, Toolbar, Formula, Table], store, getlocalStorage});
excel.render().initAction();


