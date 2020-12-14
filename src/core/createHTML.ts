function createHTML( tag: string, attr?: { name: string, val: string } | undefined ) {
	const element = document.createElement(tag);
	if( attr && attr.name.length && attr.val.length ) element.setAttribute( attr.name, attr.val )
	return element
}

export {createHTML}