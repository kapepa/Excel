import { defaultWidthCell, defaultHeightCell } from '../../redux/variables';

interface codeType {
	A: string,
	Z: string
}

function discoverSize(defwidth: any = 0 ,index: number = 0){
	return defwidth[index] ? defwidth[index] : defaultWidthCell;
}

function  detectedSize(defheight: any = 0, index: number = 0) {
	return defheight[index] ? defheight[index] : defaultHeightCell;
}

function charHeader(length: number, begin: number, defwidth: Object): string {
	let cell = new Array(length).fill("").map( (el: string, index: number) => {
		return `<div class="excel__table-column" draggable="false" style="width: ${discoverSize(defwidth,index)}px;"  data-resize="col" data-pos=${index} ><div class="excel__table-column-symbol" draggable="false">${String.fromCharCode(index + begin)}</div><div class="excel__table-resize" data-pointer="true"></div></div>`
	});
	return `<div class="excel__table-row"><div class="excel__table-info"></div><div class="excel__table-data">${cell.join("")}</div></div>`
}

function bodyRows(length: number, row: number, begin: number,defwidth: Object, defheight: Object, content: any = {}): string {
	let creareRow = new Array(row).fill("").map((el:any, index: number) => {
		let numericableRow = `<div class="excel__table-info" data-resize="row" data-row=${index} style="height: ${detectedSize(defheight, index)}px;"><div class="excel__table-column-symbol">${index + 1}</div><div class="excel__table-resize" data-pointer="true"></div></div>`;
		let cellRow = new Array(length).fill("").map(( el: string, digit: number ) => {
			let text = content.hasOwnProperty(index) ? content[index].hasOwnProperty(digit) ? content[index][digit].text : "" : "";
			let css = content.hasOwnProperty(index) ? content[index].hasOwnProperty(digit) ? content[index][digit].style : "" : "";
			return `<div class="excel__table-column" style="width: ${discoverSize(defwidth,digit)}px;${css}" data-line=${index} data-pos=${digit}><div class="excel__table-column-cell" contenteditable = "true">${text}</div></div>`
		}) 
		return `<div class="excel__table-row">${numericableRow} <div class="excel__table-data">${cellRow.join("")}</div></div>`
	})
	return creareRow.join("")
}

export default function(row: number, obj: any){
	let Code: codeType = {
		A: "A",
		Z: "Z"
	}
	console.log()
	let codeLength: number = Code.Z.charCodeAt(0) - Code.A.charCodeAt(0) + 1;
	return charHeader(codeLength, Code.A.charCodeAt(0), obj ? obj.col : {}) + bodyRows(codeLength, row, Code.A.charCodeAt(0), obj ? obj.col : {}, obj ? obj.row : {}, obj ? obj.content : {});
}