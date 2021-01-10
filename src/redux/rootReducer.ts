import { Table, Formula, Header, Toolbar } from "./reducer/index";

export function rootReducer (state:any, action?:string){
	return {table: Table, formula: Formula, header: Header,toolbar: Toolbar};
}