import './assets/js/common.js';
import './assets/style/style.scss';
import 'material-design-icons';
import Router from "../src/core/router/router";
import DashBoardPage from "../src/page/dashboard";
import ExcelPage from '../src/page/excel';

let router = new Router("#app",{dashboard: DashBoardPage, excel: ExcelPage});




