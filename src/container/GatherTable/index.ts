interface codeType {
	A: string,
	Z: string
}

function charHeader(length: number, begin: number): string {
	let cell = new Array(length).fill("").map( (el: string, index: number) => {
		return `<div class="excel__table-column"><div class="excel__table-column-symbol">${String.fromCharCode(index + begin)}</div></div>`
	});
	return `<div class="excel__table-row"><div class="excel__table-info"></div><div class="excel__table-data">${cell.join("")}</div></div>`
}

function bodyRows(length: number, row: number): string {
	let creareRow = new Array(row).fill("").map((el:any, index: number) => {
		let numericableRow = `<div class="excel__table-info"><div class="excel__table-column-symbol">${index + 1}</div></div>`;
		let cellRow = new Array(length).fill("").map(( el: string ) => {
			return `<div class="excel__table-column"><div class="excel__table-column-cell" contenteditable = "true"></div></div>`
		}) 
		return `<div class="excel__table-row">${numericableRow} <div class="excel__table-data">${cellRow.join("")}</div></div>`
	})
	return creareRow.join("")
}

export default function(row: number){
	let Code: codeType = {
		A: "A",
		Z: "Z"
	}
	let codeLength: number = Code.Z.charCodeAt(0) - Code.A.charCodeAt(0) + 1;
	return charHeader(codeLength, Code.A.charCodeAt(0)) + bodyRows(codeLength, row);
}