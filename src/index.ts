import './assets/js/common.js';
import './assets/style/style.scss';
import 'material-design-icons'
import './App';
import { Header, Toolbar, Formula, Table, Excel } from './components/index';

let excel = new Excel({selector: "app", components: [Header, Toolbar, Formula, Table]});
excel.render().initAction();


