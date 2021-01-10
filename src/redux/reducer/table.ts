import { IgnorePlugin } from 'webpack';
import { changeSizeCell, writeContentCell, setStyleCell } from '../variables';

function reduceTable(state: any, action: any) {
	let cloneState = JSON.parse(JSON.stringify(state))
	let option: any = action.payload;
	switch(action.type){
		case changeSizeCell:
			if(option.direction === "col"){
				cloneState[option.direction][option.pos] = option.size;	
			}else if(option.direction === "row"){
				cloneState[option.direction][option.pos] = option.size;
			}
			return cloneState;
		case writeContentCell:
			if(!cloneState.content.hasOwnProperty(option.line)) cloneState.content[option.line] = {}
			if(!cloneState.content[option.line].hasOwnProperty(option.pos)) cloneState.content[option.line][option.pos] = {text: "", style: ""}
			cloneState.content[option.line][option.pos].text = option.content + " ";
			return cloneState;
		case setStyleCell:
			if(cloneState.content[option.line] && cloneState.content[option.line][option.pos] && cloneState.content[option.line][option.pos].style !== undefined){
				let allStyle = JSON.parse(JSON.stringify(cloneState.content[option.line][option.pos].style));
				let checkHave = allStyle.indexOf(option.style);
				let alignRequest = /text-align:/.test(option.style);
				let oldStyle = /text-align:/.test(allStyle);
				let newStyle = ""

				if(option.add){
					newStyle = option.style + allStyle;
				}else{
					if(checkHave !== -1){
						newStyle = allStyle.replace(option.style,"");
					}else if(checkHave === -1){
						newStyle = option.style + allStyle;
					}
				}

				if(alignRequest && oldStyle && checkHave === -1){
					let listAngle =  newStyle.match(/text-align:\w*;/ig)
					if(Array.isArray(listAngle) ){
						let index = listAngle.findIndex( el => el !== option.style )
						newStyle = allStyle.replace(listAngle[index],option.style);
					}
				}
				cloneState.content[option.line][option.pos].style = newStyle
			}
			return cloneState;
		default: 
			return state;
	}
}

export default reduceTable;