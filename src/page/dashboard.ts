import { Page } from '../core/Page';
import { DashBoard } from '../components/index';

class DashBoardPage extends Page{
	props: any;
	constructor(props:any,){
		super(props)
		this.props = props;
		this.init()
	}
	init(){}
	rootStart(){
		return new DashBoard(this.props);
	}
}
export default DashBoardPage